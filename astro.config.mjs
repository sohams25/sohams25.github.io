// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Static site (prerendered) with one on-demand serverless route: src/pages/api/chat.ts
// marks `export const prerender = false`, so it becomes a Vercel function holding the
// GROQ_API_KEY. Everything else ships as static HTML for fast first paint.
export default defineConfig({
  site: 'https://sohamshinde.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
