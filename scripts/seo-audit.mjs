import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, CANONICAL_HOST } from '../client/src/seo/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

let errors = [];
let warnings = [];

function check(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`  [FAIL] ${message}`);
  } else {
    console.log(`  [PASS] ${message}`);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
    console.warn(`  [WARN] ${message}`);
  }
}

console.log('--- RUNNING SEO AUDIT GATE ---');

// 1. Verify all routes have built HTML files
console.log('\n[Check 1: Prerendered HTML existence & structure]');
const seenTitles = new Set();
const seenDescriptions = new Set();

for (const r of routes) {
  const filePath = r.path === '/'
    ? path.join(distDir, 'index.html')
    : (r.path === '/404' ? path.join(distDir, '404.html') : path.join(distDir, `${r.path.slice(1)}/index.html`));

  check(fs.existsSync(filePath), `HTML file exists for route ${r.path} (${path.relative(distDir, filePath)})`);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');

  // Title checks
  const titleMatches = html.match(/<title>([^<]*)<\/title>/gi) || [];
  check(titleMatches.length === 1, `${r.path} has exactly one <title> tag`);
  const titleText = titleMatches[0] ? titleMatches[0].replace(/<\/?title>/gi, '').trim() : '';
  check(titleText.length <= 65, `${r.path} <title> length <= 65 chars (actual: ${titleText.length} chars)`);
  check(!seenTitles.has(titleText), `${r.path} <title> is unique across routes ("${titleText}")`);
  seenTitles.add(titleText);

  // Description checks
  const descMatches = [...html.matchAll(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/gi)];
  check(descMatches.length === 1, `${r.path} has exactly one meta description`);
  const descText = descMatches[0] ? descMatches[0][1].trim() : '';
  check(descText.length >= 70 && descText.length <= 165, `${r.path} description length between 70 and 165 chars (actual: ${descText.length} chars)`);
  check(!seenDescriptions.has(descText), `${r.path} meta description is unique across routes`);
  seenDescriptions.add(descText);

  // Canonical checks
  if (r.isIndexable) {
    const canonicalMatches = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/gi)];
    check(canonicalMatches.length === 1, `${r.path} has exactly one canonical tag`);
    const expectedCanonical = `${CANONICAL_HOST}${r.path === '/' ? '/' : r.path}`;
    const actualCanonical = canonicalMatches[0] ? canonicalMatches[0][1] : '';
    check(actualCanonical === expectedCanonical, `${r.path} canonical matches ${expectedCanonical} (got ${actualCanonical})`);
  }

  // Heading checks (exactly one <h1>)
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  check(h1Matches.length === 1, `${r.path} has exactly one <h1> tag`);

  // OG Image exists
  const ogImgMatches = [...html.matchAll(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/gi)];
  check(ogImgMatches.length === 1, `${r.path} has an og:image tag`);
  if (ogImgMatches[0]) {
    const ogImgUrl = ogImgMatches[0][1].replace(CANONICAL_HOST, '');
    const localOgFile = path.join(distDir, ogImgUrl.startsWith('/') ? ogImgUrl.slice(1) : ogImgUrl);
    check(fs.existsSync(localOgFile), `${r.path} og:image file exists in dist/ (${ogImgUrl})`);
  }

  // Twitter card
  check(/<meta\s+name=["']twitter:card["']\s+content=["']summary_large_image["']/i.test(html), `${r.path} has twitter:card=summary_large_image`);

  // JSON-LD validation
  const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  check(!!jsonLdMatch, `${r.path} has JSON-LD script block`);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      check(typeof parsed === 'object' && parsed !== null, `${r.path} JSON-LD is valid parseable JSON`);
    } catch (e) {
      check(false, `${r.path} JSON-LD parsing failed: ${e.message}`);
    }
  }

  // No-JS content readability
  const rootIndex = html.indexOf('id="root"');
  let rootHtml = '';
  if (rootIndex > -1) {
    const startTagEnd = html.indexOf('>', rootIndex);
    const bodyEnd = html.indexOf('</body>', startTagEnd);
    if (startTagEnd > -1 && bodyEnd > -1) {
      rootHtml = html.slice(startTagEnd + 1, bodyEnd).trim();
      // Remove trailing script tag if present
      rootHtml = rootHtml.replace(/<script[\s\S]*?<\/script>/gi, '').trim();
    }
  }
  check(rootHtml.length > 500, `${r.path} #root contains prerendered non-JS HTML (size: ${rootHtml.length} bytes)`);

  const rootText = rootHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = rootText.split(' ').filter(Boolean).length;
  check(words >= 25, `${r.path} contains readable body text without JS (${words} words)`);
}

