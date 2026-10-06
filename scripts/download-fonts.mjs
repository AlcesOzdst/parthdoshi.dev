import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicFontsDir = path.resolve(__dirname, '../client/public/fonts');
const scriptFontsDir = path.resolve(__dirname, 'fonts');

fs.mkdirSync(publicFontsDir, { recursive: true });
fs.mkdirSync(scriptFontsDir, { recursive: true });

const downloads = [
  // Web fonts (WOFF2)
  {
    url: 'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2',
    dest: path.join(publicFontsDir, 'instrument-serif-latin-400-normal.woff2'),
  },
  {
    url: 'https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2',
    dest: path.join(publicFontsDir, 'instrument-serif-latin-400-italic.woff2'),
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
    dest: path.join(publicFontsDir, 'inter-latin-variable.woff2'),
  },
  {
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2',
    dest: path.join(publicFontsDir, 'jetbrains-mono-latin-variable.woff2'),
  },
  // Satori TTF fonts
  {
    url: 'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf',
    dest: path.join(scriptFontsDir, 'InstrumentSerif-Regular.ttf'),
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
    dest: path.join(scriptFontsDir, 'Inter-Regular.ttf'),
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf',
    dest: path.join(scriptFontsDir, 'Inter-SemiBold.ttf'),
  },
];

for (const item of downloads) {
  if (!fs.existsSync(item.dest)) {
    console.log(`Downloading ${path.basename(item.dest)}...`);
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`Failed to fetch ${item.url}: ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(item.dest, buf);
    console.log(`Saved ${path.basename(item.dest)} (${buf.length} bytes)`);
  } else {
    console.log(`Already exists: ${path.basename(item.dest)}`);
  }
}
console.log('Fonts ready.');
