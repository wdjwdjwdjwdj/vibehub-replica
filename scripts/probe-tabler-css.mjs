import { chromium } from 'playwright';

/** 从原站运行时提取 tabler-icons 的图标类与码点定义。 */

const BASE = 'https://vibe-hub.org';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  const rules = await page.evaluate(() => {
    const out = [];
    for (const sheet of document.styleSheets) {
      let list;
      try {
        list = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of list) {
        if (!rule.selectorText) continue;
        if (!/\.ti(\s|$|:|,|\[|\.)/.test(rule.selectorText)) continue;
        out.push(rule.cssText.replace(/\s+/g, ' ').slice(0, 200));
      }
    }
    return out;
  });

  console.log(`共 ${rules.length} 条 .ti 相关规则\n`);
  for (const r of rules) console.log(r);
  await page.close();
} finally {
  await browser.close();
}
