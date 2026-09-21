import { chromium } from 'playwright';

const browser = await chromium.launch();
const rows = [];
for (const [label, url] of [['source', 'https://vibe-hub.org/en/changelog'], ['local', 'http://127.0.0.1:5174/en/changelog']]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const rect = (selector) => { const e = document.querySelector(selector); if (!e) return null; const r = e.getBoundingClientRect(); return { x:r.x, y:r.y + scrollY, w:r.width, h:r.height }; };
    return { label: document.querySelector('h1')?.textContent, scrollHeight: document.documentElement.scrollHeight, shell: rect('.changelog-page-shell'), sidebar: rect('.changelog-sidebar'), main: rect('.changelog-main-page'), header: rect('.changelog-header'), timeline: rect('.changelog-timeline'), entries: [...document.querySelectorAll('.changelog-entry')].map((e) => { const r=e.getBoundingClientRect(); return { id:e.id, y:r.y+scrollY, h:r.height, items:e.querySelectorAll('.changelog-item').length, terms:e.querySelectorAll('.changelog-term-pill').length }; }) };
  });
  rows.push({ label, data });
  await context.close();
}
await browser.close();
console.log(JSON.stringify(rows, null, 2));
