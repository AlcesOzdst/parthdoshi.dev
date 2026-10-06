import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes, CANONICAL_HOST } from '../client/src/seo/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Extract Vite-generated asset tags (compiled CSS bundles, JS bundles, preloads) from template
const viteAssets = [];
const linkStylesheets = template.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
const linkModulePreloads = template.match(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi) || [];
const moduleScripts = template.match(/<script[^>]+(?:type=["']module["'][^>]*|src=["'][^"']*assets\/[^"']*["'])[^>]*><\/script>/gi) || [];

for (const item of [...linkStylesheets, ...linkModulePreloads, ...moduleScripts]) {
  if (!viteAssets.includes(item)) {
    viteAssets.push(item);
  }
}
const viteAssetsSnippet = viteAssets.length > 0 ? `\n  ${viteAssets.join('\n  ')}` : '';

// Import server entry
const serverEntryPath = path.join(distSsrDir, 'entry-server.js');
if (!fs.existsSync(serverEntryPath)) {
  console.error('Error: dist-ssr/entry-server.js not found. Run vite build --ssr first.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntryPath).href);

console.log('Prerendering all routes from manifest...');

for (const r of routes) {
  console.log(`Prerendering route: ${r.path}`);
  const appHtml = render(r.path);

  // Build head tags for this route
  const isArticle = r.type === 'article';
  const ogType = isArticle ? 'article' : (r.type === 'profile' ? 'profile' : 'website');
  const canonicalUrl = `${CANONICAL_HOST}${r.path === '/' ? '/' : r.path}`;

  let articleMeta = '';
  if (isArticle) {
    articleMeta = `
  <meta property="article:published_time" content="${r.datePublished || ''}" />
  <meta property="article:modified_time" content="${r.dateModified || r.datePublished || ''}" />
  <meta property="article:author" content="Parth Doshi" />
  ${(r.keywords || []).map((k) => `<meta property="article:tag" content="${k}" />`).join('\n  ')}`;
  }

  const markdownLink = (isArticle || r.type === 'project' || r.path === '/resume')
    ? `\n  <link rel="alternate" type="text/markdown" href="${r.path}.md" />`
    : '';

  const robotsTag = r.isIndexable
    ? '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />'
    : '<meta name="robots" content="noindex,nofollow" />';

  const canonicalTag = r.isIndexable
    ? `<link rel="canonical" href="${canonicalUrl}" />`
    : '';

  const headInject = `
  <title>${r.title}</title>
  <meta name="description" content="${r.description}" />
  ${canonicalTag}
  ${robotsTag}

  <!-- Open Graph -->
  <meta property="og:title" content="${r.title}" />
  <meta property="og:description" content="${r.description}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="Parth Doshi" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:image" content="${CANONICAL_HOST}${r.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${r.ogImageAlt || r.title}" />${articleMeta}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${r.title}" />
  <meta name="twitter:description" content="${r.description}" />
  <meta name="twitter:image" content="${CANONICAL_HOST}${r.ogImage}" />
  <meta name="twitter:image:alt" content="${r.ogImageAlt || r.title}" />
  <meta name="theme-color" content="#0E0A06" />
  <meta name="color-scheme" content="dark" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
  <link rel="alternate" type="application/rss+xml" title="Parth Doshi - Feed" href="/feed.xml" />${markdownLink}

  <!-- Font Preloads (Self-hosted) -->
  <link rel="preload" href="/fonts/inter-latin-variable.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />

  <!-- Structured Data Graph -->
  <script type="application/ld+json">
${JSON.stringify(r.jsonLd, null, 2)}
  </script>

  <noscript>
    <style>
      #root * {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
      }
    </style>
  </noscript>
`;

  // Replace everything between <head> and </head> that we manage, or strip old head meta and inject
  // We will replace from <title> to the end of </script> before </head>
  let html = template;

  // Replace <head> content cleanly, retaining Vite asset bundles
  html = html.replace(/<head>[\s\S]*?<\/head>/i, `<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />${headInject}${viteAssetsSnippet}\n</head>`);

  // Inject rendered React app into #root
  html = html.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${appHtml}</div>`);

  // Write destination files
  if (r.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
  } else if (r.path === '/404') {
    fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
    const folder = path.join(distDir, '404');
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'index.html'), html, 'utf8');
  } else {
    const routeRel = r.path.startsWith('/') ? r.path.slice(1) : r.path;
    const folder = path.join(distDir, routeRel);
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'index.html'), html, 'utf8');
    fs.writeFileSync(path.join(distDir, `${routeRel}.html`), html, 'utf8');
  }
}

console.log('Prerendering completed successfully for all routes.');
