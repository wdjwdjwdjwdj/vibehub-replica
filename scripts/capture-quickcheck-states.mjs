import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.cwd(), 'replication-evidence/round-2026-09-20/html');
const browser = await chromium.launch();
const out = {};
for (const url of ['https://vibe-hub.org/en/html', 'https://vibe-hub.org/html']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: url.endsWith('/html') ? 'zh-CN' : 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  const record = { url, options: [], feedback: {} };
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  record.question = await page.locator('.lesson-practice h2').innerText();
  record.options = await page.locator('.lesson-practice-label').allInnerTexts();
  const n = record.options.length;
  for (let i = 0; i < n; i++) {
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(1800);
    await page.locator('.lesson-practice-option').nth(i).click();
    await page.waitForTimeout(400);
    const state = await page.evaluate((idx) => {
      const labels = [...document.querySelectorAll('.lesson-practice-option')];
      const fb = document.querySelector('.lesson-practice-feedback');
      return {
        classes: labels.map((l) => l.className),
        markers: labels.map((l) => l.querySelector('.lesson-practice-state')?.textContent || ''),
        feedback: fb ? { cls: fb.className, icon: fb.querySelector('.lesson-practice-feedback-icon')?.textContent, title: fb.querySelector('strong')?.textContent, body: fb.querySelector('p')?.textContent } : null,
      };
    }, i);
    record.feedback[i] = state;
  }
  out[url.endsWith('/html') && url.includes('vibe-hub.org/') && !url.includes('/en/') ? 'zh' : 'en'] = record;
  await context.close();
}
fs.writeFileSync(path.join(root, 'quickcheck-states.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 4000));
await browser.close();
