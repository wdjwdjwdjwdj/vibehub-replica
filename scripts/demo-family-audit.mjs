import { chromium } from 'playwright';
import { catalogData } from '../src/catalogData.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const terms = Object.values(catalogData)
  .flatMap((groups) => groups.flatMap((group) => group.items))
  .map((item) => item.length === 4 ? item[0] : item[2] || item[0]);
const routes = terms.flatMap((term) => [`/${term}`, `/en/${term}`]);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];
const counts = { catalog: 0, dh: 0, reference: 0, advanced: 0, other: 0 };

for (const route of routes) {
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  // React mounts after the document shell; wait for the route's heading so
  // this audit measures the rendered demo family instead of the empty shell.
  await page.waitForSelector('h1', { state: 'attached', timeout: 10000 });
  await page.waitForTimeout(120);
  const result = await page.evaluate(() => {
    const stage = document.querySelector('.demo-shell, .reference-stage');
    const className = stage?.className || '';
    return {
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      iframe: document.querySelectorAll('iframe').length,
      generic: Boolean(document.querySelector('.dh-generic-detail, .reference-content-stage')),
      family: className.includes('catalog-reference-stage') ? 'catalog' : className.includes('dh-reference-demo') ? 'dh' : className.includes('reference-') ? 'reference' : className.includes('demo-shell') ? 'advanced' : 'other',
      className,
    };
  });
  counts[result.family] = (counts[result.family] || 0) + 1;
  if (!result.h1 || result.iframe || result.generic) failures.push(`${route} -> ${JSON.stringify(result)}`);
}

await browser.close();
console.log(JSON.stringify({ routes: routes.length, counts, failures: failures.length, failedRoutes: failures }, null, 2));
if (failures.length) process.exit(1);
