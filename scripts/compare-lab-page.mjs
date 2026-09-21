import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { readPng, diffPng, writeDiffImage } from './lib/png-diff.mjs';

const outDir = path.resolve(process.cwd(), process.argv[2] || 'replication-evidence/round-2026-09-21/lab-parity-current');
fs.mkdirSync(outDir, { recursive: true });
const routes = [
  ['original', 'https://vibe-hub.org/en/vibehub-skill/lab'],
  ['local', 'http://127.0.0.1:5174/en/vibehub-skill/lab'],
];
const browser = await chromium.launch();
for (const [label, url] of routes) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(outDir, `${label}.png`), fullPage: true });
  const metrics = await page.evaluate(() => {
    const pick = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height };
    };
    return {
      scrollHeight: document.documentElement.scrollHeight,
      main: pick('main'),
      intro: pick('.learning-intro'),
      stage: pick('.learning-stage'),
      product: pick('.learning-product'),
      options: pick('.learning-option-cards'),
      observe: pick('.learning-observe-action'),
      footer: pick('footer'),
    };
  });
  fs.writeFileSync(path.join(outDir, `${label}.json`), JSON.stringify(metrics, null, 2));
  await context.close();
}
await browser.close();
const original = readPng(path.join(outDir, 'original.png'));
const local = readPng(path.join(outDir, 'local.png'));
const diff = diffPng(original, local, 12);
writeDiffImage(path.join(outDir, 'diff.png'), original, local, 12);
fs.writeFileSync(path.join(outDir, 'compare.json'), JSON.stringify(diff, null, 2));
console.log(JSON.stringify(diff, null, 2));
