import { chromium } from 'playwright';

const slugs = process.argv.slice(2);
const targets = slugs.length ? slugs : ['rag', 'prompt-injection', 'temperature', 'fine-tuning', 'reasoning-model', 'agent-memory', 'scope-creep', 'technical-debt', 'persona', 'prototype', 'event-tracking', 'stack-trace', 'timeout', 'websocket'];
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', colorScheme: 'light' });
for (const slug of targets) {
  const page = await context.newPage();
  await page.goto(`https://vibe-hub.org/en/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(250);
  const data = await page.evaluate(() => {
    const stage = document.querySelector('.concept-stage, .special-detail .detail-demo, .git-story');
    const detail = document.querySelector('.special-detail');
    return {
      stageClass: stage?.className || '',
      stageText: stage?.innerText.replace(/\s+/g, ' ').trim().slice(0, 1000) || '',
      stageHtml: stage?.outerHTML.slice(0, 14000) || '',
      specialClasses: [...(detail?.querySelectorAll(':scope > *, .special-section') || [])].map((node) => node.className),
      specialText: detail?.innerText.replace(/\s+/g, ' ').trim().slice(0, 2200) || '',
    };
  });
  console.log(`\n=== ${slug} ===\n${JSON.stringify(data, null, 2)}`);
  await page.close();
}
await context.close();
await browser.close();
