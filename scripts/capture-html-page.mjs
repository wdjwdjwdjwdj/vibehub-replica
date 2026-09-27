import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), process.argv[2] || 'replication-evidence/current/html');
const suffix = process.argv[3] || '';
fs.mkdirSync(root, { recursive: true });

const jobs = [
  { label: 'original', url: 'https://vibe-hub.org/en/html' },
  { label: 'local', url: 'http://127.0.0.1:5174/en/html' },
];

const MAX_TEXT = 60000;

const browser = await chromium.launch();
for (const job of jobs) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    colorScheme: 'light',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + String(e).slice(0, 300)));
  const failed = [];
  page.on('requestfailed', (r) => failed.push(r.url().slice(0, 200) + ' :: ' + (r.failure()?.errorText || '')));

  await page.goto(job.url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(root, `${job.label}${suffix}-fold.png`) });
  await page.screenshot({ path: path.join(root, `${job.label}${suffix}-full.png`), fullPage: true });

  const data = await page.evaluate((maxText) => {
    const walk = (el, depth, out) => {
      if (depth > 12) return out;
      for (const child of el.children) {
        const cs = getComputedStyle(child);
        const rect = child.getBoundingClientRect();
        out.push({
          depth,
          tag: child.tagName.toLowerCase(),
          cls: child.className && typeof child.className === 'string' ? child.className : '',
          x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height),
          font: cs.fontFamily.slice(0, 60),
          size: cs.fontSize,
          weight: cs.fontWeight,
          color: cs.color,
          bg: cs.backgroundColor,
          lh: cs.lineHeight,
          ls: cs.letterSpacing,
          pad: cs.padding,
          gap: cs.gap,
          display: cs.display,
          text: (child.children.length === 0 ? (child.textContent || '') : '').trim().slice(0, 120),
        });
        walk(child, depth + 1, out);
      }
      return out;
    };
    return {
      title: document.title,
      lang: document.documentElement.lang,
      theme: document.documentElement.dataset.theme || '',
      scrollHeight: document.documentElement.scrollHeight,
      bodyW: document.body.getBoundingClientRect().width,
      docText: (document.body.innerText || '').slice(0, maxText),
      nodes: walk(document.body, 0, []),
      counts: (() => {
        const c = {};
        document.querySelectorAll('*').forEach((el) => {
          const key = el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
          c[key] = (c[key] || 0) + 1;
        });
        return c;
      })(),
    };
  }, MAX_TEXT);

  fs.writeFileSync(path.join(root, `${job.label}${suffix}-dom.json`), JSON.stringify(data, null, 2));
  fs.writeFileSync(path.join(root, `${job.label}${suffix}-text.txt`), data.docText);
  fs.writeFileSync(path.join(root, `${job.label}${suffix}-errors.txt`), [...errors, ...failed.map((f) => 'reqfail: ' + f)].join('\n') || '(none)');
  console.log(job.label, 'title=', data.title, 'scrollH=', data.scrollHeight, 'nodes=', data.nodes.length, 'errors=', errors.length, 'reqfail=', failed.length);
  await context.close();
}
await browser.close();
