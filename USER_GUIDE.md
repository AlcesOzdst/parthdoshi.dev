# 📘 User Guide: Managing Your Portfolio

This guide explains how to manage and update the content on your portfolio website.

---

## 1. Managing Projects

### Where Is the Project Data?
All project information is stored in the file:
```
projects-data.js
```

### How to Edit Projects
Open `projects-data.js` and edit the `projectsData` array. Each project has the following fields:

| Field | Description |
|-------|-------------|
| `id` | Unique identifier (lowercase, dashes). Used in URLs. |
| `title` | Project name shown on cards and detail page. |
| `tagline` | Short subtitle (e.g., "Innovation at its finest"). |
| `brief` | 2-3 sentence summary of the project. |
| `roles` | Array of roles you held (e.g., `["UI/UX Design", "Development"]`). |
| `deliverables` | Array of deliverables (e.g., `["Web App", "Design System"]`). |

### Example
```js
{
    id: 'my-new-project',
    title: 'Cool Project',
    tagline: 'Revolutionizing the industry',
    brief: 'A brief description of what this project does.',
    roles: ['Frontend Developer', 'UX Designer'],
    deliverables: ['Web App', 'Mobile App', 'Brand Guidelines']
}
```

### Adding Project Images
Currently, images are placeholders. To add real images:
1. Save your image in the root folder (e.g., `project-image-1.jpg`).
2. Reference it in your HTML or CSS where needed.

---

## 2. Managing Blogs

### Where Are Blog Posts Stored?
Blog posts are written as Markdown files located in:
```
blogs/posts/
```

### How to Write a New Blog Post
1. Create a new `.md` file in `blogs/posts/` with this naming convention:
   ```
   YYYY-MM-DD-title-slug.md
   ```
   Example: `2026-01-25-my-first-ctf-writeup.md`

2. Add frontmatter at the top of the file:
   ```md
   ---
   title: My First CTF Writeup
   date: 2026-01-25
   tags: [ctf, security, hacking]
   excerpt: A complete writeup of TryHackMe's beginner room.
   ---

   Your blog content goes here in Markdown format...
   ```

### Building the Blog Data
After adding or editing blog posts, run the build script to generate `blogs-data.json`:
```bash
node blogs/build-blogs.js
```

This generates `blogs/blogs-data.json`, which is read by the website.

---

## 3. File Structure Overview

```
parthdoshi.dev/
├── index.html           # Homepage (Work/Projects)
├── about.html           # About Me
├── skills.html          # Skills
├── certs.html           # Certifications
├── contact.html         # Contact
├── blogs.html           # Blog listing
├── project.html         # Individual project page
├── styles.css           # All styles
├── transitions.js       # Page transitions & theme toggle
├── projects.js          # Modal logic
├── projects-data.js     # ⭐ EDIT THIS for projects
├── blog.js              # Blog rendering
└── blogs/
    ├── build-blogs.js   # Build script (run after editing posts)
    ├── blogs-data.json  # Generated JSON (do not edit manually)
    └── posts/           # ⭐ ADD BLOG POSTS HERE
        └── *.md
```

---

## 4. Quick Reference

| Task | Action |
|------|--------|
| Add/Edit a Project | Edit `projects-data.js` |
| Add a Blog Post | Create a `.md` file in `blogs/posts/`, then run `node blogs/build-blogs.js` |
| Change Styles | Edit `styles.css` |
| Edit Navigation | Each HTML file has its own `<nav>` section |
| Update Theme Colors | Edit CSS variables at the top of `styles.css` |

---

## 🚀 Deployment
Push your changes to your GitHub repository. Vercel will automatically redeploy.

If you need help, feel free to reach out!
