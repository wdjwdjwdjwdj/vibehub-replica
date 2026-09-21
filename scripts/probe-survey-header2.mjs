/**
 * 二次探测：原站问卷点击后完整 DOM + 真实站点 header 结构。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-20/html');
fs.mkdirSync(outDir, { recursive: true });
const pretty = (html) => html.replace(/></g, '>\n<');

const run = async (label, url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  const logs = {};
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);

  // 真实站点 header：找包含 "Vibe Hub" 的 header/nav 祖先
  logs.header_candidates = await page.evaluate(() => {
    const out = [];
    const all = [...document.querySelectorAll('header, nav, [class*="header"], [class*="nav"], [class*="topbar"]')];
    for (const el of all) {
      const txt = (el.textContent || '').slice(0, 40).replace(/\n/g, ' ');
      if (/Vibe Hub|Terms|Skill|Community|English|Sign in/i.test(txt)) {
        out.push({ tag: el.tagName, cls: el.className.toString().slice(0, 60), txt });
      }
    }
    return out.slice(0, 8);
  });

  // 站点 header 完整 outerHTML（排除 survey）
  logs.site_header_html = pretty(await page.evaluate(() => {
    const candidates = [...document.querySelectorAll('header, nav')].filter((el) => !el.closest('.source-survey') && (el.textContent || '').includes('Vibe Hub'));
    const el = candidates[0];
    return el ? el.outerHTML.slice(0, 4000) : '(none)';
  }));

  // 问卷点击后：完整 DOM
  try {
    if (await page.locator('.source-survey').isVisible().catch(() => false)) {
      await page.locator('.source-survey-option').nth(2).click();
      await page.waitForTimeout(800);
      const html = await page.locator('.source-survey').outerHTML().catch(() => '(none)');
      fs.writeFileSync(path.join(outDir, `${label}-survey-after.html`), pretty(html));
      logs.survey_options_disabled = await page.evaluate(() => [...document.querySelectorAll('.source-survey-option')].map((b) => b.disabled));
      logs.survey_options_aria = await page.evaluate(() => [...document.querySelectorAll('.source-survey-option')].map((b) => b.getAttribute('aria-busy')));
      logs.survey_text = (await page.locator('.source-survey').innerText().catch(() => '')).replace(/\n+/g, ' | ').slice(0, 200);
      logs.survey_visible = await page.locator('.source-survey').isVisible().catch(() => 'n/a');
    }
  } catch (e) { logs.survey_error = e.message; }

  fs.writeFileSync(path.join(outDir, `${label}-survey-header2.json`), JSON.stringify(logs, null, 2));
  console.log(label, 'done');
  await context.close();
  await browser.close();
};

await run('original', 'https://vibe-hub.org/en/html');
await run('local', 'http://127.0.0.1:5174/en/html');
