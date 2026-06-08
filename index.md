<!-- Raw Markdown twin of the home page (/). Kept in sync manually. -->

# Markdown Web Clipper — one keystroke, clean Markdown

Free & MIT-licensed · Chrome · Manifest V3

Convert any webpage to high-fidelity Markdown and save it exactly where you keep your notes —
local folder, clipboard, download, Obsidian, or Gist. No cloud, no cleanup. No account, no
telemetry, works offline.

- [Add to Chrome — free](https://chromewebstore.google.com/detail/dpkinbemdemheacegfjbbkclcpbfedif)
- [View source (MIT)](https://github.com/Tigrandza/markdown-web-clipper)

## Why it's different

Readability-based clippers flatten the parts that matter. Clipper runs Defuddle for
extraction, then Turndown + GFM for conversion — locally, on the page you're looking at.

1. **Tables survive** — Wikipedia infoboxes with `rowspan`/`colspan` come through as real GFM
   tables.
2. **Math stays math** — KaTeX and MathML render to `$…$` / `$$…$$`.
3. **Code keeps its language** — fenced blocks keep their language hint and indentation.
4. **No cloud round-trip** — extraction runs in your browser on the live DOM.
5. **One keystroke** — bind a shortcut; the popup remembers your last destination and format.
6. **Frontmatter that's yours** — title, URL, date, source, tags emitted as YAML you control.

## Five destinations, zero accounts

| Destination | Works offline | Best for |
|---|---|---|
| Local folder (File System Access API) | Yes | Obsidian & Logseq vaults — direct write, no sync server |
| Clipboard | Yes | Piping into an LLM (ChatGPT, Claude, Gemini) |
| .md download | Yes | One-off saves |
| Obsidian (`obsidian://` URI) | Yes | A specific vault + folder |
| GitHub Gist (Pro) | Needs network | Shareable, versioned snippets |

Four of five destinations work with the network unplugged. Only Gist — a publishing target —
needs to reach out.

## Honest by construction

- **No analytics, no telemetry.** Clipper makes no network calls except the destination you
  choose. Verify it in the source.
- **MIT-licensed free edition.** Read it, fork it, audit what touches the page you're clipping.
- **Trade-offs in the open.** Reference vs. inline images, what each destination can and can't
  do offline — documented, not hidden behind a Pro wall.

## Pro — optional, one-time

The free edition is the whole product. Pro ($9 launch / $19 standard, one-time, lifetime) adds
GitHub Gist destination, co-located image folders, unlimited multi-tab batch, and multi-vault
routing. See [/pro-faq](https://markdownwebclipper.com/pro-faq).
