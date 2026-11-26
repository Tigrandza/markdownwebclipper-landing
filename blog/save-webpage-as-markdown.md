<!-- Raw Markdown twin of /blog/save-webpage-as-markdown. Kept in sync manually. -->

# How to save a webpage as Markdown: 5 ways compared (2026)

Published 2026-11-18 · ~8 min read · How-to

The fastest way to save a webpage as Markdown is a browser extension: one click, and it converts the page you are looking at, after JavaScript has run. Without installing anything, a URL-to-Markdown service or a copy-paste converter works for simple pages. For many pages at once, use a command-line tool. Printing to PDF and converting is the worst option.

> **Disclosure:** I build Markdown Web Clipper, one of the tools tested here. Every result below comes from the raw files linked in each section, scored with the same regular expressions for every method. If you spot a factual error, email support@markdownwebclipper.com and I'll correct it.

## How I tested

One page, five methods: the HTML version of the paper "Attention Is All You Need" on arXiv (`https://arxiv.org/html/1706.03762v7`). It is a hard but fair test, because it has display and inline equations, tables with spanning cells, figures, footnote-style citations, and arXiv's own buttons and banners around the article. The `v7` in the address pins the paper's version, so every method saw the same content.

Each output was scored on nine checks: display equations as `$$` blocks, inline math as `$…$`, the `\sqrt{d_k}` scaling kept as LaTeX, no equation duplicated as Unicode next to its LaTeX, no raw `<math>` HTML, at least one Markdown table, images kept as links, no arXiv page clutter ("Report GitHub Issue", "Back to arXiv", the license banner), and real headings.

