/**
 * 原站问卷点击后状态时间线（多时间点），输出完整 HTML 到文件。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/current/html');
fs.mkdirSync(outDir, { recursive: true });
const pretty = (html) => html.replace(/></g, '>\n<');

const run = async (label, url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  const logs = {};
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  // 等待问卷出现（最长 8s）
  let visible = false;
  for (let i = 0; i < 16; i++) {
    await page.waitForTimeout(500);
    if (await page.locator('.source-survey').isVisible().catch(() => false)) { visible = true; break; }
  }
  logs.survey_visible_initial = visible;
  if (!visible) { fs.writeFileSync(path.join(outDir, `${label}-survey3.json`), JSON.stringify(logs, null, 2)); await context.close(); await browser.close(); console.log(label, 'no survey'); return; }

  await page.locator('.source-survey-option').nth(2).click();
  for (const t of [600, 2000, 4000]) {
    await page.waitForTimeout(t === 600 ? 0 : t - 600);
    const snap = await page.evaluate(() => {
      const s = document.querySelector('.source-survey');
      if (!s) return { gone: true };
      const opts = [...document.querySelectorAll('.source-survey-option')];
      return {
        visible: !!s.offsetParent,
        text: (s.innerText || '').replace(/\n+/g, ' | ').slice(0, 240),
        optionsDisabled: opts.map((b) => b.disabled),
        optionsAriaBusy: opts.map((b) => b.getAttribute('aria-busy')),
        optionsAttr: opts.map((b) => ({ cls: b.className, dis: b.disabled, busy: b.getAttribute('aria-busy') })),
        hasThanks: /thank|thanks|got it|submitted|done/i.test(s.innerText || ''),
      };
    });
    logs[`t${t}`] = snap;
  }
  const full = await page.evaluate(() => { const s = document.querySelector('.source-survey'); return s ? s.outerHTML : '(none)'; });
  fs.writeFileSync(path.join(outDir, `${label}-survey-after.html`), pretty(full));
  fs.writeFileSync(path.join(outDir, `${label}-survey3.json`), JSON.stringify(logs, null, 2));
  console.log(label, 'done');
  await context.close();
  await browser.close();
};

await run('original', 'https://vibe-hub.org/en/html');
await run('local', 'http://127.0.0.1:5174/en/html');
