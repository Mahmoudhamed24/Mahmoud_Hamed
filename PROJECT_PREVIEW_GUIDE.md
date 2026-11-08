# Project Preview Guide

The portfolio has two separate project collections:

1. **Selected work** — manually curated projects from `content.json` (for example MAILFORGE 2.0, Makers Journey, Shifaa & Rahma, Skillak Hub, PlastiCash, Telecom Churn, and the learning/research projects).
2. **GitHub repository gallery** — all public repositories discovered automatically from the GitHub account, page by page, with search, language filters, sorting, featured-first ordering, and manual refresh.

## Live website screenshots

For a repository with a valid `homepage` URL or a GitHub Pages website, the project card uses a screenshot service to capture the **actual published destination page** rather than displaying GitHub metadata as the image. The image is clickable and opens the published website in a separate tab.

The primary screenshot endpoint is WordPress mShots. It can return a temporary placeholder while it generates a first screenshot, so the portfolio requests the same destination again after a short delay. A secondary provider is attempted if the first provider fails. Some sites may block automated screenshot services; the fallback state preserves the real website link.

The selected-project editor also accepts a manually hosted screenshot URL in `previewImage`. Use this when you have a high-quality project screenshot or a website blocks automated capture.

## GitHub Pages detection

For each public repository, the page uses:

1. The repository's configured `homepage` field when it is a valid HTTP(S) URL.
2. The conventional GitHub Pages URL when GitHub reports Pages enabled.
3. A documented demo URL for a curated project that has a `githubMatch` field.

A repository without a published destination remains a source-code card. The site does not pretend that a repository is a live website.

## Featured and hidden repositories

`content.json` includes:

- `featuredRepositories`: repository names or full `owner/repository` names to pin at the top.
- `hiddenRepositories`: repository names or full names to omit from the public gallery.

Manage both lists from the private `admin.html` panel or edit the JSON directly through the advanced editor.

## Add a selected project

Use `admin.html` → **المشروعات المختارة** → **مشروع جديد**. You can set title, description, status, category, live link, preview URL, screenshot image URL, and matching GitHub repository. Toggle visibility, then save and publish.

## Security note

The admin page is not linked from the public navigation, but its URL is not secret. Access is enforced by the Cloudflare Worker. Do not put the admin password or GitHub token in frontend files.
