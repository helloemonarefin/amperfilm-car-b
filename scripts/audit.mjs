// Phase 4 audit: run Home at many widths and report layout problems.
// Usage: PORT=4322 node scripts/audit.mjs [path]
import { chromium } from '@playwright/test';
const PORT = process.env.PORT ?? 4399;
const path = process.argv[2] ?? '/';
const widths = [...new Set([...Array.from({ length: 22 }, (_, i) => 360 + i * 50), 390, 768, 1024, 1280, 1440])].sort((a, b) => a - b);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const w of widths) {
  await p.setViewportSize({ width: w, height: 900 });
  await p.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { document.documentElement.classList.remove('reveal-on'); document.querySelectorAll('[data-intro]').forEach((e) => (e.style.animation = 'none')); await document.fonts.ready; });
  await p.waitForTimeout(150);
  const r = await p.evaluate((w) => {
    const issues = [];
    const vw = document.documentElement.clientWidth;
    const scroll = document.documentElement.scrollWidth - vw;
    if (scroll > 0) issues.push(`H-SCROLL ${scroll}px`);
    const name = (el) => (el.id ? '#' + el.id : '') + '.' + [...el.classList].slice(0, 2).join('.') + ' "' + (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30) + '"';
    // Visible elements poking past the viewport (ignoring clipped ancestors).
    const clipped = (el) => { for (let a = el.parentElement; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== 'visible' && a !== document.body && a !== document.documentElement) return true; } return false; };
    for (const el of document.querySelectorAll('main *, header *, footer *')) {
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
      const rc = el.getBoundingClientRect(); if (!rc.width) continue;
      if ((rc.right > vw + 1 || rc.left < -1) && !clipped(el) && !el.closest('[aria-hidden="true"]')) issues.push(`OUTSIDE ${Math.round(rc.left)}..${Math.round(rc.right)} ${name(el)}`);
      // Text overflowing its own box
      if (el.children.length === 0 && el.textContent.trim() && el.scrollWidth > el.clientWidth + 1 && cs.overflowX !== 'visible' && cs.whiteSpace !== 'nowrap') issues.push(`TEXT-OVERFLOW ${name(el)}`);
    }
    // One-word last lines in headings
    if (w <= 480) for (const h of document.querySelectorAll('h1, h2, h3, .t-h2, .t-hero, .t-h2-xl, .t-h2-dark, .t-h2-sm, .t-quote')) {
      const lines = new Map();
      const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const re = /\S+/g; let m;
        while ((m = re.exec(n.data))) { const range = document.createRange(); range.setStart(n, m.index); range.setEnd(n, m.index + m[0].length); const rr = range.getClientRects()[0]; if (!rr) continue; const k = Math.round(rr.top); lines.set(k, [...(lines.get(k) ?? []), m[0]]); }
      }
      const ls = [...lines.values()];
      ls.forEach((words, i) => { if (ls.length > 1 && words.length === 1) issues.push(`ONE-WORD-LINE ${i + 1}/${ls.length} "${words[0]}" in ${name(h)}`); });
    }
    // Tap targets
    for (const el of document.querySelectorAll('a[href], button, summary, select, input:not([type=hidden]):not(.sr-only), label:has(input[type=radio])')) {
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[inert]') || el.closest('.sr-only') || el.classList.contains('sr-only') || el.classList.contains('skip-link')) continue;
      const rc = el.getBoundingClientRect(); if (!rc.width) continue;
      if (rc.width < 24 || rc.height < 24) issues.push(`TAP ${Math.round(rc.width)}x${Math.round(rc.height)} ${name(el)}`);
    }
    for (const el of document.querySelectorAll('input:not([type=hidden]):not([type=radio]), select, textarea')) {
      if (el.closest('.sr-only')) continue;
      const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 16) issues.push(`INPUT-FONT ${fs}px ${name(el)}`);
    }
    return issues;
  }, w);
  console.log(`${w}: ${r.length ? '\n  ' + [...new Set(r)].join('\n  ') : 'ok'}`);
}
await b.close();
