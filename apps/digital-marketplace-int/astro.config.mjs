import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  outDir: '../../dist/apps/digital-marketplace-int',
  integrations: [react(), mdx()],
  trailingSlash: 'always'
});