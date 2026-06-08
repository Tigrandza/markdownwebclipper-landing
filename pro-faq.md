<!-- Raw Markdown twin of /pro-faq. Kept in sync manually. -->

# Pro FAQ — Markdown Web Clipper

One-time purchase. Lifetime license. $9 launch · $19 standard · 14-day refund. No subscription.

Pro adds four power-user features on top of an already-complete free edition. It is one
purchase, billed once, with no recurring charges and a 14-day refund window — no questions
asked.

## What's free

Everything the extension exists to do is free, forever, with no time limit or feature
degradation:

- One-keystroke clip of any page to clean, high-fidelity Markdown — tables, fenced code, math,
  footnotes, image references.
- Save to a local folder via the File System Access API (Obsidian vault, Logseq graph, Foam,
  or any folder of plain Markdown files).
- Copy Markdown to clipboard.
- Save as `.md` download.
- Open directly in Obsidian via the `obsidian://` URI scheme — no plugin required.
- Built-in templates (Article, AI Chat, …) and site rules (Wikipedia, ChatGPT, Claude,
  Gemini, Reddit, Hacker News, GitHub, …).
- Inline (base64), reference-mode, or skip-images — your choice, per clip.
- Custom keyboard shortcuts; multi-tab batch clipping at a small free-tier cap.

## What Pro unlocks

- **GitHub Gist destination.** Push converted Markdown to a public or secret Gist with your
  own Personal Access Token (stored locally, never transmitted to us). Re-saving updates the
  same Gist via `PATCH /gists/{id}`, so GitHub records each save as a revision.
- **Co-located image folders.** Images write into a sibling folder under your vault, alongside
  the `.md`; the body uses relative references that survive folder moves.
- **Unlimited multi-tab batch.** Clip as many open tabs as you want (free tier caps at a
  modest number).
- **Multi-vault FSA support (reserved).** Pin more than one vault folder and pick at clip time;
  ships in a near-future release — buy today, have it the moment it ships.

## Pricing

Two prices, both one-time, both lifetime: **$9 promo** (launch window) and **$19 standard**.
Same features either way. The price you pay is the price you pay forever — no recurring
charges, no secretly-renewing subscription, no trial trap.

## How activation works

Click "Buy Pro" → hosted checkout at `checkout.dodopayments.com` (DodoPayments is the merchant
of record). The moment payment succeeds, the extension auto-activates — no email entry, no
license-key copy-paste. A one-shot install-correlation token is passed through checkout and
returned in the webhook; the extension polls until it sees its own license (seconds). If
auto-activation fails (e.g. you closed the tab early), the 60-minute background check picks it
up, or use Restore Purchase immediately.

## How to restore on a new device or Chrome profile

Pro is bound to the email you paid with, not to a device:

1. Install Markdown Web Clipper from the Chrome Web Store.
2. Open the popup → Settings → Pro.
3. Under "Restore your purchase," enter your purchase email and click "Send magic link."
4. Click the deeplink in that email; the extension activates within seconds.

The magic link is one-time-use and expires after 10 minutes (request new ones free). The
confirmation message shows whether or not the email is registered, so nobody can probe which
emails bought the extension. Restore on as many devices as you like — no seat limit.

## Refund policy

14-day money-back guarantee. Email support@markdownwebclipper.com from the address you paid
with within 14 days for a full refund — no questions asked. DodoPayments processes refunds
back to the original method within 5–10 business days. Your locally-saved Markdown files stay
yours.

## Payments and privacy

Card data never touches our servers — the entire checkout runs on DodoPayments' hosted page.
After purchase, the only data held is a hashed email → license-key mapping in a
developer-controlled Cloudflare Worker KV store; raw emails are never logged. License
verification happens at most once per hour and sends only the license key and a per-install
UUID. No analytics, no telemetry. Full breakdown at /privacy.

## Cancelling

Nothing to cancel — Pro is a one-time purchase, not a subscription. Uninstalling is the only
"cancel," and it has no billing effect because there's no recurring charge.

## Contact

Refunds, license issues, accessibility, security, or trademark questions:
support@markdownwebclipper.com. Feature requests and bug reports: the GitHub issue tracker on
the public free-edition repo.
