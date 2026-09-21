import { chromium } from 'playwright';
const slug = process.argv[2] || 'http-status-code';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await page.goto(`https://vibe-hub.org/en/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(300);
const data = await page.evaluate(() => ({
  body: document.querySelector('main > .detail-body')?.outerHTML || document.querySelector('main > .detail')?.outerHTML || '',
  top: document.querySelector('main')?.outerHTML.slice(0, 12000) || '',
}));
console.log(data.body);
await browser.close();
