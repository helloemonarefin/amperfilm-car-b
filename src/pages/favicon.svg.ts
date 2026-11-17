import type { APIRoute } from 'astro';
import { brandIconSvg } from '../lib/brandIcon';

export const GET: APIRoute = () =>
  new Response(brandIconSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
