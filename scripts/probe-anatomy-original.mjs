import { chromium } from 'playwright';

/** 定位原站「按钮本体 / 整块可点击区域」所在的容器与类名。 */

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
  try {
    localStorage.setItem('vibehub-source-survey-shown-v1', '1');
  } catch {}
});
await page.goto('https://vibe-hub.org/button', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2200);

const info = await page.evaluate(() => {
  const targets = ['按钮本体', '整块可点击区域', '＋新建项目', '你可能会说', '容易混淆'];
  const out = {};
  for (const t of targets) {
    const el = [...document.querySelectorAll('*')].find(
      (n) => n.children.length === 0 && (n.textContent || '').includes(t),
    );
    if (!el) {
      out[t] = '(未找到)';
      continue;
    }
    const chain = [];
    let cur = el;
    for (let i = 0; i < 5 && cur; i += 1) {
      chain.push(`${cur.tagName.toLowerCase()}.${(cur.className || '').toString().split(' ')[0]}`);
      cur = cur.parentElement;
    }
    const sec = el.closest('section, div[class*="section"]');
    out[t] = {
      chain: chain.join(' < '),
      sectionCls: sec ? sec.className : '(无)',
      sectionHtml: sec ? sec.outerHTML.slice(0, 300) : '',
    };
  }
  return out;
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
