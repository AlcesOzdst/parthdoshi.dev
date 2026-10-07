import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { routes, CANONICAL_HOST } from '../client/src/seo/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'client/public');

fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(path.join(distDir, '.well-known'), { recursive: true });
fs.mkdirSync(path.join(publicDir, '.well-known'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'blog'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'projects'), { recursive: true });

function getGitDate(relPath) {
  try {
    const out = execSync(`git log -1 --format="%cI" -- "${relPath}"`, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out;
  } catch {}
  return null;
}

// 1. Generate sitemap.xml
console.log('Generating sitemap.xml...');
const sitemapEntries = [];

for (const r of routes) {
  if (!r.isIndexable) continue;

  let lastmod = r.dateModified;
  if (r.markdownPath) {
    const gitDate = getGitDate(r.markdownPath);
    if (gitDate) lastmod = gitDate;
  } else if (r.path === '/') {
    const gitDate = getGitDate('client/src/pages/Home.tsx');
    if (gitDate) lastmod = gitDate;
  } else if (r.path === '/resume') {
    const gitDate = getGitDate('client/src/pages/Resume.tsx');
    if (gitDate) lastmod = gitDate;
  } else if (r.path === '/blog') {
    const gitDate = getGitDate('client/src/pages/Blog.tsx');
    if (gitDate) lastmod = gitDate;
  }

  // Format to YYYY-MM-DD
  const formattedDate = lastmod ? lastmod.split('T')[0] : '2026-10-02';

  sitemapEntries.push({
    loc: `${CANONICAL_HOST}${r.path === '/' ? '/' : r.path}`,
    lastmod: formattedDate,
  });
}

// Add Resume PDF
const pdfGitDate = getGitDate('client/public/Parth_Doshi_Resume.pdf') || '2026-09-28';
sitemapEntries.push({
  loc: `${CANONICAL_HOST}/Parth_Doshi_Resume.pdf`,
  lastmod: pdfGitDate.split('T')[0],
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
console.log(`Saved sitemap.xml with ${sitemapEntries.length} canonical URLs.`);

// 2. Generate llms.txt (llmstxt.org specification)
console.log('Generating llms.txt...');
const llmsTxt = `# Parth Doshi
> Pune-based third-year ECE (AI-ML) student at MIT-WPU researching embedded systems security, firmware reverse engineering, hardware interfaces, and responsible disclosures.

Parth Doshi (online alias AlcesOzdst) is a security researcher focusing on hardware interfaces (UART, SPI, I2C), firmware extraction and analysis (Binwalk, Ghidra), bare-metal microcontroller programming (C8051, ESP32), and vulnerability assessments. President of Hack-X (MIT-WPU cybersecurity club) and active researcher on Hack The Box and public disclosure programs.

## Core pages
- [Home](${CANONICAL_HOST}/): Portfolio, active research areas, selected builds, and hardware workbench notes
- [Resume](${CANONICAL_HOST}/resume): Curriculum vitae, education, experience, technical skills, and credentials
- [Resume PDF](${CANONICAL_HOST}/Parth_Doshi_Resume.pdf): Direct downloadable PDF resume
- [The Log](${CANONICAL_HOST}/blog): Hardware security writeups, firmware teardowns, and research field notes

## Projects
- [DDoS Volumetric Simulation Toolkit](${CANONICAL_HOST}/projects/ddos-toolkit.md): Python asyncio SYN Flood, UDP Amplification, and HTTP GET simulator
- [Project Omnis: AI Threat Prediction](${CANONICAL_HOST}/projects/project-omnis.md): Unsupervised log anomaly prediction using Isolation Forests and autoencoders (SIH 2025 finalist)
- [Suricata IDS Deployment on ARM](${CANONICAL_HOST}/projects/suricata-ids.md): Raspberry Pi 5 edge network intrusion detection with custom inspection rules
- [Autonomous Thermal Response Array](${CANONICAL_HOST}/projects/thermal-response.md): ESP32 autonomous fire suppression triggered by MLX90640 thermal imaging and MQ-2 gas telemetry
- [IoT Home Automation Node](${CANONICAL_HOST}/projects/home-automation.md): ESP8266 NodeMCU appliance control over Blynk Cloud
- [Acoustic Noise Level Indicator](${CANONICAL_HOST}/projects/noise-indicator.md): Analog comparator-based 5-band sound pressure visualizer simulated in NI Multisim

## Writing
- [Building in Public](${CANONICAL_HOST}/blog/building-in-public.md): Hardware security methodology, UART flash extraction, and responsible disclosures

## Profiles
- [GitHub](https://github.com/AlcesOzdst): Security tools, firmware code, and repositories (@AlcesOzdst)
- [LinkedIn](https://linkedin.com/in/parthdoshi404): Professional profile and academic updates (parthdoshi404)
- [Hack The Box](https://profile.hackthebox.com/profile/019c59d7-edfc-7172-b666-bedfbe635e49): CTF and offensive security labs (@AlcesOzdst)
- [Google Developer](https://g.dev/Alcesozdst): Developer profile and verified badges (Alcesozdst)

## Optional
- [Full content in one file](${CANONICAL_HOST}/llms-full.txt): Complete concatenated text representation of all site content for generative answer engines
`;

fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
console.log('Saved standard llms.txt.');

// 3. Generate Markdown Mirrors
console.log('Generating markdown mirrors...');
// Resume markdown mirror
const resumeMd = `# Parth Doshi - Curriculum Vitae
Source: ${CANONICAL_HOST}/resume
Contact: parthdoshi404@gmail.com
Profiles: https://github.com/AlcesOzdst | https://linkedin.com/in/parthdoshi404 | https://alcesozdst.com
Location: Pune, Maharashtra, India

## Summary
I am an ethical hacker and red teamer fueled by a relentless drive to explore, understand, and secure the digital world. With experience across penetration testing, IoT security, and CTF player, I approach every challenge with a mindset rooted in creativity, logic, and precision. My journey through Hack-X Club and ParamSafe has taught me to transform vulnerabilities into opportunities for learning and defense.

## Work Experience
- Robotics & Innovation Intern (Jan 2025 - May 2025)
  - Worked as a Robotics and Innovation Intern, contributing to the design and development of automation-driven systems and IoT-based solutions.
  - Gained hands-on experience in integrating hardware with software to improve system efficiency, reliability, and security.

## Projects
- Lightweight IDS using Suricata and Raspberry Pi 5
  - Built a custom Intrusion Detection System on Raspberry Pi 5 using Suricata, focusing on lightweight deployment and real-time packet analysis.
  - Strengthened understanding of network forensics, rule creation, and traffic-based threat detection.
- DDoS Simulator
  - Designed a Python-based DDoS simulation system to evaluate and improve Suricata IDS detection efficiency in controlled environments.
  - Simulated high-volume traffic scenarios to analyze response thresholds, tune rule sets, and strengthen network resilience across IoT and embedded devices.

## Education
- 2025 - 2028: B.Tech ECE [AI-ML] MIT- World Peace University
- 2022 - 2025: Int. B.Tech ECE [AI-ML] MIT- World Peace University (GPA: 8.06/10.00)
- 2022: Class 10th Some Board (79%)

## Technical Skills
- Programming Languages: C, Python, Bash
- Web Technologies: HTML, JavaScript, API
- Offensive Tools: Burp Suite, Metasploit, Nmap, Hydra, sqlmap, dirsearch, John the Ripper, Aircrack-ng
- Defensive Tools: Suricata, Wireshark, Snort
- IoT/Hardware: Raspberry Pi, Arduino, ESP8266, Sensor Integration, Network Device Monitoring
- Platforms & Environments: Linux (Ubuntu, Kali), Windows, Docker, VirtualBox, Raspberry Pi OS
- Soft Skills: Problem Solving, Team Collaboration, Technical Writing, Leadership (Hack-X Club), Mentorship, Continuous Learning

## Online Courses
- APISec University: API Security Fundamentals (June 2024)
- Google Cloud: Build a Secure Google Cloud Network (Sept 2024)

## Others
- Hobbies: Sketching, Cooking
- Languages: English, Hindi, Gujarati

## Declaration
I hereby declare that all the details provided above are true to the best of my knowledge and belief.
Location: Pune, Maharashtra (India)
(Parth Santosh Doshi)
`;

fs.writeFileSync(path.join(distDir, 'resume.md'), resumeMd);
fs.writeFileSync(path.join(publicDir, 'resume.md'), resumeMd);

// Project and Blog markdown mirrors
for (const r of routes) {
  if (!r.markdownPath || !fs.existsSync(path.join(rootDir, r.markdownPath))) continue;

  const raw = fs.readFileSync(path.join(rootDir, r.markdownPath), 'utf8');
  // Strip frontmatter
  const body = raw.replace(/^---[\s\S]*?---\n/, '').trim();
  const mirrorContent = `# ${r.title.split('|')[0].trim()}
Source: ${CANONICAL_HOST}${r.path}
Date: ${r.datePublished || r.dateModified || '2026-09-30'}
Author: Parth Doshi (${CANONICAL_HOST}/#person)

${body}
`;

  const destRel = r.path.startsWith('/') ? r.path.slice(1) : r.path;
  const distFile = path.join(distDir, `${destRel}.md`);
  const publicFile = path.join(publicDir, `${destRel}.md`);

  fs.mkdirSync(path.dirname(distFile), { recursive: true });
  fs.mkdirSync(path.dirname(publicFile), { recursive: true });
  fs.writeFileSync(distFile, mirrorContent);
  fs.writeFileSync(publicFile, mirrorContent);
  console.log(`Generated mirror: ${destRel}.md`);
}

// 4. Generate llms-full.txt
console.log('Generating llms-full.txt...');
let llmsFull = `# Parth Doshi - Complete Security Research & Portfolio Knowledge Base
Source: ${CANONICAL_HOST}/
Contact: parthdoshi404@gmail.com
Location: Pune, Maharashtra, India
Disambiguation: Parth Doshi (alias AlcesOzdst), third-year ECE (AI-ML) student at MIT-WPU Pune. Focuses on embedded systems, IoT security, firmware reverse engineering, and bare-metal programming.

---

# SECTION 1: IDENTITY & CORE FOCUS
Source: ${CANONICAL_HOST}/

Focus Areas:
1. Firmware & Reverse Engineering: Firmware extraction over UART and SPI, static analysis, partition extraction with Binwalk, decompilation with Ghidra.
2. Embedded & IoT Security: Device-to-cloud attack surfaces including MQTT, TLS, OTA updates, and credential storage in lab testbenches.
3. Hardware Interfaces: Physical probing of UART, SPI, I2C buses with logic analyzers and oscilloscopes.
4. Bare-Metal Architecture: Register-level C development on microcontrollers like Silicon Labs C8051F340 and ESP32.

---

# SECTION 2: RESUME & BACKGROUND
Source: ${CANONICAL_HOST}/resume

${resumeMd}

---

# SECTION 3: WRITING & FIELD NOTES
Source: ${CANONICAL_HOST}/blog/building-in-public

${fs.readFileSync(path.join(distDir, 'blog/building-in-public.md'), 'utf8')}

---

# SECTION 4: PROJECTS & RESEARCH BUILDS
`;

const projectSlugs = [
  'ddos-toolkit',
  'project-omnis',
  'suricata-ids',
  'thermal-response',
  'home-automation',
  'noise-indicator',
];

for (const slug of projectSlugs) {
  const pPath = path.join(distDir, `projects/${slug}.md`);
  if (fs.existsSync(pPath)) {
    llmsFull += `\n---\n\n# PROJECT: ${slug}\nSource: ${CANONICAL_HOST}/projects/${slug}\n\n${fs.readFileSync(pPath, 'utf8')}\n`;
  }
}

fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFull);
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull);
console.log(`Saved llms-full.txt (${Math.round(llmsFull.length / 1024)} KB).`);

// 5. Generate feed.xml (RSS 2.0 with Atom namespace)
console.log('Generating feed.xml...');
const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Parth Doshi - Hardware Security &amp; Firmware Field Notes</title>
    <link>${CANONICAL_HOST}/blog</link>
    <description>Technical field notes and research writeups on firmware extraction, logic analyzer traces, and responsible vulnerability disclosures.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${CANONICAL_HOST}/feed.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Building in Public: Hardware Security &amp; Firmware Field Notes</title>
      <link>${CANONICAL_HOST}/blog/building-in-public</link>
      <guid isPermaLink="true">${CANONICAL_HOST}/blog/building-in-public</guid>
      <pubDate>Wed, 30 Sep 2026 00:00:00 GMT</pubDate>
      <description>Why I document my research in public: from raw UART flash extraction and logic analyzer captures to responsible vulnerability disclosures.</description>
      <author>parthdoshi404@gmail.com (Parth Doshi)</author>
    </item>
  </channel>
</rss>
`;

fs.writeFileSync(path.join(distDir, 'feed.xml'), feedXml);
fs.writeFileSync(path.join(publicDir, 'feed.xml'), feedXml);
console.log('Saved feed.xml.');

// 6. Generate .well-known/security.txt (RFC 9116)
console.log('Generating security.txt...');
const expiryDate = new Date();
expiryDate.setFullYear(expiryDate.getFullYear() + 1);
const expiryIso = expiryDate.toISOString();

const securityTxt = `Contact: mailto:parthdoshi404@gmail.com
Expires: ${expiryIso}
Preferred-Languages: en
Canonical: ${CANONICAL_HOST}/.well-known/security.txt
Policy: https://www.parthdoshi.me/blog/building-in-public
Hiring: https://www.parthdoshi.me/resume
`;

fs.writeFileSync(path.join(distDir, '.well-known/security.txt'), securityTxt);
fs.writeFileSync(path.join(publicDir, '.well-known/security.txt'), securityTxt);
console.log('Saved security.txt.');

// 7. Generate humans.txt
const humansTxt = `/* TEAM */
  Researcher & Engineer: Parth Doshi
  Contact: parthdoshi404@gmail.com
  Location: Pune, Maharashtra, India
  University: MIT World Peace University (MIT-WPU)

/* SITE */
  Standards: HTML5, CSS3, ES2022, Schema.org JSON-LD, RFC 9116
  Components: React 19, Vite, Tailwind CSS
  Fonts: Instrument Serif, Inter, JetBrains Mono (Self-hosted)
`;

fs.writeFileSync(path.join(distDir, 'humans.txt'), humansTxt);
fs.writeFileSync(path.join(publicDir, 'humans.txt'), humansTxt);
console.log('Saved humans.txt.');
