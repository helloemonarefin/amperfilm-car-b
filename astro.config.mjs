// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Private pages: noindex and kept out of the sitemap (BOILERPLATE §4.7).
const PRIVATE = ['/styleguide'];

export default defineConfig({
  // Placeholder domain until the client's is known (replace per client, together with site.ts → url; robots.txt is generated from it).
  site: 'https://amperfilm.example',
  output: 'static',
  trailingSlash: 'ignore',

  // Inline the (small) CSS in each page: no extra requests before first paint.
  build: { inlineStylesheets: 'always' },

  // DM Sans, self-hosted via Fontsource at build time (BUILD_PROMPT §3).
  fonts: [
    {
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      provider: fontProviders.fontsource(),
      weights: ['300 600'],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
    },
  ],

  integrations: [sitemap({ filter: (page) => !PRIVATE.some((p) => page.includes(p)) })],
});
