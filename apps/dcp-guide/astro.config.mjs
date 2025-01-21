import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { jsdomPolyfill } from '../../package/shared/src';

export default defineConfig({
  outDir: '../../dist/apps/dcp-guide',
  integrations: [mdx(), react()],
  vite: {
    plugins: [jsdomPolyfill()],
  }
});
