import { defineConfig, loadEnv } from 'vite';

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteName = env.VITE_SITE_NAME || 'VibeHub';
  const descriptor = env.VITE_SITE_DESCRIPTOR || 'Vibe Coding Terms';
  const description = env.VITE_SITE_DESCRIPTION || `${siteName} — a visual guide to Vibe Coding terms, practice, and working interface examples.`;
  const logo = env.VITE_SITE_LOGO || '/assets/vh-logo.png';
  const favicon = env.VITE_SITE_FAVICON || '/assets/vh-logo.png';
  const values = { '__SITE_NAME__': siteName, '__SITE_DESCRIPTOR__': descriptor, '__SITE_DESCRIPTION__': description, '__SITE_LOGO__': logo, '__SITE_FAVICON__': favicon };
  return { plugins: [{ name: 'vibehub-site-meta', transformIndexHtml(html) { return Object.entries(values).reduce((result, [token, value]) => result.replaceAll(token, escapeHtml(value)), html); } }] };
});
