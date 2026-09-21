import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'replication-evidence/round-2026-09-20/html');
fs.mkdirSync(root, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const page = await context.newPage();
await page.goto('https://vibe-hub.org/en/html', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(3000);

const pieces = await page.evaluate(() => {
  const q = (sel) => document.querySelector(sel);
  const out = {};
  const add = (key, sel) => { const el = q(sel); out[key] = el ? el.outerHTML : null; };
  add('nav', 'nav.nav');
  add('topbar', '.detail-topbar');
  add('entryNav', '.detail-entry-navigation');
  add('hero', '.detail-hero');
  add('lessonExtras', '.lesson-extras');
  add('usageGrid', '.usage-grid');
  add('anatomy', '.detail-body > section:nth-of-type(2)');
  add('variants', '.detail-body > section:nth-of-type(3)');
  add('scenes', 'section.scenes');
  add('selector', '.selector-recommendation');
  add('references', '.references-section');
  add('footer', 'footer.site-footer');
  add('survey', 'section.source-survey');
  // stylesheet hrefs
  out.__css = [...document.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href);
  return out;
});

for (const [key, value] of Object.entries(pieces)) {
  if (key === '__css') continue;
  fs.writeFileSync(path.join(root, `orig-${key}.html`), value || '(null)');
  console.log(key, value ? value.length : 0);
}
fs.writeFileSync(path.join(root, 'orig-css-hrefs.json'), JSON.stringify(pieces.__css, null, 2));
console.log(JSON.stringify(pieces.__css, null, 2));
await browser.close();
