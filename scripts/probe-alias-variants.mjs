import { chromium } from 'playwright';

/** 探测原站详情页的 alias 区块与变体区结构。 */

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
  try {
    localStorage.setItem('vibehub-source-survey-shown-v1', '1');
  } catch {}
});
await page.goto('https://vibe-hub.org' + (process.argv[2] || '/button'), { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2200);

const info = await page.evaluate(() => {
  const out = {};
  const alias = document.querySelector('.alias-row');
  if (alias) {
    const cs = getComputedStyle(alias);
    const r = alias.getBoundingClientRect();
    out.aliasRow = {
      html: alias.outerHTML.slice(0, 400),
      y: Math.round((r.top + scrollY) * 10) / 10,
      h: Math.round(r.height * 10) / 10,
      display: cs.display,
      gap: cs.gap,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      fontSize: cs.fontSize,
      color: cs.color,
    };
    out.aliasChildren = [...alias.children].map((c) => {
      const ccs = getComputedStyle(c);
      return {
        tag: c.tagName.toLowerCase(),
        cls: (c.className || '').toString(),
        text: (c.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
        fontSize: ccs.fontSize,
        color: ccs.color,
        fontWeight: ccs.fontWeight,
      };
    });
  } else {
    out.aliasRow = null;
  }

  // 变体区结构
  const variants = [...document.querySelectorAll('[class*="variant"]')].filter((el) =>
    /variant/i.test(el.className.toString()),
  );
  out.variantNodes = variants.slice(0, 8).map((el) => {
    const r = el.getBoundingClientRect();
    return {
      cls: (el.className || '').toString().slice(0, 54),
      h: Math.round(r.height * 10) / 10,
      kids: [...el.children].slice(0, 3).map((c) => c.tagName.toLowerCase() + '.' + (c.className || '').toString().slice(0, 24)),
    };
  });
  return out;
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
