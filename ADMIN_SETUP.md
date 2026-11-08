# Private Portfolio Admin — Secure Setup

The portfolio is hosted on GitHub Pages, which is a static hosting service. A password check written in browser JavaScript would be visible to visitors and would not securely protect edits. This project therefore uses a small Cloudflare Worker as the private backend. The Worker keeps the admin password, GitHub token, and session-signing secret in server-side secrets; none of them are committed to this repository.

## What the private admin can manage

Open `admin.html` directly (it is intentionally not linked in the public navigation). Once authenticated, the panel can:

- Add, edit, hide/show, and delete selected portfolio projects.
- Add or remove featured GitHub repositories.
- Hide GitHub repositories from the public portfolio without deleting them from GitHub.
- Edit the complete `content.json` file, including the profile copy, experience, Life Makers responsibilities, education, skills, courses, journey, metrics, and selected projects.
- Commit content changes directly to the `main` branch of `Mahmoudhamed24/Mahmoud_Hamed` through the Worker.

After a successful save, GitHub Pages publishes the updated `content.json` as part of the normal Pages deployment. The browser never receives the GitHub token.

## 1. Create a GitHub fine-grained personal access token

1. In GitHub, open **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Create a token limited to the repository **Mahmoud_Hamed** under **Mahmoudhamed24**.
3. Grant only **Contents: Read and write** repository permission.
4. Do not paste the token into this project, `admin-config.js`, or a chat. It is entered directly as a Cloudflare Worker secret in step 3.

## 2. Install Wrangler and authenticate to Cloudflare

Install Node.js LTS, then in a terminal run:

```bash
npm install -g wrangler
wrangler login
```

Open a terminal in the `admin-worker` directory:

```bash
cd admin-worker
```

## 3. Add the three server-side secrets

Run each command and enter the requested value only in the terminal prompt:

```bash
wrangler secret put ADMIN_PASSWORD
wrangler secret put SESSION_SECRET
wrangler secret put GITHUB_TOKEN
```

- `ADMIN_PASSWORD`: enter the administrator password you chose. It is not embedded in any website file.
- `SESSION_SECRET`: enter a newly generated random secret of at least 32 characters. Do not reuse the admin password. With Node.js you can generate one using `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
- `GITHUB_TOKEN`: enter the fine-grained token created in step 1.

Do not commit secrets or `.env` files to GitHub.

## 4. Deploy the Worker

Still inside `admin-worker`:

```bash
wrangler deploy
```

Wrangler prints a URL similar to:

`https://mahmoud-portfolio-admin-api.<your-account>.workers.dev`

## 5. Connect the admin page to the Worker

Edit the root-level `admin-config.js` file and replace the placeholder with your actual Worker URL:

```js
window.MHA_ADMIN_API_BASE = 'https://mahmoud-portfolio-admin-api.YOUR-ACCOUNT.workers.dev';
```

Do not add a password or GitHub token to this file. The Worker URL is public; the secrets remain on Cloudflare.

## 6. Upload the website to GitHub Pages

Upload the contents of this portfolio folder to the root of the `Mahmoud_Hamed` repository, preserving this structure:

- `index.html`
- `content.json`
- `script.js`
- `styles.css`
- `admin.html`
- `admin.css`
- `admin.js`
- `admin-config.js`
- `admin-worker/` (optional to keep in the repo; it contains source code and wrangler configuration, not secrets)
- `assets/`

Enable GitHub Pages from the intended branch and root directory if it is not already enabled.

## 7. Open and use the hidden admin page

Visit:

`https://mahmoudhamed24.github.io/Mahmoud_Hamed/admin.html`

Sign in with the admin password. Add or hide projects, adjust repository visibility, or use the complete JSON editor. Click **حفظ ونشر التعديلات** to commit the updated `content.json` to GitHub.

## Important security notes

- The `admin.html` page is not linked from the public navigation and uses `noindex`; however, its URL is not secret. Security comes from server-side authentication, not from hiding the URL.
- Never put the admin password or a GitHub token in JavaScript, HTML, CSS, or public GitHub repository settings.
- The Worker returns a signed, time-limited admin session token (8 hours). Logging out clears the browser session token.
- If you change the GitHub repository, branch, Pages domain, or content file path, update `admin-worker/wrangler.toml` and redeploy.
- The GitHub token is powerful enough to write repository contents. Keep it restricted to the one repository and revoke it if compromised.

## Troubleshooting

- **Login says service is not configured:** verify the three Worker secrets exist.
- **CORS/network error:** ensure `ALLOWED_ORIGINS` includes the exact GitHub Pages origin and redeploy the Worker.
- **GitHub 404:** check repository name, branch, and that `content.json` exists at the configured path.
- **GitHub 401/403:** verify the fine-grained token is valid and has Contents read/write access to `Mahmoud_Hamed`.
- **Changes saved but not visible yet:** check the GitHub Pages deployment status; the public page reads the newly published `content.json` after deployment completes.