The extension results were captured on 2026-09-18 for the [comparison page](https://markdownwebclipper.com/compare); the other four methods were run on 2026-11-18. Both runs used Chromium 147.0.7727.15.

## The results

| Method | Tool tested | Install | Math as LaTeX | Tables | Images | No clutter | Checks passed |
|---|---|---|---|---|---|---|---|
| Browser extension | Markdown Web Clipper 0.9.1 | Once | ✓ | ✓ | ✓ | ✓ | 8/9 |
| Browser extension | Obsidian Web Clipper 1.7.1 | Once | ✓ | ✓ | ✓ | ✓ | 8/9 |
| URL service | Jina Reader | None | Display only | ✗ dropped | ✓ | ✓ | 6/9 |
| Copy-paste converter | clipboard2markdown | None | ✗ Unicode | ✓ | ✓ | ✗ | 5/9 |
| Command-line tool | MarkItDown 0.1.9 | pip | ✗ Unicode + LaTeX | ✓ | ✓ | ✗ | 5/9 |
| Print to PDF, convert | Chrome PDF → MarkItDown | None | ✗ blank | Partly | ✗ | ✗ | 3/9 |

## 1. A browser extension (fastest, best output)

An extension runs inside the page you are reading. It sees the page after JavaScript has run, picks out the article, and converts it in one click or keystroke.

- **What I got:** both extensions kept every equation as LaTeX (`\mathrm{softmax}(\frac{QK^{T}}{\sqrt{d_{k}}})V`), kept the figures, and left arXiv's buttons and banners out. Both missed one check: a results table that has cells spanning several rows and columns stays as an HTML table, and inside it some math is still raw `<math>` markup. Markdown tables cannot express spanning cells, so keeping that table as HTML is the lossless choice.
- **Good for:** everyday saving, pages that need a login, pages built with JavaScript (AI chats, web apps), and saving straight into a notes folder.
- **Limits:** you install something. It works on the page you have open, so for hundreds of URLs a script is better.
- **Which one:** the official [Obsidian Web Clipper](https://obsidian.md/clipper) is the natural pick inside Obsidian. Markdown Web Clipper (mine) also writes to any local folder, a `.md` download or a Gist, and handles ChatGPT and Claude conversations; its free version clips up to 3 tabs at once.
- Raw outputs: [Markdown Web Clipper](https://markdownwebclipper.com/compare-raw/arxiv-attention--clipper.md) · [Obsidian Web Clipper](https://markdownwebclipper.com/compare-raw/arxiv-attention--obsidian-web-clipper.md)

## 2. A URL-to-Markdown service (no install)

Services such as Jina Reader fetch the page on their servers and send back Markdown. You put their address in front of the page's: `https://r.jina.ai/https://arxiv.org/html/1706.03762v7`.

- **What I got:** clean text with no page clutter, figures kept, and the main equation kept as LaTeX. But inline math lost its `$` delimiters (`d_{k}` instead of `$d_{k}$`), so it shows as raw text, display equations were not in `$$` blocks, and the results tables were **dropped completely**: the rows of the paper's BLEU table are not in the output at all.
- **Good for:** a quick conversion from any device, and feeding a public page into an LLM or a script.
- **Limits:** the page address goes to a third party, and it only works on public pages (no logins). Check the service's current rate limits before building on it.
- Raw output: [Jina Reader](https://markdownwebclipper.com/compare-raw/arxiv-attention--jina-reader.md)

## 3. Copy and paste into a converter (no install)

Select the page, copy it, and paste it into a converter page such as [clipboard2markdown](https://euangoddard.github.io/clipboard2markdown/), which turns the rich text on your clipboard into Markdown.

- **What I got:** tables, images and headings came through. Math did not: the attention formula became `Attention⁡(Q,K,V)=softmax⁡(Q​KTdk)​V`, with the fraction and the square root gone. Because I selected the whole page, arXiv's license banner came along too.
- **Good for:** a short article or one section, when you can't install anything.
- **Limits:** what you get depends on what you select. Select only the article and the clutter goes away; the math does not come back.
- Raw output: [clipboard2markdown](https://markdownwebclipper.com/compare-raw/arxiv-attention--clipboard2markdown.md)

## 4. A command-line tool (best for batches)

Tools like Microsoft's [MarkItDown](https://github.com/microsoft/markitdown) convert files to Markdown. I downloaded the page with `curl` and ran `markitdown page.html > page.md`.

- **What I got:** tables, images and headings, but also every arXiv button and banner ("Report GitHub Issue", "Back to arXiv"), because the tool converts the whole HTML file, not just the article. Each equation came out twice, glued together: once as Unicode and once as LaTeX with escaped underscores.
- **Good for:** converting hundreds of saved pages or URLs in a script, and documents beyond web pages (Word, PDF, slides).
- **Limits:** it converts the HTML it is given and does not run JavaScript, so pages that build their content in the browser come out nearly empty. You clean up the page clutter yourself.
- Raw output: [MarkItDown](https://markdownwebclipper.com/compare-raw/arxiv-attention--markitdown.md)

## 5. Print to PDF, then convert (avoid)

Every browser can print a page to PDF, and tools such as MarkItDown can turn the PDF into Markdown.

- **What I got:** the worst result. Headings were gone, the attention formula became `Attention (𝑄,𝐾,𝑉) = softmax ( ) 𝑉` with the fraction missing, images were gone, and the toolbar text came out doubled ("RReeppoorrtt"). The results table did survive as a Markdown table, but some equations were also chopped into table cells.
- **Good for:** almost nothing, unless a PDF is the only copy you have.
- Raw output: [Chrome PDF → MarkItDown](https://markdownwebclipper.com/compare-raw/arxiv-attention--print-pdf.md)

## FAQ

**What's the fastest way to turn a webpage into Markdown?**
A browser extension. Install it once, then each page takes one click or keystroke, and you get a file without any copy-pasting.

**How do I convert a URL to Markdown without installing anything?**
Put a URL-to-Markdown service's address in front of the page address, for example `https://r.jina.ai/` plus the URL. For a short page, copying it into a converter such as clipboard2markdown also works. Both struggled with math and tables in my test.

**Which method keeps images, code, and tables intact?**
In my test, the two browser extensions: both kept images, math and tables, including a table with spanning cells kept as HTML. Every other method lost the math, and the URL service dropped the results tables.

**Can I batch-convert many pages to Markdown?**
Yes. A command-line tool such as MarkItDown handles hundreds of files in a script; expect to strip page clutter afterwards. Some extensions clip all open tabs at once; Markdown Web Clipper does up to 3 tabs on the free version and unlimited with Pro.

**Related reading:** [Save ChatGPT and Claude conversations as Markdown](https://markdownwebclipper.com/blog/export-chatgpt-claude-conversations-markdown) · [MarkDownload was removed from the Chrome Web Store — what to use instead](https://markdownwebclipper.com/blog/markdownload-alternative) · [Best Markdown web clippers for Obsidian, compared](https://markdownwebclipper.com/blog/best-markdown-web-clippers-2026) · [Clipper comparison on hard pages](https://markdownwebclipper.com/compare)

_Last updated 2026-11-18._
