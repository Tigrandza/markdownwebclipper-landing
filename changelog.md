<!-- Raw Markdown twin of /changelog. Kept in sync manually. For full source history,
     see https://github.com/Tigrandza/markdown-web-clipper -->

# Changelog — Markdown Web Clipper

User-facing changes in each release. For full source history, see
https://github.com/Tigrandza/markdown-web-clipper

## 0.3.0 — June 21, 2026

- Open in Obsidian now works reliably for short clips. Previously, sending a small page (like a
  brief forum post) to Obsidian would bring the app to the front without creating a note, while
  longer pages worked fine. Every clip is now written into your vault and opened, no matter its
  length.

## 0.2.0 — June 11, 2026

- Full Page mode now captures the entire page as-is. Previously it still ran article
  extraction, so page chrome you may have wanted was stripped out.
- Selection mode now captures your selected text the instant you clip — fixing silent empty
  clips on dynamic pages that re-render when the popup opens.
- Clipping in Selection mode with nothing selected now shows a clear message instead of
  silently saving an empty file.
- New tooltips on the Auto / Full Page / Selection toggle explain what each mode captures.
- Smoother Pro checkout with proper loading feedback.
