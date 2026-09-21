import { chromium } from 'playwright';
import { catalogData } from '../src/catalogData.js';
import { extraItemsByTopic } from '../src/termExtras.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const catalogTerms = Object.values(catalogData)
  .flatMap((groups) => groups.flatMap((group) => group.items))
  .map((item) => item.length === 4 ? item[0] : item[2] || item[0]);
const extraTerms = Object.values(extraItemsByTopic).flatMap((items) => items.map((item) => item[0]));
const terms = [...new Set([...catalogTerms, ...extraTerms])];
const routes = terms.flatMap((term) => [`/${term}`, `/en/${term}`]);
const failures = [];
const batchSize = 120;

for (let batchStart = 0; batchStart < routes.length; batchStart += batchSize) {
  // Recycle the browser periodically. Long sequential runs otherwise exhaust Chromium
  // renderer/resource handles and produce false ERR_INSUFFICIENT_RESOURCES failures.
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`); });

  for (const route of routes.slice(batchStart, batchStart + batchSize)) {
    runtimeErrors.length = 0;
    await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    // 详情字段（termDetails）已改为按需加载的独立 chunk，需等待渲染完成再断言
    await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {});
    await page.waitForFunction(() => !document.querySelector('.detail-gate'), { timeout: 15000 }).catch(() => {});
    const result = await page.evaluate(() => ({
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      notFound: document.querySelector('.not-found') !== null,
      iframes: document.querySelectorAll('iframe').length,
      demo: document.querySelector('.demo-shell, .reference-stage, .lesson-extras, .detail-entry-html') !== null,
      genericDemo: document.querySelector('.dh-generic-detail, .reference-content-stage') !== null,
    }));
    if (!result.h1 || result.notFound || result.iframes || !result.demo || result.genericDemo || runtimeErrors.length) {
      failures.push(`${route} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
    }
  }
  await browser.close();
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`term render smoke passed: ${routes.length} bilingual detail routes`);
