import { defineConfig } from 'vite';
import { resolve, sep } from 'node:path';
import { execFile } from 'node:child_process';
import { readdirSync } from 'node:fs';

export default defineConfig(({command}) => ({
  root: 'site',
  publicDir: '../public',
  plugins: [{
    name: 'content-live-reload',
    configureServer(server) {
      const sources = ['src', 'public'].map(dir => resolve(dir) + sep);
      server.watcher.add(['src', 'public'].map(dir => resolve(dir)));
      let timer, running = false, pending = false, closed = false;
      function regenerate() {
        if (closed) return;
        if (running) { pending = true; return; }
        running = true;
        execFile(process.execPath, ['scripts/generate.js'], (error) => {
          running = false;
          if (closed) return;
          if (pending) { pending = false; regenerate(); return; }
          if (error) server.config.logger.error(error.message);
          else server.ws.send({type: 'full-reload'});
        });
      }
      const onContent = (event, file) => {
        if (!['add', 'change', 'unlink'].includes(event) || !sources.some(source => file.startsWith(source))) return;
        clearTimeout(timer);
        timer = setTimeout(regenerate, 100);
      };
      server.watcher.on('all', onContent);
      server.httpServer?.once('close', () => {
        closed = true;
        clearTimeout(timer);
        server.watcher.off('all', onContent);
      });
    }
  }],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve('site/index.html'),
        resolve('site/404.html'),
        ...(command === 'build' ? readdirSync('site/projects', {withFileTypes:true})
          .filter(entry => entry.isDirectory())
          .map(entry => resolve('site/projects', entry.name, 'index.html')) : [])
      ]
    }
  }
}));
