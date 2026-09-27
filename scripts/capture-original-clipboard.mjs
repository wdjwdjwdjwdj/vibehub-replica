/**
 * 捕获原站 /en/html 「Copy as Markdown」的完整剪贴板文本（不截断）。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/current/html');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const page = await context.newPage();
await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://vibe-hub.org' });
await page.goto('https://vibe-hub.org/en/html', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(3000);
await page.locator('.detail-copy-markdown').first().click();
await page.waitForTimeout(500);
const text = await page.evaluate(() => navigator.clipboard.readText().catch(() => '(denied)'));
fs.writeFileSync(path.join(outDir, 'original-clipboard.txt'), text);
console.log('LEN', text.length);
console.log(JSON.stringify(text));
await context.close();
await browser.close();
