import { chromium } from 'playwright';

const sourceBase = 'https://vibe-hub.org';
const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const routes = {
  '/en/api': [
    ['hero', '.detail-hero', '.source-api-hero'],
    ['flow', '.flow-details', '.source-api-flow'],
    ['selector', '.selector-recommendation', '.selector-recommendation'],
    ['references', '.references-section', '.references-section'],
  ],
  '/en/ai-agent': [
    ['hero', '.detail-hero', '.source-ai-hero'],
    ['concept', '.concept-visual-section', '.source-ai-concept'],
    ['explanation', '.plain-explanation-section', '.source-ai-explanation'],
    ['quick-check', '.lesson-practice', '.quick-check'],
    ['prompt', '.lesson-agent-prompt', '.source-agent-prompt'],
    ['next', '.learning-section', '.source-ai-next'],
    ['comparison', '.term-comparison', '.source-ai-comparison'],
    ['selector', '.selector-recommendation', '.selector-recommendation'],
    ['references', '.references-section', '.references-section'],
  ],
  '/en/project-rules': [
    ['hero', '.detail-hero', '.source-project-hero'],
    ['concept', '.concept-visual-section', '.source-project-concept'],
    ['explanation', '.plain-explanation-section', '.source-project-explanation'],
    ['boundary', '.boundary-note', '.source-project-boundary'],
    ['extras', '.lesson-extras', '.source-project-extras'],
    ['next', '.learning-section', '.source-project-next'],
    ['selector', '.selector-recommendation', '.selector-recommendation'],
    ['references', '.references-section', '.references-section'],
  ],
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

async function inspect(url, selectors) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1100);
  return page.evaluate((selectors) => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { top: Math.round(rect.top + scrollY), height: Math.round(rect.height) };
    };
    return { main: box('main'), boxes: selectors.map(([name, selector]) => [name, box(selector)]), iframeCount: document.querySelectorAll('iframe').length };
  }, selectors);
}

const rows = [];
for (const [route, entries] of Object.entries(routes)) {
  const source = await inspect(`${sourceBase}${route}`, entries.map(([name, selector]) => [name, selector]));
  const local = await inspect(`${localBase}${route}`, entries.map(([name, , selector]) => [name, selector]));
  const diffs = entries.map(([name], index) => {
    const sourceBox = source.boxes[index][1];
    const localBox = local.boxes[index][1];
    return { name, topDelta: sourceBox && localBox ? localBox.top - sourceBox.top : null, heightDelta: sourceBox && localBox ? localBox.height - sourceBox.height : null };
  });
  rows.push({ route, sourceMain: source.main?.height, localMain: local.main?.height, diffs, iframeCount: local.iframeCount });
}

await browser.close();
console.log(JSON.stringify(rows, null, 2));

const failures = rows.flatMap((row) => [
  ...(row.diffs.filter((diff) => diff.topDelta === null || Math.abs(diff.topDelta) > 2 || Math.abs(diff.heightDelta) > 2).map((diff) => `${row.route}:${diff.name}`)),
  ...(Math.abs(row.localMain - row.sourceMain) > 2 ? [`${row.route}:main`] : []),
  ...(row.iframeCount ? [`${row.route}:iframe`] : []),
]);
if (failures.length) {
  console.error(`special detail geometry smoke failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`special detail geometry smoke passed: ${Object.keys(routes).length} source/local detail pairs`);
