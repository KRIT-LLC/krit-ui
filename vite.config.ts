import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({ include: ['lib'], exclude: ['lib/stories/**'], insertTypesEntry: true }),
  ],
  resolve: { alias: { '@': resolve(__dirname, './lib') } },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'krit-ui',
      fileName: 'krit-ui',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
