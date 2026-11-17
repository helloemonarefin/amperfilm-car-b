// Dev helper: screenshot a built page at given widths.
// Usage: node scripts/shot.mjs <path> <outDir> [widths...]   (needs `astro preview --port 4399` running)
import { chromium } from '@playwright/test';
const PORT = process.env.PORT ?? 4399;
const [, , path = '/', out = 'screenshots', ...w] = process.argv;
const widths = w.length ? w.map(Number) : [1440, 390];
const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
  // Reveal everything so full-page shots aren't blank below the fold.
  await page.evaluate(async () => {
    document.documentElement.classList.remove('reveal-on');
    // Lazy images never load in a full-page shot: load them all first.
    const imgs = [...document.images];
    imgs.forEach((i) => (i.loading = 'eager'));
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const file = `${out}/${path.replace(/\W+/g, '_') || 'home'}-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file, 'horizontal overflow:', overflow);
  await page.close();
}
await browser.close();
