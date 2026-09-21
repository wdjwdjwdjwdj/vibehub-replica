import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const slugs = ['http-status-code', 'stack-trace', 'timeout', 'object-storage', 'primary-key', 'session', 'oauth', 'webhook', 'http-methods', 'ip-address', 'websocket', 'merge-conflict', 'remote-repository', 'reset-revert', 'node-js', 'dependency', 'semantic-versioning', 'rag', 'prompt-injection', 'temperature', 'fine-tuning', 'reasoning-model', 'agent-memory', 'scope-creep', 'technical-debt', 'persona', 'prototype', 'event-tracking', 'regex', 'keyframe', 'prefers-reduced-motion', 'semantic-html'];
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const seen = new Set();
const outputs = {};

for (const slug of slugs) {
  const page = await context.newPage();
  await page.goto(`https://vibe-hub.org/en/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(160);
  const rows = await page.evaluate(() => [...document.styleSheets].flatMap((sheet) => {
    try { return [...sheet.cssRules].map((rule) => rule.cssText); } catch { return []; }
  }));
  const selected = rows.filter((rule) => /special-detail|concept-stage|wf-|rag-scene|injection-scene|temp-scene|ft-scene|rm-scene|memory-scene|scope-scene|debt-scene|persona-scene|proto-scene|track-scene/.test(rule));
  outputs[slug] = selected;
  selected.forEach((rule) => seen.add(rule));
  await page.close();
}

await context.close();
await browser.close();
await fs.mkdir('replication-evidence/round-2026-09-21/extra-details', { recursive: true });
await fs.writeFile('replication-evidence/round-2026-09-21/extra-details/original-special-rules.json', JSON.stringify(outputs, null, 2));
await fs.writeFile('replication-evidence/round-2026-09-21/extra-details/original-special-rules.css', [...seen].join('\n')); 
console.log(`wrote ${seen.size} unique CSS rules`);
