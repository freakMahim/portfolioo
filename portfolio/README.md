# MAHIM — Ocean × Sky Portfolio
Static site (no backend). Works on GitHub Pages: push this folder, then Settings → Pages → deploy from `main` / root.

## Your files
- `assets/images/profile.webp` — already created from the photo you shared (720×720). Replace anytime with a square WebP.
- `assets/audio/ambient.mp3` — **add your music here.** Until it exists, the music button stays disabled (no errors).

## Edit your info
Top of `script.js`: `SITE_CONFIG` (contact details/socials), `NAV_ITEMS`, `FORM_CONFIG`.

## Contact form
Set `FORM_CONFIG.endpoint` to a Formspree/Web3Forms URL (Web3Forms: put `access_key` in `extraFields`). While empty, the form opens the visitor's mail app with the message prefilled.

## Adding Projects / Gallery / CV later
Create e.g. `projects.html` (copy `about.html`), then set `enabled: true` for it in `NAV_ITEMS`. Nav updates on every page.

## Tailwind note
Pages use a small hand-written `style.css` (no runtime). Tailwind's CDN builds ship a large runtime, which hurts mobile performance; if you want Tailwind classes, compile it with the Tailwind CLI into a static CSS file.
