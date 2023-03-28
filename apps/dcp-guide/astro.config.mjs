import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  outDir: '../../dist/apps/dcp-guide',
  integrations: [react()],
});
