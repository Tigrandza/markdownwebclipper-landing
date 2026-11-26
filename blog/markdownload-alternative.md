<!-- Raw Markdown twin of /blog/markdownload-alternative. Kept in sync manually. -->

# MarkDownload was removed from the Chrome Web Store — what to use instead (2026)

Published 2026-11-17 · ~7 min read · Alternatives

MarkDownload is gone from the Chrome Web Store, and current Chrome no longer runs the Manifest V2 extension it was. The closest replacement is MarkSnip, a maintained Manifest V3 fork of MarkDownload. If you clip into Obsidian, the official Obsidian Web Clipper is the safe default. For hard pages — spanning tables, math, footnotes, AI chats — Markdown Web Clipper, which I build, keeps the most.

> **Disclosure:** I build Markdown Web Clipper, one of the tools below. Every claim about output quality on this page comes from the [comparison page](https://markdownwebclipper.com/compare), where the raw clipper outputs are published next to the script that produced them. If you spot a factual error, email support@markdownwebclipper.com and I'll correct it.

## What happened to MarkDownload?

MarkDownload ("MarkDownload - Markdown Web Clipper", by deathau) was the community default for turning a web page into a Markdown file for years: open source, built on Readability and Turndown, with a deep template and options page.

Two things ended it on Chrome:

- **It was a Manifest V2 extension.** Chrome phased Manifest V2 out between 2024 and 2025; since Chrome 139, it runs only Manifest V3 extensions ([Google's timeline](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline)). The Chrome Web Store listing for MarkDownload is gone; its old address now leads to an empty store page.
- **It stopped being updated.** The last release on Firefox Add-ons is version 3.2.0, from September 2022. A Manifest V3 rewrite never shipped under the original name.

So the extension did not break because of one bug. It was left behind by a platform change, and nobody moved it forward under the same name.

## Can I still install MarkDownload?

- **Chrome, Edge, Brave:** no. Sideloading the old version does not help, because current Chromium no longer runs Manifest V2 extensions.
- **Firefox:** yes. Firefox still supports Manifest V2, and MarkDownload is still listed on Firefox Add-ons (about 11,000 daily users when I checked on 2026-11-17). It is unmaintained, so expect modern single-page sites to clip badly, but it runs.

## The alternatives, fairly

### MarkSnip — the closest to MarkDownload

[MarkSnip](https://github.com/daxid/MarkSnip) describes itself as a Manifest V3 fork of MarkDownload. It is on the Chrome Web Store and Firefox Add-ons. Its source is on GitHub under the PolyForm Noncommercial license — readable, but not open source in the OSI sense.

- **Why it fits refugees:** it is the same codebase moved forward, so the workflow feels familiar. It keeps the template and site-rule ideas, adds an editor before you save, and can send to Obsidian (through the Advanced URI plugin), a webhook, or a local CLI.
- **Where it loses:** on the hard pages in my test it was the weakest of the three clippers measured. It forced the periodic table into a broken GFM table, turned display equations into one-row tables, left footnotes as links back to the source, and captured only the final answer of a shared ChatGPT conversation.
- **Pick if:** you want MarkDownload back, as close as possible, and your pages are mostly ordinary articles.

### Obsidian Web Clipper (official) — the safe default

Built by the Obsidian team, free, open source (MIT), on every major browser.

- **Why it fits refugees:** if MarkDownload was how you filled an Obsidian vault, this is now the standard way to do that. Templates, highlights and direct vault integration are built in.
- **Where it loses:** in my test it emitted bare code fences on a GitHub README (no language, so no syntax highlighting) and captured only the last 5 messages of a 24-turn ChatGPT conversation, without the display math.
- **Pick if:** you live in Obsidian and clip mostly articles. For most people this is the right answer.

### Markdown Web Clipper — for the pages that break clippers

This one is mine. It is a Chrome extension (it also runs in Edge and Brave); the free edition is open source (MIT).

- **Why it fits refugees:** it saves where MarkDownload users actually kept files — a `.md` download, a local folder you pick (written directly, so it can be your vault folder), the clipboard, or Obsidian. GitHub Gist is a Pro destination.
- **What it keeps that the others drop, from the same test:** spanning tables kept intact as HTML, display equations as `$$` blocks, real `[^1]` footnotes, a language tag on every code fence, and all 24 turns of a shared ChatGPT conversation with `## User` / `## ChatGPT` labels. Claude and Gemini conversations work the same way.
- **Where it loses:** a small community; no highlighting or annotation; no Firefox version.
- **One honest gap for MarkDownload users:** the template syntax is different. MarkDownload used single-brace tokens like `{pageTitle}`; this clipper uses `{{title}}`-style variables. Your old templates do not carry over automatically yet — you would rewrite them once.
- **Pricing:** the core is free with no time limit. Pro is a one-time $9 launch / $19 standard, no subscription.
- **Pick if:** you clip technical pages — documentation, papers, Wikipedia tables, AI chats — and want the file to be right the first time.

Other community forks exist, such as "Modern MarkDownload". I have not tested them, so I don't rank them here.

## At a glance

| | MarkSnip | Obsidian Web Clipper | Markdown Web Clipper |
|---|---|---|---|
| Relationship to MarkDownload | Manifest V3 fork | Independent | Independent |
| Browsers | Chrome, Firefox | Chrome, Edge, Firefox, Safari | Chrome and other Chromium browsers |
| Source | Source-available (PolyForm Noncommercial) | Open source (MIT) | Open source (MIT, free edition) |
| Spanning tables kept intact | ✗ | ✓ | ✓ |
| Display equations as `$$` blocks | ✗ | ✓ | ✓ |
| Real footnotes | ✗ | ✓ | ✓ |
| Code fence language kept | ✓ | ✗ | ✓ |
| Full ChatGPT conversation | ✗ (final answer only) | ✗ (last 5 messages) | ✓ (24/24 turns) |
| Price | Free | Free | Free + one-time $9 / $19 Pro |

The table rows come from five hard pages captured on 2026-09-18 (Obsidian Web Clipper 1.7.1, MarkSnip 5.2.0, Markdown Web Clipper 0.9.1). Raw outputs and the capture script are on the [comparison page](https://markdownwebclipper.com/compare).

## Which MarkDownload alternative should you pick?

- **"I want MarkDownload back":** MarkSnip.
- **"I clip articles into Obsidian":** the official Obsidian Web Clipper.
- **"I clip docs, papers, tables, math or AI chats":** Markdown Web Clipper.
- **"I'm on Firefox and it still works":** keep MarkDownload until a page breaks, then pick one of the above.

## FAQ

**Why was MarkDownload removed from the Chrome Web Store?**
It was a Manifest V2 extension, and Chrome phased Manifest V2 out. Its last release was in 2022, and no Manifest V3 version shipped under the original name.

**Is MarkDownload still safe to use?**
On Firefox it still runs, but it has not been updated since September 2022, so it gets no fixes. On Chrome it cannot be used at all.

**What's the closest MarkDownload replacement that saves to Obsidian?**
For the most familiar experience, MarkSnip, which is a fork of MarkDownload and can send to Obsidian through the Advanced URI plugin. For the most integrated one, the official Obsidian Web Clipper. Markdown Web Clipper can also write straight into your vault folder.

**Which MarkDownload alternative handles code, tables and math best?**
In my five-page test, Markdown Web Clipper failed 1 of 20 checks (a results table on arXiv still holds raw `<math>` HTML, as it does in Obsidian Web Clipper). Obsidian Web Clipper failed 4 and MarkSnip 11. The raw outputs are public, so you can check that yourself.

**Related reading:** [How to save a webpage as Markdown: 5 ways compared](https://markdownwebclipper.com/blog/save-webpage-as-markdown) — extensions against URL services, CLIs and print-to-PDF on one page. [Best Markdown web clippers for Obsidian, compared (2026)](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) — six clippers, by use case. [How to save ChatGPT and Claude conversations as Markdown](https://markdownwebclipper.com/blog/export-chatgpt-claude-conversations-markdown).

_Last updated 2026-11-17._
