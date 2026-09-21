import { chromium } from 'playwright';

/** 字体与图标探针：读取原站运行时真实的 @font-face、使用元素与窗口灯颜色。 */

const routes = (process.argv[2] || '/,/vibehub-skill').split(',').filter(Boolean);
const BASE = 'https://vibe-hub.org';

const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);

    const info = await page.evaluate(() => {
      // 1. 页面里注册的全部 @font-face
      const faces = [];
      const seen = new Set();
      for (const sheet of document.styleSheets) {
        let rules;
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        for (const rule of rules) {
          if (rule instanceof CSSFontFaceRule) {
            const family = rule.style.getPropertyValue('font-family').replace(/["']/g, '');
            const src = rule.style.getPropertyValue('src');
            const key = `${family}|${src}`;
            if (seen.has(key)) continue;
            seen.add(key);
            faces.push({
              family,
              weight: rule.style.getPropertyValue('font-weight'),
              style: rule.style.getPropertyValue('font-style'),
              display: rule.style.getPropertyValue('font-display'),
              unicodeRange: rule.style.getPropertyValue('unicode-range').slice(0, 60),
              src: src.slice(0, 130),
            });
          }
        }
      }

      // 2. 实际使用 Manrope / tabler 字体的元素（按选择器去重）
      const collect = (pattern) => {
        const out = [];
        const keys = new Set();
        for (const el of document.querySelectorAll('*')) {
          const cs = getComputedStyle(el);
          const ff = cs.fontFamily || '';
          if (!pattern.test(ff)) continue;
          const cls = typeof el.className === 'string' ? el.className.trim() : '';
          const key = `${el.tagName.toLowerCase()}${cls ? '.' + cls.split(/\s+/).join('.') : ''}`;
          if (keys.has(key)) continue;
          keys.add(key);
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;
          out.push({
            key,
            fontFamily: ff,
            fontWeight: cs.fontWeight,
            fontSize: cs.fontSize,
            letterSpacing: cs.letterSpacing,
            fontVariationSettings: cs.fontVariationSettings,
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
            w: Math.round(rect.width * 10) / 10,
            h: Math.round(rect.height * 10) / 10,
          });
        }
        return out;
      };

      // 3. 窗口灯：类名含 dot / chrome / traffic 的小圆点
      const lights = [];
      const lightKeys = new Set();
      for (const el of document.querySelectorAll('*')) {
        const cls = typeof el.className === 'string' ? el.className : '';
        if (!/dot|chrome|traffic/i.test(cls)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width > 24 || rect.height > 24 || rect.width === 0) continue;
        const cs = getComputedStyle(el);
        const key = `${el.tagName.toLowerCase()}.${cls.trim().split(/\s+/).join('.')}`;
        if (lightKeys.has(key)) continue;
        lightKeys.add(key);
        lights.push({
          key,
          background: cs.backgroundColor,
          w: Math.round(rect.width * 10) / 10,
          h: Math.round(rect.height * 10) / 10,
          borderRadius: cs.borderRadius,
          parent: el.parentElement ? (typeof el.parentElement.className === 'string' ? el.parentElement.className : '') : '',
        });
      }

      // 4. .vh-word 相关的 DOM 结构
      const wordNodes = [...document.querySelectorAll('[class*="vh-word"]')].map((el) => ({
        className: el.className,
        html: el.outerHTML.slice(0, 220),
        fontFamily: getComputedStyle(el).fontFamily,
        fontSize: getComputedStyle(el).fontSize,
        fontWeight: getComputedStyle(el).fontWeight,
      }));

      return {
        title: document.title,
        faces,
        manrope: collect(/manrope/i),
        tabler: collect(/tabler/i),
        lights: lights.slice(0, 12),
        wordNodes,
      };
    });

    console.log(`\n================ ${route} ================`);
    console.log(JSON.stringify(info, null, 2));
    await page.close();
  }
} finally {
  await browser.close();
}
