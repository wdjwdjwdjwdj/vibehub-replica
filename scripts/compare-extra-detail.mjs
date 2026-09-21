import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const slug = process.env.EXTRA_SLUG || 'http-status-code';
const sourceBase = process.env.EXTRA_SOURCE_BASE_URL || 'https://vibe-hub.org';
const localBase = process.env.EXTRA_LOCAL_BASE_URL || 'http://127.0.0.1:5174';
const outDir = `replication-evidence/round-2026-09-21/extra-details/${slug}`;
await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const result = {};
for (const [key, base] of [['source', sourceBase], ['local', localBase]]) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto(`${base}/en/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(300);
  result[key] = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText.trim() || '',
    height: Math.round((document.querySelector('main')?.getBoundingClientRect().height || 0) * 10) / 10,
    sections: [...document.querySelectorAll('main .special-section, main .extra-concept-stage, main .lesson-practice, main .lesson-agent-prompt')].map((node) => ({ className: node.className, y: Math.round(node.getBoundingClientRect().top + window.scrollY), height: Math.round(node.getBoundingClientRect().height * 10) / 10 })),
    text: document.querySelector('main')?.innerText.replace(/\s+/g, ' ').trim().slice(0, 1000) || '',
    errors: [],
  }));
  result[key].errors = errors;
  await page.screenshot({ path: `${outDir}/${key}.png`, fullPage: true });
  await page.close();
}
result.heightDelta = Math.round((result.local.height - result.source.height) * 10) / 10;
await fs.writeFile(`${outDir}/compare.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ slug, sourceHeight: result.source.height, localHeight: result.local.height, heightDelta: result.heightDelta, sourceErrors: result.source.errors, localErrors: result.local.errors }, null, 2));
await context.close();
await browser.close();
