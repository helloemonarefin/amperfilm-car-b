// Placeholder favicon generator (BOILERPLATE §4.0): the brand's first letter
// on the ink colour. Colours are read from tokens.css so a reskin needs no edit
// here. Replace with the client's real icons when supplied.
import tokens from '../styles/tokens.css?raw';
import { site } from '../content/site';

const token = (name: string, fallback: string) =>
  tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? fallback;

export function brandIconSvg(): string {
  const ink = token('--brand-ink', '#121212');
  const paper = token('--brand-paper', '#F8F8F3');
  const letter = site.brand.charAt(0).toLowerCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${ink}"/>
<text x="32" y="44" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif" font-size="40" letter-spacing="-2" fill="${paper}">${letter}</text>
</svg>`;
}

/** Rasterise the SVG with sharp (Astro's own image dependency; no new package). */
export async function brandIconPng(size: number): Promise<Buffer> {
  const { default: sharp } = await import('sharp');
  return sharp(Buffer.from(brandIconSvg()), { density: 72 * (size / 64) * 4 })
    .resize(size, size)
    .png()
    .toBuffer();
}

/** Wrap one PNG in an ICO container (ICO files may embed PNG data). */
export function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  return Buffer.concat([header, entry, png]);
}
