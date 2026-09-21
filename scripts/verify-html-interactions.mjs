/**
 * /en/html 交互验收：在原站与本地执行同一组操作，比较每一阶段的状态。
 * 用法：node scripts/verify-html-interactions.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-21/html/interactions');
fs.mkdirSync(outDir, { recursive: true });

const results = {};

const run = async (label, url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  const steps = {};
  const snap = async (name, fn) => {
    try { steps[name] = await fn(); } catch (err) { steps[name] = 'ERROR: ' + err.message.slice(0, 160); }
  };

  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);

  // 1. 问卷：点击 Xiaohongshu 应关闭弹层
  await snap('survey.visible', () => page.locator('.source-survey').isVisible());
  await snap('survey.optionCount', () => page.locator('.source-survey-option').count());
  await page.locator('.source-survey-option').nth(2).click();
  await page.waitForTimeout(400);
  await snap('survey.closedAfterClick', async () => !(await page.locator('.source-survey').isVisible()));

  // 2. 选择题：先点错误项再点正确项
  await snap('quiz.correctIndex', () => page.evaluate(() => {
    const labels = [...document.querySelectorAll('.lesson-practice-option')];
    return labels.findIndex((l) => l.textContent.includes('Use appropriate HTML heading'));
  }));
  await page.locator('.lesson-practice-option').nth(2).click();
  await page.waitForTimeout(300);
  await snap('quiz.afterWrong', () => page.evaluate(() => {
    const labels = [...document.querySelectorAll('.lesson-practice-option')];
    const fb = document.querySelector('.lesson-practice-feedback');
    return { classes: labels.map((l) => l.className), markers: labels.map((l) => l.querySelector('.lesson-practice-state')?.textContent || ''), feedbackClass: fb?.className, feedbackTitle: fb?.querySelector('strong')?.textContent };
  }));
  await page.locator('.lesson-practice-option').nth(1).click();
  await page.waitForTimeout(300);
  await snap('quiz.afterCorrect', () => page.evaluate(() => {
    const labels = [...document.querySelectorAll('.lesson-practice-option')];
    const fb = document.querySelector('.lesson-practice-feedback');
    return { classes: labels.map((l) => l.className), markers: labels.map((l) => l.querySelector('.lesson-practice-state')?.textContent || ''), feedbackClass: fb?.className, feedbackTitle: fb?.querySelector('strong')?.textContent };
  }));

  // 3. Anatomy：点第 2 条 → 高亮 + callout；再点 → 收起
  await page.locator('.anat-part-trigger').nth(1).click();
  await page.waitForTimeout(350);
  await snap('anatomy.active', () => page.evaluate(() => ({
    parts: [...document.querySelectorAll('.anat-part')].map((p) => p.className),
    pressed: [...document.querySelectorAll('.anat-part-trigger')].map((b) => b.getAttribute('aria-pressed')),
    acted: [...document.querySelectorAll('.anat-stage .ap')].map((s) => `${s.className}|${s.getAttribute('data-callout') || ''}`),
  })));
  await page.locator('.anat-part-trigger').nth(1).click();
  await page.waitForTimeout(350);
  await snap('anatomy.toggledOff', () => page.evaluate(() => ({
    parts: [...document.querySelectorAll('.anat-part')].map((p) => p.className),
    acted: [...document.querySelectorAll('.anat-stage .ap')].map((s) => s.className),
  })));

  // 4. 收藏
  await snap('favorite.before', () => page.locator('.favorite-button').first().getAttribute('aria-pressed'));
  await page.locator('.favorite-button').first().click();
  await page.waitForTimeout(300);
  await snap('favorite.after', () => page.locator('.favorite-button').first().getAttribute('aria-pressed'));

  // 5. Copy as Markdown
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin }).catch(() => {});
  await page.locator('.source-survey-close').first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.locator('.detail-copy-markdown').click();
  await page.waitForTimeout(600);
  await snap('copy.labelAfterClick', () => page.locator('.detail-copy-markdown .copy-label-success').isVisible().catch(() => 'n/a'));
  await snap('copy.clipboard', () => page.evaluate(() => navigator.clipboard.readText().catch(() => '(denied)')));

  // 6. 进一步阅读链接
  await snap('references.hrefs', () => page.evaluate(() => [...document.querySelectorAll('.reference-link')].map((a) => `${a.getAttribute('href')}|${a.getAttribute('target')}|${a.getAttribute('rel')}`)));

  // 7. 上一条 / 下一条导航
  await snap('nav.prevNext', () => page.evaluate(() => {
    const left = document.querySelector('.float-nav.left');
    const right = document.querySelector('.float-nav.right');
    return { left: left && `${left.textContent}|${left.getAttribute('title')}`, right: right && `${right.textContent}|${right.getAttribute('title')}` };
  }));
  await page.locator('.float-nav.right').click();
  await page.waitForTimeout(1200);
  await snap('nav.afterNextClick', () => ({ path: new URL(page.url()).pathname, title: page.url() }));
  await page.goBack({ waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await snap('nav.afterBack', () => new URL(page.url()).pathname);

  // 8. 发音按钮存在且可点
  await snap('pronunciation.clickable', async () => {
    const btn = page.locator('.pronunciation-button').first();
    await btn.click({ timeout: 3000 });
    return true;
  });

  // 9. 直接访问与刷新
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await snap('reload.h1', () => page.locator('.detail-hero h1, .detail-title-row h1').first().innerText());
  await snap('reload.sections', () => page.evaluate(() => ({
    usage: !!document.querySelector('.usage-grid'),
    anatomy: !!document.querySelector('.anat-stage'),
    variants: !!document.querySelector('.variant-card'),
    scenes: !!document.querySelector('.scene-item'),
    references: !!document.querySelector('.reference-link'),
  })));

  await page.screenshot({ path: path.join(outDir, `${label}-final.png`), fullPage: true });
  steps.__errors = errors;
  await context.close();
  await browser.close();
  return steps;
};

results.original = await run('original', 'https://vibe-hub.org/en/html');
results.local = await run('local', 'http://127.0.0.1:5174/en/html');
fs.writeFileSync(path.join(outDir, 'interaction-report.json'), JSON.stringify(results, null, 2));

const lines = [];
for (const key of Object.keys(results.original)) {
  const a = JSON.stringify(results.original[key]);
  const b = JSON.stringify(results.local[key]);
  lines.push(`===== ${key} =====`);
  lines.push(`  original: ${a.slice(0, 400)}`);
  lines.push(`  local   : ${b.slice(0, 400)}`);
  lines.push(`  ${a === b ? 'MATCH' : 'DIFF'}`);
}
console.log(lines.join('\n'));
