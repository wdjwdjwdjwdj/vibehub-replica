import { chromium } from 'playwright';

/** Skill 页分区几何测量：原站 vs 本地，同视口逐区块对比。 */

const SOURCE = 'https://vibe-hub.org';
const LOCAL = process.env.VH_LOCAL || 'http://127.0.0.1:5174';
const ROUTE = process.argv[2] || '/vibehub-skill';
const VIEWPORT = { width: 1440, height: 1000 };

/** 按语义区块测量：取页面上出现的、类名含这些关键字的**最外层**元素 */
const SECTIONS = [
  'skill-original-page',
  'skill-detail',
  'skill-hero',
  'skill-intro',
  'skill-browser-demo',
  'skill-install',
  'skill-stats',
  'skill-rewrite',
  'skill-feature',
  'skill-hint',
  'skill-panel',
];

const measure = async (page, url, names) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  return page.evaluate((names) => {
    const out = {};
    for (const name of names) {
      const els = [...document.querySelectorAll(`[class*="${name}"]`)];
      if (!els.length) continue;
      // 取最外层（祖先最少的那个）
      els.sort((a, b) => {
        const depth = (el) => {
          let d = 0;
          let cur = el.parentElement;
          while (cur) {
            d += 1;
            cur = cur.parentElement;
          }
          return d;
        };
        return depth(a) - depth(b);
      });
      const el = els[0];
      const r = el.getBoundingClientRect();
      out[name] = {
        y: Math.round((r.top + window.scrollY) * 10) / 10,
        h: Math.round(r.height * 10) / 10,
      };
    }
    const main = document.querySelector('main');
    out['__main'] = main ? Math.round(main.getBoundingClientRect().height * 10) / 10 : null;
    return out;
  }, names);
};

const browser = await chromium.launch({ headless: true });
try {
  const results = {};
  for (const [key, base] of [
    ['source', SOURCE],
    ['local', LOCAL],
  ]) {
    const page = await browser.newPage({ viewport: VIEWPORT });
    await page.addInitScript(() => {
      try {
        localStorage.setItem('vibehub-source-survey-shown-v1', '1');
      } catch {}
    });
    results[key] = await measure(page, `${base}${ROUTE}`, SECTIONS);
    await page.close();
  }

  console.log(`\n=== ${ROUTE} 分区几何（1440×1000）===`);
  console.log('| 区块 | 原站 y / h | 本地 y / h | Δh | Δy |');
  console.log('| --- | --- | --- | --- | --- |');
  for (const name of [...SECTIONS, '__main']) {
    const s = results.source[name];
    const l = results.local[name];
    if (!s && !l) continue;
    const dy = s && l ? Math.round((l.y - s.y) * 10) / 10 : '—';
    const dh = s && l ? Math.round((l.h - s.h) * 10) / 10 : '—';
    console.log(
      `| ${name} | ${s ? `${s.y} / ${s.h}` : '—'} | ${l ? `${l.y} / ${l.h}` : '—'} | ${dh} | ${dy} |`,
    );
  }
  const sm = results.source.__main;
  const lm = results.local.__main;
  if (sm && lm) console.log(`\nmain 高度差：原站 ${sm} / 本地 ${lm} → 本地多 ${Math.round((lm - sm) * 10) / 10}px`);
} finally {
  await browser.close();
}
