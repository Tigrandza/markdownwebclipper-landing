<!-- Raw Markdown twin of /blog/logseq-web-clipper. Kept in sync manually. -->

# Logseq web clipper: how to clip web pages into your Logseq graph

Published 2026-11-10 · ~7 min read · How-to

A Logseq file graph is a folder of Markdown files. That makes it one of the easiest places to
clip into: any clipper that can write a `.md` file into a folder can put a web page into your
graph, with no plugin and no sync server. Here is how to set that up, what I found when I
tested it in Logseq, and when a different tool is the better pick.

> **Disclosure:** I build Markdown Web Clipper. It was designed around Obsidian vaults and has
> no Logseq-specific features. What follows is what happened when I pointed it at a Logseq
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
5. Untick **Include frontmatter** in the Frontmatter section (see the next section for why),
   then click **Save to vault**.
6. Switch to Logseq and search for the article title. The clip is a new page with that name.
   If search does not find it, re-index the graph from the graph menu.

From then on it is one click per page. Chrome remembers the folder. On Chrome 122 and later
the permission usually persists between sessions, though Chrome can still ask you to confirm
it again.

## Properties: YAML front matter or `key:: value`

This is the main place where an Obsidian-shaped clipper and Logseq disagree.

By default the extension starts every note with a YAML front matter block. Here is what it
wrote for the clip in the recording:

```yaml
---
title: "Markdown - Wikipedia"
source: "https://en.wikipedia.org/wiki/Markdown"
author: ''
published: ''
created: "2026-11-10"
description: ''
tags: [clippings]
---
```

Logseq OG does read YAML front matter. Each key becomes a page property, `title` sets the page
name, and `tags` become links. But three details of this output go wrong in Logseq:

- **Quotes stay in the page name.** The extension puts quotes around any value with a space or
  a hyphen, which is almost every title. Logseq keeps them, so the page is named
  `"Markdown - Wikipedia"`, quotes included.
- **Brackets stay in the tag.** `tags: [clippings]` links to a page named `[clippings]`. With
  two tags, `[clippings, databases]` gives you `[clippings` and `databases]`. Without the
  brackets, `tags: clippings, databases` works as expected.
- **Empty fields show as `''`**, for example when the page has no author.

Logseq's own syntax for page properties is `key:: value` lines at the top of the page, and that
avoids all three. Two ways to get there:

- **Free: leave the YAML out.** Untick *Include frontmatter* in the popup before you save, as
  in the recording. The note starts with the article body, and Logseq names the page after the
  file, without quotes. The tick resets each time you open the popup, so this is one extra
  click per clip. (Settings also has an "Include frontmatter by default" switch. In the current
  release the popup ignores it. A fix is merged and ships in the next release, and after that
  you can switch YAML off once.)
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

**Coming in the next release:** fixes for all three problems are merged. Values get quotes
only when YAML needs them, empty fields are left blank, and a new Settings switch,
*Logseq-compatible frontmatter*, writes tags as `tags: a, b` without brackets. I will test the
release in Logseq and update this section then. Until it reaches the Chrome Web Store, use one
of the two routes above.

That gives you real Logseq page properties, written in the format Logseq writes itself.

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

Do not pick it if you want clips in your journal, Logseq-native properties without Pro, or
images in `assets/`. Those are real gaps for Logseq users, and the tools above handle the first
two better today.

If you use Logseq and want any of those gaps closed, tell me: support@markdownwebclipper.com.
The fixed folder names are already on my list.

**Related reading:** [Best Markdown web clippers for Obsidian, compared
(2026)](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) and [a local-first
read-later setup without Pocket](https://markdownwebclipper.com/blog/pocket-alternative-markdown-obsidian).

---

Last updated 2026-11-10. Spotted a factual error? support@markdownwebclipper.com.
