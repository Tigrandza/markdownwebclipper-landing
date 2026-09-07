<!-- Raw Markdown twin of /blog/export-chatgpt-claude-conversations-markdown. Kept in sync manually. -->

# How to save and export ChatGPT and Claude conversations as Markdown (2026)

Published 2026-08-24 · ~8 min read · AI chats

To save a ChatGPT, Claude or Gemini conversation as Markdown, open the conversation and clip it with a Markdown clipper that has rules for these sites. You get one `.md` file with every turn labelled by speaker, code blocks keeping their language, tables intact and LaTeX preserved. The built-in export options give you JSON, PDF or a link instead.

*I should say up front: I built one of the tools in this article. That's a bias. It's also why the comparison below is measured rather than asserted — every number comes from a committed export file you could re-score yourself.*

## Why the built-in export options disappoint

Each of the three big chat apps gives you *something*, and none of it is a Markdown file of the conversation you're looking at:

- **A share link** puts the conversation on the vendor's server. It's a URL, not a copy. If the link is revoked or the vendor changes course, your "saved" conversation is a dead link.
- **An account data export** hands you an archive built for portability, not reading — JSON and HTML, everything at once, arriving by email. It's a backup, not a note.
- **Print to PDF** freezes the layout. Code blocks lose their language, tables become pictures of tables, and nothing is greppable or editable afterwards.

None of those is *wrong*. They're just not "one conversation, as a file, in the same format as the rest of my notes."

That's the gap. A Markdown clip closes it: plain text, on your disk, that Obsidian, Logseq, git and every LLM read natively.

## How to save a ChatGPT conversation as Markdown

1. Open the conversation you want to keep.
2. Click the clipper (or press its shortcut).
3. Pick where it goes — clipboard, download, or straight into your vault folder.

One file lands, and it looks like this — real output, not a mock-up:

````markdown
## User

I'm building a small time-series smoothing library. Start with a Python
function for a simple moving average over a list of floats.

## ChatGPT

```python
def moving_average(values: list[float], window: int) -> list[float]:
    if window <= 0:
        raise ValueError("window must be positive")
```
````

Two details in that snippet are the whole point. `## User` and `## ChatGPT` mean a Markdown outline gives you a clickable turn list. And the fence says ` ```python `, not a bare ` ``` `, so syntax highlighting survives the trip.

## How to export ChatGPT conversations without losing code, tables or math

This is where clippers differ, and where most of them quietly fail.

A serious technical conversation contains four things worth measuring: **every turn**, **who said what**, **code with its language tag**, and **tables and math that still work**. I built a benchmark around exactly that — three real conversations of 24, 24 and 26 turns, one per site, each containing Python, SQL and TypeScript, a comparison table, and both inline and display LaTeX.

Here's what a table and a formula look like after a clean clip:

```markdown
|     | Simple (SMA) | Exponential (EMA) |
| --- | --- | --- |
| **Lag** | Highest — average lag $(N-1)/2$ | Lowest for a given window |

$$
EMA_t = \alpha x_t + (1 - \alpha) EMA_{t-1}
$$
```

Still a table. Still LaTeX. Obsidian renders both.

The common failure isn't ugliness, it's **silence**. A tool that captures 5 turns of a 24-turn conversation produces a file that looks complete. You don't find out until you go looking for the answer that isn't there.

## How to download a conversation from ChatGPT when the page won't stay put

Here's the part nobody warns you about, and it's specific to ChatGPT.

ChatGPT's page **windows**. It doesn't keep the whole conversation in the browser at once — it mounts a handful of turns near your scroll position and unmounts the rest. On the 24-turn conversation I tested, **5 turns were mounted at page load and 15 at peak.** No scroll position holds all 24.

That breaks the obvious approach. A clipper that reads the page in one pass gets whatever happened to be mounted at that instant, writes a tidy file, and reports success.

I know because it happened to me. The first run of my own benchmark produced 6 headings covering the last 3 exchanges of 24 — and my clipper reported success. Fixing it took three separate changes: a rotted container selector that made the scroll capture a silent no-op, then an accumulator that clones each turn the first time it's seen and re-inserts the missing ones in order, then a fix for the model's own `##` headings colliding with the turn headings.

The general lesson, if you're picking a tool: **on ChatGPT, count the turns in your first export.** If the number is small and round, you're looking at a window, not a conversation.

Claude and Gemini don't window this way. A tool can fail on ChatGPT and be perfectly fine on the other two — and in my results, two of them are exactly that.

## How to print a ChatGPT conversation (and when Markdown is better)

Print-to-PDF still has real uses: a signature, an attachment, a record that must not be edited. `Cmd/Ctrl + P` from the conversation page gets you there.

Markdown is the better default for everything else:

| | Print to PDF | Markdown clip |
|---|---|---|
| Searchable in your notes app | ✗ | ✓ |
| Editable and annotatable | ✗ | ✓ |
| Code keeps its language | ✗ | ✓ |
| Tables stay tables | picture of a table | real table |
| Math stays math | frozen image | LaTeX Obsidian renders |
| Feed back to an LLM | costly, lossy | native, cheap |
| Diffable in git | ✗ | ✓ |

That last row is underrated. A conversation saved as Markdown can be version-controlled, and two of them can be diffed.

## What I measured, including where I don't win

