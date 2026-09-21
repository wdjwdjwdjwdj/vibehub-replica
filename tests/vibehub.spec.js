import { test, expect } from '@playwright/test';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';

test('VibeHub core routes and interactions', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => { Math.random = () => 0; });
  await page.goto(`${base}/en`);
  await expect(page).toHaveTitle('VibeHub | Vibe Coding Terms');
  await expect(page.getByRole('heading', { name: 'Frontend Terms for Vibe Coding' })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Community' }).click();
  await expect(page.getByRole('dialog', { name: /Learn and share/ })).toBeVisible();
  await page.getByRole('button', { name: 'Close community' }).click();
  await page.getByRole('button', { name: 'Theme color' }).click();
  await expect(page.getByRole('menu', { name: 'Theme colors' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Indigo' }).click();
  await page.getByRole('link', { name: 'Button', exact: true }).first().click();
  await expect(page).toHaveURL(/\/en\/button$/);
  await page.getByRole('heading', { name: 'Button', exact: true }).waitFor();
  await expect(page.getByRole('button', { name: 'Back to all entries' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Hear the pronunciation of Button' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Previous entry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Next entry' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Where did you first hear about VibeHub?' })).toBeVisible();
  await page.getByRole('button', { name: 'Close survey' }).click();
  await page.getByPlaceholder('you@example.com').fill('builder@example.com');
  await page.locator('.button-demo-shell').getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Signed in ✓')).toBeVisible();
  await page.getByLabel('Save to favorites').click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Terms' }).click();
  await page.getByRole('button', { name: /Favorites/ }).click();
  await expect(page.getByRole('heading', { name: 'Favorite Terms' })).toBeVisible();
  await page.getByRole('link', { name: 'Practice' }).click();
  await expect(page.getByRole('heading', { name: 'An account settings page has save profile, discard edits, delete account, and reset password. What is the clearest arrangement?' })).toBeVisible();
  await page.getByRole('button', { name: /Use buttons for save/ }).click();
  await expect(page.locator('.practice-term-panel')).toHaveClass(/is-revealed/);
  await expect(page.locator('.practice-embedded-detail')).toBeVisible();
  await page.reload();
  await expect(page.locator('#practice-question-title')).toBeVisible();
  await expect(page.locator('.practice-term-panel')).toHaveClass(/is-locked/);
  await expect(page.getByRole('heading', { name: 'An account settings page has save profile, discard edits, delete account, and reset password. What is the clearest arrangement?' })).toHaveCount(0);
  await page.getByRole('button', { name: /Practice area/ }).click();
  await expect(page.getByRole('option', { name: 'Frontend (136)' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Backend (59)' })).toBeVisible();
  await page.getByRole('option', { name: 'Frontend (136)' }).click();
  await expect(page.getByText('Frontend (136)', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'AI Slop' }).click();
  await expect(page.getByRole('heading', { name: 'Avoid AI Slop' })).toBeVisible();
  await page.getByRole('button', { name: 'UI defaults' }).click();
  await page.getByRole('link', { name: 'Skill' }).click();
  await expect(page.getByRole('heading', { name: /Turn rough ideas/ })).toBeVisible();
  await page.goto(`${base}/en/upload`);
  await page.locator('.dh-upload-demo input[type="file"]').setInputFiles({ name: 'draft.png', mimeType: 'image/png', buffer: Buffer.from('demo') });
  await expect(page.getByText('draft.png')).toBeVisible();
  await page.goto(`${base}/en/component`);
  await expect(page.getByText('Spot repetition', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Create component' }).click();
  await expect(page.getByText('Shared component', { exact: true }).first()).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
});

test('mobile layout renders without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/button`);
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
  await expect(page.getByRole('heading', { name: 'Button', exact: true })).toBeVisible();
  await page.goto(`${base}/en/upload`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator('.source-upload-scene-list')).toBeVisible();
  for (const route of ['/en/input', '/en/modal', '/en/card', '/en/markdown']) {
    await page.goto(`${base}${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.locator('.source-structured-scenes')).toBeVisible();
  }
  for (const route of ['/en/html', '/en/dns', '/en/typography', '/en/terminal']) {
    await page.goto(`${base}${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.locator('.source-extended-scenes')).toBeVisible();
  }
  for (const route of ['/en/api', '/en/ai-agent', '/en/project-rules']) {
    await page.goto(`${base}${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.locator('.source-focused-checks')).toBeVisible();
  }
  await page.goto(`${base}/en/vibehub-skill`);
  const skillWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(skillWidth).toBeLessThanOrEqual(390);
  await expect(page.locator('.skill-suggest-visual')).toBeVisible();
});

test('topic catalog keeps its card grid usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/topics/frontend`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.getByRole('heading', { name: 'Frontend Terms for Vibe Coding' })).toBeVisible();
  await expect(page.locator('.term-card').first()).toBeVisible();
  await page.goto(`${base}/en/topics/design`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.getByRole('heading', { name: 'Design Styles Terms for Vibe Coding' })).toBeVisible();
});

test('reference demo families expose working state changes', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };
  await page.goto(`${base}/en/markdown`);
  await dismissSurvey();
  await page.locator('.reference-pane-action').click();
  await expect(page.getByText(/Preview matches the structure\./)).toBeVisible();

  await page.goto(`${base}/en/hero`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Watch a demo →' }).click();
  await expect(page.getByText(/Demo is playing in the product preview\./)).toBeVisible();
  await page.getByRole('button', { name: 'Start for free' }).click();
  await expect(page.getByText('Your workspace is ready')).toBeVisible();

  await page.goto(`${base}/en/project-rules`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Agent behavior' }).click();
  await expect(page.getByText('Follows the rules while reading, editing, and verifying', { exact: true })).toBeVisible();

  await page.goto(`${base}/en/backend`);
  await dismissSurvey();
  await page.locator('.flow-detail-panel').filter({ hasText: 'Backend' }).click();
  await expect(page.getByText(/Validation passed/)).toBeVisible();

  await page.goto(`${base}/en/skeleton`);
  await dismissSurvey();
  await page.getByRole('button', { name: /Title/ }).click();
  await expect(page.getByText('Title is highlighted in the structure.', { exact: true })).toBeVisible();

  await page.goto(`${base}/en/enqueue`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Simulate and verify' }).click();
  await expect(page.getByText('Verified ✓', { exact: true })).toBeVisible();

  await page.goto(`${base}/en/javascript`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Complete' }).click();
  await expect(page.getByRole('button', { name: 'Done ✓' })).toBeVisible();

  await page.goto(`${base}/en/ai-agent`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Next step', exact: true })).toBeVisible();

  await page.goto(`${base}/en/style-minimal`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Start focus ↗' }).click();
  await expect(page.getByRole('button', { name: 'Completed ✓' })).toBeVisible();
});

test('changelog filters and term expansion work', async ({ page }) => {
  await page.goto(`${base}/en/changelog`);
  const close = page.getByRole('button', { name: 'Close survey' });
  if (await close.count()) await close.click();
  await expect(page).toHaveTitle('Changelog · VibeHub');
  await page.getByRole('button', { name: 'New Terms', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'New Hash and Pointer entries, plus light and dark modes' })).toBeVisible();
  await expect(page.getByText('Added 20 backend system terms covering data transactions, concurrency, and architecture.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Show all 20 terms' }).first().click();
  await expect(page.getByText('Audit Log', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show all 20 terms' }).first()).toBeHidden();
});

test('changelog mobile layout and month navigation work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/changelog`);
  const close = page.getByRole('button', { name: 'Close survey' });
  if (await close.count()) await close.click();
  await expect(page.getByRole('heading', { name: 'Changelog' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBeFalsy();
  await page.getByRole('button', { name: 'Sep 2026' }).click();
  await page.waitForTimeout(250);
  await expect(page.locator('#changelog-2026-09-13')).toBeInViewport();
});

test('Chinese default surface keeps source navigation and changelog coverage', async ({ page }) => {
  await page.goto(`${base}/`);
  await expect(page).toHaveTitle('VibeHub｜Vibe Coding 术语图鉴 · 用大白话找准前端、后端、AI 术语');
  await expect(page.getByRole('link', { name: '课程', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '前端 VibeCoding 术语', exact: true })).toBeVisible();
  await page.goto(`${base}/changelog`);
  await expect(page.getByRole('heading', { name: '更新日志', exact: true })).toBeVisible();
  await expect(page.locator('.changelog-entry')).toHaveCount(22);
  await expect(page.locator('.changelog-item')).toHaveCount(49);
  await page.getByRole('button', { name: '新增词汇', exact: true }).click();
  await expect(page.getByRole('heading', { name: '新增哈希与指针，支持明暗切换' })).toBeVisible();
});

test('all first-class pages render real content', async ({ page }) => {
  await page.addInitScript(() => { Math.random = () => 0; });
  const routes = [
    ['/en', 'Frontend Terms for Vibe Coding'],
    ['/en/practice', 'An account settings page has save profile, discard edits, delete account, and reset password. What is the clearest arrangement?'],
    ['/en/anti-ai-flavor', 'Avoid AI Slop'],
    ['/en/vibehub-skill', /Turn rough ideas/],
    ['/en/changelog', 'Changelog'],
    ['/en/courses', '课程'],
    ['/en/courses/product-website', '从零做一个产品官网'],
    ['/en/courses/product-website/01-page-structure', '页面结构与区块分工'],
    ['/en/courses/git-workflow', 'Git 工作流与版本管理'],
    ['/en/courses/git-workflow/01-working-tree-and-commit', '代码提交与版本保存'],
    ['/en/topics/backend', 'Backend Terms for Vibe Coding'],
    ['/en/topics/technology', 'Tech Stack Terms for Vibe Coding'],
    ['/button', '按钮Button'],
    ['/en/chat-ui', 'Chat UI'],
    ['/en/terminal', 'Terminal'],
  ];
  for (const [route, heading] of routes) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('h1')).toHaveText(heading);
    await expect(page.locator('iframe')).toHaveCount(0);
  }
  await page.goto(`${base}/en/anti-ai-flavor`);
  await expect(page.locator('.aif-card-grid')).toHaveCount(3);
  await page.getByRole('button', { name: 'UX shortcuts' }).click();
  await expect(page.locator('#aif-category-ux')).toBeVisible();
  await page.goto(`${base}/en/vibehub-skill`);
  await expect(page.locator('.skill-browser-demo')).toBeVisible();
  await expect(page.locator('.skill-install')).toBeVisible();
  await page.getByRole('button', { name: 'Tooltip' }).click();
  await expect(page.locator('.skill-browser-tooltip')).toBeVisible();
  await page.getByRole('button', { name: 'Copy install request' }).click();
  await expect(page.locator('.skill-install-prompt .skill-copy')).toHaveText(/Copied/);
  await page.getByRole('button', { name: 'Copy rewritten request' }).click();
  await expect(page.locator('.skill-rewrite-after .skill-copy')).toHaveText(/Copied/);
  await page.goto(`${base}/en/topics/frontend`);
  await expect(page.locator('.catalog-directory-page')).toBeVisible();
  await expect(page.locator('.term-card')).toHaveCount(137);
  await expect(page.locator('.survey-panel')).toBeVisible();
  await page.goto(`${base}/en/courses/product-website/01-page-structure`);
  await expect(page.locator('.course-reader-app')).toBeVisible();
  await expect(page.locator('.course-section-rail')).toBeVisible();
  await expect(page.locator('.course-reader-content')).toBeVisible();
  await expect(page.locator('.course-reader-section')).toHaveCount(4);
  await expect(page.locator('.course-inline-visual')).toHaveCount(2);
  await page.goto(`${base}/en/courses/product-website`);
  await expect(page.locator('.course-home-main')).toBeVisible();
  await expect(page.locator('.course-chapter-card')).toHaveCount(9);
  await expect(page.locator('.course-chapter-list-visual')).toHaveCount(9);
  await expect(page.locator('.course-home-shell')).toHaveCSS('overflow-y', 'auto');
  await expect(page.getByRole('link', { name: /从第一章开始/ })).toBeVisible();
});

test('course term references open and close the source-style detail panel', async ({ page }) => {
  await page.goto(`${base}/en/courses/product-website/01-page-structure`);
  await expect(page.locator('.course-term-ref')).toHaveCount(4);
  await page.locator('.course-term-ref').first().click();
  await expect(page.locator('.course-term-panel[role="dialog"]')).toHaveAttribute('aria-label', /Frontend term details/);
  await expect(page.locator('.course-term-panel .practice-embedded-detail')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Full term page ↗' })).toBeVisible();
  await page.getByRole('button', { name: 'Close term details' }).click();
  await expect(page.locator('.course-term-panel')).toHaveCount(0);

  await page.goto(`${base}/courses/product-website/01-page-structure`);
  await page.locator('.course-term-ref').first().click();
  await expect(page.locator('.course-term-panel[role="dialog"]')).toHaveAttribute('aria-label', /前端 术语详情/);
  await expect(page.getByRole('button', { name: '完整术语页 ↗' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.course-term-panel')).toHaveCSS('width', '390px');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('Git course overview opens a real chapter reader', async ({ page }) => {
  await page.goto(`${base}/en/courses/git-workflow`);
  await expect(page.getByRole('link', { name: /代码提交与版本保存/ })).toBeVisible();
  await page.getByRole('link', { name: /代码提交与版本保存/ }).click();
  await expect(page).toHaveURL(/\/en\/courses\/git-workflow\/01-working-tree-and-commit$/);
  await expect(page.getByRole('heading', { name: '代码提交与版本保存' })).toBeVisible();
  await expect(page.getByText('Chapter outline')).toBeVisible();
  await expect(page.locator('.course-section')).toHaveCount(13);
  await expect(page.getByRole('link', { name: /下一章/ })).toHaveCount(0);
  await expect(page.locator('.course-next-nav a').last()).toBeVisible();
});

test('Git term stories expose working state transitions', async ({ page }) => {
  await page.goto(`${base}/en/git`);
  const close = page.getByRole('button', { name: 'Close survey' });
  if (await close.count()) await close.click();
  await expect(page.locator('.source-git-hero')).toBeVisible();
  await expect(page.locator('.source-git-hero .git-file-card')).toBeVisible();
  await expect(page.locator('.source-git-hero .git-version-card')).toContainText('Homepage update committed');
  await expect(page.locator('.source-git-hero .git-story-answer')).toContainText('Git tracks commits');
  await page.goto(`${base}/en/branch`);
  await expect(page.locator('.git-story-graph-canvas .git-story-card')).toHaveCount(3);
  await page.locator('.git-story-card').nth(2).click();
  await expect(page.locator('.git-story-card').nth(2)).toHaveClass(/active/);
  await page.goto(`${base}/en/diff`);
  await expect(page.locator('.git-story-track-diff .git-story-card')).toHaveCount(2);
  await page.locator('.git-story-answer .demo-primary').click();
  await expect(page.locator('.git-story-card').nth(1)).toHaveClass(/active/);
});

test('detail demo families render native visual states', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };

  await page.goto(`${base}/en/card`);
  await dismissSurvey();
  await expect(page.locator('.dh-card-preview')).toBeVisible();
  await page.getByRole('button', { name: 'Start learning' }).click();
  await expect(page.getByText(/Learning started/)).toBeVisible();

  await page.goto(`${base}/en/tag`);
  await dismissSurvey();
  await expect(page.locator('.dh-tag-board .dh-tag')).toHaveCount(5);
  await page.locator('.dh-tag-board .dh-tag').last().click();
  await expect(page.getByText(/Tag removed/)).toBeVisible();

  await page.goto(`${base}/en/top-nav-layout`);
  await dismissSurvey();
  await expect(page.locator('.dh-layout-wire')).toBeVisible();
  await page.locator('.dh-layout-caption button').first().click();
  await expect(page.locator('.dh-layout-caption button').first()).toHaveClass(/is-active/);

  await page.goto(`${base}/en/flex`);
  await dismissSurvey();
  await page.locator('.anatomy-part-list button').first().click();
  await expect(page.locator('.concept-demo-result')).toContainText('item is highlighted');

  await page.goto(`${base}/en/typography`);
  await dismissSurvey();
  await page.locator('.dh-type-line').nth(1).click();
  await expect(page.locator('.dh-type-line').nth(1)).toHaveClass(/is-active/);
  await expect(page.locator('.dh-type-result')).toContainText('Section titles');

  await page.goto(`${base}/en/url`);
  await dismissSurvey();
  await page.locator('.dh-url-path button').nth(1).click();
  await expect(page.locator('.dh-url-path button').nth(1)).toHaveClass(/is-active/);

  await page.goto(`${base}/en/domain`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Add to list' }).click();
  await expect(page.getByText(/Added to list/)).toBeVisible();
});

test('native control, data, and feedback demos keep their real states', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };

  await page.goto(`${base}/en/input`);
  await dismissSurvey();
  await page.locator('.dh-control-form input').first().fill('builder@example.com');
  await page.getByRole('button', { name: 'Validate' }).click();
  await expect(page.getByText(/Email looks valid/)).toBeVisible();

  await page.goto(`${base}/en/table`);
  await dismissSurvey();
  await expect(page.locator('.dh-table-demo tbody tr')).toHaveCount(3);

  await page.goto(`${base}/en/tabs`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await expect(page.locator('.dh-tabs-nav button').nth(2)).toHaveClass(/is-active/);
  await expect(page.getByText('16 done projects')).toBeVisible();

  await page.goto(`${base}/en/modal`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Open interaction example' }).click();
  await expect(page.locator('.dh-overlay-modal')).toBeVisible();
  await page.locator('.dh-overlay-close').click();
  await expect(page.locator('.dh-overlay-modal')).toHaveCount(0);

  await page.goto(`${base}/en/pagination`);
  await dismissSurvey();
  await page.locator('.dh-pagination-demo button').filter({ hasText: '3' }).click();
  await expect(page.locator('.dh-pagination-demo button').filter({ hasText: '3' })).toHaveClass(/is-active/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/table`);
  await expect(page.locator('.dh-table-demo')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('site content demos expose their native page states', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };

  await page.goto(`${base}/en/faq`);
  await dismissSurvey();
  await expect(page.locator('.dh-faq-demo details')).toHaveCount(4);
  await page.locator('.dh-faq-demo details').nth(2).locator('summary').click();
  await expect(page.locator('.dh-faq-demo details').nth(2)).toHaveAttribute('open', '');

  await page.goto(`${base}/en/pricing`);
  await dismissSurvey();
  await page.getByRole('button', { name: /Pay annually/ }).click();
  await expect(page.locator('.dh-pricing-switch button').nth(1)).toHaveClass(/is-active/);
  await page.getByRole('button', { name: 'Upgrade to Pro' }).click();
  await expect(page.getByText('Pro: Upgrade to Pro')).toBeVisible();

  await page.goto(`${base}/en/header`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByText('Login opened')).toBeVisible();

  await page.goto(`${base}/en/user-voice`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Evidence' }).click();
  await expect(page.locator('.dh-voice-tabs button').nth(2)).toHaveClass(/is-active/);
  await expect(page.getByText('Verification method', { exact: true })).toBeVisible();
});

test('reference detail structures match the original teaching patterns', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };

  await page.goto(`${base}/en/html`);
  await dismissSurvey();
  await expect(page.locator('.catalog-html-layout')).toBeVisible();
  await expect(page.locator('.catalog-html-tree .html-node')).toHaveCount(6);

  await page.goto(`${base}/en/dns`);
  await dismissSurvey();
  await expect(page.locator('.catalog-dns-flow button')).toHaveCount(3);
  await page.getByRole('button', { name: 'Verify lookup' }).first().click();
  await expect(page.getByText('The record and target are checked ✓')).toBeVisible();

  await page.goto(`${base}/en/provider`);
  await dismissSurvey();
  await expect(page.locator('.catalog-provider-flow .catalog-provider-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Trace request' }).click();
  await expect(page.getByText('Provider path verified ✓')).toBeVisible();

  await page.goto(`${base}/en/user-story`);
  await dismissSurvey();
  await page.getByRole('button', { name: 'Add user goal' }).click();
  await expect(page.getByText('A traveler saves an unfinished itinerary')).toBeVisible();

  await page.goto(`${base}/en/ai-basics`);
  await dismissSurvey();
  await expect(page.locator('.catalog-ai-basics-grid button')).toHaveCount(6);
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.locator('.catalog-ai-basics-grid button').nth(1)).toHaveClass(/is-active/);
  await expect(page.locator('.dh-generic-detail, .reference-content-stage')).toHaveCount(0);
});

test('API flow follows the original six-state save journey in both languages', async ({ page }) => {
  const dismissSurvey = async () => { const close = page.getByRole('button', { name: 'Close survey' }); if (await close.count()) await close.click(); };
  for (const [route, saveLabel, nextLabel, firstState, finalState] of [
    ['/en/api', 'Save', 'Next', '1 / 6', '6 / 6'],
    ['/api', '保存', '下一步', '1 / 6', '6 / 6'],
  ]) {
    await page.goto(`${base}${route}`);
    await dismissSurvey();
    await expect(page.locator('.flow-detail-now strong')).toHaveText(firstState);
    const previousLabel = route.startsWith('/en') ? 'Previous' : '上一步';
    await expect(page.getByRole('button', { name: previousLabel, exact: true })).toBeDisabled();
    await page.getByRole('button', { name: saveLabel, exact: true }).click();
    await expect(page.locator('.flow-detail-now strong')).toHaveText('2 / 6');
    for (let index = 0; index < 4; index += 1) await page.getByRole('button', { name: nextLabel, exact: true }).click();
    await expect(page.locator('.flow-detail-now strong')).toHaveText(finalState);
    await expect(page.locator('.flow-detail-zone-frontend')).toHaveClass(/is-active/);
    await expect(page.locator('.flow-db-mini')).toHaveClass(/db-saved/);
    await expect(page.getByRole('button', { name: nextLabel, exact: true })).toBeDisabled();
  }
});

test('detail quick checks use the source answer position', async ({ page }) => {
  await page.goto(`${base}/en/upload`);
  const dismissSurvey = page.getByRole('button', { name: 'Close survey' });
  if (await dismissSurvey.count()) await dismissSurvey.click();
  const options = page.locator('.quick-check .quiz-options button');
  await expect(options).toHaveCount(3);
  await options.nth(1).click();
  await expect(options.nth(1)).toHaveClass(/correct/);
  await expect(page.locator('.quick-check .quiz-result.success')).toBeVisible();
  await page.reload();
  await expect(page.locator('.quick-check .quiz-result')).toHaveCount(0);
});

test('Button and Git detail quick checks follow the source reading order', async ({ page }) => {
  await page.goto(`${base}/en/button`);
  const buttonDemo = await page.locator('.button-demo-shell').boundingBox();
  const buttonQuickCheck = await page.locator('.quick-check').first().boundingBox();
  const buttonAnatomy = await page.locator('.source-anatomy-section h2').filter({ hasText: 'Anatomy' }).first().boundingBox();
  expect(buttonDemo).not.toBeNull();
  expect(buttonQuickCheck).not.toBeNull();
  expect(buttonAnatomy).not.toBeNull();
  expect(buttonQuickCheck.y).toBeGreaterThan(buttonDemo.y);
  expect(buttonQuickCheck.y).toBeLessThan(buttonAnatomy.y);
  const deleteScene = page.locator('.source-button-scene-collection .scene-item').filter({ hasText: 'Delete confirmation' });
  await deleteScene.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page.locator('.source-scene-feedback')).toHaveCount(0);

  await page.goto(`${base}/en/git`);
  await expect(page.locator('.source-git-hero')).toBeVisible();
  await expect(page.locator('.quick-check')).toHaveCount(1);
  await expect(page.locator('.source-git-usage-detail')).toHaveCSS('grid-template-columns', '916px');
  await page.locator('.source-git-scene-collection').getByRole('button', { name: /Bug fix/ }).click();
  await expect(page.locator('.source-git-scene-collection')).toContainText('git log --oneline');

  await page.goto(`${base}/en/upload`);
  await expect(page.locator('.source-upload-usage')).toBeVisible();
  await expect(page.locator('.quick-check')).toHaveCount(1);
  const uploadDemo = await page.locator('.dh-upload-demo').boundingBox();
  const uploadQuickCheck = await page.locator('.quick-check').first().boundingBox();
  expect(uploadDemo).not.toBeNull();
  expect(uploadQuickCheck).not.toBeNull();
  expect(uploadQuickCheck.y).toBeGreaterThan(uploadDemo.y);
  await page.locator('.source-upload-variant-grid button').nth(1).click();
  await expect(page.locator('.source-variant-result')).toContainText('Button');
  const csvScene = page.locator('.source-upload-scene-list article').filter({ hasText: 'CSV import' });
  await csvScene.getByRole('button', { name: 'Start import' }).click();
  await expect(csvScene).toHaveClass(/active/);

  for (const route of ['/en/input', '/en/modal', '/en/card', '/en/markdown']) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('.source-structured-usage')).toBeVisible();
    await expect(page.locator('.source-structured-scenes')).toBeVisible();
    await expect(page.locator('.quick-check')).toHaveCount(1);
    const demo = await page.locator('.reference-stage, .demo-shell').first().boundingBox();
    const quickCheck = await page.locator('.quick-check').first().boundingBox();
    expect(demo).not.toBeNull();
    expect(quickCheck).not.toBeNull();
    expect(quickCheck.y).toBeGreaterThan(demo.y);
  }

  await page.goto(`${base}/en/modal`);
  await page.locator('.source-structured-variant-grid button').nth(1).click();
  await expect(page.locator('.source-variant-result')).toContainText('Form');
  const modalScene = page.locator('.source-structured-scene-list article').filter({ hasText: 'Delete confirmation' });
  await modalScene.getByRole('button', { name: 'Confirm deletion' }).click();
  await expect(modalScene).toHaveClass(/active/);

  await page.goto(`${base}/en/markdown`);
  await page.locator('.source-structured-variant-grid button').nth(2).click();
  await expect(page.locator('.source-variant-result')).toContainText('Code Fence');

  for (const route of ['/en/html', '/en/dns', '/en/typography', '/en/terminal']) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('.source-extended-usage')).toBeVisible();
    await expect(page.locator('.source-extended-scenes')).toBeVisible();
    await expect(page.locator('.quick-check')).toHaveCount(1);
    const demo = await page.locator('.reference-stage, .demo-shell').first().boundingBox();
    const quickCheck = await page.locator('.quick-check').first().boundingBox();
    expect(demo).not.toBeNull();
    expect(quickCheck).not.toBeNull();
    expect(quickCheck.y).toBeGreaterThan(demo.y);
    await page.locator('.source-extended-variant-grid button').nth(1).click();
    await expect(page.locator('.source-variant-result')).toContainText(route === '/en/html' ? 'Headings & p' : route === '/en/dns' ? 'CNAME' : route === '/en/typography' ? 'Section Title' : 'npm run');
    await page.locator('.source-extended-scene-list article').nth(1).getByRole('button').last().click();
    await expect(page.locator('.source-scene-feedback')).toBeVisible();
  }

  for (const route of ['/en/api', '/en/ai-agent', '/en/project-rules']) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('.source-focused-checks')).toBeVisible();
    await expect(page.locator('.quick-check')).toHaveCount(1);
    const demo = await page.locator('.reference-stage').first().boundingBox();
    const quickCheck = await page.locator('.quick-check').first().boundingBox();
    expect(demo).not.toBeNull();
    expect(quickCheck).not.toBeNull();
    expect(quickCheck.y).toBeGreaterThan(demo.y);
  }
  await page.goto(`${base}/en/ai-agent`);
  await expect(page.locator('.source-focused-card-grid article')).toHaveCount(3);
  await expect(page.locator('.source-focused-decision')).toBeVisible();
  await page.goto(`${base}/en/project-rules`);
  await expect(page.locator('.source-focused-note-section')).toBeVisible();
});

test('Button detail keeps the source prompt structure and language-specific scenes', async ({ page }) => {
  for (const [route, sceneCount, title, quote] of [
    ['/en/button', 4, 'You can say this to an AI Agent', 'Clarify the account settings page'],
    ['/button', 2, '你可以这样告诉 AI Agent', '请整理账号设置页'],
  ]) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('.lesson-agent-prompt')).toBeVisible();
    await expect(page.locator('.lesson-agent-prompt h2')).toHaveText(title);
    await expect(page.locator('.lesson-agent-prompt blockquote')).toContainText(quote);
    await expect(page.locator('.source-button-scene-collection .scene-item')).toHaveCount(sceneCount);
    await expect(page.locator('.detail-article > .prose-block:visible')).toHaveCount(0);
  }
});

test('original localStorage keys are read and written compatibly', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('vibehub:favorites', JSON.stringify({ version: 1, items: [{ termId: 'button', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' }] }));
    localStorage.setItem('vibehub-color-mode', 'dark');
    localStorage.setItem('vibehub-source-survey-shown-v1', '1');
  });
  await page.goto(`${base}/en/button`);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByLabel('Remove from favorites')).toBeVisible();
  await expect(page.locator('.survey-panel')).toHaveCount(0);
  await page.getByLabel('Remove from favorites').click();
  const storage = await page.evaluate(() => ({ favorites: JSON.parse(localStorage.getItem('vibehub:favorites')), colorMode: localStorage.getItem('vibehub-color-mode'), survey: localStorage.getItem('vibehub-source-survey-shown-v1') }));
  expect(storage.favorites).toEqual({ version: 1, items: [] });
  expect(storage.colorMode).toBe('dark');
  expect(storage.survey).toBe('1');
});

test('favorites stay synchronized across topic and detail routes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
  await page.goto(`${base}/en/topics/frontend`);
  const firstCard = page.locator('.term-card').first();
  const termLink = firstCard.locator('.card-title-link');
  const termName = await firstCard.locator('h3').innerText();
  await firstCard.getByRole('button').click();
  await termLink.click();
  await expect(page.getByRole('heading', { name: termName, exact: true })).toBeVisible();
  await expect(page.getByLabel('Remove from favorites')).toBeVisible();
});

test('fresh visits do not manufacture original state keys', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto(`${base}/en`);
  const storage = await page.evaluate(() => ({ favorites: localStorage.getItem('vibehub:favorites'), colorMode: localStorage.getItem('vibehub-color-mode'), survey: localStorage.getItem('vibehub-source-survey-shown-v1') }));
  expect(storage).toEqual({ favorites: null, colorMode: null, survey: null });
});

test('Skill learning lab completes its guided exercise', async ({ page }) => {
  await page.goto(`${base}/en/vibehub-skill/lab`);
  await expect(page.getByRole('heading', { name: 'Make the product homepage feel more polished' })).toBeVisible();
  await page.locator('.learning-option-cards button').nth(1).click();
  await page.getByRole('button', { name: 'Choose this direction' }).click();
  await page.getByRole('button', { name: /Start trying it first/ }).click();
  await expect(page.locator('.learning-controls input[type="range"]')).toHaveCount(3);
  await page.locator('.learning-controls input[type="range"]').nth(0).fill('80');
  await page.getByRole('button', { name: 'Ready to check it' }).click();
  const checks = page.locator('.learning-checks button');
  await expect(checks).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) await checks.nth(index).click();
  await expect(page.getByText('This adjustment passes your checks.')).toBeVisible();
  await page.getByRole('button', { name: 'Turn this into an edit request' }).click();
  await expect(page.getByText('This exercise is complete')).toBeVisible();
  await page.getByRole('button', { name: 'Copy edit request' }).click();
  await expect(page.getByRole('button', { name: 'Copied ✓' }).first()).toBeVisible();
});

test('survey scope follows the original term surfaces', async ({ page }) => {
  await page.goto(`${base}/en/topics/frontend`);
  await expect(page.locator('.survey-panel')).toBeVisible();
  await page.goto(`${base}/en/button`);
  await expect(page.locator('.survey-panel')).toBeVisible();
  for (const path of ['/en/courses', '/en/practice', '/en/anti-ai-flavor', '/en/vibehub-skill', '/en/changelog', '/en/vibehub-skill/lab']) {
    await page.goto(`${base}${path}`);
    await expect(page.locator('.survey-panel')).toHaveCount(0);
  }
});
