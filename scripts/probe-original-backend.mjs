import { chromium } from 'playwright';

/** 摸清原站的服务端能力：抓取所有非静态资源请求 + 探测常见接口。 */

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
  try {
    localStorage.setItem('vibehub-source-survey-shown-v1', '1');
  } catch {}
});

const reqs = [];
page.on('request', (r) => {
  const t = r.resourceType();
  if (['image', 'font', 'media', 'stylesheet'].includes(t)) return;
  reqs.push(`${t.padEnd(10)} ${r.method().padEnd(5)} ${r.url().slice(0, 130)}`);
});

const routes = ['/', '/button', '/practice', '/changelog', '/vibehub-skill'];
for (const route of routes) {
  try {
    await page.goto('https://vibe-hub.org' + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2200);
  } catch (e) {
    console.log('(加载失败 ' + route + ': ' + String(e).slice(0, 60) + ')');
  }
}

// 交互：点一次收藏 + 答一次题，看有没有上报
try {
  await page.goto('https://vibe-hub.org/button', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1500);
  const fav = page.locator('[class*="favorite"], button[aria-label*="收藏"]').first();
  if (await fav.count()) await fav.click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(1800);
} catch {}

const uniq = [...new Set(reqs)].sort();
console.log('=== 非静态资源请求（去重，共 ' + uniq.length + ' 条）===');
for (const u of uniq) console.log('  ' + u);

console.log('\n=== 是否出现 /api/ 请求 ===');
const api = uniq.filter((u) => /\/api\/|\/graphql|\.json\b/.test(u));
if (api.length) api.forEach((u) => console.log('  ' + u));
else console.log('  无');

await browser.close();
