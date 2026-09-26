# parthdoshi.me

Personal site of **Parth Doshi** — ECE (AI-ML) student working on the hardware side of
security: embedded & IoT devices, firmware, and the interfaces in between.

**Live:** [parthdoshi.me](https://parthdoshi.me)

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- wouter (routing)

## Develop

```bash
npm install
npm run dev      # start the dev server on :5173
npm run build    # production build
npm run preview  # preview the build
```

## Structure

```
client/
  src/
    components/   UI sections (Hero, Research, Projects, About, Contact, …)
    pages/        Home, Blog, BlogPost, ProjectPost, NotFound
    content/      Markdown for writeups and projects
    lib/          hooks + markdown helpers
```

## License

This project is **dual-licensed**:

- **Source code** — proprietary, all rights reserved. See [`LICENSE`](./LICENSE).
  You may read the code, but not reuse, redeploy, or build on it without written permission.
- **Written content** (blog posts & writeups under `client/src/content/`) — licensed under
  **CC BY-NC-ND 4.0**. See [`LICENSE-CONTENT.md`](./LICENSE-CONTENT.md). Share with credit;
  no commercial use, no derivatives.

For permissions beyond these terms: parthdoshi404@gmail.com

---

© 2026 Parth Doshi
