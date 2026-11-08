const encoder = new TextEncoder();

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = new Set((env.ALLOWED_ORIGINS || 'https://mahmoudhamed24.github.io,http://localhost:8000,http://127.0.0.1:8000')
    .split(',').map(item => item.trim()).filter(Boolean));
  const headers = {
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type,Accept',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  };
  if (allowed.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function jsonResponse(request, env, payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function hmacSign(value, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function issueToken(secret) {
  const payload = { sub: 'portfolio-admin', exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60, iat: Math.floor(Date.now() / 1000) };
  const encoded = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = base64UrlEncode(await hmacSign(encoded, secret));
  return `${encoded}.${signature}`;
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function verifyToken(token, secret) {
  if (!token || !secret) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [encoded, suppliedSignature] = parts;
  try {
    const expected = await hmacSign(encoded, secret);
    const supplied = base64UrlDecode(suppliedSignature);
    if (!constantTimeEqual(expected, supplied)) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encoded)));
    return payload.sub === 'portfolio-admin' && Number(payload.exp) > Math.floor(Date.now() / 1000);
  } catch { return false; }
}

async function sameSecret(input, expected) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(input)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected))
  ]);
  return constantTimeEqual(new Uint8Array(a), new Uint8Array(b));
}

function githubHeaders(env) {
  return {
    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Mahmoud-Portfolio-Admin'
  };
}

function githubContentUrl(env) {
  const owner = encodeURIComponent(env.GITHUB_OWNER || 'Mahmoudhamed24');
  const repo = encodeURIComponent(env.GITHUB_REPO || 'Mahmoud_Hamed');
  const path = (env.GITHUB_CONTENT_PATH || 'content.json').split('/').map(encodeURIComponent).join('/');
  const branch = encodeURIComponent(env.GITHUB_BRANCH || 'main');
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
}

async function readGithubContent(env) {
  if (!env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN secret is missing.');
  const response = await fetch(githubContentUrl(env), { headers: githubHeaders(env) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result.message || `GitHub returned ${response.status}`;
    throw new Error(`Cannot read content.json: ${message}`);
  }
  const bytes = base64UrlDecode(result.content.replace(/\s/g, '').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''));
  const text = new TextDecoder().decode(bytes);
  return { content: JSON.parse(text), sha: result.sha };
}

function encodeBase64Utf8(text) {
  const bytes = encoder.encode(text);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function validateContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) return 'Content must be a JSON object.';
  if (!Array.isArray(content.projects)) return 'The projects field must be an array.';
  if (!Array.isArray(content.experience) || !Array.isArray(content.lifeMakers)) return 'Required sections are missing.';
  if (content.projects.length > 300) return 'Too many projects.';
  for (const [index, project] of content.projects.entries()) {
    if (!project || typeof project !== 'object' || typeof project.title !== 'string' || !project.title.trim()) {
      return `Project ${index + 1} needs a title.`;
    }
    for (const key of ['link', 'previewUrl', 'previewImage', 'secondaryLink']) {
      if (!project[key]) continue;
      try {
        const parsed = new URL(project[key]);
        if (!['http:', 'https:'].includes(parsed.protocol)) return `Project ${index + 1} has an invalid ${key} URL.`;
      } catch { return `Project ${index + 1} has an invalid ${key} URL.`; }
    }
  }
  const size = encoder.encode(JSON.stringify(content)).length;
  if (size > 450_000) return 'Content file exceeds the allowed size (450 KB).';
  return '';
}

async function requireAdmin(request, env) {
  const authorization = request.headers.get('Authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  return verifyToken(token, env.SESSION_SECRET);
}

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request, env) });
  }
  if (path === '/api/health' && request.method === 'GET') {
    return jsonResponse(request, env, { ok: true, service: 'portfolio-admin-api' });
  }

  if (path === '/api/admin/login' && request.method === 'POST') {
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
      return jsonResponse(request, env, { error: 'Admin service is not configured.' }, 503);
    }
    let body;
    try { body = await request.json(); } catch { return jsonResponse(request, env, { error: 'Invalid request.' }, 400); }
    const supplied = String(body?.password || '');
    if (supplied.length < 1 || supplied.length > 512 || !(await sameSecret(supplied, env.ADMIN_PASSWORD))) {
      return jsonResponse(request, env, { error: 'كلمة المرور غير صحيحة.' }, 401);
    }
    return jsonResponse(request, env, { ok: true, token: await issueToken(env.SESSION_SECRET), expiresIn: 28800 });
  }

  if (path === '/api/admin/content' && (request.method === 'GET' || request.method === 'PUT')) {
    if (!(await requireAdmin(request, env))) return jsonResponse(request, env, { error: 'انتهت جلسة الإدارة أو أنها غير صالحة. سجّل الدخول مرة أخرى.' }, 401);
    if (request.method === 'GET') {
      try {
        const file = await readGithubContent(env);
        return jsonResponse(request, env, { content: file.content, sha: file.sha });
      } catch (error) {
        return jsonResponse(request, env, { error: error.message || 'تعذر تحميل ملف المحتوى من GitHub.' }, 502);
      }
    }

    let body;
    try { body = await request.json(); } catch { return jsonResponse(request, env, { error: 'Invalid JSON request.' }, 400); }
    const content = body?.content;
    const validationError = validateContent(content);
    if (validationError) return jsonResponse(request, env, { error: validationError }, 400);

    try {
      let current = null;
      try { current = await readGithubContent(env); } catch (error) {
        // A missing content.json can be created by GitHub's Contents API; other errors are returned below.
        if (!String(error.message).toLowerCase().includes('not found')) throw error;
      }
      const owner = env.GITHUB_OWNER || 'Mahmoudhamed24';
      const repo = env.GITHUB_REPO || 'Mahmoud_Hamed';
      const pathValue = env.GITHUB_CONTENT_PATH || 'content.json';
      const branch = env.GITHUB_BRANCH || 'main';
      const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${pathValue.split('/').map(encodeURIComponent).join('/')}`;
      const payload = {
        message: `Update portfolio content via private admin panel (${new Date().toISOString()})`,
        content: encodeBase64Utf8(JSON.stringify(content, null, 2) + '\n'),
        branch
      };
      if (current?.sha) payload.sha = current.sha;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { ...githubHeaders(env), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = result.message || `GitHub returned ${response.status}`;
        return jsonResponse(request, env, { error: `GitHub لم يقبل حفظ الملف: ${message}` }, 502);
      }
      return jsonResponse(request, env, {
        ok: true,
        commit: { sha: result.commit?.sha, html_url: result.commit?.html_url },
        content: 'saved'
      });
    } catch (error) {
      return jsonResponse(request, env, { error: error.message || 'تعذر حفظ الملف في GitHub.' }, 502);
    }
  }

  return jsonResponse(request, env, { error: 'Not found.' }, 404);
}

export default {
  async fetch(request, env) {
    try { return await handle(request, env); }
    catch (error) {
      return jsonResponse(request, env, { error: 'Unexpected server error.' }, 500);
    }
  }
};
