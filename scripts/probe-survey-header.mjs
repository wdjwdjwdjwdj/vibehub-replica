/**
 * 探测原站：问卷点击后状态 + 顶部导航右侧结构。
 * 用法：node scripts/probe-survey-header.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-20/html');
fs.mkdirSync(outDir, { recursive: true });

const pretty = (html) => html.replace(/></g, '>\n<');

const run = async (label, url, origin) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  const logs = {};
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);

  // --- 问卷：点击第 3 个选项（Xiaohongshu），记录点击后状态 ---
  try {
    const visibleBefore = await page.locator('.source-survey').isVisible().catch(() => false);
    logs.survey_visible_before = visibleBefore;
    if (visibleBefore) {
      await page.locator('.source-survey-option').nth(2).click();
      await page.waitForTimeout(600);
      logs.survey_visible_after = await page.locator('.source-survey').isVisible().catch(() => 'n/a');
      logs.survey_after_html = pretty(await page.locator('.source-survey').innerHTML().catch(() => '(none)'));
      logs.survey_option_classes = await page.evaluate(() => [...document.querySelectorAll('.source-survey-option')].map((b) => b.className));
      logs.survey_selected = await page.evaluate(() => {
        const sel = document.querySelector('.source-survey-option[aria-pressed="true"], .source-survey-option.is-selected, .source-survey-option[aria-selected="true"]');
        return sel ? sel.textContent.trim() : '(none)';
      });
    }
  } catch (e) { logs.survey_error = e.message; }

  // --- 顶部导航右侧 ---
  try {
    logs.header_html = pretty(await page.evaluate(() => {
      const header = document.querySelector('header, .site-header, .app-header, nav.site-nav, .topbar, .global-header');
      if (!header) return '(no header selector matched)';
      return header.outerHTML;
    }));
  } catch (e) { logs.header_error = e.message; }

  await page.screenshot({ path: path.join(outDir, `${label}-probe.png`), fullPage: false });
  fs.writeFileSync(path.join(outDir, `${label}-survey-header.json`), JSON.stringify(logs, null, 2));
  console.log(label, 'done');
  await context.close();
  await browser.close();
};

await run('original', 'https://vibe-hub.org/en/html', 'https://vibe-hub.org');
await run('local', 'http://127.0.0.1:5174/en/html', 'http://127.0.0.1:5174');
