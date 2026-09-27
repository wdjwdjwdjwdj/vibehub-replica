import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.cwd(), 'replication-evidence/current/html');
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const page = await context.newPage();
await page.goto('https://vibe-hub.org/en/html', { waitUntil: 'load' });
await page.waitForTimeout(2500);

const snap = () => page.evaluate(() => {
  const stage = document.querySelector('.anat-stage');
  const parts = [...document.querySelectorAll('.anat-part')];
  return {
    stageHtml: stage.outerHTML,
    parts: parts.map((p) => ({ cls: p.className, ap: p.getAttribute('data-ap'), triggerCls: p.querySelector('.anat-part-trigger')?.className, pressed: p.querySelector('.anat-part-trigger')?.getAttribute('aria-pressed') })),
  };
});
console.log('--- initial ---');
console.log(JSON.stringify(await snap(), null, 1));

for (const idx of [0, 1, 2, 3]) {
  await page.locator('.anat-part-trigger').nth(idx).click();
  await page.waitForTimeout(500);
  const s = await snap();
  console.log(`--- after click part ${idx + 1} ---`);
  console.log(JSON.stringify(s, null, 1));
  await page.locator('.anat-wrap').screenshot({ path: path.join(root, `orig-anatomy-click${idx + 1}.png`) });
}

// 关闭：再点同一条
await page.locator('.anat-part-trigger').nth(3).click();
await page.waitForTimeout(400);
console.log('--- after re-click part 4 (toggle off) ---');
console.log(JSON.stringify(await snap(), null, 1));

await context.close();
await browser.close();
