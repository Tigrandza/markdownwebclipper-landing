<!-- Raw Markdown twin of /blog/google-docs-web-clipper. Kept in sync manually. -->

# Google Docs to Markdown: why your web clipper fails, and what works

Published 2026-08-23 · ~6 min read · Explainer

You installed a Markdown web clipper, opened a Google Doc, pressed the shortcut, and got
nothing — or a page of menu junk with none of your document in it. That is not a bug in the
clipper you picked. No clipper that reads the page can work on Google Docs. Here is why, and
the three things that do work.

> **Disclosure:** I build Markdown Web Clipper. It does not clip Google Docs either. This post
> recommends other tools, including one that does this job better than anything I ship.
> Spotted a factual error? Email support@markdownwebclipper.com and I'll correct it.

## Why your clipper fails

A web clipper works by reading the page's DOM — the tree of headings, paragraphs, lists and
tables the browser builds from the HTML. Extraction finds the article inside that tree, and
conversion turns the tree into Markdown.

In May 2021, Google [moved Docs to canvas-based
rendering](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html).
Instead of laying your document out as HTML elements, Docs now paints it into a `<canvas>`.

To an extension, your document is a picture. There is no heading element to detect, no
`<table>` to convert, no text node to read. Every clipper — mine, the official Obsidian one,
the surviving MarkDownload forks — starts by asking the page for its content, and in the Docs
editor there is nothing to ask for.

This is also why the extensions that *do* work on Docs make you sign in to Google. They are
not reading the page at all. More on that below.

**One exception worth knowing:** a document published with *File → Share → Publish to web*
gets a `/d/e/…/pub` URL that serves ordinary HTML. Clippers work normally on those.

## Option 1: no extension at all

Google added [native Markdown import and
export](https://workspaceupdates.googleblog.com/2024/07/import-and-export-markdown-in-google-docs.html)
in July 2024. Three forms, depending on what you are doing.

**One document, once.** `File → Download → Markdown (.md)`.

**Part of a document.** Select it, right-click, `Copy as Markdown`. Paste straight into your
vault. ([Google's documentation](https://support.google.com/docs/answer/12014036))

**Many documents, or scripted.** Take the document URL and swap the trailing `/edit` for
`/export?format=md`:

```
https://docs.google.com/document/d/DOCUMENT_ID/edit
https://docs.google.com/document/d/DOCUMENT_ID/export?format=md
```

Open that in a browser you are signed into and it downloads. `curl -L` works too, for
documents shared publicly.

Two traps are worth knowing before you build anything on this.

**Multiple Google accounts.** If your URL carries `/u/1/` or `/u/2/`, keep it:

```
https://docs.google.com/document/u/1/d/DOCUMENT_ID/export?format=md
```

Drop that segment and you get the wrong account's answer — usually a login page, sometimes a
permission error, occasionally nothing at all.

**Images come back as base64 blobs.** This is the one that will surprise you. Google's
Markdown export does not link images, it embeds them: a reference-style link in the body, and
a data URI at the foot of the file.

```markdown
![][image1]

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUg…>
```

I tested this on a 37-line document holding a single screenshot. The exported `.md` was
**560,603 bytes**. Obsidian renders it fine, but your vault now holds a half-megabyte text
file, your search index carries half a megabyte of base64, and git will diff the whole blob
every time you touch the note. If your documents have images in them, budget time to pull
them back out.

## Option 2: an extension that goes around the DOM

[Better Google Docs
Copy](https://chromewebstore.google.com/detail/better-google-docs-copy/faciokbjemdddkjokcajndenapikgcml)
does the thing you originally wanted: copies a Google Doc to Markdown, with images, and with
comments. It is [open source](https://github.com/shubgaur/better-google-docs-copy).

It works because it never touches the page. Its manifest asks for the `identity` permission
and host access to `www.googleapis.com` — meaning: sign in to Google, then read the document
through the Google Docs API and the comment threads through the Drive API. The text comes
from Google's servers, not from your screen. That its author had to build it this way is the
clearest confirmation of the canvas problem above.

That is the trade. A Google sign-in, in exchange for the only route into Docs content that
actually exists.

Comments are the real reason to care. Neither export route gives you comment threads — the
extension's own listing describes the alternative as copying them one at a time — so if the
discussion around a document is the part you want in your notes, this is the only tool that
gets it.

**Honest note on maturity:** it had 63 active Chrome Web Store users when I checked in August
2026, from a November 2025 launch. That is small. It is also open source, so you can read
exactly what it sends to Google before trusting it — which is more than most extensions in
this space offer.

## What you lose either way

- **Suggestions.** Suggested edits are in neither the export nor the API text. Accept or
  reject them first.
- **Exact image placement.** Wrapped and anchored images flatten into plain block images.
- **Anything that is only a picture.** Drawings and inserted equation images survive as
  images, not as structure.

## Where this clipper fits

Plainly: Markdown Web Clipper does not clip Google Docs. It reads the page, and in the Docs
editor there is no page to read.

What it is for is the other half of the same workflow — the research that ends up cited in
the doc. Articles, GitHub READMEs, Wikipedia tables with `rowspan`, KaTeX math, ChatGPT and
Claude conversations, clipped as clean Markdown straight into an Obsidian vault folder, the
clipboard, a `.md` file, or a Gist. No account, no telemetry, works offline.

Should it clip Google Docs too? The route exists, and it is simpler than the one above: a
content script running on `docs.google.com` can fetch that same `export?format=md` URL using
the session you already have — no Google sign-in, no API project, no OAuth screen — and then
run the result through the image pipeline that already localizes images, which would fix the
base64 problem outright.

I have not built it, because the numbers do not yet say anyone wants it. Every Chrome
extension I can find that moves content between Google Docs and Markdown, in either
direction, adds up to fewer than 900 users between them. The official Obsidian Web Clipper
has over 300,000.

If you are one of the people who wants it, say so: support@markdownwebclipper.com. That mail
is a better signal than any keyword tool, and it is the thing that would change my mind.

**Related reading:** [Best Markdown web clippers for Obsidian, compared
(2026)](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) — an honest
six-way comparison of the clippers that *do* read the page, including this one.

_Last updated 2026-08-23._
