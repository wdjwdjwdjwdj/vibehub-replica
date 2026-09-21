import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

/**
 * 文案一致性审计：按页面抽取原站与本地的可见文本，做逐句 diff。
 *
 * 与只比较 title / 总长度不同，这里按渲染后的可见文本行逐行比对，
 * 输出"原站有而本地没有"和"本地多出"的具体句子，便于逐条修正。
 *
 * 用法：npm run audit:copy           （默认检查全部页面）
 *      node scripts/audit-copy-parity.mjs / /vibehub-skill   （只查指定路由）
 */

const SOURCE = 'https://vibe-hub.org';
const LOCAL = process.env.VH_LOCAL || 'http://127.0.0.1:5174';
const VIEWPORT = { width: 1440, height: 1000 };

/** 页面清单：maxLines 用于截断随机内容（如 Practice 的随机题目） */
const PAGES = [
  { route: '/', name: '中文首页' },
  { route: '/en', name: '英文首页' },
  { route: '/topics/frontend', name: '中文 Frontend 主题页' },
  { route: '/en/topics/frontend', name: '英文 Frontend 主题页' },
  { route: '/vibehub-skill', name: 'Skill 介绍页' },
  { route: '/practice', name: '练习页', maxLines: 30 },
  { route: '/changelog', name: '中文更新日志' },
  { route: '/en/button', name: 'Button 详情页' },
  { route: '/en/html', name: 'HTML 详情页（英文）' },
  { route: '/button', name: 'Button 详情页（中文）' },
];

const normalize = (line) =>
  line
    .replace(/\s+/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .trim();

/** 抽取渲染后的可见文本行（滚动到底触发懒加载，保证两边采样范围一致） */
const extract = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1800);
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight * 2;
          if (y < document.body.scrollHeight) setTimeout(step, 50);
          else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 250);
          }
        };
        step();
      }),
  );
  await page.waitForTimeout(400);
  const text = await page.evaluate(() => document.body.innerText);
  return text
    .split('\n')
    .map(normalize)
    .filter((line) => line.length > 1);
};

/** LCS 逐行 diff；规模过大时退化为集合差集，避免卡死 */
const diffLines = (source, local) => {
  const n = source.length;
  const m = local.length;
  if (n * m > 4_000_000) {
    const localSet = new Set(local);
    const sourceSet = new Set(source);
    return {
      missing: source.filter((l) => !localSet.has(l)),
      extra: local.filter((l) => !sourceSet.has(l)),
      degraded: true,
    };
  }
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = source[i] === local[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const missing = [];
  const extra = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (source[i] === local[j]) {
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      missing.push(source[i]);
      i += 1;
    } else {
      extra.push(local[j]);
      j += 1;
    }
  }
  while (i < n) missing.push(source[i++]);
  while (j < m) extra.push(local[j++]);
  return { missing, extra, degraded: false };
};

const wanted = process.argv.slice(2).filter(Boolean);
const targets = wanted.length ? PAGES.filter((p) => wanted.includes(p.route)) : PAGES;

const browser = await chromium.launch({ headless: true });
const report = [];

try {
  for (const { route, name, maxLines } of targets) {
    const page = await browser.newPage({ viewport: VIEWPORT });
    // 关掉调查弹层，避免两边弹层文本混入噪声
    await page.addInitScript(() => {
      try {
        localStorage.setItem('vibehub-source-survey-shown-v1', '1');
      } catch {}
    });

    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));

    let sourceLines = [];
    let localLines = [];
    try {
      sourceLines = await extract(page, `${SOURCE}${route}`);
    } catch (e) {
      errors.push(`source: ${String(e).slice(0, 160)}`);
    }
    try {
      localLines = await extract(page, `${LOCAL}${route}`);
    } catch (e) {
      errors.push(`local: ${String(e).slice(0, 160)}`);
    }

    if (maxLines) {
      sourceLines = sourceLines.slice(0, maxLines);
      localLines = localLines.slice(0, maxLines);
    }

    const { missing, extra, degraded } = diffLines(sourceLines, localLines);
    const sameCount = sourceLines.length - missing.length;
    const ratio = sourceLines.length ? Math.round((sameCount / sourceLines.length) * 1000) / 10 : 100;

    const entry = {
      route,
      name,
      sourceLines: sourceLines.length,
      localLines: localLines.length,
      matchRate: `${ratio}%`,
      missing,
      extra,
      degraded,
      errors,
    };
    report.push(entry);

    console.log(`\n=== ${name} ${route} ===`);
    console.log(`原站 ${sourceLines.length} 行 / 本地 ${localLines.length} 行 · 一致率 ${ratio}%${degraded ? '（大页面，退化为集合比对）' : ''}`);
    if (missing.length) {
      console.log(`  [原站有 / 本地缺] ${missing.length} 条：`);
      for (const line of missing.slice(0, 12)) console.log(`    - ${line.slice(0, 110)}`);
      if (missing.length > 12) console.log(`    … 其余 ${missing.length - 12} 条见报告`);
    }
    if (extra.length) {
      console.log(`  [本地多出] ${extra.length} 条：`);
      for (const line of extra.slice(0, 12)) console.log(`    + ${line.slice(0, 110)}`);
      if (extra.length > 12) console.log(`    … 其余 ${extra.length - 12} 条见报告`);
    }
    if (!missing.length && !extra.length) console.log('  逐句完全一致');
    if (errors.length) console.log('  运行时错误:', errors.slice(0, 3));
    await page.close();
  }
} finally {
  await browser.close();
}

// 报告落盘，供差异清单引用
const outDir = new URL('../docs/', import.meta.url);
mkdirSync(outDir, { recursive: true });
const lines = [
  '# 文案逐句一致性报告',
  '',
  `生成方式：\`npm run audit:copy\`（原站 ${SOURCE} vs 本地 ${LOCAL}，1440×1000，滚动触发懒加载后取可见文本逐行 diff）`,
  '',
  '本报告只反映**渲染后的可见文本**，不覆盖字体、图标、几何与交互。',
  '',
  `| 页面 | 原站行数 | 本地行数 | 一致率 | 本地缺 | 本地多出 |`,
  '| --- | --- | --- | --- | --- | --- |',
  ...report.map(
    (r) =>
      `| ${r.name} \`${r.route}\` | ${r.sourceLines} | ${r.localLines} | ${r.matchRate} | ${r.missing.length} | ${r.extra.length} |`,
  ),
  '',
];
for (const r of report) {
  lines.push(`## ${r.name} \`${r.route}\``, '');
  lines.push(`一致率 ${r.matchRate}（原站 ${r.sourceLines} 行 / 本地 ${r.localLines} 行）${r.degraded ? '，大页面退化为集合比对' : ''}`, '');
  if (r.errors.length) lines.push(`运行时错误：${r.errors.join('；')}`, '');
  if (r.missing.length) {
    lines.push(`### 原站有、本地缺（${r.missing.length}）`, '');
    for (const l of r.missing) lines.push(`- ${l.slice(0, 220)}`);
    lines.push('');
  }
  if (r.extra.length) {
    lines.push(`### 本地多出（${r.extra.length}）`, '');
    for (const l of r.extra) lines.push(`- ${l.slice(0, 220)}`);
    lines.push('');
  }
  if (!r.missing.length && !r.extra.length) lines.push('逐句完全一致。', '');
}
writeFileSync(new URL('copy-parity-latest.md', outDir), `${lines.join('\n')}\n`, 'utf8');
console.log('\n报告已写入 docs/copy-parity-latest.md');
