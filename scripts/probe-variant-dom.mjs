import { chromium } from 'playwright';

/** 对比原站与本地详情页「变体区」的实际 DOM。 */
const SOURCE = 'https://vibe-hub.org';
const LOCAL = 'http://127.0.0.1:5174';
const ROUTE = process.argv[2] || '/button';

const browser = await chromium.launch({ headless: true });
try {
  for (const [label, base] of [
    ['原站', SOURCE],
    ['本地', LOCAL],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem('vibehub-source-survey-shown-v1', '1');
      } catch {}
    });
    await page.goto(`${base}${ROUTE}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2000);
    const info = await page.evaluate(() => {
      const names = [...document.querySelectorAll('.variant-name')].map((el) => ({
        html: el.outerHTML.slice(0, 160),
        display: getComputedStyle(el).display,
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
      }));
      const cards = [...document.querySelectorAll('.variant-card')].map((el) => ({
        h: Math.round(el.getBoundingClientRect().height * 10) / 10,
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
      }));
      return { names: names.slice(0, 6), cards: cards.slice(0, 6) };
    });
    console.log(`\n########## ${label} ${ROUTE} ##########`);
    console.log('variant-name:');
    for (const n of info.names) console.log(`  [${n.display}] ${n.html}`);
    console.log('variant-card:');
    for (const c of info.cards) console.log(`  h=${c.h} :: ${c.text}`);
    await page.close();
  }
} finally {
  await browser.close();
}
