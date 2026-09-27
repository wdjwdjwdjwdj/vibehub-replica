import { catalogData } from '../src/catalogData.js';
import { extraItemsByTopic } from '../src/termExtras.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const terms = [...Object.values(catalogData).flatMap((groups) => groups.flatMap((group) => group.items)).map((item) => item.length === 4 ? item[0] : item[2] || item[0]), ...Object.values(extraItemsByTopic).flatMap((items) => items.map((item) => item[0]))].filter((id, index, list) => list.indexOf(id) === index);
const topicRoutes = ['frontend', 'backend', 'product', 'testing', 'technology', 'ai', 'git', 'design'].flatMap((topic) => [`/topics/${topic}`, `/en/topics/${topic}`]);
const firstClassRoutes = ['/', '/en'];
const routes = [...firstClassRoutes, ...topicRoutes, ...terms.flatMap((term) => [`/${term}`, `/en/${term}`])];
const failures = [];
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  if (!response.ok) failures.push(`${route} -> ${response.status}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`route smoke passed: ${routes.length} routes`);
