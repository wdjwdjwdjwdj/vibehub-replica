import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { catalogData } from '../src/catalogData.js';

const output = new URL('../src/referenceDetails.js', import.meta.url);
const terms = [...new Set(
  Object.values(catalogData).flatMap((groups) => groups.flatMap((group) => group.items.map((item) => item[0])))
)];
const baseByLocale = { en: 'https://vibe-hub.org/en', zh: 'https://vibe-hub.org' };
const concurrency = Number(process.env.REFERENCE_CONCURRENCY || 4);

async function scrapeOne(page, locale, slug) {
  const response = await page.goto(`${baseByLocale[locale]}/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) return [slug, { status: response?.status() || 0 }];
  await page.waitForTimeout(80);
  const data = await page.evaluate(() => {
    const one = (selector) => document.querySelector(selector)?.innerText?.trim() || '';
    const many = (selector) => [...document.querySelectorAll(selector)].map((node) => node.innerText.trim()).filter(Boolean);
    const demo = document.querySelector('.dh-demo, .concept-stage, .style-demo-scroll-hint');
    return { title: one('h1'), quote: one('.dh-quote-text'), tagline: one('.dh-tagline'), question: one('.lesson-practice h2'), options: many('.lesson-practice-label'), prompt: one('.lesson-agent-prompt blockquote'), variants: many('.variant-name'), scenes: many('.scene-cap'), references: many('.reference-link'), demoClass: demo?.className || '', demoText: demo?.innerText?.trim() || '' };
  });
  return [slug, data];
}

async function scrapeLocale(browser, locale) {
  const entries = [];
  for (let start = 0; start < terms.length; start += concurrency) {
    const batch = terms.slice(start, start + concurrency);
    const pages = await Promise.all(batch.map(() => browser.newPage()));
    const result = await Promise.all(batch.map((slug, index) => scrapeOne(pages[index], locale, slug).catch((error) => [slug, { status: 0, error: error.message }])));
    entries.push(...result);
    await Promise.all(pages.map((page) => page.close()));
    console.log(`${locale}: ${Math.min(start + concurrency, terms.length)}/${terms.length}`);
  }
  return Object.fromEntries(entries);
}

await mkdir(new URL('../src/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ headless: true });
const referenceDetails = { en: await scrapeLocale(browser, 'en'), zh: await scrapeLocale(browser, 'zh') };
await browser.close();
await writeFile(output, `export const referenceDetails = ${JSON.stringify(referenceDetails)};\n`, 'utf8');
console.log(`wrote ${output.pathname}`);
