import { chromium } from 'playwright';

/** 本地字体接入验证：确认 Manrope / tabler 真被下载并应用到对应元素。 */

const BASE = process.env.VH_LOCAL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });

const check = async (route) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const fontResponses = [];
  page.on('response', (res) => {
    const url = res.url();
    if (/\.woff2?(\?|$)/.test(url)) fontResponses.push(`${res.status()} ${url.split('/').pop()}`);
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  const result = await page.evaluate(() => {
    const fonts = [...document.fonts].map((f) => `${f.family}|${f.weight}|${f.status}`);
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        variation: cs.fontVariationSettings,
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30),
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
      };
    };
    const icons = [...document.querySelectorAll('.ti')].slice(0, 10).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cls: el.className,
        fontFamily: getComputedStyle(el).fontFamily,
        fontSize: getComputedStyle(el).fontSize,
        content: getComputedStyle(el, '::before').content,
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
      };
    });
    const dots = [...document.querySelectorAll('.skill-browser-dots i')].map((el) => ({
      background: getComputedStyle(el).backgroundColor,
      size: `${Math.round(el.getBoundingClientRect().width * 10) / 10}x${Math.round(el.getBoundingClientRect().height * 10) / 10}`,
    }));
    return {
      manropeLoaded: document.fonts.check('790 16px "Manrope Variable"'),
      tablerLoaded: document.fonts.check('400 16px tabler-icons'),
      faces: [...new Set(fonts)],
      logo: pick('.vh-logo'),
      brand: pick('.vh-word-brand'),
      tagline: pick('.vh-word-tagline'),
      wordmark: pick('.footer-wordmark'),
      icons,
      dots,
    };
  });

  console.log(`\n===== ${route} =====`);
  console.log('字体文件响应:', fontResponses.length ? fontResponses.join(', ') : '(无)');
  console.log('Manrope 可用:', result.manropeLoaded, '| tabler 可用:', result.tablerLoaded);
  console.log('已注册 faces:');
  for (const f of result.faces) console.log('   ', f);
  console.log('.vh-logo      :', JSON.stringify(result.logo));
  console.log('.vh-word-brand:', JSON.stringify(result.brand));
  console.log('.vh-word-tagline:', JSON.stringify(result.tagline));
  console.log('.footer-wordmark:', JSON.stringify(result.wordmark));
  if (result.icons.length) {
    console.log('tabler 图标:');
    for (const ic of result.icons) console.log('   ', JSON.stringify(ic));
  }
  if (result.dots.length) console.log('窗口灯:', JSON.stringify(result.dots));
  if (errors.length) console.log('运行时错误:', errors.slice(0, 3));
  await page.close();
};

try {
  await check('/');
  await check('/vibehub-skill');
} finally {
  await browser.close();
}
