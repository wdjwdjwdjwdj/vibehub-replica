import { catalogData } from '../src/catalogData.js';
import { extraItemsByTopic } from '../src/termExtras.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const terms = [...Object.values(catalogData).flatMap((groups) => groups.flatMap((group) => group.items)).map((item) => item.length === 4 ? item[0] : item[2] || item[0]), ...Object.values(extraItemsByTopic).flatMap((items) => items.map((item) => item[0]))].filter((id, index, list) => list.indexOf(id) === index);
const chapterSlugs = ['page-structure', 'visual-direction', 'hero-cta', 'content-structure', 'evidence-pricing-faq', 'layout-surface', 'form-and-interaction', 'responsive', 'delivery-and-agent'];
const courseRoutes = ['/courses/product-website', ...chapterSlugs.map((slug, index) => `/courses/product-website/${String(index + 1).padStart(2, '0')}-${slug}`)].flatMap((route) => [route, `/en${route}`]);
const gitChapterSlugs = ['01-working-tree-and-commit', '02-diff-and-gitignore', '03-branch-and-head', '04-merge-and-conflicts', '05-remote-and-collaboration', '06-restore-and-stash'];
const gitCourseRoutes = ['/courses/git-workflow', ...gitChapterSlugs.map((slug) => `/courses/git-workflow/${slug}`)].flatMap((route) => [route, `/en${route}`]);
const topicRoutes = ['frontend', 'backend', 'product', 'testing', 'technology', 'ai', 'git', 'design'].flatMap((topic) => [`/topics/${topic}`, `/en/topics/${topic}`]);
const firstClassRoutes = ['/', '/en', '/practice', '/en/practice', '/anti-ai-flavor', '/en/anti-ai-flavor', '/vibehub-skill', '/en/vibehub-skill', '/vibehub-skill/lab', '/en/vibehub-skill/lab', '/changelog', '/en/changelog', '/courses', '/en/courses', '/courses/git-workflow', '/en/courses/git-workflow'];
const routes = [...firstClassRoutes, ...topicRoutes, ...courseRoutes, ...gitCourseRoutes, ...terms.flatMap((term) => [`/${term}`, `/en/${term}`])];
const failures = [];
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  if (!response.ok) failures.push(`${route} -> ${response.status}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`route smoke passed: ${routes.length} routes`);
