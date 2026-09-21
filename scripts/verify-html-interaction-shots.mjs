/**
 * /en/html 交互状态截图验收：在原站与本地执行同一组操作序列，
 * 对每个状态截取整页图并逐像素对比，输出 mismatchRatio。
 * 用法：node scripts/verify-html-interaction-shots.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { readPng, diffPng, writeDiffImage } from './lib/png-diff.mjs';

const outDir = path.resolve('replication-evidence/round-2026-09-21/html/interaction-shots');
fs.mkdirSync(outDir, { recursive: true });

const THRESHOLD = Number(process.env.PIXEL_THRESHOLD || '12');
const GATE = Number(process.env.PIXEL_GATE || '1');

/** 每个状态：从干净页面开始要执行的操作序列 */
const STATES = [
  { key: '01-survey-open', steps: [] },
  { key: '02-survey-closed', steps: [['click', '.source-survey-close']] },
  { key: '03-quiz-wrong', steps: [['click', '.source-survey-close'], ['click', '.lesson-practice-option', 0]] },
  { key: '04-quiz-correct', steps: [['click', '.source-survey-close'], ['click', '.lesson-practice-option', 2], ['click', '.lesson-practice-option', 1]] },
  { key: '05-anatomy-active', steps: [['click', '.source-survey-close'], ['click', '.lesson-practice-option', 2], ['click', '.lesson-practice-option', 1], ['click', '.anat-part-trigger', 1]] },
  { key: '06-favorite-on', steps: [['click', '.source-survey-close'], ['click', '.lesson-practice-option', 2], ['click', '.lesson-practice-option', 1], ['click', '.anat-part-trigger', 1], ['click', '.favorite-button', 0]] },
  { key: '07-copied', steps: [['click', '.source-survey-close'], ['click', '.lesson-practice-option', 2], ['click', '.lesson-practice-option', 1], ['click', '.anat-part-trigger', 1], ['click', '.favorite-button', 0], ['click', '.detail-copy-markdown']] },
];

const runState = async (browser, label, url, state) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin }).catch(() => {});
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  // 第三方统计（google-analytics 等）在沙箱内不可达，按既定规则隔离记录，不计入验收门槛
  const isThirdParty = (text) => /google-analytics|googletagmanager|doubleclick|facebook\.net|hotjar|segment\.io|sentry/i.test(text);
  page.on('requestfailed', (r) => { const t = 'reqfail: ' + r.url().slice(0, 120); if (!isThirdParty(t)) errors.push(t); });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  for (const [action, selector, index] of state.steps) {
    await page.locator(selector).nth(index ?? 0).click({ timeout: 15000 }).catch((e) => errors.push(`step ${selector}: ${String(e).slice(0, 120)}`));
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(300);
  const shot = path.join(outDir, `${state.key}--${label}.png`);
  await page.screenshot({ path: shot, fullPage: true });
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const title = await page.title();
  await context.close();
  return { shot, scrollHeight, title, errors };
};

const browser = await chromium.launch();
const report = [];
try {
  for (const state of STATES) {
    const a = await runState(browser, 'original', 'https://vibe-hub.org/en/html', state);
    const b = await runState(browser, 'local', 'http://127.0.0.1:5174/en/html', state);
    const pa = readPng(a.shot);
    const pb = readPng(b.shot);
    const r = diffPng(pa, pb, THRESHOLD);
    writeDiffImage(path.join(outDir, `diff-${state.key}.png`), pa, pb, THRESHOLD);
    const pass = r.mismatchRatio <= GATE && r.sizeMatch && a.errors.length === 0 && b.errors.length === 0;
    report.push({
      state: state.key,
      sizeA: `${pa.width}x${pa.height}`,
      sizeB: `${pb.width}x${pb.height}`,
      sizeMatch: r.sizeMatch,
      mismatchRatio: Number(r.mismatchRatio.toFixed(4)),
      diffPixels: r.diffPixels,
      totalPixels: r.totalPixels,
      scrollHeightOriginal: a.scrollHeight,
      scrollHeightLocal: b.scrollHeight,
      errorsOriginal: a.errors,
      errorsLocal: b.errors,
      pass,
    });
    console.log(
      `${state.key}: ${r.sizeMatch ? '' : '[尺寸不一致] '}mismatchRatio=${r.mismatchRatio.toFixed(3)}% ` +
      `(${r.diffPixels}/${r.totalPixels}) scrollH ${a.scrollHeight}/${b.scrollHeight} ` +
      `errors ${a.errors.length}/${b.errors.length} -> ${pass ? 'PASS' : 'FAIL'}`,
    );
    if (a.errors.length) console.log('  original errors:', a.errors.slice(0, 3));
    if (b.errors.length) console.log('  local errors:', b.errors.slice(0, 3));
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(outDir, 'interaction-shots.json'), JSON.stringify({ threshold: THRESHOLD, gate: GATE, states: report }, null, 2));
const failed = report.filter((r) => !r.pass);
console.log(`\n合计 ${report.length} 个状态，通过 ${report.length - failed.length}，未通过 ${failed.length}`);
if (failed.length) console.log('未通过:', failed.map((f) => `${f.state} (${f.mismatchRatio}%)`).join(', '));
process.exit(failed.length ? 1 : 0);
