import { chromium } from 'playwright';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const routes = ['/vibehub-skill/lab', '/en/vibehub-skill/lab'];
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
    options: document.querySelectorAll('.learning-option-cards button').length,
    stages: document.querySelectorAll('.learning-route li').length,
  }));
  if (!result.h1 || result.notFound || result.iframes || runtimeErrors.length || result.options !== 2 || result.stages !== 4) failures.push(`${route} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
}

await browser.close();
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`learning lab smoke passed: ${routes.length} bilingual lab routes`);
