import { defineConfig, loadEnv } from 'vite';

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteName = env.VITE_SITE_NAME || '起站';
  const descriptor = env.VITE_SITE_DESCRIPTOR || 'AI 建站入门';
  const description = env.VITE_SITE_DESCRIPTION || `${siteName} — 帮助 AI 建站初学者理解关键概念并完成第一个网页。`;
  const logo = env.VITE_SITE_LOGO || '/qizhan-mark.svg';
  const favicon = env.VITE_SITE_FAVICON || '/qizhan-mark.svg';
  const values = { '__SITE_NAME__': siteName, '__SITE_DESCRIPTOR__': descriptor, '__SITE_DESCRIPTION__': description, '__SITE_LOGO__': logo, '__SITE_FAVICON__': favicon };
  return { publicDir: 'launch-public', plugins: [{ name: 'qizhan-site-meta', transformIndexHtml(html) { return Object.entries(values).reduce((result, [token, value]) => result.replaceAll(token, escapeHtml(value)), html); } }] };
});
