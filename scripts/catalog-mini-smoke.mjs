import { chromium } from 'playwright';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const checks = [
  { route: '/en/topics/frontend', expected: ['stack-window', 'fc-component', 'fc-state', 'md-demo', 'html-demo', 'wf-css-card'] },
  { route: '/topics/frontend', expected: ['stack-window', 'fc-component', 'fc-state', 'md-demo', 'html-demo', 'wf-css-card'] },
  { route: '/en/topics/backend', expected: ['dom-demo', 'dns-demo', 'url-demo', 'http-demo', 'wf-cookie-card', 'https-demo'], allExpected: ['dom-demo', 'dns-demo', 'url-demo', 'http-demo', 'wf-cookie-card', 'https-demo', 'cdn-demo', 'fc-port', 'fc-redirect'] },
  { route: '/topics/backend', expected: ['dom-demo', 'dns-demo', 'url-demo', 'http-demo', 'wf-cookie-card', 'https-demo'], allExpected: ['dom-demo', 'dns-demo', 'url-demo', 'http-demo', 'wf-cookie-card', 'https-demo', 'cdn-demo', 'fc-port', 'fc-redirect'] },
  { route: '/en/topics/ai', expected: ['ai-basics', 'ai-hallucination', 'ai-vibe', 'ai-multimodal', 'ai-context', 'ai-token'], allExpected: ['ai-basics', 'ai-hallucination', 'ai-vibe', 'ai-multimodal', 'ai-context', 'ai-token', 'ai-window'] },
  { route: '/topics/ai', expected: ['ai-basics', 'ai-hallucination', 'ai-vibe', 'ai-multimodal', 'ai-context', 'ai-token'], allExpected: ['ai-basics', 'ai-hallucination', 'ai-vibe', 'ai-multimodal', 'ai-context', 'ai-token', 'ai-window'] },
  { route: '/en/topics/product', expected: ['product-story', 'product-use-case', 'product-flow', 'product-journey', 'product-prd', 'product-discovery'], allExpected: ['product-story', 'product-use-case', 'product-flow', 'product-journey', 'product-prd', 'product-discovery', 'product-mvp'] },
  { route: '/topics/product', expected: ['product-story', 'product-use-case', 'product-flow', 'product-journey', 'product-prd', 'product-discovery'], allExpected: ['product-story', 'product-use-case', 'product-flow', 'product-journey', 'product-prd', 'product-discovery', 'product-mvp'] },
  { route: '/en/topics/testing', expected: ['testing-acceptance', 'testing-case', 'testing-unit', 'testing-integration', 'testing-contract', 'testing-e2e'] },
  { route: '/topics/testing', expected: ['testing-acceptance', 'testing-case', 'testing-unit', 'testing-integration', 'testing-contract', 'testing-e2e'] },
  { route: '/en/topics/stack', expected: ['stack-terminal-preview', 'stack-devtools-preview', 'stack-npm-preview', 'stack-build-preview', 'stack-ci-preview', 'stack-lint-preview'] },
  { route: '/topics/stack', expected: ['stack-terminal-preview', 'stack-devtools-preview', 'stack-npm-preview', 'stack-build-preview', 'stack-ci-preview', 'stack-lint-preview'] },
  { route: '/en/topics/design', expected: ['design-minimal-preview', 'design-apple-preview', 'design-notion-preview', 'design-bento-preview', 'design-glass-preview', 'design-brutal-preview'], allExpected: ['design-minimal-preview', 'design-apple-preview', 'design-notion-preview', 'design-bento-preview', 'design-glass-preview', 'design-brutal-preview', 'design-swiss-preview', 'design-editorial-preview'] },
  { route: '/topics/design', expected: ['design-minimal-preview', 'design-apple-preview', 'design-notion-preview', 'design-bento-preview', 'design-glass-preview', 'design-brutal-preview'], allExpected: ['design-minimal-preview', 'design-apple-preview', 'design-notion-preview', 'design-bento-preview', 'design-glass-preview', 'design-brutal-preview', 'design-swiss-preview', 'design-editorial-preview'] },
  { route: '/en/topics/git', expected: ['git-history-preview', 'git-commit-preview', 'git-branch-preview', 'git-merge-preview', 'git-pull-preview', 'git-push-preview'], allExpected: ['git-history-preview', 'git-commit-preview', 'git-branch-preview', 'git-merge-preview', 'git-pull-preview', 'git-push-preview', 'git-clone-preview', 'git-pr-preview', 'git-worktree-preview', 'git-stash-preview', 'git-gitignore-preview', 'git-diff-preview'] },
  { route: '/topics/git', expected: ['git-history-preview', 'git-commit-preview', 'git-branch-preview', 'git-merge-preview', 'git-pull-preview', 'git-push-preview'], allExpected: ['git-history-preview', 'git-commit-preview', 'git-branch-preview', 'git-merge-preview', 'git-pull-preview', 'git-push-preview', 'git-clone-preview', 'git-pr-preview', 'git-worktree-preview', 'git-stash-preview', 'git-gitignore-preview', 'git-diff-preview'] },
];
const failures = [];

for (const { route, expected, allExpected } of checks) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(700);
  const result = await page.evaluate(({ expectedClasses, allExpectedClasses }) => {
    const cards = [...document.querySelectorAll('.term-card')].slice(0, 6);
    return {
      cardCount: document.querySelectorAll('.term-card').length,
      firstSix: cards.map((card) => card.querySelector('.catalog-mini-demo')?.className || ''),
      firstSixStructure: expectedClasses.map((selector) => Boolean(cards.some((card) => {
        const demo = card.querySelector('.catalog-mini-demo');
        return demo?.classList.contains(selector) || Boolean(card.querySelector(`.catalog-mini-demo .${selector}`));
      }))),
      allStructure: (allExpectedClasses || []).map((selector) => Boolean([...document.querySelectorAll('.term-card')].some((card) => {
        const demo = card.querySelector('.catalog-mini-demo');
        return demo?.classList.contains(selector) || Boolean(card.querySelector(`.catalog-mini-demo .${selector}`));
      }))),
      iframeCount: document.querySelectorAll('iframe').length,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  }, { expectedClasses: expected, allExpectedClasses: allExpected });
  const expectedShape = result.firstSix.every((className) => className.includes('catalog-mini-demo')) && result.firstSixStructure.every(Boolean) && result.allStructure.every(Boolean);
  if (result.cardCount < 6 || !expectedShape || result.iframeCount || result.overflow || errors.length) failures.push({ route, result, errors });
  await context.close();
}

await browser.close();
if (failures.length) { console.error(JSON.stringify(failures, null, 2)); process.exit(1); }
console.log(`catalog mini smoke passed: ${checks.length} localized topic surfaces`);
