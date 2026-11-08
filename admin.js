(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const API_BASE = String(window.MHA_ADMIN_API_BASE || '').replace(/\/$/, '');
  const TOKEN_KEY = 'mha_portfolio_admin_token_v1';
  let token = '';
  let content = null;
  let dirty = false;
  let jsonEditorDirty = false;

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const normalizedArray = value => Array.isArray(value) ? value : [];

  function setStatus(message, type = '') {
    const element = $('#save-status');
    if (!element) return;
    element.textContent = message;
    element.className = `admin-status ${type}`.trim();
  }

  function setLoginStatus(message) {
    $('#login-status').textContent = message;
  }

  async function api(path, options = {}) {
    if (!API_BASE || API_BASE.includes('YOUR-WORKER-NAME')) {
      throw new Error('لم يتم إعداد عنوان خدمة الإدارة بعد. انشر Cloudflare Worker ثم حدّث admin-config.js بعنوان الخدمة.');
    }
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    if (token && !path.endsWith('/login')) headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers, mode: 'cors', cache: 'no-store' });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && !path.endsWith('/login')) signOut(false);
      throw new Error(result.error || `تعذر تنفيذ الطلب (${response.status}).`);
    }
    return result;
  }

  function showDashboard() {
    $('#login-view').hidden = true;
    $('#dashboard-view').hidden = false;
    $('#logout-button').hidden = false;
    renderAll();
  }

  function signOut(showMessage = true) {
    token = '';
    try { sessionStorage.removeItem(TOKEN_KEY); } catch {}
    $('#dashboard-view').hidden = true;
    $('#login-view').hidden = false;
    $('#logout-button').hidden = true;
    if (showMessage) setLoginStatus('تم تسجيل الخروج بأمان.');
  }

  async function handleLogin(event) {
    event.preventDefault();
    const button = $('#login-submit');
    const password = $('#admin-password').value;
    if (!password) return;
    button.disabled = true;
    button.textContent = 'جارٍ التحقق...';
    setLoginStatus('');
    try {
      const result = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      token = result.token;
      $('#admin-password').value = '';
      try { sessionStorage.setItem(TOKEN_KEY, token); } catch {}
      await loadContent();
      showDashboard();
      setStatus('تم تسجيل الدخول. راجع المحتوى ثم اضغط «حفظ ونشر التعديلات» عند الانتهاء.', 'success');
    } catch (error) {
      setLoginStatus(error.message || 'تعذر تسجيل الدخول.');
    } finally {
      button.disabled = false;
      button.innerHTML = 'دخول لوحة الإدارة <span>↗</span>';
    }
  }

  async function loadContent() {
    const result = await api('/api/admin/content', { method: 'GET' });
    content = result.content;
    if (!content || typeof content !== 'object' || Array.isArray(content)) throw new Error('ملف المحتوى في المستودع ليس JSON صالحًا.');
    content.projects = normalizedArray(content.projects);
    content.featuredRepositories = normalizedArray(content.featuredRepositories);
    content.hiddenRepositories = normalizedArray(content.hiddenRepositories);
    dirty = false;
  }

  function markDirty(message = 'هناك تعديلات لم تُحفظ بعد. اضغط «حفظ ونشر التعديلات».') {
    dirty = true;
    setStatus(message, '');
    updateStats();
  }

  async function saveContent() {
    if (!content) return;
    if (jsonEditorDirty) {
      const parsed = validateJson();
      if (!parsed) { setStatus('محتوى JSON غير صالح؛ أصلح الأخطاء قبل الحفظ.', 'error'); return; }
      content = parsed;
      content.projects = normalizedArray(content.projects);
      content.featuredRepositories = normalizedArray(content.featuredRepositories);
      content.hiddenRepositories = normalizedArray(content.hiddenRepositories);
      jsonEditorDirty = false;
      updateStats();
      renderProjects();
      renderRepositorySettings();
    }
    $('#save-all').disabled = true;
    $('#save-all').textContent = 'جارٍ الحفظ في GitHub...';
    setStatus('يتم إرسال content.json إلى GitHub. سيبدأ تحديث GitHub Pages بعد نجاح الحفظ.', '');
    try {
      const result = await api('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ content })
      });
      dirty = false;
      $('#content-json-editor').value = JSON.stringify(content, null, 2);
      const commit = result.commit?.html_url;
      setStatus(commit ? 'تم حفظ المحتوى في GitHub بنجاح. افتح رابط الـ Commit لمراجعة التعديل، ثم انتظر انتهاء نشر GitHub Pages.' : 'تم حفظ المحتوى في GitHub بنجاح. سيبدأ نشر GitHub Pages تلقائيًا.', 'success');
      if (commit) setStatusLink(commit);
    } catch (error) {
      setStatus(error.message || 'فشل حفظ التعديلات.', 'error');
    } finally {
      $('#save-all').disabled = false;
      $('#save-all').innerHTML = 'حفظ ونشر التعديلات <span>↑</span>';
    }
  }

  function setStatusLink(url) {
    const status = $('#save-status');
    if (!status || !url) return;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'عرض Commit على GitHub ↗';
    link.style.marginInlineStart = '.6rem';
    link.style.color = 'var(--gold)';
    status.append(document.createTextNode(' '), link);
  }

  function updateStats() {
    if (!content) return;
    const projects = normalizedArray(content.projects);
    $('#stat-projects').textContent = projects.length;
    $('#stat-visible').textContent = projects.filter(item => item.visible !== false).length;
    $('#stat-hidden').textContent = projects.filter(item => item.visible === false).length;
    $('#stat-repos').textContent = content.featuredRepositories.length + content.hiddenRepositories.length;
  }

  function renderProjects() {
    const query = ($('#project-search').value || '').trim().toLowerCase();
    const projects = normalizedArray(content.projects);
    const matches = projects.map((project, index) => ({ project, index })).filter(({ project }) => {
      return `${project.title || ''} ${project.category || ''} ${project.text || ''}`.toLowerCase().includes(query);
    });
    $('#project-list-count').textContent = `${matches.length} / ${projects.length}`;
    if (!matches.length) {
      $('#project-admin-list').innerHTML = '<div class="empty-admin">لا توجد مشروعات مطابقة. أضف مشروعًا جديدًا أو غيّر البحث.</div>';
      return;
    }
    $('#project-admin-list').innerHTML = matches.map(({ project, index }) => `
      <article class="admin-project-row ${project.visible === false ? 'is-hidden' : ''}">
        <div><h4>${escapeHTML(project.title || 'مشروع بلا عنوان')}</h4><p>${escapeHTML(project.text || '')}</p><div class="row-meta"><span>${escapeHTML(project.categoryId || 'other')}</span><span>${project.visible === false ? 'HIDDEN' : 'VISIBLE'}</span><span>${escapeHTML(project.status || '')}</span></div></div>
        <div class="row-actions"><button type="button" data-action="edit" data-index="${index}">تعديل</button><button type="button" data-action="toggle" data-index="${index}">${project.visible === false ? 'إظهار' : 'إخفاء'}</button><button type="button" class="delete" data-action="delete" data-index="${index}">حذف</button></div>
      </article>`).join('');
  }

  function renderRepositorySettings() {
    const featured = normalizedArray(content.featuredRepositories);
    const hidden = normalizedArray(content.hiddenRepositories);
    $('#featured-repo-list').innerHTML = featured.length ? featured.map((item, index) => `<span class="token-chip">${escapeHTML(item)}<button type="button" title="إزالة" data-repo-list="featured" data-index="${index}">×</button></span>`).join('') : '<div class="empty-admin">لا توجد مستودعات مثبتة.</div>';
    $('#hidden-repo-list').innerHTML = hidden.length ? hidden.map((item, index) => `<span class="token-chip">${escapeHTML(item)}<button type="button" title="إظهار" data-repo-list="hidden" data-index="${index}">×</button></span>`).join('') : '<div class="empty-admin">لا توجد مستودعات مخفية.</div>';
  }

  function renderJsonEditor() {
    $('#content-json-editor').value = JSON.stringify(content, null, 2);
    jsonEditorDirty = false;
  }

  function renderAll() {
    renderProjects();
    renderRepositorySettings();
    renderJsonEditor();
    updateStats();
  }

  function resetProjectForm() {
    $('#project-form').reset();
    $('#project-index').value = '-1';
    $('#project-visible').checked = true;
    $('#project-form-title').textContent = 'إضافة مشروع';
  }

  function editProject(index) {
    const project = content.projects[index];
    if (!project) return;
    $('#project-index').value = String(index);
    $('#project-title').value = project.title || '';
    $('#project-category').value = project.category || '';
    $('#project-text').value = project.text || '';
    $('#project-status').value = project.status || '';
    $('#project-category-id').value = project.categoryId || 'web';
    $('#project-github-match').value = project.githubMatch || '';
    $('#project-link').value = project.link || '';
    $('#project-link-label').value = project.linkLabel || '';
    $('#project-preview-url').value = project.previewUrl || '';
    $('#project-preview-image').value = project.previewImage || '';
    $('#project-secondary-link').value = project.secondaryLink || '';
    $('#project-secondary-label').value = project.secondaryLinkLabel || '';
    $('#project-visible').checked = project.visible !== false;
    $('#project-form-title').textContent = 'تعديل مشروع';
    $('#project-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function saveProjectForm(event) {
    event.preventDefault();
    const index = Number($('#project-index').value);
    const project = {
      category: $('#project-category').value.trim(),
      title: $('#project-title').value.trim(),
      text: $('#project-text').value.trim(),
      status: $('#project-status').value.trim(),
      categoryId: $('#project-category-id').value,
      githubMatch: $('#project-github-match').value.trim(),
      link: $('#project-link').value.trim(),
      linkLabel: $('#project-link-label').value.trim(),
      previewUrl: $('#project-preview-url').value.trim(),
      previewImage: $('#project-preview-image').value.trim(),
      secondaryLink: $('#project-secondary-link').value.trim(),
      secondaryLinkLabel: $('#project-secondary-label').value.trim(),
      visible: $('#project-visible').checked
    };
    if (!project.category) project.category = project.categoryId.toUpperCase();
    if (index >= 0 && index < content.projects.length) content.projects[index] = { ...content.projects[index], ...project };
    else content.projects.unshift(project);
    resetProjectForm();
    renderProjects();
    renderJsonEditor();
    markDirty('تم تحديث قائمة المشروعات محليًا. اضغط «حفظ ونشر التعديلات» حتى تظهر التغييرات للزوار.');
  }

  function handleProjectActions(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const index = Number(button.dataset.index);
    const project = content.projects[index];
    if (!project) return;
    if (button.dataset.action === 'edit') return editProject(index);
    if (button.dataset.action === 'toggle') {
      project.visible = project.visible === false;
      renderAll();
      markDirty(project.visible ? 'سيظهر المشروع بعد حفظ التعديلات ونشر الموقع.' : 'تم إخفاء المشروع من معاينة الموقع محليًا؛ احفظ التعديلات لتطبيق الإخفاء على الزوار.');
    }
    if (button.dataset.action === 'delete') {
      if (!window.confirm(`هل تريد حذف المشروع «${project.title}» من ملف الموقع نهائيًا؟`)) return;
      content.projects.splice(index, 1);
      renderAll();
      markDirty('تم حذف المشروع من قائمة المحتوى. احفظ التعديلات لتطبيق الحذف.');
    }
  }

  function addRepositorySetting(kind) {
    const value = $('#repo-name-input').value.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '');
    if (!value || !/^[a-z0-9_.-]+(?:\/[a-z0-9_.-]+)?$/i.test(value)) {
      setStatus('اكتب اسم المستودع أو owner/repository بشكل صحيح.', 'error');
      return;
    }
    const featured = content.featuredRepositories;
    const hidden = content.hiddenRepositories;
    if (kind === 'featured') {
      if (!featured.some(item => String(item).toLowerCase() === value.toLowerCase())) featured.unshift(value);
      content.hiddenRepositories = hidden.filter(item => String(item).toLowerCase() !== value.toLowerCase());
    } else {
      if (!hidden.some(item => String(item).toLowerCase() === value.toLowerCase())) hidden.push(value);
      content.featuredRepositories = featured.filter(item => String(item).toLowerCase() !== value.toLowerCase());
    }
    $('#repo-name-input').value = '';
    renderRepositorySettings();
    renderJsonEditor();
    markDirty(kind === 'featured' ? 'تم تثبيت المستودع ضمن المشروعات المميزة.' : 'تم وضع المستودع ضمن قائمة الإخفاء.');
  }

  function handleTokenRemove(event) {
    const button = event.target.closest('button[data-repo-list]');
    if (!button) return;
    const listName = button.dataset.repoList === 'featured' ? 'featuredRepositories' : 'hiddenRepositories';
    const index = Number(button.dataset.index);
    content[listName].splice(index, 1);
    renderRepositorySettings();
    renderJsonEditor();
    markDirty('تم تحديث إعدادات المستودعات. احفظ التعديلات لتطبيقها على الموقع.');
  }

  function validateJson(quiet = false) {
    try {
      const parsed = JSON.parse($('#content-json-editor').value);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('يجب أن يكون المحتوى كائن JSON رئيسيًا.');
      if (!Array.isArray(parsed.projects)) throw new Error('يجب أن يحتوي الملف على مصفوفة projects.');
      if (!Array.isArray(parsed.experience) || !Array.isArray(parsed.lifeMakers)) throw new Error('تحقق من مصفوفتَي experience وlifeMakers.');
      $('#json-validation').textContent = `JSON صالح — ${parsed.projects.length} مشروعات و${Object.keys(parsed).length} أقسام رئيسية.`;
      $('#json-validation').style.color = 'var(--teal)';
      return parsed;
    } catch (error) {
      $('#json-validation').textContent = error.message || 'JSON غير صالح.';
      $('#json-validation').style.color = 'var(--red)';
      if (!quiet) setStatus('لم يتم اعتماد تعديل JSON بسبب خطأ في البنية.', 'error');
      return null;
    }
  }

  function applyJsonEditor() {
    const parsed = validateJson();
    if (!parsed) return false;
    content = parsed;
    content.projects = normalizedArray(content.projects);
    content.featuredRepositories = normalizedArray(content.featuredRepositories);
    content.hiddenRepositories = normalizedArray(content.hiddenRepositories);
    renderProjects();
    renderRepositorySettings();
    updateStats();
    markDirty('تم تحميل محتوى JSON المعدّل داخل لوحة الإدارة. اضغط حفظ ونشر التعديلات لتثبيته في GitHub.');
    return true;
  }

  function setActiveTab(name) {
    document.querySelectorAll('.admin-tab').forEach(button => button.classList.toggle('active', button.dataset.tab === name));
    document.querySelectorAll('.tab-panel').forEach(panel => {
      const active = panel.id === `tab-${name}`;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  }

  function wireEvents() {
    $('#login-form').addEventListener('submit', handleLogin);
    $('#logout-button').addEventListener('click', () => signOut(true));
    $('#toggle-password').addEventListener('click', () => {
      const input = $('#admin-password');
      input.type = input.type === 'password' ? 'text' : 'password';
    });
    $('#save-all').addEventListener('click', saveContent);
    $('#project-form').addEventListener('submit', saveProjectForm);
    $('#project-admin-list').addEventListener('click', handleProjectActions);
    $('#project-search').addEventListener('input', renderProjects);
    $('#new-project').addEventListener('click', () => { resetProjectForm(); $('#project-title').focus(); $('#project-form').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    $('#cancel-project-edit').addEventListener('click', resetProjectForm);
    $('#repo-feature-add').addEventListener('click', () => addRepositorySetting('featured'));
    $('#repo-hide-add').addEventListener('click', () => addRepositorySetting('hidden'));
    $('#featured-repo-list').addEventListener('click', handleTokenRemove);
    $('#hidden-repo-list').addEventListener('click', handleTokenRemove);
    $('#validate-json').addEventListener('click', () => validateJson());
    $('#format-json').addEventListener('click', () => {
      const parsed = validateJson();
      if (parsed) $('#content-json-editor').value = JSON.stringify(parsed, null, 2);
    });
    $('#content-json-editor').addEventListener('input', () => { dirty = true; jsonEditorDirty = true; $('#json-validation').textContent = 'توجد تعديلات؛ تحقق من صحتها قبل الحفظ.'; $('#json-validation').style.color = 'var(--gold)'; });
    document.querySelectorAll('.admin-tab').forEach(button => button.addEventListener('click', () => setActiveTab(button.dataset.tab)));
    window.addEventListener('beforeunload', event => {
      if (dirty) { event.preventDefault(); event.returnValue = ''; }
    });
  }

  async function restoreSession() {
    try { token = sessionStorage.getItem(TOKEN_KEY) || ''; } catch { token = ''; }
    if (!token) return;
    try {
      await loadContent();
      showDashboard();
      setStatus('تم استعادة جلسة الإدارة الحالية.', 'success');
    } catch {
      signOut(false);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireEvents();
    restoreSession();
    if (!API_BASE || API_BASE.includes('YOUR-WORKER-NAME')) {
      setLoginStatus('خدمة الإدارة الخلفية لم تُربط بعد. راجع ADMIN_SETUP.md لإعداد Worker وربط العنوان.');
    }
  });
})();
