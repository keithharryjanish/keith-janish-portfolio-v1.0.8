import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  root: 'site',
  publicDir: '../public',
  plugins: [{
    name: 'content-live-reload',
    configureServer(server) {
      const source = resolve('src');
      server.watcher.add(source);
      let timer;
      server.watcher.on('change', file => {
        if (!file.startsWith(source)) return;
        clearTimeout(timer);
        timer = setTimeout(async () => {
          try {
            const { execFile } = await import('node:child_process');
            execFile(process.execPath, ['scripts/generate.js'], (error) => {
              if (error) server.config.logger.error(error.message);
              else server.ws.send({type: 'full-reload'});
            });
          } catch (error) { server.config.logger.error(error.message); }
        }, 100);
      });
    }
  }],
  build: {
    outDir: '../dist', emptyOutDir: true,
    rollupOptions: {input: {
      home: resolve('site/index.html'),
      operation: resolve('site/projects/operation-station/index.html'),
      clockwork: resolve('site/projects/clockwork-trials/index.html'),
      missing: resolve('site/404.html')
    }}
  }
});