On 2026-08-24 I ran five Chrome extensions against the same three conversations, in a clean, never-signed-in Chrome profile, each from a fresh tab with no manual scrolling, using each tool's own default export button with no settings changed. Every export is a committed file.

**Turn counts:**

| Tool | ChatGPT (of 24) | Claude (of 24) | Gemini (of 26) |
|---|---|---|---|
| Markdown Web Clipper | **24** | **24** | **26** |
| AI Exporter | **24** | not run | **26** |
| Obsidian Web Clipper | 5 | **24** | 26 † |
| Web2MD | 5 | **24** | 13 ‡ |
| Claude Chat Extractor | n/a | 12 | n/a |
| Echoes | not run | not run | not run |

† Complete text, but with **no speaker labels at all** — you can't tell who said what.
‡ Every prompt kept, every answer dropped. The file is 1,795 bytes; mine is 40,367.

Now the parts that don't flatter me, because a comparison that only flatters its author isn't worth reading:

- **On Claude, I tie.** Obsidian Web Clipper gets all 24 turns with speakers, code, tables and math intact — same as mine. On code fences it's a three-way tie: Obsidian, Web2MD and mine each produce 12 fences, all 12 tagged, with the identical language mix. I have no edge there and I'm not going to pretend otherwise.
- **AI Exporter matches me on ChatGPT and Gemini.** It gets 24 of 24 and 26 of 26. It reaches them a different way — it reads the vendors' own conversation APIs instead of the page. That's a legitimate design with a different trade-off, not a trick. It's also why it refuses ChatGPT's windowing without breaking a sweat, *and* why it won't export a Claude share link at all: a visitor to a shared page can't query that API.
- **Two tools I couldn't measure.** Echoes requires an account sign-in before it will export, so I stopped rather than create one — that's a fact about what it requires, not a verdict on its output, and I won't score it. AI Exporter can't run on Claude share links, as above.

So the claim I'll actually defend is narrow: **mine is the only one of these that gets a complete, faithful conversation out of all three sites by reading the page — no account, no private API, no server.** Not "beats everything."

## What the failures actually look like

Ranked by how much it would cost you, not by how bad it sounds:

- **Half the conversation, silently.** Web2MD drops every Gemini *answer*; Claude Chat Extractor drops every *prompt*. Both files open fine.
- **Truncated to the visible window.** Web2MD and Obsidian both took 5 of 24 turns on ChatGPT.
- **No speaker labels.** Obsidian's Gemini export has the full text with nothing marking who spoke — the same tool labels speakers correctly on Claude, so it's site-specific.
- **Math corrupted rather than stripped.** Two tools capture the rendered symbols *and* the LaTeX source and concatenate them, so you get `lags k=0,1,…,N−1k = 0, 1, \dots, N-1` with unclosed `$` delimiters. Worse than losing it — you can't fix it by hand at scale.
- **A wrong language tag.** Obsidian tags all 12 Gemini fences `markdown`, including the Python and SQL ones. A wrong tag is worse than a missing one: it silently mis-highlights.
- **UI junk in your notes.** AI Exporter's Gemini export carries 38 raw `<Elicitation…>` component tags — Gemini's follow-up-suggestion widget, written into the file as literal markup.

One detail I found genuinely interesting: Web2MD and Obsidian Web Clipper lose ChatGPT's math at the *identical two places* in the conversation. Two independently built tools failing in the same spots isn't coincidence — it's ChatGPT rendering math in markup that neither tool hooks.

## Save it once, then actually use it

The reason I want conversations as files isn't nostalgia for folders. It's that Markdown is the most token-efficient faithful format you can hand back to a model.

A saved conversation in your vault can be pasted into a fresh chat as context, quoted precisely, searched across months of sessions, or diffed against a later attempt at the same problem. A share link can do none of that, and a PDF makes the model work harder to read a worse copy of the same words.

## FAQ

**Does this work on my own conversation, or only on shared links?**
The published measurements above were all run against public share links, so that's what's proven. Clipping the conversation page you're signed in to uses the same site rules.

**Which sites are supported?**
chatgpt.com, claude.ai and gemini.google.com have dedicated rules. Other chat sites clip with the general-purpose path, which won't add per-turn speaker headings.

**Does my conversation get uploaded anywhere?**
No. Conversion happens locally in your browser and the file is written to your disk. No account, no server, no analytics in the extension.

**Will it keep code blocks and their language?**
Yes, where the page exposes the language. One honest caveat: chatgpt.com doesn't expose a machine-readable language hint for every block, so a block that's untagged on the page stays untagged in the file. Some tools guess a language there — I'd rather leave it blank than invent one.

**How do I check a tool is really capturing everything?**
Count the turns on the page, then count the `##` headings in the file. If a tool doesn't mark turns, that's your answer already.

**Is it free?**
The core is free forever and MIT-licensed. There's an optional one-time Pro purchase for power features; nothing in this article needs it.

---

*Tigran Davtyan builds [Markdown Web Clipper](https://github.com/Tigrandza/markdown-web-clipper), a free, open-source Chrome extension that converts web pages to clean Markdown. Benchmark run 2026-08-24 against tool versions Web2MD 1.8.3, AI Exporter 4.4.1, Echoes 8.3.1, Claude Chat Extractor 1.0.0, Obsidian Web Clipper 1.7.1; these ship weekly, so results may differ on a later version.*
