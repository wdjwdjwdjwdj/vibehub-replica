// 检查深度素材的归宿：相关词条是否已存在于原站
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../main-site-snapshot/index.html', import.meta.url), 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const idx = js.search(/(?:const|let|var)\s+entries\s*=\s*/);
const start = js.indexOf('=', idx) + 1;
let depth = 0, inStr = null, esc = false, end = -1;
for (let i = start; i < js.length; i++) {
  const c = js[i];
  if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
  if (c === '[' || c === '{') depth++;
  else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const entries = eval('(' + js.slice(start, end) + ')');
for (const t of ['Cookie', 'WebSocket', '缓存', '请求', '响应', '状态码', 'HTTPS', '接口', '数据库', '组件', '渲染', '内存', '本地存储', '后端', '服务器', '加密', '登录']) {
  const hit = entries.filter(e => e.term.includes(t));
  console.log(t + ': ' + (hit.length ? hit.map(e => `${e.term}(${e.level})`).join('、') : '无'));
}
