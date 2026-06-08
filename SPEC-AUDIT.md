# Website Specification Audit — markdownwebclipper.com

Audited against **The Website Specification** (specification.website, 128-item spec, 10 categories)
via its MCP server (`https://mcp.specification.website/mcp`, tools `get_checklist` / `get_categories`).
Date: 2026-06-08. Scope: local files in this repo + live responses from `https://markdownwebclipper.com`.

**MCP integration:** added to Claude Code at local scope —
`claude mcp add --transport http specification-website https://mcp.specification.website/mcp`
(status: ✓ Connected). Tools will appear natively (`search`, `list_topics`, `get_topic`,
`get_checklist`, `get_categories`, prompt `audit_url`) after the next Claude restart; this audit
called the JSON-RPC endpoint directly so results were available immediately.

---

## Resolution (applied 2026-06-08)

All findings below were fixed in the same commit. Summary of what shipped:

| # | Fix | Files |
|---|---|---|
| P0 | Security headers (HSTS, CSP, nosniff, Referrer-/Permissions-Policy) + cache tuning + `.md` content-type + `Link:` discovery | `_headers` (new) |
| P0 | Relaxed CSP scoped to `/restore` only (it has a needed inline script) | `_headers` |
| P1 | `llms.txt` + `llms-full.txt` agent index | new |
| P1 | `/.well-known/security.txt` | new |
| P1 | Per-page Markdown twins | `index.md`, `pro-faq.md`, `privacy.md`, `blog/best-markdown-web-clippers-2026.md` (new) + `rel=alternate` links |
| P1 | RSS feed + discovery | `blog/feed.xml` (new) + `rel=alternate` on home/blog |
| P1 | `color-scheme` meta | all 6 pages |
| P1 | `favicon.ico` (real 16+32 multi-size) + `<link rel=icon>` | `favicon.ico` (new) + all pages |
| P1 | Web app manifest | `site.webmanifest` (new) + `<link rel=manifest>` all pages |
| P1 | `BreadcrumbList` JSON-LD + visible trail | `pro-faq.html`, `blog/best-markdown-web-clippers-2026.html` |
| P2 | Skip link + `id="main"` | all 6 pages + `.skip-link` CSS |
| P2 | Heading-hierarchy fix (demo `h4`→`p.md-h`; footer/TOC `h4`→`h2`) | `index.html` + all pages + `style.css` |
| P2 | Fidelity toggle ARIA — `role=group` + `aria-pressed` (honest fix: it's a toggle group, not a tabset) | `index.html` + `landing.js` |

Deferred items (per the audit's "Out of scope" list) remain deferred. The sections
below are the original audit, kept for the rationale.

### Re-audit round 2 (2026-06-08, via native MCP)

Re-ran the full `required`-tier checklist (35 items) through the spec MCP against the live
deploy. HSTS now serves `max-age=31536000; includeSubDomains` (the zone-level dashboard
setting was enabled — fixed). Two required-tier gaps the first pass missed, now fixed:

| Finding | Fix |
|---|---|
| **Custom 404 page** (resilience, required) — site returned a 404 status but an empty body | Added `404.html` (site-styled, explains + links home/blog/FAQ). **Live at `/404`, but not yet wired as the not-found handler** — see note below. |
| **Accessible data tables** (a11y, required) — comparison tables had `<th>` but no `<caption>`/`scope` | Added `<caption class="sr-only">` + `scope="col"` to the destinations matrix, the blog compare-table, and the two demo tables; added an `.sr-only` utility. |

**404 handler — needs one config flag (this is a Workers static-assets project, not Pages).**
`404.html` is deployed and serves at `/404`, but an unmatched route returns a 404 status with an
empty body because Workers static-assets defaults `not_found_handling` to "none". Set it to
`"404-page"` to serve `404.html` on misses. Two ways:
- **wrangler config** (commit to repo): add `assets: { not_found_handling: "404-page" }` to a
  `wrangler.jsonc` for the `clipper-landing` Worker. Cleanest, version-controlled — but it changes
  deploy config for the live domain, so confirm the Worker name/asset dir first.
- **dashboard**: `clipper-landing` → Settings → Static assets → set "Not found handling" to
  "Single-page app off / 404 page". Lowest risk if you'd rather not touch deploy config in-repo.

Still open (one required-tier item, deferred for a decision):
- **Image optimisation** — `demo.gif` is a ~1.2 MB animated GIF. It has explicit dimensions
  and lazy-loads (no CLS, not LCP-blocking), but a muted/looping `<video>` (MP4/WebM) or
  animated WebP would cut the payload by ~5–10×. Bigger change (markup + re-encode); left for
  a follow-up.

**Verified live after deploy:** CSP, `X-Content-Type-Options: nosniff`,
`Referrer-Policy`, `Permissions-Policy`, the `Link:` discovery header, `.md` served as
`text/markdown`, immutable font caching, and all new endpoints (llms.txt, security.txt,
manifest, favicon.ico, feed.xml, .md twins) return 200.

**One item needs a Cloudflare dashboard change (cannot be fixed from the repo):**
HSTS still serves `max-age=0` because a zone-level Cloudflare HSTS setting overrides the
`_headers` value. Enable it at **SSL/TLS → Edge Certificates → HTTP Strict Transport
Security** (max-age 12 months, includeSubDomains; add preload only when ready — it's an
irreversible commitment).

**Restore page fix:** the strict global `script-src 'self'` would have blocked
`restore.html`'s inline bridge (Cloudflare *appends* rather than replaces per-path CSP, so a
path override didn't work). The script was externalised to `/restore.js`, which the global
policy covers cleanly — no inline-script exception needed.

---

## Scorecard

| Category | State | Headline |
|---|---|---|
| Foundations | 🟢 Strong | doctype/lang/charset/viewport/title/desc/canonical/OG/theme-color all present. Missing: `color-scheme`, `favicon.ico` fallback. |
| SEO | 🟢 Strong | robots.txt, sitemap, 1×h1/page, JSON-LD (SoftwareApplication/Product/FAQ/BlogPosting). Issues: no breadcrumbs; heading levels skip h1→h4 in demo/footer. |
| Accessibility | 🟡 Good | Semantic landmarks, alt text, labelled icon buttons, reduced-motion. Missing: skip link; tablist ARIA incomplete. |
| Security | 🔴 Weak | **No security headers at all.** HSTS is set to `max-age=0` (disabled). No CSP/XCTO/frame-ancestors/Referrer/Permissions. |
| Well-Known URIs | 🔴 Missing | No `/.well-known/security.txt`. (Account-specific ones correctly absent.) |
| Agent Readiness | 🟡 Opportunity | Stable URLs + JSON-LD good. No `llms.txt`, no markdown endpoints, no MCP/agent-skills — **strong thematic fit for a Markdown/AI product.** |
| Performance | 🟢 Strong | HTTP/2+/3, brotli, self-hosted subset fonts, preload, lazy/decoding on demo. Tune: static-asset cache lifetime. |
| Privacy | 🟢 Strong | Privacy policy present; no analytics/cookies/3rd-party scripts — nothing to consent to. |
| Resilience | 🟡 Good | Real 404 status; HTTP→HTTPS 301. Missing: web app manifest. |
| i18n | ⚪ N/A | Single-language (en) site; most i18n items don't apply. `lang="en"` set correctly. |

---

## What already passes (don't touch)

- **Foundations:** `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset>`, `<meta viewport>` (no `user-scalable=no`), single non-empty `<title>`, unique `<meta description>`, `rel=canonical` on every indexable page, light+dark `theme-color`, full Open Graph + Twitter cards with sized `og:image` and `og:image:alt`.
- **SEO:** `robots.txt` (+ sitemap reference), valid `sitemap.xml`, exactly one `<h1>` per page, `noindex` correctly applied to the transient `/restore` page and excluded from the sitemap. JSON-LD: `SoftwareApplication` + `Product` (home), `FAQPage` (pro-faq), `BlogPosting` (article). (See finding #13 — the `<h4>`s in the demo cards/footer skip levels.)
- **Accessibility:** `<header>/<nav>/<main>/<footer>` landmarks, decorative brand icon `alt=""` with `aria-label` on the link, every icon-only `<button>` has an `aria-label`, `prefers-reduced-motion` handled in CSS, real `<table>` markup for the destinations matrix.
- **Security/transport:** HTTPS, HTTP→HTTPS **301**, HTTP/2 with **HTTP/3** advertised (`alt-svc h3`).
- **Performance:** **brotli** compression, self-hosted subset WOFF2 fonts with `preload` + `crossorigin`, `prefers-color-scheme` dark mode, demo GIF has `width/height` + `loading="lazy"` + `decoding="async"` (no CLS, not blocking LCP).
- **Privacy:** dedicated privacy policy; **zero** analytics, cookies, or third-party scripts — the strongest possible posture, and nothing triggers a consent obligation.

---

## Findings & recommendations (prioritised)

### P0 — Security headers (required-tier; one file fixes most of it)

Live `https://markdownwebclipper.com/` returns **no security headers**, and HSTS is actively
disabled (`strict-transport-security: max-age=0`). The spec marks several of these **required**.

| Header | Spec tier | Current | Target |
|---|---|---|---|
| `Strict-Transport-Security` | required | `max-age=0` (off) | `max-age=31536000; includeSubDomains` (add `preload` only when ready) |
| `X-Content-Type-Options` | required | absent | `nosniff` |
| frame-ancestors / `X-Frame-Options` | required | absent | `Content-Security-Policy: frame-ancestors 'none'` (or `DENY`) |
| `Content-Security-Policy` | recommended | absent | start report-only, then enforce (snippet below) |
| `Referrer-Policy` | recommended | absent | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | recommended | absent | disable unused features (`camera=(), microphone=(), geolocation=()`, …) |

**Why:** XCTO and clickjacking protection are required because their absence enables real attack
classes (MIME confusion, UI-redress). HSTS at `max-age=0` means a downgrade window on every first
visit. These cost nothing on a static marketing site and are the single biggest gap.

**How — first confirm the deploy mechanism (unverified).** The live site is fronted by Cloudflare
(`server: cloudflare`, `cf-cache-status: HIT`) and `.wrangler/` is gitignored, which *suggests*
Cloudflare Pages — but this repo contains **no** `_headers`, `wrangler.toml`, or CI deploy config,
so the mechanism is an inference, not a fact. Pick the matching path:
- **Cloudflare Pages / Netlify** → add a root `_headers` file (snippet below). This is the assumed case.
- **Cloudflare proxying a separate origin / Worker** → `_headers` does nothing; set headers via a
  Cloudflare **Transform Rule** (Modify Response Header) or at the origin instead. Same header
  values apply.

Confirm which before committing the file — e.g. check the Cloudflare dashboard, or whether this
repo is wired to Pages. Assuming Pages, add `_headers` at the repo root. The site has no
inline-script-free CSP yet because the popup demo uses inline
`style=` attributes and two inline `<script type="application/ld+json">` blocks, so start CSP in
report-only and tighten:

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

(`style-src 'unsafe-inline'` is needed only because of the inline `style=` attributes in
index.html; removing those later lets you drop it. JSON-LD `<script>` blocks are not affected by
`script-src` since they aren't executed.)

### P1 — Agent readiness (optional-tier, but on-brand and cheap)

This is a **Markdown clipper marketed to the notes + LLM crowd** — the agent-readiness category is
the most thematically aligned set of wins on the whole spec.

1. **`/llms.txt`** (recommended) — a root markdown index of key pages (home, pro-faq, privacy, blog). Tells LLMs what the site is and where the canonical content lives. ~20 lines.
2. **`/.well-known/security.txt`** (recommended) — points researchers at `support@markdownwebclipper.com`. Five lines, plus an expiry date.
3. **Per-page Markdown endpoints** (recommended) — serve the blog post (and ideally pro-faq) as raw `.md`. For a product whose entire pitch is "clean Markdown," exposing your own pages as Markdown is the most credible possible dogfooding. Low effort if content is authored in MD already.
4. **`Link:` headers / MCP / agent-skills** (optional) — defer; only worth it once 1–3 exist.

### P1 — Foundations, SEO & resilience polish (recommended-tier)

5. **`<meta name="color-scheme" content="light dark">`** — you ship a dark theme via `prefers-color-scheme` but don't declare `color-scheme`, so dark-mode users get a white flash before CSS loads, and form controls/scrollbars aren't themed. One line in every `<head>`.
6. **`/favicon.ico` fallback** — you have SVG + PNG32 + apple-touch, but `/favicon.ico` 404s. Some crawlers and older clients still request it by convention. Add a 32px ICO.
7. **Web app manifest** (`/site.webmanifest`) — small JSON (name, icons, theme/background colour, `display`). Enables proper install metadata and silences the manifest 404. You already have `icon-128.png` to point at; add a maskable variant for completeness.
8. **`BreadcrumbList` JSON-LD** on the blog post and pro-faq — Home › Blog › Article. Cheap rich-result signal; pairs with the structured data you already ship.
9. **RSS/Atom feed + `rel=alternate` discovery** for `/blog/` — you have a blog index but no feed. With one article it's marginal; revisit once there are 3–4 posts.

### P2 — Accessibility & performance tuning

10. **Skip link** — add `<a href="#main" class="skip-link">Skip to content</a>` as the first focusable element (with `id="main"` on `<main>`). Keyboard/screen-reader users currently tab through the full nav on every page. Recommended-tier.
11. **Tablist ARIA** — the fidelity Rendered/Source toggle uses `role="tablist"` but its buttons lack `role="tab"` + `aria-selected`, and the hero popup tabs aren't wired at all. Either complete the ARIA pattern or drop `role="tablist"` (a half-applied pattern misleads AT more than none). First rule of ARIA.
12. **Static-asset cache lifetime** — CSS/JS/fonts currently serve `cache-control: public, max-age=0, must-revalidate`. Fonts and images never change between deploys; give `/fonts/*` and image assets a long `max-age`. CSS/JS aren't content-hashed, so don't mark them `immutable` until you fingerprint filenames — otherwise a deploy won't bust caches. Add per-path rules to the same `_headers` file.

13. **Heading hierarchy skips levels** (required-tier) — every page has exactly one `<h1>` (good), but `index.html` jumps **h1 → h4** with no h2/h3 in between: the demo cards (`<h4># Markdown</h4>` line 207, `<h4>Quick reference</h4>` line 389) and the three footer column headers (`<h4>Product/Reading/Legal</h4>`). The spec's rule is "never skip levels, never use headings for styling alone." The honest fix: the two **demo `<h4>`s depict sample Markdown content and arguably shouldn't be heading elements at all** (use a styled `<p>`/`<div>` — they're not part of the page outline). Footer column labels are borderline; if kept as headings they should be `<h2>` (siblings under the page, after the body sections) or non-heading styled text. Low effort, removes a required-tier violation that the current report's "1×h1/page" strength was masking.

### P3 — Optional / watch-list

- **Speculation Rules** to prerender the CWS link / internal nav — micro-win.
- **`Blog`/`ItemList` JSON-LD** on `/blog/` index (currently no JSON-LD there).
- **Content-Signal directives** in robots.txt (emerging AI-preferences standard).
- **i18n** items — only relevant if a non-English version is ever planned.

---

## Suggested order of work

1. **`_headers` file** — closes every P0 security gap + the P2 cache tuning in one commit. Highest impact/effort ratio. *(verify headers afterward with `curl -sI`)*
2. **`color-scheme` meta + `favicon.ico` + `security.txt`** — three tiny, uncontroversial fixes.
3. **`llms.txt` + manifest + breadcrumbs** — agent-readiness + resilience round-out.
4. **Skip link + tablist ARIA + heading-level fix (#13)** — accessibility/SEO correctness in the HTML.
5. **Per-page Markdown endpoints + feed** — on-brand, do when blog grows.

The foundation is genuinely solid. The only required-tier HTML issue is the heading-level skip
(#13), a small markup fix; everything else is **server-config headers** (one file) and
**discovery/agent endpoints** (new small files), not rework of the HTML you already have.