// 2. Validate Sitemap.xml
console.log('\n[Check 2: Sitemap validation]');
const sitemapPath = path.join(distDir, 'sitemap.xml');
check(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const lastmodMatches = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);

  check(locMatches.length > 0, `sitemap contains URLs (total: ${locMatches.length})`);
  const uniqueLocs = new Set(locMatches);
  check(uniqueLocs.size === locMatches.length, 'sitemap contains no duplicate URLs');

  // Verify each sitemap URL corresponds to a real file in dist
  for (const loc of locMatches) {
    const rel = loc.replace(CANONICAL_HOST, '');
    const isPdf = rel.endsWith('.pdf');
    const localTarget = isPdf
      ? path.join(distDir, rel.slice(1))
      : (rel === '/' ? path.join(distDir, 'index.html') : path.join(distDir, `${rel.slice(1)}/index.html`));
    check(fs.existsSync(localTarget), `sitemap URL target exists: ${loc} -> ${path.relative(distDir, localTarget)}`);
  }

  // Verify dates
  const validIsoDates = lastmodMatches.every(d => /^\d{4}-\d{2}-\d{2}/.test(d) && !isNaN(new Date(d).getTime()));
  check(validIsoDates, 'all sitemap lastmod entries are valid ISO dates');
  const uniqueDates = new Set(lastmodMatches);
  check(uniqueDates.size > 1, `sitemap dates are not all identical (found ${uniqueDates.size} distinct dates)`);
}

// 3. Check for broken internal links in HTML
console.log('\n[Check 3: Internal link integrity]');
const htmlFiles = [
  path.join(distDir, 'index.html'),
  path.join(distDir, 'resume/index.html'),
  path.join(distDir, 'blog/index.html'),
  path.join(distDir, 'blog/building-in-public/index.html'),
  path.join(distDir, 'projects/ddos-toolkit/index.html'),
];

for (const f of htmlFiles) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  // Check <link href="..."> tags
  const linkHrefs = [...content.matchAll(/<link[^>]+href=["'](\/[^"']*)["']/g)].map(m => m[1]);
  for (const href of linkHrefs) {
    // Ignore pure fragments or empty
    if (href.startsWith('#')) continue;
    const cleanHref = href.split('?')[0].split('#')[0];
    const targetFile = cleanHref === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref);
    const altTarget = path.join(distDir, cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref, 'index.html');
    const exists = fs.existsSync(targetFile) || fs.existsSync(altTarget);
    check(exists, `<link href="${href}"> in ${path.basename(path.dirname(f)) || 'root'} resolves locally`);
  }
}

// 4. Validate llms.txt and llms-full.txt
console.log('\n[Check 4: llms.txt & llms-full.txt compliance]');
const llmsPath = path.join(distDir, 'llms.txt');
check(fs.existsSync(llmsPath), 'dist/llms.txt exists');
if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, 'utf8');
  const lines = llmsContent.split('\n');
  check(lines[0].startsWith('# '), 'llms.txt starts with H1 title');
  check(lines.some(l => l.startsWith('> ')), 'llms.txt contains blockquote summary');

  // Verify NO phone numbers
  const phonePattern = /(\+?91|0)?[ -]?[6-9]\d{9}/g;
  check(!phonePattern.test(llmsContent), 'llms.txt does NOT contain any phone numbers');

  // Verify internal markdown links exist in dist
  const mdLinks = [...llmsContent.matchAll(/\((https:\/\/www\.parthdoshi\.me\/[^)]+)\)/g)].map(m => m[1]);
  for (const link of mdLinks) {
    const rel = link.replace(CANONICAL_HOST, '');
    const cleanRel = rel === '/' ? '/index.html' : rel;
    const target = path.join(distDir, cleanRel.startsWith('/') ? cleanRel.slice(1) : cleanRel);
    const altTarget = path.join(distDir, cleanRel.startsWith('/') ? cleanRel.slice(1) : cleanRel, 'index.html');
    check(fs.existsSync(target) || fs.existsSync(altTarget), `llms.txt link target exists: ${link}`);
  }
}

const llmsFullPath = path.join(distDir, 'llms-full.txt');
check(fs.existsSync(llmsFullPath), 'dist/llms-full.txt exists');
if (fs.existsSync(llmsFullPath)) {
  const fullContent = fs.readFileSync(llmsFullPath, 'utf8');
  const phonePattern = /(\+?91|0)?[ -]?[6-9]\d{9}/g;
  check(!phonePattern.test(fullContent), 'llms-full.txt does NOT contain any phone numbers');
}

// 5. Validate 404.html
console.log('\n[Check 5: 404 page & noindex]');
const notFoundPath = path.join(distDir, '404.html');
check(fs.existsSync(notFoundPath), 'dist/404.html exists');
if (fs.existsSync(notFoundPath)) {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
  check(/<meta\s+name=["']robots["']\s+content=["']noindex/i.test(notFoundHtml), '404.html has meta name="robots" content="noindex"');
}

// 6. Validate security.txt
console.log('\n[Check 6: security.txt RFC 9116 validity]');
const secPath = path.join(distDir, '.well-known/security.txt');
check(fs.existsSync(secPath), 'dist/.well-known/security.txt exists');
if (fs.existsSync(secPath)) {
  const secContent = fs.readFileSync(secPath, 'utf8');
  const expMatch = secContent.match(/^Expires:\s*(.+)$/m);
  check(!!expMatch, 'security.txt contains Expires field');
  if (expMatch) {
    const expDate = new Date(expMatch[1].trim());
    const now = new Date();
    check(expDate > now, 'security.txt Expires date is in the future');
    const daysRemaining = (expDate - now) / (1000 * 60 * 60 * 24);
    warn(daysRemaining > 60, `security.txt has ${Math.round(daysRemaining)} days remaining (> 60 days)`);
  }
}

console.log('\n========================================');
if (errors.length > 0) {
  console.error(`AUDIT FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`ALL AUDIT CHECKS PASSED SUCCESSFULLY! (${warnings.length} warning(s))`);
  process.exit(0);
}
