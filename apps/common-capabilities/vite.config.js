/// <reference types='vitest' />
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  // root: __dirname,
  // build: {
  //   outDir: '../../dist/apps/common-capabilities',
  //   reportCompressedSize: true,
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //   },
  // },
  // cacheDir: '../../node_modules/.vite/apps/common-capabilities',
  // server: {
  //   port: 4321,
  //   host: 'localhost',
  // },

  // preview: {
  //   port: 1234,
  //   host: 'localhost',
  // },

  plugins: [react(), nxViteTsPaths(), splitVendorChunkPlugin()],

  // test: {
  //   reporters: ['default'],
  //   coverage: {
  //     reportsDirectory: '../../coverage/apps/common-capabilities',
  //     provider: 'v8',
  //   },
  //   globals: true,
  //   cache: {
  //     dir: '../../node_modules/.vitest/apps/common-capabilities',
  //   },
  //   environment: 'jsdom',
  //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  // },
});