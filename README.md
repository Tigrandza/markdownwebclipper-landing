# markdownwebclipper.com — landing site

Public marketing site for **Clipper**, a Chrome MV3 extension that converts any
webpage to high-fidelity Markdown.

This repository contains only the static landing page (HTML + CSS). The
extension itself is currently developed in a private repository and will be
open-sourced in a future release.

## Live site

https://markdownwebclipper.com

## What's here

| File | Purpose |
|------|---------|
| `index.html` | Landing page with demo, feature list, pricing, CWS install CTA |
| `privacy.html` | Privacy policy page (`/privacy`) — single source of truth for the published policy |
| `style.css` | Lean, framework-free styling |

Cloudflare Pages config (production branch, output dir, HTML handling) is
maintained via the Pages dashboard, not via a `wrangler.toml` in this repo —
having `wrangler.toml` at the root caused Cloudflare's build runner to invoke
the Workers CLI by mistake.

## Deployment

This repo auto-deploys to **Cloudflare Pages** on every push to `main`.

Manual deploy (fallback):

```bash
pnpm dlx wrangler login
pnpm dlx wrangler pages deploy . --project-name=clipper-landing
```

## Contributing

Typo fixes, link corrections, and copy-edit PRs are welcome. Please keep changes
limited to the static landing-site content — code or feature requests for the
extension itself should wait for the public extension repo to land.

## License

[MIT](LICENSE) © 2026 Tigran Davtyan
