import { defineConfig } from 'vite';

const hasFileExtension = (pathname) => /\/[^/]+\.[^/]+$/.test(pathname);

export default defineConfig({
  publicDir: 'public',
  plugins: [{
    name: 'vibehub-desktop-qa-fallback',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname;
        if (!hasFileExtension(pathname) && !pathname.startsWith('/@')) request.url = '/vibehub.html';
        next();
      });
    },
  }],
  build: {
    outDir: 'dist-vibehub-qa',
    emptyOutDir: true,
    rollupOptions: { input: 'vibehub.html' },
  },
});
