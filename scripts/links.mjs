// QA helper (Phase 7): checks every built page for broken internal links,
// missing anchors, external-link attributes, <img> without alt and missing
// image files. Usage: npm run build && node scripts/links.mjs
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p); else if (p.endsWith('.html')) pages.push(p);
});
walk(dist);
// The styleguide is private (noindex, not linked) and uses demo "#" links.
pages.splice(pages.findIndex((p) => p.includes('styleguide')), 1);

const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const fileFor = (path) => {
  const clean = decodeURI(path.split('#')[0].split('?')[0]);
  const cands = [join(dist, clean), join(dist, clean, 'index.html'), join(dist, clean + '.html')];
  return cands.find((c) => existsSync(c) && statSync(c).isFile());
};

let problems = 0, links = 0, imgs = 0;
const report = (page, msg) => { problems++; console.log(`${page}: ${msg}`); };

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const own = ids(html);
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    links++;
    if (!href || href === '#') { report(page, `empty link "${href}"`); continue; }
    if (/^(mailto:|tel:|sms:)/.test(href)) continue;
    if (/^https?:/.test(href)) continue; // checked below
    if (href.startsWith('#')) { if (!own.has(href.slice(1))) report(page, `missing anchor ${href}`); continue; }
    const target = fileFor(href);
    if (!target) { report(page, `broken link ${href}`); continue; }
    const hash = href.split('#')[1];
    if (hash && !ids(readFileSync(target, 'utf8')).has(hash)) report(page, `missing anchor ${href}`);
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*href="https?:[^"]*"[^>]*>/g)) {
    if (!/target="_blank"/.test(tag) || !/rel="noopener noreferrer"/.test(tag)) report(page, `external link without target/rel: ${tag.slice(0, 80)}`);
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    imgs++;
    if (!/\salt(=|\s|>)/.test(tag)) report(page, `img without alt: ${tag.slice(0, 80)}`);
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (src && !src.startsWith('data:') && !fileFor(src)) report(page, `missing image ${src}`);
    for (const [, set] of tag.matchAll(/srcset="([^"]+)"/g)) {
      for (const part of set.split(',')) {
        const u = part.trim().split(' ')[0];
        if (u && !fileFor(u)) report(page, `missing srcset image ${u}`);
      }
    }
  }
}
console.log(`${pages.length} pages, ${links} links, ${imgs} images, ${problems} problems`);
process.exit(problems ? 1 : 0);
