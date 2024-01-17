import { defineConfig } from 'vite';
import viteSvgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    viteSvgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      shared: '/src/shared',
      pages: '/src/pages',
      widgets: '/src/widgets',
      features: '/src/features',
      entities: '/src/entities',
      app: '/src/app',
      api: '/src/api',
      assets: '/src/assets',
    },
  },
});
