import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { termExtras } from '../src/termExtras.js';

const base = process.env.EXTRA_BASE_URL || 'https://vibe-hub.org';
const locale = process.env.EXTRA_LOCALE || 'en';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const rows = [];

for (const [topic, name, slug] of termExtras) {
  const page = await context.newPage();
  try {
    const response = await page.goto(`${base}${locale === 'en' ? '/en' : ''}/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(180);
    const data = await page.evaluate((status) => ({
      status,
      title: document.title,
      mainHeight: Math.round((document.querySelector('main')?.getBoundingClientRect().height || 0) * 10) / 10,
      bodyClasses: [...document.querySelectorAll('main > .detail-body, main > .detail')].map((node) => node.className),
      specialClasses: [...document.querySelectorAll('main [class*="special-detail"], main [class*="concept-stage"], main [class*="learning-section"]')].map((node) => node.className).slice(0, 16),
      headings: [...document.querySelectorAll('h2,h3,.section-title')].map((node) => node.innerText.trim()).filter(Boolean).slice(0, 16),
      sections: [...document.querySelectorAll('main > .detail-body > section, main .special-section')].map((node) => node.className),
      quote: document.querySelector('.dh-quote-text, .source-ai-quote p')?.innerText.trim() || '',
      tagline: document.querySelector('.dh-tagline, .source-ai-tagline')?.innerText.trim() || '',
      practice: {
        question: document.querySelector('.lesson-practice h2')?.innerText.trim() || '',
        options: [...document.querySelectorAll('.lesson-practice-label, .lesson-practice-option')].map((node) => node.innerText.trim()),
      },
      prompt: document.querySelector('.lesson-agent-prompt blockquote')?.innerText.trim() || '',
      references: [...document.querySelectorAll('.reference-link')].map((node) => node.innerText.trim()),
    }), response?.status() || 0);
    rows.push({ topic, name, slug, ...data });
  } catch (error) {
    rows.push({ topic, name, slug, status: 0, error: error.message });
  }
  await page.close();
  console.log(`${rows.length}/${termExtras.length} ${slug}`);
}

await context.close();
await browser.close();
await fs.mkdir('replication-evidence/round-2026-09-21/extra-details', { recursive: true });
const output = base.includes('127.0.0.1:5174') ? `replication-evidence/round-2026-09-21/extra-details/local-${locale}.json` : `replication-evidence/round-2026-09-21/extra-details/original-${locale}.json`;
await fs.writeFile(output, JSON.stringify(rows, null, 2));
console.log(`wrote ${rows.length} extra detail audits`);
