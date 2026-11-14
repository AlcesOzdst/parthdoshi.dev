# parthdoshi.me

> Personal engineering portfolio, security research publications, and interactive hardware lab showcase of **Parth Doshi** (AlcesOzdst).

[![Website](https://img.shields.io/badge/Production-parthdoshi.me-blue?style=flat-square&logo=googlechrome&logoColor=white)](https://www.parthdoshi.me)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat-square)](./LICENSE)
[![Content: CC BY-NC-ND 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--ND%204.0-lightgrey?style=flat-square)](./LICENSE-CONTENT.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## Overview

This repository hosts the personal web platform and technical research portfolio of Parth Doshi. It is engineered from scratch as a high-performance static site with full server-side prerendering, dynamic OG image generation via Satori, LLM discovery compliance (`llms.txt`), Schema.org linked data, and an interactive embedded security oscilloscope laboratory.

**Live Canonical:** [https://www.parthdoshi.me](https://www.parthdoshi.me)  
**Research Identity:** [AlcesOzdst](https://github.com/AlcesOzdst)  
**Contact:** [parth@alcesozdst.com](mailto:parth@alcesozdst.com)

---

## Core Architecture & Systems

### 1. Multi-Route Static Prerender Pipeline
- Full hydration without server overhead: routes (`/`, `/resume`, `/blog`, `/projects/*`) are prerendered into standalone HTML files at build time (`scripts/prerender.mjs`).
- Complete non-JS readability: search engine bots and text crawlers receive complete semantic HTML payloads before hydration.

### 2. Automated Edge Assets & OG Generation
- Built with **Satori** and **Resvg** (`scripts/generate-og-images.mjs`): generates programmatic, branded 1200x630 OpenGraph social previews with typography embedding for every project and blog post.
- Automated generation of `sitemap.xml`, RSS `feed.xml`, RFC 9116 `security.txt`, and `humans.txt` on every build.

### 3. AI & LLM Discovery Compliance
- Implements the `llms.txt` and `llms-full.txt` specifications (`/llms.txt`, `/llms-full.txt`), providing curated markdown mirrors of all published research, project notes, and resume credentials for AI agents and LLM scrapers.

### 4. Interactive ScopeTrace Minigame
- Interactive oscilloscope signal-decoding simulator (`client/src/components/ScopeTrace.tsx`) showcasing hardware waveform reverse engineering, frequency analysis, and logic debugging in the browser.

---

## Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Runtime & Bundler** | Node.js, Vite 7, TypeScript 5.6 |
| **Frontend Framework** | React 19, Wouter (lightweight routing) |
| **Styling & Animation** | Tailwind CSS 4, Framer Motion, Lucide Icons |
| **SSG / Prerendering** | Custom Node.js SSR prerendering engine |
| **OG Graphics Engine** | Satori (SVG generation), Resvg (PNG rasterization) |
| **Deployment** | Vercel (Edge network, automated CI deployment) |

---

## Project Structure

```text
parthdoshi.dev/
├── client/
│   ├── public/              # Static assets, favicon suite, generated mirrors (llms.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/      # UI components (Hero, Research, Projects, ScopeTrace, ResumeModal)
│   │   ├── content/         # Markdown content files for projects and blog writeups
│   │   ├── lib/             # Markdown parser, utility hooks, and animation configurations
│   │   ├── pages/           # Route views (Home, Blog, BlogPost, ProjectPost, Resume, 404)
│   │   └── seo/             # Canonical route schemas and JSON-LD structured data generators
│   └── index.html           # HTML entry shell with Schema.org graph
├── scripts/
│   ├── generate-og-images.mjs  # Satori-powered OG image generation
│   ├── generate-seo-files.mjs  # Generates sitemap, llms.txt, feed.xml, security.txt
│   ├── prerender.mjs           # Static multi-route prerender engine
│   ├── seo-audit.mjs           # Automated SEO and metadata verification gate
│   └── verify-endpoints.mjs    # Route integrity and live asset validator
└── package.json
```

---

## Security & Disclosure

If you discover a security vulnerability or misconfiguration on `parthdoshi.me` or associated subdomains, please review the security policy at [/.well-known/security.txt](https://www.parthdoshi.me/.well-known/security.txt) and disclose responsibly to:

**Security Contact:** [parth@alcesozdst.com](mailto:parth@alcesozdst.com)

---

## License

Copyright (c) 2026 Parth Doshi. All rights reserved.

- **Source Code**: All rights reserved. Unauthorized copying, modification, distribution, hosting, or deployment of this software is strictly prohibited. See [`LICENSE`](./LICENSE).
- **Written Content**: Research writeups, technical articles, and documentation under `client/src/content/` are licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](./LICENSE-CONTENT.md).

For permissions or inquiries, contact [parth@alcesozdst.com](mailto:parth@alcesozdst.com).

---

<div align="center">
  <sub>Designed &amp; engineered by Parth Doshi &bull; © 2026 All Rights Reserved</sub>
</div>
