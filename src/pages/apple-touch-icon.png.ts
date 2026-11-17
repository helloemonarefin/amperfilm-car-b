import type { APIRoute } from 'astro';
import { brandIconPng } from '../lib/brandIcon';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await brandIconPng(180)), { headers: { 'Content-Type': 'image/png' } });
