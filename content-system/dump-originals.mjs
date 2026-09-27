// 取原站词条原文（铺量前的对照材料）
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
const want = ['api', '组件', '上下文窗口', '部署', '环境变量', 'mcp', 'MCP', 'prompt', '提示词', 'token', 'Token',
  'HTML', 'CSS', 'JavaScript', 'DOM', 'Cookie', 'HTTPS', '状态码', '缓存', 'Git', '请求'];
for (const w of want) {
  const e = entries.find(x => x.term === w || x.term.toLowerCase() === w.toLowerCase());
  if (e) console.log(JSON.stringify(e));
}
console.log('---\n全部词条名（找相近名用）:');
console.log(entries.map(e => e.term).join('、'));
