// Placeholder Open Graph image, 1200 × 630 (BOILERPLATE §4.0): the Home hero
// photo with the hero overlay and the brand name. Replace per client.
import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import tokens from '../styles/tokens.css?raw';
import { wordmark } from '../content/site';
import { hero } from '../content/home';

const token = (name: string, fallback: string) =>
  tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? fallback;

export const GET: APIRoute = async () => {
  const { default: sharp } = await import('sharp');
  // In dev the import is a /@fs URL; in build it's the original file path (fsPath).
  const src = (hero.image as unknown as { fsPath?: string }).fsPath ?? fileURLToPath(new URL(hero.image.src, 'file://'));
  const photo = await sharp(await readFile(src)).resize(1200, 630, { fit: 'cover' }).toBuffer();
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".45" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
</linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<text x="56" y="560" font-family="DM Sans, system-ui, sans-serif" font-size="120" letter-spacing="-6" fill="${token('--brand-paper', '#F8F8F3')}">${wordmark}</text>
</svg>`;
  const png = await sharp(photo).composite([{ input: Buffer.from(overlay) }]).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
