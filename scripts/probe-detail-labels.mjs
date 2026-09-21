import { chromium } from 'playwright';

/** 详情页标签对照探针：并排输出原站与本地的结构化文案，避免 diff 错位噪声。 */

const route = process.argv[2] || '/button';
const SOURCE = 'https://vibe-hub.org';
const LOCAL = process.env.VH_LOCAL || 'http://127.0.0.1:5173';

const grab = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2200);
  return page.evaluate(() => {
    const txt = (el) => (el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : null);
    const out = [];
    const push = (label, value) => {
      if (value) out.push(`${label} :: ${value.slice(0, 120)}`);
    };
    push('breadcrumb', txt(document.querySelector('.detail-breadcrumb')));
    push('h1', txt(document.querySelector('h1')));
    // 区块标题按 DOM 顺序
    document.querySelectorAll('h2, h3, .detail-question, .quick-check-title').forEach((el) => {
      push(`[${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}]`, txt(el));
    });
    push('copyButton', txt(document.querySelector('.copy-button')));
    // 按钮/标签类
    document.querySelectorAll('.demo-tab, .variant-tab, [class*="variant"] button, [class*="scene"] button').forEach((el) => {
      const t = txt(el);
      if (t && t.length < 26) push(`btn.${(el.className || '').toString().split(' ')[0]}`, t);
    });
    return out;
  });
};

const browser = await chromium.launch({ headless: true });
try {
  for (const target of [SOURCE, LOCAL]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem('vibehub-source-survey-shown-v1', '1');
      } catch {}
    });
    const list = await grab(page, `${target}${route}`);
    console.log(`\n########## ${target}${route} （${list.length} 条） ##########`);
    list.forEach((line, i) => console.log(`${String(i).padStart(3)} | ${line}`));
    await page.close();
  }
} finally {
  await browser.close();
}
