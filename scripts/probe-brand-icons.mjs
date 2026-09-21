import { chromium } from 'playwright';

/** 品牌字标结构 / tabler 图标码点 / 窗口灯颜色探针。 */

const BASE = 'https://vibe-hub.org';
const browser = await chromium.launch({ headless: true });

const probeIcons = () =>
  [...document.querySelectorAll('.ti')].map((el) => {
    const before = getComputedStyle(el, '::before');
    // ::before content 是 PUA 码位字符，转成可读的 U+XXXX
    let content = before.content;
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'string' && parsed.length) {
        content = [...parsed].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
      }
    } catch {}
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const parent = el.parentElement;
    return {
      className: el.className,
      content,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      color: cs.color,
      w: Math.round(r.width * 10) / 10,
      h: Math.round(r.height * 10) / 10,
      parentTag: parent ? parent.tagName.toLowerCase() : '',
      parentClass: parent && typeof parent.className === 'string' ? parent.className.slice(0, 60) : '',
      parentText: parent ? (parent.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30) : '',
    };
  });

const probeLogo = () => {
  const logo = document.querySelector('.vh-logo');
  if (!logo) return null;
  const cs = getComputedStyle(logo);
  const r = logo.getBoundingClientRect();
  return {
    html: logo.outerHTML.slice(0, 420),
    display: cs.display,
    gap: cs.gap,
    height: cs.height,
    width: Math.round(r.width * 10) / 10,
    h: Math.round(r.height * 10) / 10,
    parentTag: logo.parentElement ? logo.parentElement.tagName.toLowerCase() : '',
    parentClass: logo.parentElement && typeof logo.parentElement.className === 'string' ? logo.parentElement.className.slice(0, 60) : '',
  };
};

/** 窗口灯：小尺寸圆点，按父容器类名分组 */
const probeLights = () => {
  const groups = new Map();
  for (const el of document.querySelectorAll('i, span, div')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.width > 16 || r.height > 16) continue;
    const cs = getComputedStyle(el);
    if (!/50%|999px/.test(cs.borderRadius)) continue;
    const parent = el.parentElement;
    if (!parent) continue;
    const pcls = typeof parent.className === 'string' ? parent.className.trim() : '';
    if (!pcls) continue;
    const key = `${el.tagName.toLowerCase()} in .${pcls.split(/\s+/)[0]}`;
    if (!groups.has(key)) {
      groups.set(key, { key, parentClass: pcls.slice(0, 50), items: [] });
    }
    const g = groups.get(key);
    if (g.items.length < 4) {
      g.items.push({
        className: typeof el.className === 'string' ? el.className : '',
        background: cs.backgroundColor,
        size: `${Math.round(r.width * 10) / 10}x${Math.round(r.height * 10) / 10}`,
      });
    }
  }
  return [...groups.values()].slice(0, 10);
};

try {
  for (const route of ['/', '/vibehub-skill']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);

    const icons = await page.evaluate(probeIcons);
    const logo = await page.evaluate(probeLogo);
    const lights = await page.evaluate(probeLights);

    console.log(`\n================ ${route} ================`);
    console.log('--- .vh-logo ---');
    console.log(JSON.stringify(logo, null, 2));
    console.log('--- tabler 图标 ---');
    console.log(JSON.stringify(icons, null, 2));
    console.log('--- 窗口灯 ---');
    console.log(JSON.stringify(lights, null, 2));
    await page.close();
  }
} finally {
  await browser.close();
}
