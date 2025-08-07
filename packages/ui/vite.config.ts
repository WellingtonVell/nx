/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'fs';
import * as path from 'path';
import react from '@vitejs/plugin-react';

function generateEntries() {
  const entries: Record<string, string> = {};

  const componentFiles = readdirSync(path.join(__dirname, 'src/components'))
    .filter(file => file.endsWith('.tsx') && !file.includes('.test.'))
    .map(file => file.replace('.tsx', ''));

  componentFiles.forEach(component => {
    entries[`components/${component}`] = `src/components/${component}.tsx`;
  });

  const libFiles = readdirSync(path.join(__dirname, 'src/lib'))
    .filter(file => file.endsWith('.ts') && !file.includes('.test.'))
    .map(file => file.replace('.ts', ''));

  libFiles.forEach(lib => {
    entries[`lib/${lib}`] = `src/lib/${lib}.ts`;
  });

  return entries;
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  resolve: {
    alias: {
      '@packages/ui': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: generateEntries(),
      name: 'ui',
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
});
