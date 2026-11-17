// Placeholder Open Graph image, 1200 × 630 (BOILERPLATE §4.0).
// TODO(Phase 3): composite the hero photo once it is exported from Figma.
import type { APIRoute } from 'astro';
import tokens from '../styles/tokens.css?raw';
import { wordmark } from '../content/site';

const token = (name: string, fallback: string) =>
  tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? fallback;

export const GET: APIRoute = async () => {
  const { default: sharp } = await import('sharp');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="${token('--brand-ink', '#121212')}"/>
<text x="72" y="540" font-family="DM Sans, system-ui, sans-serif" font-size="140" letter-spacing="-7" fill="${token('--brand-paper', '#F8F8F3')}">${wordmark}</text>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
