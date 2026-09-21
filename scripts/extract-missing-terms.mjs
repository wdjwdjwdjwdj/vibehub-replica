import { chromium } from 'playwright';
import fs from 'node:fs';

const ids = ['http-status-code','stack-trace','timeout','merge-conflict','remote-repository','reset-revert','node-js','dependency','semantic-versioning','rag','prompt-injection','temperature','fine-tuning','reasoning-model','agent-memory','scope-creep','technical-debt','persona','prototype','event-tracking','object-storage','primary-key','session','oauth','webhook','http-methods','ip-address','websocket','regex','keyframe','prefers-reduced-motion','semantic-html'];
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await context.newPage();
const rows = [];
for (const id of ids) {
  await page.goto(`https://vibe-hub.org/en/${id}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(700);
  rows.push(await page.evaluate((id) => {
    const text = (sel) => document.querySelector(sel)?.textContent?.replace(/\s+/g, ' ').trim() || '';
    return {
      id,
      title: document.title,
      h1: text('.detail-hero h1, .detail-heading h1'),
      description: text('.dh-quote-text'),
      intro: `${text('.dh-summary-lead')} ${text('.dh-tagline')}`.trim(),
    };
  }, id));
}
fs.writeFileSync('replication-evidence/round-2026-09-21/missing-terms.json', JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));
await browser.close();
