# Mahmoud Hamed Ahmed — Deployment Guide

This is a static site built with HTML, CSS and vanilla JavaScript. There is no build step, server-side runtime or framework dependency.

## Project structure

- `index.html` — portfolio page and content sections.
- `styles.css` — visual system, animation, themes and responsive layout.
- `script.js` — portfolio content, navigation, interactions and GitHub repository integration.
- `assets/mahmoud.jpg` — profile photograph used across the interface.
- `assets/LinkedIn_Banner.png` — personal-brand cover image.
- `assets/Mahmoud_Hamed_Ahmed_Master_CV_2026_Updated.pdf` — downloadable Master CV.
- Supporting Markdown files — profile README, brand notes, preview and deployment instructions.

## Replace the profile photo

1. Open the `assets` folder.
2. Replace `mahmoud.jpg` with your preferred portrait.
3. Keep the exact filename: `mahmoud.jpg`.
4. Commit and push the replacement.

The site automatically uses this image in the header, hero portrait and profile summary. If the photo is not visible after deployment, verify that the path and filename match exactly (GitHub Pages paths are case-sensitive).

## Run locally

From this folder, run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. Use a local server rather than opening `index.html` directly so the GitHub API fetch works consistently.

## Deploy on GitHub Pages

1. Open the repository `Mahmoud_Hamed` on GitHub.
2. Upload the **contents** of this folder to the repository root. Do not upload the outer folder as an extra nested directory.
3. Keep `index.html`, `styles.css`, `script.js`, and `assets/` at the same root level.
4. Commit and push the changes to the selected branch.
5. Open **Settings → Pages**.
6. Select the intended source branch and `/ (root)` folder, then save.
7. Wait until GitHub Pages reports that the site is published, then open:

   `https://mahmoudhamed24.github.io/Mahmoud_Hamed/`

## Published project links (no embedded preview)

The portfolio reads public repositories from the GitHub API:

`https://api.github.com/users/Mahmoudhamed24/repos?per_page=100&sort=updated`

For each repository:

- If its `homepage` field contains a valid website URL, that URL is used.
- Otherwise, if GitHub returns `has_pages: true`, the standard GitHub Pages URL is constructed.
- If neither is present, the repository is shown as source code only.

To publish a project, enable GitHub Pages in that project's **Settings → Pages** and wait for the successful deployment. You can also add the real published URL to the repository's **About → Website** field. Do not add a Website URL before the site is actually published.

When a site is detected, **فتح الموقع المنشور** opens it in a new browser tab. The card's **عرض الكود** link opens its GitHub repository. The portfolio intentionally does not use iframe previews.

## Responsive layout

The interface includes desktop, laptop, tablet, mobile and narrow-mobile layout rules. The navigation changes to a menu on smaller screens; cards and content grids collapse progressively; controls wrap or stack to prevent horizontal overflow. The site also respects `prefers-reduced-motion`.

## Troubleshooting

- **Photo not visible:** check `assets/mahmoud.jpg` exists and capitalization matches.
- **Master CV link fails:** check `assets/Mahmoud_Hamed_Ahmed_Master_CV_2026_Updated.pdf` exists.
- **GitHub projects do not load:** check network access and GitHub API rate limits. The site keeps the latest successful repository list in local storage.
- **Published website link missing:** verify GitHub Pages is enabled or fill in the repository's About → Website field.
- **A project website returns 404:** check the Pages deployment source, branch, folder and repository Pages settings.

## Update content

Edit the content arrays near the top of `script.js`: experience, teaching, Life Makers responsibilities, community contributions, selected projects, skills and courses. Keep dates, titles and results accurate.


## GitHub repositories
The projects area retrieves every public repository from the configured GitHub account using API pagination. It includes forks, pins selected repositories first, and supports search, language filters, sorting, and manual refresh. Published website links appear only when GitHub returns a configured Homepage or `has_pages: true`; unpublished repositories keep their source-code link only.
