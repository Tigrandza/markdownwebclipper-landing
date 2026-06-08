<!-- Raw Markdown twin of /privacy. The authoritative source is PRIVACY.md in the
     extension repo: https://github.com/Tigrandza/markdown-web-clipper/blob/main/PRIVACY.md -->

# Privacy Policy — Markdown Web Clipper

Markdown Web Clipper ("the extension") converts the page you are looking at into a Markdown
file and saves it where you choose. It is local-first: no cloud backend, no analytics, no
telemetry, and no remote calls beyond the narrowly-scoped cases listed under "Remote calls."

## Data we read

The extension only reads page data when **you invoke the clipping action** (toolbar click,
keyboard shortcut, or context menu). It does not run on un-clipped tabs and does not request
`<all_urls>` at install time. On a clip it reads:

- **Page HTML** — the active tab's DOM at the moment of the click, processed locally by
  Defuddle (extraction) and Turndown (HTML→Markdown) in an offscreen document.
- **Current tab URL** — used as the source/canonical URL in the frontmatter.
- **Page metadata** — `<title>`, `<meta>`, `<link rel="canonical">`, Open Graph, JSON-LD —
  used to populate the frontmatter.

Multi-tab batch clipping needs the optional `<all_urls>` permission, which is **off by
default** and granted only at runtime via Settings → Privacy → Multi-tab batch. Revoke it any
time there or from `chrome://extensions`.

## Data we write

Persisted on your device in four locations:

- **`chrome.storage.local`** — templates, custom site rules, cached license status, the FSA
  vault folder reference, the debug-log ring buffer, image-mode preference.
- **`chrome.storage.sync`** — small (≤8 KB) settings (UI language, default destination,
  default frontmatter, shortcut overrides), synced by Chrome; not transmitted anywhere else.
- **`IndexedDB`** — the `FileSystemDirectoryHandle` for your vault folder, plus highlights and
  clip history if enabled.
- **The folder you chose** — the converted Markdown (and co-located images, if that mode) are
  written to the directory you granted access to. The extension cannot touch any file outside
  that folder.

GitHub Personal Access Tokens for the Gist destination live in `chrome.storage.session` by
default (cleared on browser close); an opt-in persists them to `chrome.storage.local`, and
toggling that back off purges the persisted token.

## Remote calls

The extension makes exactly these kinds of remote calls; nothing else leaves your device:

- **Image fetches** — in `reference`/`co-located` image mode, images are fetched from their
  original source domains (the same hosts the page's `<img src>` already pointed at),
  `no-cors`, no extension-specific headers.
- **GitHub Gist API (optional)** — only with the Gist destination + your PAT; posts converted
  Markdown to `https://api.github.com/gists`.
- **Obsidian URI handoff** — dispatches a local `obsidian://new?…` URL; no remote call.
- **License verification** — at most hourly, the service worker calls
  `https://api.markdownwebclipper.com/api/license/check` (a developer-controlled Cloudflare
  Worker). Body contains only the license key + a per-install UUID — no email, no telemetry.
  The Worker stores a hashed-email → license-key mapping in Workers KV; raw emails are never
  logged.
- **License restore (magic link)** — Settings → Pro → Restore Purchase POSTs your email to
  `https://api.markdownwebclipper.com/api/restore`; a one-time, 10-minute magic link is sent
  via Resend. The response is identical whether or not the email is registered (defeats
  enumeration); 60-second per-email rate limit.
- **Uninstall survey URL** — Chrome itself (`setUninstallURL`) opens a Tally form on uninstall;
  a Chrome platform feature, not a Clipper-initiated call; unauthenticated and optional.

## Image viewer notes

By default Clipper writes image URLs as `![](https://...)` (reference mode — no network during
clipping). Viewers that don't fetch remote URLs (macOS Preview, QuickLook) show blank images;
network-capable viewers (Obsidian, browsers) render them. For fully-offline files, switch
Image Handling to "Base64 inline."

## Freemium model & refund policy

Freemium from v1. Core clipping is free forever, no time limit or degradation (single-page
clip to inline/clipboard/download/FSA folder, built-in templates and site rules, Obsidian URI).
Pro (one-time via DodoPayments) adds multi-tab batch >3 tabs, co-located image mode, GitHub
Gist destination, custom site rules, and custom templates. Pricing: **$9 launch / $19
lifetime**, single one-time payment, no subscription. 14-day money-back guarantee — email
support@markdownwebclipper.com from your checkout address within 14 days.

## Your control

- **Revoke FSA folder access** — Settings → Destinations → "Forget vault folder."
- **Clear all stored data** — Settings → Advanced → "Reset all data" (folder contents on disk
  are untouched).
- **Revoke `<all_urls>`** — Settings → Privacy → Multi-tab batch toggle off.
- **Revoke license / refund** — email support@markdownwebclipper.com.
- **Uninstall** — removes the extension and clears `chrome.storage.*`; FSA folder contents
  remain on disk.

## Contact

Questions, refunds, security reports, or trademark concerns: support@markdownwebclipper.com.
