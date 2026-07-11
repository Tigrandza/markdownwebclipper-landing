<!-- Raw Markdown twin of /blog/pocket-alternative-markdown-obsidian. Kept in sync manually. -->

# Life after Pocket: the local-first read-later setup I actually use

Published 2026-07-11 · ~5 min read · Read-later

Mozilla shut Pocket down in 2025. My replacement costs nothing and lives on my own disk: a Chrome extension that clips any article as clean Markdown straight into an Obsidian vault. No account, no server, no subscription. It doesn't replace Pocket's whole ecosystem — I'll be specific about what's missing — but the core save-now, read-later loop works, and this time the files are mine.

*I should say up front: I built the extension I'm describing. That's a bias. It's also why I can tell you exactly where it falls short of Pocket, because I hit those edges myself.*

## What Pocket's shutdown taught me

I used Pocket for years. When the shutdown was announced, I did what everyone did — grabbed the export before the deadline and moved on with my life.

Except the export wasn't really my reading list. It was a list of *URLs*. And my highlights — years of them — came out mangled or simply missing. The articles themselves? Not in the export at all. If a page had died since I saved it, that item was now a dead link with a title. Pocket wasn't an archive; it was a bookmarks folder with a nicer coat.

Omnivore users got the same lesson a year earlier when it wound down after the ElevenLabs acquisition. The pattern is clear enough that I stopped treating it as bad luck: **a read-later service is a rented reading list.** When the landlord leaves, you keep whatever fits in the moving box they hand you.

So my requirement for a replacement wasn't "the best Pocket clone." It was: the saved article must be a plain file, on my disk, in a format that will outlive any company — including mine.

## My read-later setup now

Here's the whole system. It's short:

1. I keep a **Read Later vault** in Obsidian (a plain folder of Markdown files).
2. When I hit an article worth keeping, one keystroke clips it — full text, code blocks, tables, images — as clean Markdown straight into that vault.
3. The clipper writes YAML frontmatter automatically; I add a `readlater` tag there. Later, one tag search in Obsidian surfaces the whole queue.
4. I read on my iPad, in Obsidian, with the vault synced. Capture happens at my desk; reading happens on the couch.

That's it. No inbox to zero, no recommendation feed, no "listen to this article" upsell. A folder of files and a tag.

The part that quietly matters: every article is *actually there*. Full text, offline, greppable. When a post disappears from the web — and they do — my copy doesn't care.

## The part Pocket never did: articles that are LLM-ready

This one I didn't plan; it just became my most-used feature.

Markdown is the most token-efficient faithful format you can hand an LLM. So when I want ChatGPT or Claude to read something with me, I select the relevant part of the page, right-click, **Clip selection**, and paste. Structure survives — headings, tables, code stay intact.

The alternative people default to is screenshots, and screenshots are a bad deal: they burn far more tokens, they're slower for the model to process, and anything longer than one screen turns into a slideshow of crops. A pasted Markdown selection is smaller, faster, and the model can quote it back precisely.

Pocket had no answer to this because Pocket kept your articles inside Pocket. Files don't have that problem.

## Honest limits: this is not Pocket's ecosystem

Pocket was an *ecosystem*: iOS and Android apps, a web app, browser extensions, offline sync, highlights, recommendations. A big machine.

Markdown Web Clipper is a light alternative, and I want to be plain about that:

| | Pocket (was) | Markdown Web Clipper + Obsidian |
|---|---|---|
| Capture | any device | **desktop Chrome only** (for now) |
| Reading | native apps everywhere | any Markdown app — Obsidian on desktop/mobile works well |
| Storage | Pocket's servers | plain `.md` files on your disk |
| Article content | stored remotely, exported as URLs | full text + images, local, offline |
| Highlights | in-app (export was lossy) | your notes live in the file itself |
| Recommendations | yes | no, and never |
| Cost | freemium | free, MIT-licensed, open source |

If you save articles from your phone all day, this setup will frustrate you — capture is desktop-only. There's no reading queue UI, no listening mode, no social layer. What you get instead is ownership: with Obsidian (or any Markdown app) on the reading side, the loop closes, and no shutdown announcement can take the archive away.

## The other Pocket alternatives, honestly

I'll be straight: I didn't seriously live in any of these. When I looked, the polished ones were subscriptions and the open ones wanted me to run a server, and I didn't want either. So — documented facts, not reviews:

- **Readwise Reader** — probably the most capable successor; paid subscription. If you want highlights-first workflows and money isn't the issue, it's the obvious candidate.
- **Instapaper** — the survivor of the original read-later era; free tier with a premium plan. Closest to classic Pocket in spirit.
- **Raindrop.io** — really a bookmarks manager with good clipping; generous free tier, cloud-hosted.
- **Wallabag** — open source and self-hostable, which is genuinely great *if* "spin up your own server" sounds like a weekend project rather than a chore. A paid hosted version exists.

None of these are wrong choices. They're all still someone else's database. That trade-off is the entire fork in the road: features versus files. I chose files.

## Set it up in two minutes

1. Install [Markdown Web Clipper](https://chromewebstore.google.com/detail/dpkinbemdemheacegfjbbkclcpbfedif?utm_source=markdownwebclipper.com&utm_medium=website&utm_campaign=blog) — free, no account.
2. Point it at a folder inside your Obsidian vault (or any folder — it's just files).
3. Clip something. Add `readlater` to the frontmatter tags.
4. On mobile, open the same vault in Obsidian with your sync of choice. Your queue is a tag search away.

## FAQ

**Can I read clipped articles on my phone or iPad?**
Yes — that's my daily flow. The clipper saves Markdown into the vault on desktop; Obsidian mobile (with the vault synced) does the reading. Capture itself is desktop-only.

**Can it import my old Pocket export?**
No. It clips pages going forward. Your Pocket export (a CSV/HTML file of links) can live in the same vault, but the articles it points to aren't recoverable through it — which is rather the point of switching to files.

**Is it actually free?**
The core is free forever and MIT-licensed — clipping, all destinations, full fidelity. There's an optional one-time Pro purchase for power features; nothing about the read-later workflow above needs it.

**Does it phone home?**
No account, no server, no analytics in the extension. Pages convert locally in your browser and are written to your disk.

---

*Tigran Davtyan builds [Markdown Web Clipper](https://github.com/Tigrandza/markdown-web-clipper), a free, open-source Chrome extension that converts web pages to clean Markdown. This post reflects his own setup as of July 2026.*
