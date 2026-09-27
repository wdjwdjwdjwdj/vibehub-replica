import { chromium } from 'playwright';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const productChapterSlugs = ['01-page-structure', '02-visual-direction', '03-hero-cta', '04-content-structure', '05-evidence-pricing-faq', '06-layout-surface', '07-form-and-interaction', '08-responsive', '09-delivery-and-agent'];
const gitChapterSlugs = ['01-working-tree-and-commit', '02-diff-and-gitignore', '03-branch-and-head', '04-merge-and-conflicts', '05-remote-and-collaboration', '06-restore-and-stash'];
const routes = [
  '/courses', '/en/courses',
  '/courses/product-website', '/en/courses/product-website',
  ...productChapterSlugs.flatMap((slug) => [`/courses/product-website/${slug}`, `/en/courses/product-website/${slug}`]),
  '/courses/git-workflow', '/en/courses/git-workflow',
  ...gitChapterSlugs.flatMap((slug) => [`/courses/git-workflow/${slug}`, `/en/courses/git-workflow/${slug}`]),
];
const gitRoutes = new Set(gitChapterSlugs.flatMap((slug) => [`/courses/git-workflow/${slug}`, `/en/courses/git-workflow/${slug}`]));
const productChapterRoutes = new Set(productChapterSlugs.flatMap((slug) => [`/courses/product-website/${slug}`, `/en/courses/product-website/${slug}`]));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];
const runtimeErrors = [];
page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`); });

for (const route of routes) {
  runtimeErrors.length = 0;
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    notFound: document.querySelector('.not-found') !== null,
    iframes: document.querySelectorAll('iframe').length,
    sections: document.querySelectorAll('.course-section').length,
    visuals: document.querySelectorAll('.course-inline-visual').length,
    outlineLinks: document.querySelectorAll('.course-outline a, .course-section-rail nav a').length,
    overviewCards: document.querySelectorAll('.course-chapter-card').length,
    overviewShell: document.querySelectorAll('.course-shell-main.course-home-shell').length,
  }));
  const needsSections = gitRoutes.has(route) || productChapterRoutes.has(route);
  const needsVisuals = productChapterRoutes.has(route);
  const needsOverview = route.endsWith('/courses/product-website') || route.endsWith('/courses/git-workflow');
  if (!result.h1 || result.notFound || result.iframes || runtimeErrors.length || (needsSections && (result.sections < 1 || result.outlineLinks < 2)) || (needsVisuals && result.visuals < 1) || (needsOverview && (result.overviewShell !== 1 || result.overviewCards < 1))) {
    failures.push(`${route} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
  }
}

await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`course render smoke passed: ${routes.length} bilingual course routes`);
