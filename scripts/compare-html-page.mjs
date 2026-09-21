/**
 * 原站 vs 本地 /en/html 结构化对比：
 *   - 逐区块比较几何（x/y/w/h）
 *   - 逐区块比较可见文案
 *   - 逐区块截图 + 逐像素 mismatchRatio（阈值 12，门槛 ≤1%）
 * 用法：node scripts/compare-html-page.mjs [outDir]
 * 产物：<outDir>/compare.txt（人读）、<outDir>/compare.json（机读）、<outDir>/*--original.png / *--local.png / diff-*.png
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { readPng, diffPng, writeDiffImage } from './lib/png-diff.mjs';

const outDir = path.resolve(process.cwd(), process.argv[2] || 'replication-evidence/round-2026-09-20/html/cmp');
fs.mkdirSync(outDir, { recursive: true });

const PIXEL_THRESHOLD = Number(process.env.PIXEL_THRESHOLD || '12');
const PIXEL_GATE = Number(process.env.PIXEL_GATE || '1');

const SECTIONS = [
  ['nav', 'nav.nav, header.site-header'],
  ['topbar', '.detail-topbar, .detail-breadcrumb'],
  ['hero', '.detail-hero, .detail-heading'],
  ['lessons', '.lesson-extras'],
  ['usage', '.usage-grid'],
  ['anatomy', '.anat-wrap'],
  ['variants', '.variant-grid'],
  ['scenes', 'section.scenes'],
  ['selector', '.selector-recommendation'],
  ['references', '.references-section'],
  ['footer', 'footer.site-footer, footer'],
  ['survey', '.source-survey'],
];

const browser = await chromium.launch();
const results = {};
for (const [label, url] of [
  ['original', 'https://vibe-hub.org/en/html'],
  ['local', 'http://127.0.0.1:5174/en/html'],
]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  // 滚到底再回顶部，触发懒加载与固定元素归位
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  results[label] = {};
  for (const [name, selector] of SECTIONS) {
    const info = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height),
        text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 900),
        html: el.outerHTML.length,
      };
    }, selector);
    results[label][name] = info;
    if (info) {
      const shot = path.join(outDir, `${name}--${label}.png`);
      await page.locator(selector).first().screenshot({ path: shot, timeout: 20000 }).catch((e) => {
        console.log(`  [warn] ${name}--${label} 截图失败: ${String(e).slice(0, 120)}`);
      });
    }
  }
  results[label].__scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await context.close();
}
await browser.close();

// 逐区块像素对比
const pixels = {};
for (const [name] of SECTIONS) {
  const aPath = path.join(outDir, `${name}--original.png`);
  const bPath = path.join(outDir, `${name}--local.png`);
  if (!fs.existsSync(aPath) || !fs.existsSync(bPath)) {
    pixels[name] = { missing: true };
    continue;
  }
  const a = readPng(aPath);
  const b = readPng(bPath);
  const r = diffPng(a, b, PIXEL_THRESHOLD);
  writeDiffImage(path.join(outDir, `diff-${name}.png`), a, b, PIXEL_THRESHOLD);
  pixels[name] = {
    sizeA: `${a.width}x${a.height}`,
    sizeB: `${b.width}x${b.height}`,
    sizeMatch: r.sizeMatch,
    diffPixels: r.diffPixels,
    totalPixels: r.totalPixels,
    mismatchRatio: Number(r.mismatchRatio.toFixed(4)),
    pass: r.mismatchRatio <= PIXEL_GATE,
  };
}

const lines = [];
lines.push(`scrollHeight  original=${results.original.__scrollHeight}  local=${results.local.__scrollHeight}  delta=${results.local.__scrollHeight - results.original.__scrollHeight}`);
lines.push(`pixel diff    threshold=${PIXEL_THRESHOLD}  gate=${PIXEL_GATE}%`);
lines.push('');
for (const [name] of SECTIONS) {
  const a = results.original[name];
  const b = results.local[name];
  lines.push(`===== ${name} =====`);
  if (!a || !b) {
    lines.push(`  original=${a ? 'found' : 'MISSING'}  local=${b ? 'found' : 'MISSING'}`);
    lines.push('');
    continue;
  }
  lines.push(`  geom  original x${a.x} y${a.y} ${a.w}x${a.h}`);
  lines.push(`  geom  local    x${b.x} y${b.y} ${b.w}x${b.h}   Δy=${b.y - a.y} Δh=${b.h - a.h}`);
  lines.push(`  htmlLen original=${a.html} local=${b.html}`);
  const same = a.text === b.text;
  lines.push(`  text  ${same ? 'IDENTICAL' : 'DIFFERENT'}`);
  if (!same) {
    lines.push(`    original: ${a.text.slice(0, 420)}`);
    lines.push(`    local   : ${b.text.slice(0, 420)}`);
  }
  const p = pixels[name];
  if (p && !p.missing) {
    lines.push(`  pixel ${p.mismatchRatio.toFixed(3)}%  (${p.sizeA} vs ${p.sizeB}${p.sizeMatch ? '' : ' 尺寸不一致'})  diffPixels=${p.diffPixels}/${p.totalPixels}  ${p.pass ? 'PASS' : 'FAIL'}`);
  } else {
    lines.push('  pixel MISSING (截图缺失)');
  }
  lines.push('');
}
fs.writeFileSync(path.join(outDir, 'compare.txt'), lines.join('\n'));
fs.writeFileSync(
  path.join(outDir, 'compare.json'),
  JSON.stringify({ scrollHeight: { original: results.original.__scrollHeight, local: results.local.__scrollHeight }, pixelThreshold: PIXEL_THRESHOLD, pixelGate: PIXEL_GATE, sections: results, pixels }, null, 2),
);
console.log(lines.join('\n'));
