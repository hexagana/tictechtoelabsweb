# Tic Tech Toe Labs — Website

Static website for Tic Tech Toe Labs (Khai &amp; Zayed).
Pure HTML / CSS / JS — no build step, no dependencies.

## Pages

- `index.html` — Home
- `about.html` — About (Khai &amp; Zayed)
- `training.html` — Training programmes
- `contact.html` — Contact + free training needs analysis form
- `testimonials.html` — Full testimonials wall + feedback gallery
- `vault.html` — Members-only Secret Vault (client-side password gate)

## Hosting

Drop these files at the root of a GitHub Pages repo and turn Pages on.
Works as-is with no server.

## Admin mode (testimonials gallery)

Visit `testimonials.html#admin` → enter password (default: `ttt-admin-2026`,
change it inside the `<script>` at the bottom of `testimonials.html`).

Admin mode reveals **Upload images / Clear uploads / Remove** controls on the
carousel. Uploads are stored in the admin's browser localStorage only — to
publish images to all visitors, commit them directly to the repo and update
the carousel slide list in `testimonials.html`.

## Secret Vault passwords

Edit the `VAULT_MEMBERS` array at the bottom of `vault.html`.

## Caveats

Client-side passwords (vault + admin) are readable in page source. Fine for
light gating; upgrade to a real backend (Netlify Identity, Cloudflare Access,
Decap CMS, etc.) for anything sensitive.
