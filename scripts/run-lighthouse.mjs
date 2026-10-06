import { execSync } from 'node:child_process';
import fs from 'node:fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
if (fs.existsSync(chromePath)) {
  process.env.CHROME_PATH = chromePath;
  console.log(`Using Chrome at ${chromePath}`);
}

console.log('Running Lighthouse mobile audit against http://localhost:4173...');
try {
  execSync(
    'npx --yes lighthouse http://localhost:4173 --form-factor=mobile --output=json --output-path=lh-home.json --quiet --chrome-flags="--headless --no-sandbox --disable-gpu"',
    {
      stdio: 'inherit',
      env: process.env,
    }
  );
  console.log('Lighthouse audit completed. Output saved to lh-home.json.');
} catch (err) {
  console.error('Lighthouse execution failed:', err.message);
  process.exit(1);
}
