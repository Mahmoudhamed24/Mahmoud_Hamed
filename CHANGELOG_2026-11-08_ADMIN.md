# Portfolio Admin Update — 8 November 2026

- Added an unlisted `admin.html` management interface (not linked from the public navigation).
- Added project CRUD controls: create, edit, hide/show, and delete selected projects.
- Added GitHub repository pin/hide controls for the dynamic repository gallery.
- Added a full `content.json` editor for profile copy, experience, Life Makers responsibilities, community contributions, projects, skills, courses, journey, metrics, and education.
- Added a Cloudflare Worker API that authenticates admins with server-side secrets and commits updated `content.json` to GitHub.
- No admin password or GitHub token is embedded in the public HTML/JS files.
- The public website now loads the editable `content.json` on startup and applies its data to the relevant sections.
- Added WordPress mShots website screenshot previews with a delayed retry and a second-provider fallback for live project cards.
