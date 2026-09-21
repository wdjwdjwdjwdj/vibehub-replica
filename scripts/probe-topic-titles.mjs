import { chromium } from 'playwright';

/** 主题页 title 对照探针：原站 vs 本地，逐个路由实测（不能套统一模板）。 */

const SOURCE = 'https://vibe-hub.org';
const LOCAL = process.env.VH_LOCAL || 'http://127.0.0.1:5173';
const TOPICS = [
  'frontend',
  'backend',
  'ai',
  'product',
  'testing',
  'design',
  'git',
  'technology',
];

const browser = await chromium.launch({ headless: true });
const rows = [];

try {
  for (const lang of ['', '/en']) {
    for (const topic of TOPICS) {
      const route = `${lang}/topics/${topic}`;
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const result = { route, source: null, local: null };
      for (const [key, base] of [
        ['source', SOURCE],
        ['local', LOCAL],
      ]) {
        try {
          await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(900);
          result[key] = await page.title();
        } catch (e) {
          result[key] = `<错误: ${String(e).slice(0, 40)}>`;
        }
      }
      rows.push(result);
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log('\n| 路由 | 原站 title | 本地 title | 一致 |');
console.log('| --- | --- | --- | --- |');
for (const r of rows) {
  const same = r.source === r.local ? '✅' : '❌';
  console.log(`| \`${r.route}\` | ${r.source} | ${r.local} | ${same} |`);
}

const diff = rows.filter((r) => r.source !== r.local);
console.log(`\n共 ${rows.length} 对，不一致 ${diff.length} 对`);
if (diff.length) {
  console.log('\n需要修正的本地 title：');
  for (const r of diff) console.log(`  ${r.route}\n    原站: ${r.source}\n    本地: ${r.local}`);
}
