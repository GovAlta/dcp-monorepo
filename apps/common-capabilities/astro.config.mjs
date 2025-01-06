import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { jsdomPolyfill } from '../../package/shared/src';

export default defineConfig({
  outDir: '../../dist/apps/common-capabilities',
  integrations: [react(), mdx()],
  vite: {
    plugins: [jsdomPolyfill()],
  }
});
