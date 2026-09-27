import { defineConfig } from 'vite';

// 主线唯一构建配置（2026-09-23 起站产品线收敛后）
// 原「起站 · AI 建站入门」产品线已归档至 archive/qizhan-line-2026-09-23/，不再由 Vite 加载。
const hasFileExtension = (pathname) => /\/[^/]+\.[^/]+$/.test(pathname);

export default defineConfig({
  publicDir: 'public',
  server: { port: 5174, host: '127.0.0.1' },
  preview: { port: 5174, host: '127.0.0.1' },
  plugins: [{
    name: 'vibehub-spa-fallback',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname;
        if (!hasFileExtension(pathname) && !pathname.startsWith('/@')) request.url = '/index.html';
        next();
      });
    },
  }],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input: { index: 'index.html' } },
  },
});
