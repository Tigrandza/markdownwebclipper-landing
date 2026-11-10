<!-- Raw Markdown twin of /blog/logseq-web-clipper. Kept in sync manually. -->

# Logseq web clipper: how to clip web pages into your Logseq graph

Published 2026-11-10 · ~7 min read · How-to

A Logseq file graph is a folder of Markdown files. That makes it one of the easiest places to
clip into: any clipper that can write a `.md` file into a folder can put a web page into your
graph, with no plugin and no sync server. Here is how to set that up, what I found when I
tested it in Logseq, and when a different tool is the better pick.

> **Disclosure:** I build Markdown Web Clipper. It was designed around Obsidian vaults; its
> one Logseq-specific feature is a front matter switch, covered below. What follows is what happened when I pointed it at a Logseq
> graph and tested the result, including the parts that do not fit well. Spotted a factual error? Email
> support@markdownwebclipper.com and I'll correct it.

## First: which Logseq do you have?

There are now two Logseq apps, and this guide only works with one of them.

**Logseq with a file graph**, now a separate app called [Logseq OG](https://github.com/logseq/og).
Your graph is a folder on disk with a `pages/` folder, a `journals/` folder and a `logseq/`
config folder. Every page is a `.md` file you can open in any text editor. Everything below is
for this one. I tested it with Logseq OG 1.0.0 on macOS in November 2026.

**Logseq 2.0, the database version.** Its beta shipped in July 2026. A database graph keeps
your notes in a SQLite file, not in Markdown files. On my Mac, a 2.0 graph is a folder holding
`db.sqlite`, logs and a backup folder — no `pages/` to write into. The [Logseq
docs](https://github.com/logseq/docs/blob/master/db-version-changes.md) describe an optional
Markdown mirror, but it copies from the database to files, not the other way. So no clipper
that writes files can add a page to a database graph. If that is your setup, skip to the
alternatives.

Logseq has not forced anyone to migrate. File graphs keep working in Logseq OG.

Demo video (a real recording, sped up 1.4×): open the popup, untick *Include frontmatter*,
*Save to vault*, then find the page in Logseq search —
https://markdownwebclipper.com/blog/media/logseq-demo.mp4

## How a folder clipper reaches your graph

Chrome extensions cannot normally write to your disk. The exception is the File System Access
API: you pick a folder once in a system dialog, and the extension may write files inside that
folder and nowhere else. Markdown Web Clipper uses it for its *Save to vault* button. The name
says "vault" because it was built for Obsidian, but the button does not care what app reads
the folder.

When you save, the extension writes one file:

```
<folder you picked>/Clippings/<page title>.md
```

The `Clippings` folder name is fixed in the current version. (There are subfolder fields in
Settings, but the save code does not read them yet. I would rather say that here than have you
find out.)

Logseq picks up Markdown files that other programs put in its folders, including subfolders,
so `pages/Clippings/` works. In my test the clip was in Logseq's search a second or two after
saving. The page name comes from the file name, not the folder. One catch: the *All pages*
list did not refresh by itself, so look for new clips with search.

## Setup, step by step

1. [Install the extension](https://chromewebstore.google.com/detail/dpkinbemdemheacegfjbbkclcpbfedif?utm_source=markdownwebclipper.com&utm_medium=website&utm_campaign=blog-logseq)
   from the Chrome Web Store. No account.
2. Open any article and open the popup (click the toolbar icon, or Alt+Shift+S).
3. Click **Choose vault folder** and pick your graph's `pages` folder. Picking `pages` rather
   than the graph root keeps the clips where Logseq expects pages to live.
4. If the popup shows *"This folder isn't an Obsidian vault"*, that warning is only about the
   *Open in Obsidian* button. Saving to the folder still works.
5. Once, in Settings → General, turn on **Logseq-compatible frontmatter** (the next section
   explains why). Or untick **Include frontmatter** in the popup, as in the recording. Then
   click **Save to vault**.
6. Switch to Logseq and search for the article title. The clip is a new page with that name.
   If search does not find it, re-index the graph from the graph menu.

From then on it is one click per page. Chrome remembers the folder. On Chrome 122 and later
the permission usually persists between sessions, though Chrome can still ask you to confirm
it again.

## Properties: YAML front matter or `key:: value`

This is the main place where an Obsidian-shaped clipper and Logseq disagree.

By default the extension starts every note with a YAML front matter block. Logseq OG reads it:
each key becomes a page property, `title` sets the page name, and `tags` become links. But
Logseq reads these lines one by one, not as full YAML, so two details of the default output go
wrong:

- **Brackets stay in the tag.** By default, tags are written as a YAML list:
  `tags: [clippings, rust lang]`. Logseq makes tag pages named `[clippings` and `rust lang]`. A
  clip with no tags gets `tags: []` and a page named `[]`.
- **Quotes stay in the page name.** When YAML needs quotes, for example for a title with a
  colon, the default output adds them. Logseq keeps them, so the page is named
  `"Rust: A Language Empowering Everyone"`, quotes included.

**The fix: turn on *Logseq-compatible frontmatter*** in Settings → General. It came in version
0.14.0 and is free. With it on, this is what the extension writes for the clip in the
recording:

```yaml
---
title: Markdown - Wikipedia
source: https://en.wikipedia.org/wiki/Markdown
author:
published:
created: 2026-11-10
description: Lightweight markup language
tags: clippings
---
```

I tested 0.14.0 in Logseq OG 1.0.0 with four titles, including one with a colon, one with a
comma and `#` signs, and one with real quotes in it. I checked the properties Logseq parsed for
each file. With the switch on, every title became the page name exactly as written,
`tags: clippings, rust lang` made the tag pages `clippings` and `rust lang`, `created` stayed
plain text instead of a link to a journal page, and empty fields stayed blank. Leave the switch
off if the same folder is also an Obsidian vault: Obsidian needs real YAML lists.

If you would rather have Logseq's own `key:: value` property lines, or no properties at all,
there are two other routes:

- **Free: leave the YAML out.** Untick *Include frontmatter* in the popup before you save, as
  in the recording, or switch off *Include frontmatter by default* in Settings → General to
  skip it for every clip. The note starts with the article body, and Logseq names the page
  after the file.
- **Pro: a Logseq-shaped template.** Custom templates are a Pro feature. A template's note body
  is free text with variables, so you can write Logseq properties yourself and leave the YAML
  out as above:

```
source:: {{url}}
author:: {{author}}
clipped:: {{date}}
tags:: clippings

{{content}}
```

That gives you Logseq page properties in the format Logseq writes itself.

One more thing to expect: Logseq is an outliner, and a clipped article is ordinary Markdown
with headings and paragraphs, not a list of bullets. Logseq splits such a file into blocks: in
the recording, the infobox table and each paragraph are separate blocks. Expect Logseq to
rewrite the file in its own bullet format once you edit the page. If you want to
keep the clip exactly as it was clipped, annotate on a separate page and link to it.

## Images

The extension has four image modes, set in the popup:

- **Reference** (default). Images stay as links to the original site: `![alt](https://…)`.
  Nothing is downloaded. Logseq shows them while you are online and the site keeps them up.
  The Markdown logo in the recording is one.
- **Base64.** Each image is embedded inside the `.md` file as text. Fully offline, but the file
  gets large — a few screenshots can add hundreds of kilobytes — and Logseq's search and your
  git diffs carry all of it.
- **Skip.** No images at all. Good for text you will quote from.
- **Co-located** (Pro). Images are downloaded next to the note and linked by relative path. If
  you picked `pages`, they land in `pages/attachments/<page title>/` and the note links to them
  as `../attachments/<page title>/image.png`.

An honest note on co-located: Logseq's own convention is an `assets/` folder at the graph root,
and the extension does not write there — the `attachments` folder name is fixed today. Logseq
resolves relative image links, so this should display, but I did not test co-located mode for
this post. Either way, your clipped images live apart from the images you paste into Logseq.

For most Logseq use, **reference** is the right default: small files, nothing to manage.
Switch to co-located for pages you need to keep if the site disappears.

## The alternatives, fairly

**[Logseq Web Clipper](https://chromewebstore.google.com/detail/logseq-web-clipper/fhjehofpeafndgabgbehflkncpmdldgg)**
(community, not by the Logseq team). A fork of the official Obsidian Web Clipper, adapted for
Logseq. It does not write files. It hands the clip to the Logseq app through Logseq's
`logseq://x-callback-url/quickCapture` link, and Logseq writes it. That gives it things a
folder clipper cannot do:

- It can append a clip to **today's journal**, which is how many Logseq users work. A folder
  clipper only makes new pages.
- No folder to pick and no permission to re-grant.
- It inherits the Obsidian clipper's highlighter and template system.

The trade-offs: the whole clip travels inside a URL, so very long pages are a weak spot for
that design. Its [GitHub repository](https://github.com/j3sch/logseq-clipper) was last updated
in December 2024, and the Chrome listing shows about 1,000 users. I have not checked whether
its capture link works with Logseq 2.0 database graphs. If you live in the journal, try it
first.

**[Obsidian Web Clipper](https://obsidian.md/clipper)** (official, for Obsidian). The most
mature clipper in this space: highlights, a large template ecosystem, and an "Interpreter"
that can fill fields using an AI model. It is built to save into Obsidian, so in a Logseq
workflow you would use its copy or save-file options and move the result yourself. If you also
use Obsidian, its templates are better than mine. The [full comparison of six
clippers](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) covers it in
more detail.

**Logseq 2.0 database graphs.** No folder-writing clipper reaches them, mine included. Your
options there are tools that talk to the Logseq app itself, or pasting Markdown in by hand.
The extension's *Copy* button puts clean Markdown on your clipboard for that.

## Where this clipper fits

Pick it for a Logseq file graph if what matters most is **what the page turns into**: code
blocks with their language, GitHub-style tables, KaTeX and MathJax math as LaTeX, footnotes,
and ChatGPT or Claude conversations as one clean file. It runs locally — no account, no
telemetry, no server between the page and your graph — and there is no URL size limit,
because it writes the file directly.

Do not pick it if you want clips in your journal, Logseq `key:: value` properties without Pro, or
images in `assets/`. Those are real gaps for Logseq users, and the tools above handle the first
two better today.

If you use Logseq and want any of those gaps closed, tell me: support@markdownwebclipper.com.
The fixed folder names are already on my list.

**Related reading:** [Best Markdown web clippers for Obsidian, compared
(2026)](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) and [a local-first
read-later setup without Pocket](https://markdownwebclipper.com/blog/pocket-alternative-markdown-obsidian).

---

Last updated 2026-11-10. Spotted a factual error? support@markdownwebclipper.com.
