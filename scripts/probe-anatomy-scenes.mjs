import { chromium } from 'playwright';

/** 对比原站/本地详情页的 Anatomy 区与场景区 DOM 结构。 */

const ROUTE = process.argv[2] || '/button';
const browser = await chromium.launch({ headless: true });

const grab = async (base) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.addInitScript(() => {
    try {
      localStorage.setItem('vibehub-source-survey-shown-v1', '1');
    } catch {}
  });
  await page.goto(base + ROUTE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  const info = await page.evaluate(() => {
    const pick = (sel, limit = 6) =>
      [...document.querySelectorAll(sel)].slice(0, limit).map((el) => ({
        cls: (el.className || '').toString().slice(0, 40),
        html: el.outerHTML.slice(0, 220),
      }));
    return {
      anatomy: pick('[class*="anatomy"]', 8),
      scenes: pick('[class*="scene"]', 8),
    };
  });
  await page.close();
  return info;
};

try {
  const src = await grab('https://vibe-hub.org');
  const loc = await grab('http://127.0.0.1:5174');

  for (const key of ['anatomy', 'scenes']) {
    console.log(`\n########## ${key} — 原站 (${src[key].length}) ##########`);
    for (const n of src[key]) console.log(`  .${n.cls}\n     ${n.html}`);
    console.log(`\n########## ${key} — 本地 (${loc[key].length}) ##########`);
    for (const n of loc[key]) console.log(`  .${n.cls}\n     ${n.html}`);
  }
} finally {
  await browser.close();
}
