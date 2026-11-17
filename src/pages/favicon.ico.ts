import type { APIRoute } from 'astro';
import { brandIconPng, pngToIco } from '../lib/brandIcon';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(pngToIco(await brandIconPng(32), 32)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
