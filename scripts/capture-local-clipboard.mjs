/**
 * 捕获本地 /en/html 「Copy as Markdown」的完整剪贴板文本，并对比原站。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/current/html');
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const page = await context.newPage();
await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:5174' });
await page.goto('http://127.0.0.1:5174/en/html', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(3000);
await page.locator('.detail-copy-markdown').first().click();
await page.waitForTimeout(500);
const text = await page.evaluate(() => navigator.clipboard.readText().catch(() => '(denied)'));
fs.writeFileSync(path.join(outDir, 'local-clipboard.txt'), text);
const orig = fs.readFileSync(path.join(outDir, 'original-clipboard.txt'), 'utf8');
console.log('LOCAL_LEN', text.length, 'ORIG_LEN', orig.length);
console.log('EXACT_MATCH', text === orig);
if (text !== orig) {
  const a = text.split('\n'); const b = orig.split('\n');
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) { console.log(`LINE ${i} DIFF\n  local: ${JSON.stringify(a[i])}\n  orig : ${JSON.stringify(b[i])}`); if (i > 5) break; }
  }
}
await context.close();
await browser.close();
