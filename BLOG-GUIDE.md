# Writing & editing the blog

Everything on **parthdoshi.me/blog** comes from plain Markdown files. No CMS, no database -
one file = one post.

## Where posts live

```
client/src/content/blog/*.md
```

- The **filename becomes the URL**. `esp32-uart-dump.md` → `parthdoshi.me/blog/esp32-uart-dump`.
- Use lowercase-with-hyphens filenames (no spaces).
- Posts appear on `/blog` automatically, **sorted newest-first by `date`**. You don't register them anywhere.
- Canonical template lives at `client/src/content/_templates/post.md`.

## Frontmatter Schema

Every post requires structured frontmatter between opening and closing `---` markers:

```markdown
---
title: "Dumping ESP32 Firmware Over UART"
description: "Step-by-step flash extraction of an ESP32 chip over UART using esptool, logic analyzers, and Ghidra disassembly."
date: "2026-10-12"
updated: "2026-10-14"
readingTime: "7 min"
summary: "One paragraph that shows on the blog list and at the top of the post."
tags: ["ESP32", "Hardware Security", "Firmware Extraction"]
ogImage: "/og/blog-esp32-uart.png"
draft: false
canonicalUrl: ""
---
```

## SEO & Generative Search Checklist Per Post

Before pushing any new writeup, run through this verification checklist:

1. **Title Length & Keywords:** 50-60 characters total. Place the primary topic keyword up front (e.g., `ESP32 Flash Extraction over UART | Parth Doshi`).
2. **Meta Description:** 120-160 characters. Factual, concise summary stating what hardware or vulnerability was examined.
3. **Headings Structure:** Exactly one `# <Title>` (H1) at the top of the Markdown body. Use descriptive `##` (H2) and `###` (H3) headings for distinct technical phases.
4. **Image Alt Text:** Provide descriptive `alt` captions for every screenshot, waveform, or schematic (`![UART wiring pinout on logic analyzer](/uart-pinout.png)`).
5. **Internal Linking:** Include at least 2 internal links connecting to related projects (`/projects/ddos-toolkit`), other field notes, or `/resume`.
6. **Freshness Tracking:** Add an `updated: "YYYY-MM-DD"` date whenever modifying an existing post so search engines detect the revision.
7. **Cross-Posting Canonical:** When cross-posting to platforms like Medium, Hashnode, or dev.to, always set `canonical_url: https://www.parthdoshi.me/blog/<slug>` on the external platform pointing back to this site.
8. **Draft Guard:** Set `draft: true` while drafting. The build system automatically excludes draft posts from sitemaps, feeds, and LLM text files.

## What Markdown is supported

| You write | You get |
|---|---|
| `# / ## / ###` | headings |
| `**bold**` | bold |
| `` `code` `` | inline code |
| `[text](url)` | link (opens in new tab) |
| ` ```lang … ``` ` | code block (optional language label) |
| `> quote` | callout / blockquote |
| `- item` or `* item` | bullet list |
| `![alt](url)` | image with caption |
| `---` | horizontal divider |
| blank line | new paragraph |

## Adding an image

Put the file in `client/public/` (e.g. `client/public/dump.png`) and reference it as `/dump.png`,
**or** use a full URL. (Please use your own photos/screenshots - no stock images.)

## The three actions

- **Add a post** → create a new `.md` file in `client/src/content/blog/`.
- **Edit a post** → open the file, change the text, save.
- **Delete a post** → delete the file.

## Making it live

Changes only go live after you push to `main` (the host auto-deploys):

```bash
git add client/src/content/blog
git commit -m "post: <title>"
git push origin main
```

Give it ~1 minute, then hard-refresh the site.

## Preview locally first (optional)

```bash
npm run dev      # open http://localhost:5173/blog
```

---

**Projects work the same way:** files in `client/src/content/projects/*.md` become
`parthdoshi.me/projects/<filename>` with the same Markdown rules and template at `client/src/content/_templates/project.md`.
