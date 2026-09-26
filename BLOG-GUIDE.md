# Writing & editing the blog

Everything on **parthdoshi.me/blog** comes from plain Markdown files. No CMS, no database —
one file = one post.

## Where posts live

```
client/src/content/blog/*.md
```

- The **filename becomes the URL**. `esp32-uart-dump.md` → `parthdoshi.me/blog/esp32-uart-dump`.
- Use lowercase-with-hyphens filenames (no spaces).
- Posts appear on `/blog` automatically, **sorted newest-first by `date`**. You don't register them anywhere.

## The template (copy this into a new file)

```markdown
---
title: "Dumping ESP32 firmware over UART"
date: "2026-10-12"
readingTime: "7 min"
summary: "One paragraph that shows on the blog list and at the top of the post."
---

Intro paragraph here.

## A heading

Normal text with **bold**, `inline code`, and a [link](https://example.com).

- a bullet
- another bullet

```
esptool.py --port COM5 read_flash 0 0x400000 dump.bin
```

> A quote or callout.

![Caption for the photo](/firmware-dump.png)
```

> The four frontmatter fields (`title`, `date`, `readingTime`, `summary`) sit **between the two
> `---` lines**. `date` must be `YYYY-MM-DD`.

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
**or** use a full URL. (Please use your own photos/screenshots — no stock images.)

## The three actions

- **Add a post** → create a new `.md` file in `client/src/content/blog/`.
- **Edit a post** → open the file, change the text, save.
- **Delete a post** → delete the file. (The three starter posts are in there now — delete or rewrite them.)

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
`parthdoshi.me/projects/<filename>` with the same Markdown rules.
