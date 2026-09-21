import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'replication-evidence/round-2026-09-20/html');
fs.mkdirSync(root, { recursive: true });
const browser = await chromium.launch();

const ctxFor = () => browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });

// 1) quick check 交互结果（英文页）
{
  const context = await ctxFor();
  const page = await context.newPage();
  await page.goto('https://vibe-hub.org/en/html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const grab = async (tag, index) => {
    const labels = page.locator('.lesson-practice-option');
    await labels.nth(index).click();
    await page.waitForTimeout(600);
    const html = await page.locator('.lesson-extras').evaluate((el) => el.outerHTML);
    fs.writeFileSync(path.join(root, `orig-lessonExtras-answered-${tag}.html`), html);
    await page.locator('.lesson-extras').screenshot({ path: path.join(root, `orig-quickcheck-${tag}.png`) });
    console.log('answered', tag, 'len', html.length);
  };
  await grab('B', 1);
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await grab('C', 2);
  await context.close();
}

// 2) 中文页同区块
{
  const context = await ctxFor();
  const page = await context.newPage();
  await page.goto('https://vibe-hub.org/html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const pieces = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const out = {};
    const add = (key, sel) => { const el = q(sel); out[key] = el ? el.outerHTML : null; };
    add('nav', 'nav.nav');
    add('topbar', '.detail-topbar');
    add('hero', '.detail-hero');
    add('lessonExtras', '.lesson-extras');
    add('usageGrid', '.usage-grid');
    add('anatomy', '.detail-body > section:nth-of-type(2)');
    add('variants', '.detail-body > section:nth-of-type(3)');
    add('scenes', 'section.scenes');
    add('references', '.references-section');
    return out;
  });
  for (const [key, value] of Object.entries(pieces)) {
    fs.writeFileSync(path.join(root, `zh-${key}.html`), value || '(null)');
    console.log('zh', key, value ? value.length : 0);
  }
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(path.join(root, 'zh-text.txt'), text);
  await context.close();
}
await browser.close();
