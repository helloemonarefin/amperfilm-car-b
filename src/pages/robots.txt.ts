// robots.txt (BOILERPLATE §4.9). Built from site.ts so a reskin only changes
// the domain in one place.
import type { APIRoute } from 'astro';
import { site } from '../content/site';

export const GET: APIRoute = ({ site: astroSite }) => {
  const base = (astroSite ?? new URL(site.url)).href.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
