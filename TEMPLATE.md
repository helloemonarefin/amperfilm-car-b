# Reskinning this template for a new client

A new client changes **brand tokens, copy, images and prices only**. Components never need editing: every value lives in `src/styles/tokens.css` or `src/content/`.

Run `npm install`, then `npm run dev` while you work. Finish with `npm run check` and `npm run build`; both must pass with no errors.

---

### 1. Brand colours: `src/styles/tokens.css`
Change the **Brand** block at the top only:
- `--brand-paper`: page background
- `--brand-ink`: text and dark sections
- `--brand-accent`: buttons, pills and glows
- `--brand-accent-soft`: pale accent fills

Also update the matching `--brand-ink-rgb` / `--brand-accent-rgb` triplets (same colours written as `R G B`), and `--table-featured-bg` (accent-soft at 55%).

Every other colour is derived from these. Leave type sizes, spacing and motion alone unless the new design changes them.

### 2. Font: `astro.config.mjs` → `fonts`
Change `name` (any Fontsource family) and `cssVariable`, then point `--font-sans` in `tokens.css` at the new variable. Use a **variable** font (`weights: ['300 600']`) so large headings render at their designed width.

### 3. Brand name, contact details and domain: `src/content/site.ts`
- `brand` + `mark` make up the wordmark everywhere: hero, menu, footer and sticky bar. The favicon, apple-touch icon and social-share image are also generated from them.
- `phone`, `email`, `address`, `hours`, `serviceArea`, `rating`, `reviewCount`, `installsCount`, `turnaroundHours` and `quoteHours` feed every section that shows them.
- `url` **and** `site` in `astro.config.mjs` must both be the live domain. Canonical URLs, the sitemap and `robots.txt` are built from it.
- `nav` (menu) and `footer.columns` list the pages. Update them when you add or remove a page.

### 4. Prices: `src/content/pricing.ts`
- `models`: the cars in the picker and the price table
- `packages`: name, short pill name, description, picker text, `inPicker`
- `prices[model][package]`: whole dollars; `null` shows "n/a"
- `bundles`: the signature offer price and saving
- `defaults`: the model and package selected on load

Prices are never typed anywhere else. The picker, price table, offer card, menu card and "from $…" lines all read this file.

### 5. Add or remove a model page: `src/content/models.ts`
Copy an entry and change `slug` (the URL becomes `/models/<slug>`), the hero copy and photo, and the model preselected in the picker (`sections('<model id>')`). No page file is needed. Add the car to `pricing.ts` and the link to `site.ts` → `nav`/`footer`.

### 6. Add or remove a service
- **Service card** (Home, model pages): `src/content/services.ts`.
- **Service page** (`/services/<slug>`): copy an entry in `src/content/servicePages.ts`.
- **Price:** add a package in `pricing.ts`.
- **Links:** add them in `site.ts`.

### 7. Copy and section order
- **Section copy** is written once in `src/content/blocks.ts` and reused on every page. Change a headline there and every page picks it up.
- **Page order:** each page lists its sections as an array:
  - Home: `home.ts`
  - Pricing and FAQ: `pages.ts`
  - Model pages: `models.ts`
  - Service pages: `servicePages.ts`
- Reorder, add or remove entries freely. Entries with `numbered: true` get the (01), (02)… index automatically.
- **Page-specific changes:** use `withProps(b.picker, { … })` to change one prop on one page.
- **Other copy:** FAQ items are in `faq.ts`, reviews in `reviews.ts`, install photos in `installs.ts`.
- **Copy limits:** the comments next to each field give the limit that keeps the layout intact. Empty optional fields hide their UI.

### 8. Images: `src/assets/images/`
- **Home hero:** drop **one** file named `hero.jpg`/`.png`/`.webp`/`.avif` into `home/` and delete the old one; no code change. Use at least 2560 px wide.
- **Every other photo** is imported in the content file that uses it. Replace the file under the same name, or change the import.
- **Alt text:** write it next to each photo in the content files. Leave `alt` empty only for purely decorative backgrounds.
- **Sizing:** Astro makes the responsive sizes and WebP versions. Hero quality is 80 by default; raise `quality` on a hero only if its photo has smooth gradients that band.

### 9. Icons and social image
`/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png` and `/og.png` are generated from the brand letter, the brand colours and the Home hero photo. To use real files from the client, put them in `public/` and delete the matching endpoint in `src/pages/`.

### 10. Check before handing over
- `npm run check`: 0 errors.
- `npm run build`: no warnings.
- `npm run preview -- --port 4322`, then run the QA scripts:
  - `PORT=4322 node scripts/audit.mjs <path>`: responsive layout at 27 widths
  - `node scripts/links.mjs`: links, anchors, alt text, image files
- Lighthouse on each page (targets: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100, CLS < 0.05).

Deploy settings are in `netlify.toml`. Forms use Netlify Forms, so they work only once the site is deployed on Netlify.
