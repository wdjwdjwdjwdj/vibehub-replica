/**
 * 从原站重新采集各主题页（中英）1440px 下的卡片高度，生成
 * src/catalogCardHeightsByTopic.js（TermCard 的内联高度来源）。
 *
 * 背景：原站内容会变（新增词条、Demo 变更），本地缓存的高度会过期，
 * 导致 audit:topic-parity 的 cardHeightTotal 对不上。用本脚本按原站实时页面重采。
 *
 * 采样条件与 scripts/audit-topic-parity.mjs 的 inspect() 完全一致：
 *   domcontentloaded + fonts.ready + 1500ms，视口 1440x1000，不滚动。
 * 注意：不要给 context 设 locale——原站 /topics/<slug> 会按 Accept-Language 重定向，
 *   设了 en-US 会把 /topics/frontend 送到 /en，采到错误的页面。
 *
 * 用法：node scripts/scrape-topic-card-heights.mjs [--out src/catalogCardHeightsByTopic.js]
 * 可选：--only frontend,ai   只重采指定主题
 *       --dry-run            只打印摘要，不写文件
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SOURCE = 'https://vibe-hub.org';
const VIEWPORT = { width: 1440, height: 1000 };

const TOPICS = [
  ['frontend', 'frontend'],
  ['backend', 'backend'],
  ['product', 'product'],
  ['testing', 'testing'],
  ['technology', 'stack'],
  ['ai', 'ai'],
  ['git', 'git'],
  ['design', 'design'],
];

const argValue = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? dflt : process.argv[i + 1];
};
const outPath = argValue('--out', 'src/catalogCardHeightsByTopic.js');
const only = argValue('--only', '').split(',').map((s) => s.trim()).filter(Boolean);
const dryRun = process.argv.includes('--dry-run');

const measure = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1500);
  return page.evaluate(() =>
    [...document.querySelectorAll('.card')].map((card) => ({
      id: card.getAttribute('data-id') || '',
      // Preserve sub-pixel source geometry; integer rounding accumulates a
      // visible one-pixel drift after several grid rows on long catalogs.
      // Chromium lays out at 1/64px increments; preserve that grid so the
      // generated inline height lands on the same device-pixel boundary.
      height: Math.round(card.getBoundingClientRect().height * 64) / 64,
    })),
  );
};

const serialize = (obj) => {
  const lines = [
    '// 1440px source snapshot for each catalog topic and locale. Regenerate with scripts/scrape-topic-card-heights.mjs.',
    'export const catalogCardHeightsByTopic = {',
  ];
  for (const locale of ['en', 'zh']) {
    lines.push(`  "${locale}": {`);
    for (const [topic, map] of Object.entries(obj[locale])) {
      lines.push(`    "${topic}": {`);
      for (const [id, height] of Object.entries(map)) lines.push(`      "${id}": ${height},`);
      lines.push('    },');
    }
    lines.push('  },');
  }
  lines.push('};');
  return `${lines.join('\n')}\n`;
};

const browser = await chromium.launch({ headless: true });
const data = { en: {}, zh: {} };
try {
  for (const [sourceSlug, localSlug] of TOPICS) {
    if (only.length && !only.includes(localSlug) && !only.includes(sourceSlug)) continue;
    for (const locale of ['en', 'zh']) {
      const route = `${locale === 'en' ? '/en' : ''}/topics/${sourceSlug}`;
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
      const page = await context.newPage();
      await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
      const cards = await measure(page, `${SOURCE}${route}`);
      const finalPath = new URL(page.url()).pathname;
      const map = {};
      let skipped = 0;
      for (const card of cards) {
        if (card.id) map[card.id] = card.height;
        else skipped += 1;
      }
      data[locale][localSlug] = map;
      const redirectNote = finalPath === route ? '' : `（重定向到 ${finalPath}）`;
      console.log(`${route} -> ${cards.length} 张卡片，${Object.keys(map).length} 个有 data-id${redirectNote}${skipped ? `，${skipped} 个跳过` : ''}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const next = serialize(data);
if (dryRun) {
  const prevPath = path.resolve(outPath);
  const prev = fs.existsSync(prevPath) ? fs.readFileSync(prevPath, 'utf8') : '';
  console.log(`\n--- dry run：不写文件 --- 现有 ${prev.length} 字符，新生成 ${next.length} 字符`);
} else {
  fs.writeFileSync(path.resolve(outPath), next, 'utf8');
  console.log(`\n已写入 ${outPath}（${next.length} 字符）`);
}
