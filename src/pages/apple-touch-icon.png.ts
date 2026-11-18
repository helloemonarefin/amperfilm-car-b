// iOS home-screen icon (180 × 180), built from the client's favicon
// (public/favicon.svg, owner 2026-11-18): the mark centred on the brand paper
// colour, because iOS fills transparent icons with black. Colours come from
// tokens.css, so a reskin only swaps public/favicon.svg (+ .ico).
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import icon from '../../public/favicon.svg?raw';
import tokens from '../styles/tokens.css?raw';

const SIZE = 180;
const PAD = 0.16; // breathing room around the mark (iOS rounds the corners)

export const GET: APIRoute = async () => {
  const paper = tokens.match(/--brand-paper:\s*(#[0-9a-fA-F]{3,8})/)?.[1] ?? '#FFFFFF';
  const inner = Math.round(SIZE * (1 - PAD * 2));
  const mark = await sharp(Buffer.from(icon), { density: 300 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const png = await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: paper } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
