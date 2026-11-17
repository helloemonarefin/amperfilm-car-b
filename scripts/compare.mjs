// Dev helper: screenshot one element at a viewport width and stack it above
// the Figma render (resized to the same width) for visual comparison.
// Usage: PORT=4322 node scripts/compare.mjs <path> <selector> <figma.png> <out.png> [width]
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const [, , path, selector, figma, out, w = '1440'] = process.argv;
const width = Number(w);
const PORT = process.env.PORT ?? 4399;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  document.documentElement.classList.remove('reveal-on');
  document.querySelectorAll('[data-intro]').forEach((el) => (el.style.animation = 'none'));
  const imgs = [...document.images];
  imgs.forEach((i) => (i.loading = 'eager'));
  await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  await document.fonts.ready;
});
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const shot = await el.screenshot();
await browser.close();

const ours = sharp(shot);
const om = await ours.metadata();
const theirs = figma ? await sharp(figma).resize({ width: om.width }).toBuffer() : null;
const tm = theirs ? await sharp(theirs).metadata() : { height: 0 };
const gap = 24;
await sharp({ create: { width: om.width, height: om.height + tm.height + gap, channels: 3, background: '#ff00aa' } })
  .composite([
    ...(theirs ? [{ input: theirs, left: 0, top: 0 }] : []),
    { input: shot, left: 0, top: tm.height + gap },
  ])
  .png()
  .toFile(out);
console.log(out, `ours ${om.width}×${om.height}`, theirs ? `figma→ ${om.width}×${tm.height}` : '');
