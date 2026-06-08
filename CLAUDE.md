# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

The marketing/landing site for **Markdown Web Clipper**, a Chrome (Manifest V3) extension that
converts web pages to high-fidelity Markdown. This repo is **only the website** — the extension
itself lives in a separate repo (`github.com/Tigrandza/markdown-web-clipper`).

Live at **https://markdownwebclipper.com**.

## Stack & build

- **No build step, no framework.** Plain static HTML + CSS + vanilla JS, served as-is from the repo
  root. Edit the files directly; there is nothing to compile.
- `tokens.css` holds CSS variables (load first); `style.css` is everything else. `landing.js` is
  ~small progressive enhancement (before/after toggle, demo popup, reduced-motion video autoplay,
  extension-installed detection).
- Fonts are self-hosted WOFF2 subsets under `/fonts/` (no CDN, no Google Fonts).

## Pages

- `index.html` — home. `pro-faq.html`, `privacy.html` — long-form (`.prose` layout + TOC).
- `restore.html` — Pro magic-link bridge (noindex). Its script is **external** (`restore.js`) on
  purpose — see CSP note below.
- `blog/index.html` + `blog/best-markdown-web-clippers-2026.html` — blog.
- `404.html` — custom error page (served via wrangler `not_found_handling`).
- Per-page Markdown twins (`index.md`, `pro-faq.md`, `privacy.md`, `blog/*.md`) are hand-authored
  copies for agent/LLM consumption, linked via `rel="alternate"` and indexed in `llms.txt`. **Keep
  them in sync manually when the HTML changes.**

## Deploy (Cloudflare Workers static assets)

- The `clipper-landing` Worker is **Git-connected to this repo and auto-deploys on push to `main`**
  (a separate `clipper-billing` Worker serves `api.markdownwebclipper.com` — don't touch it here).
- `wrangler.jsonc` configures it: repo root is the asset dir, `not_found_handling: "404-page"`.
  Cloudflare will auto-generate this file if absent — keep the committed one in sync with what the
  dashboard expects (name, compatibility_date, observability, nodejs_compat).
- `_headers` — security headers (HSTS, CSP, nosniff, Referrer/Permissions-Policy), cache rules, and
  `.md` content-type. Honored by Workers static assets. **Note:** Cloudflare _headers *appends*
  same-named headers across path rules (it does NOT replace), so don't rely on a more-specific path
  to override a `/*` header — it produces duplicates.
- `.assetsignore` keeps internal files (`SPEC-AUDIT.md`, `wrangler.jsonc`, dotfiles) from being
  served publicly.
- **HSTS** and **Bot Fight Mode** / **Web Analytics** are Cloudflare **zone/dashboard** settings,
  not in this repo. HSTS is enabled at the zone level (overrides any `_headers` value).

## CSP constraint (important)

The CSP is strict: `script-src 'self' https://static.cloudflareinsights.com` — **no inline scripts.**
- Don't add inline `<script>…</script>` to any page; put JS in an external `.js` file (that's why
  `restore.js` is external). Inline `<script type="application/ld+json">` is fine (data, not executed).
- Inline `style=` attributes are allowed (`style-src 'unsafe-inline'`); inline event handlers
  (`onclick=`) are not — wire events in `landing.js`.
- `static.cloudflareinsights.com` (+ `connect-src cloudflareinsights.com`) is allowed for Cloudflare
  Web Analytics. The site's "no analytics/telemetry" claim refers to the **extension**, not this site.

## Conventions

- The literal `dpkinbemdemheacegfjbbkclcpbfedif` is the Chrome Web Store extension id, used verbatim
  in store links and `restore.js`.
- Headings: one `<h1>` per page; footer/TOC section labels are `<h2>`; sample/demo "headings" inside
  cards are non-heading `<p class="md-h">` (don't reintroduce skipped levels).
- Spec compliance: this site is audited against specification.website (see `SPEC-AUDIT.md`, which is
  in the repo but not publicly served). There's an MCP server for it (`specification-website`).

## Verifying a change live (after push)

```bash
curl -sI https://markdownwebclipper.com/ | grep -i content-security-policy   # headers
curl -s -o /dev/null -w '%{http_code}\n' https://markdownwebclipper.com/no-such-page  # 404
```
Deploys take ~30–60s after `git push origin main`.
