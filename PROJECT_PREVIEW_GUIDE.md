# GitHub projects and live links

The portfolio fetches all public repositories owned by `Mahmoudhamed24` from the GitHub REST API. It paginates through the complete list (100 repositories per request), includes forks, merges duplicate repository identifiers, and saves a local browser cache for offline fallback.

## Display behavior
- Featured repositories are pinned above the rest, including MailForge-related repositories when a public repository name matches `mailforge`.
- Every repository card shows its GitHub OpenGraph cover, name, description, primary language, star/fork counts, and last update date.
- Search, language filters, sorting, and manual refresh are available.
- The **Open published website** action is displayed only when the repository has a valid `homepage` URL or GitHub Pages is enabled (`has_pages === true`). It opens the published site in a new tab.
- Repositories without a published site show the source-code link only; the site does not invent a preview URL.

## MailForge 2.0
MailForge 2.0 is highlighted in Selected Work as an email-marketing and automation platform: campaign creation and management, professional email design, audience organization and segmentation, AI-assisted Arabic content, automation and smart resend, campaign analytics, and Gmail/Outlook integration. The card links to the public MailForge by Skillak page and its trial link. If a public GitHub repository containing `mailforge` is returned by the API, the card automatically adds the repository link and any published Pages link.
