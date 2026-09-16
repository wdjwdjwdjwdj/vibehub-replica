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
const runtimeErrors = [];
page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`); });

for (const route of routes) {
  runtimeErrors.length = 0;
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    notFound: document.querySelector('.not-found') !== null,
    iframes: document.querySelectorAll('iframe').length,
    demo: document.querySelector('.demo-shell, .reference-stage') !== null,
    genericDemo: document.querySelector('.dh-generic-detail, .reference-content-stage') !== null,
  }));
  if (!result.h1 || result.notFound || result.iframes || !result.demo || result.genericDemo || runtimeErrors.length) {
    failures.push(`${route} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
  }
}

await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`term render smoke passed: ${routes.length} bilingual detail routes`);
