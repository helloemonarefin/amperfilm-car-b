# Master D — Design System (template edition)

**Source:** Figma file "My Portfolio" › page **Master D** (page id `318:121`). Nine desktop frames at 1440 wide. Sample brand in the file: **"amperfilm®"**, an EV-only paint protection, tint and coating studio in Austin.

**Purpose:** Master D is a **template**. Each new client gets the same layout and components with new copy, images, prices and a few brand values. This file says what's fixed and what changes per client. It also contains the full `tokens.css` (§11).

**Goes with:** `BOILERPLATE-GUIDELINES.md`. That file covers how the site is built: setup, entrance animation (§7), typography method (§6), accessibility and conventions. This file only covers how Master D looks and behaves.

**Labels used here:**
- **Figma** = measured from the file.
- **Proposed** = not in the file, decided here. The file has no mobile frames, no hover states and no text styles.
- ⚠ = an inconsistency in the Figma file. They're collected in §10.

---

## 1. Template model: what changes per client

| Layer | What it includes | Per client? |
|---|---|---|
| **Brand slot** | `--brand-ink`, `--brand-paper`, `--brand-accent`, `--brand-accent-soft`, the font, the wordmark text | Yes: 4 colours + 1 font + the brand name |
| **Content** | Copy, images, prices, models, packages, reviews, FAQ, contact details | Yes, from content files |
| **Section list** | Which sections each page uses and in what order | Yes: on/off and reorder only |
| **Skeleton** | Rails, grid, spacing, type scale, glass system, components, motion | No, never edited per client |

**Content rules:**
- Client facts (name, phone, email, address, hours, service area, rating, review count, install count, turnaround) live **once** in `src/content/site.ts`.
- **Prices live once**, in `src/content/pricing.ts`: a list of models × packages. The home price picker, the full price table, the model pages, the offer card and the menu card all read from it. **A price is never typed in a component.**
- Section numbers `(01)`, `(02)`… are **generated from each page's section order**, never typed.
- **The wordmark is live text**, not an image: the brand name in DM Sans plus `®`. It appears in the hero (128), on the glass visuals (15) and as the giant footer wordmark (304). A reskin changes the text only.

---

## 2. Pages

| Frame | Node id | Notes |
|---|---|---|
| Home | `337:121` | 15 sections, the full set |
| Pricing | `346:2068` | Price picker + full price table |
| Tesla | `346:3011` | **Model page.** Tesla, Cybertruck and Rivian share one layout. |
| Cybertruck | `346:3881` | Model page |
| Rivian | `346:4751` | Model page |
| Tint | `347:5621` | **Service page.** Tint and Coating share one layout. |
| Coating | `347:6483` | Service page |
| FAQ | `347:7345` | Long FAQ (all items open) |
| Menu open | `373:121` | The menu panel's open state (applies on every page) |

**Build model pages and service pages from one template each, fed by data.** Adding a model (e.g. "Lucid") must mean adding a content entry, not a new page file.

---

## 3. Colour

The palette is warm off-white paper, near-black ink, one electric blue, and white "glass" layered over photos.

### Brand slot (change per client)

| Token | Value | Use |
|---|---|---|
| `--brand-paper` | `#F8F8F3` | Page background (all light sections) |
| `--brand-ink` | `#121212` | Text, dark buttons, dark section halves, dark model card |
| `--brand-accent` | `#3355FF` | Icon circles, the selected model, progress bars, check icons, small "Delivery week" / "Exact price" / savings pills, glows |
| `--brand-accent-soft` | `#E8EDFF` | Light pills (service tags, model tags in reviews), the highlighted table column |

### Surfaces

| Token | Value | Use |
|---|---|---|
| `--bg-page` | paper | Every light section |
| `--bg-card` | `#FFFFFF` | Service cards, model list, offer cards, white pills, white buttons |
| `--bg-inverse` | ink | Guarantee left half, Final CTA left half, "other EVs" model card |
| `--bg-accent-soft` | `#E8EDFF` | Soft pills; table highlight at 55% |

### Text

On light backgrounds:

| Token | Value | Use |
|---|---|---|
| `--text-primary` | ink 100% | Headings, values, primary text |
| `--text-strong` | ink 88% | Links, list items, menu and footer links (Figma 90 / 85 / 83%) |
| `--text-secondary` | ink 60% | Paragraphs (Figma 60 / 70 / 75%) |
| `--text-tertiary` | ink 55% | Indexes `(01)`, section labels, captions, meta (Figma 55 / 50 / 45 / 40%) |
| `--text-faint` | ink 30% | **The grey second half of two-tone headlines**, and "n/a" in the table (Figma 30 / 32 / 25%) |

On dark backgrounds and photos:

| Token | Value | Use |
|---|---|---|
| `--text-on-dark` | white | Headings and values |
| `--text-on-dark-strong` | white 85% | Glass captions (Figma 80 / 85 / 90%) |
| `--text-on-dark-secondary` | white 72% | Paragraphs (Figma 70 / 75%) |
| `--text-on-dark-tertiary` | white 50% | Fine print, axis labels (Figma 45 / 50 / 60%) |

**Two-tone headlines are a signature of this design.** The first sentence is `--text-primary` and the rest is `--text-faint`, in the same text block. Build it as one heading with a `<span class="t-faint">`, and put both parts in the content field (e.g. `{ strong: "Real EVs. Real installs.", soft: "Straight from our Austin bay." }`).

### Borders (all 1px)

| Token | Value | Use |
|---|---|---|
| `--border-rail` | ink 10% | Section top lines, the vertical rails, row dividers (Figma 10% and 8%) |
| `--border-default` | ink 15% | Round icon buttons, small outlined items (Figma 14 / 15 / 18%) |
| `--border-strong` | ink 20% | Ghost button, form-field underline on light |
| `--border-line` | ink 25% | Diagram connector lines (a 1px rectangle in Figma) |
| `--border-on-dark` | white 25% | Form-field underlines on dark |
| `--border-on-dark-strong` | white 30–40% | Outline pills on dark (30%), ghost button on photos (40%) |
| `--border-glass` | white 30% | Glass panels (Figma 22–35%) |

Icons are outline style, 1.8px stroke, in `currentColor`. The accent check icons use 2px.

---

## 4. Glass, glows and overlays (the signature look)

**Glass panel** = a white fill at 12–22% + a 1px white border at 30% + background blur + a large radius. It always sits on a photo or a dark/blue area, never on paper.

| Variant | Fill | Blur | Radius | Used for |
|---|---|---|---|---|
| `glass-sm` | white 12–16% | 12px | 12 or pill | Hero "delivery week" card, active hero chip, small pills on photos |
| `glass-md` | white 16% | 16px | 16 | Model card info panel, service-card spec panel (radius 14) |
| `glass-lg` | white 20–22% | 24px | 20 | Price panel, 48-hour promise panel, 60-second timer panel |
| `glass-menu` | white 20% → 8% gradient | 48px | 24 | Menu side panel, plus shadow `0 24px 60px rgb(0 0 26 / .3)` |

Build rule: one `.glass` class with modifiers `--sm`, `--md`, `--lg`, reading `--glass-*` tokens. Use `backdrop-filter` with the `-webkit-` prefix. Add a fallback without blur support: fill at 55% ink so the text stays readable.

**Glows** are blurred blue ellipses placed behind glass or photos. They're decorative (`aria-hidden`, `pointer-events: none`).

| Glow | Size | Fill | Blur |
|---|---|---|---|
| Hero glow | 760 × 620 | accent 55% | 220 |
| Panel glow | ~700–876 × 500–617 | accent 60% | 180 |
| Diagram glow | 700 (radial gradient) | accent 100% → 55% | 90 |

Build them with `filter: blur()` on an absolutely positioned element inside a container with `overflow: hidden`, or as a `radial-gradient`. Measure performance (§10 item 9).

**Photo overlays** keep text readable on images:

| Overlay | Gradient |
|---|---|
| Hero | black 35% at top → 5% at 45% → 70% at bottom |
| Cards (models, services, selected model) | transparent → black 50–60% at the bottom |
| Blue-tinted visuals (promise, CTA, progress photo) | accent at 18–22% over the photo |

---

## 5. Typography

**One family: DM Sans** (variable, weights 300/400/500/600). Self-host it with Fontsource.
- Large text is Regular or Light, with tight negative tracking.
- Labels and buttons are SemiBold UPPERCASE with positive tracking.
- Sizes are fluid from 390 to 1440 (BOILERPLATE §6).
- Mobile sizes are **proposed**: the file has no mobile frames.

| Role (`.t-…`) | Used for | Desktop | Mobile | Weight | Line height | Tracking |
|---|---|---|---|---|---|---|
| `wordmark-xl` | Giant footer wordmark | 304 | 21.1vw (fills the width) | Regular | 0.86 | −6% |
| `wordmark` | Hero wordmark | 128 | 64 | Regular | 1.0 | −5% |
| `num-xl` | Glass "48" | 150 | 96 | Light | 0.9 | −6% |
| `num-lg` | Glass "60", "1 hour" (120) | 130 | 88 | Light | 0.9 | −6% |
| `num-md` | Reviews "4.9" | 96 | 64 | Light | 0.9 | −5% |
| `price-xl` | Glass price "$1,790", offer "$2,590" (84) | 88 | 56 | Light | 0.95 | −5% |
| `hero` | Hero headline | 68 | 40 | Regular | 1.0 | −4% |
| `h2-xl` | Offer headline | 64 | 40 | Regular | 1.04 | −4% |
| `h2` | **Section headlines (two-tone)** | 60 | 38 | Regular | 1.04 | −4% |
| `h2-dark` | Guarantee and CTA headline on dark | 56 | 36 | Regular | 1.04 | −4% |
| `stat` | Proof strip numbers | 52 | 40 | Light | 1.0 | −4% |
| `h2-sm` | Footer statement (48), price-table title (44) | 48 | 34 | Regular | 1.04 | −4% |
| `h3-lg` | Diagram "Solution" title | 40 | 30 | Regular | 1.04 | −3% |
| `price-md` | Price table cells | 36 | 28 | Light | 1.0 | −4% |
| `quote` | Review quotes | 30 | 24 | Regular | 1.25 | −2.5% |
| `h3` | Diagram points, footer CTA, menu links (1.1 / −3%) | 28 | 24 | Regular | 1.15 | −2.5% |
| `unit` | "hrs", "sec", "hour" beside big numbers | 28 / 26 | 20 | Regular | 1.0 | −2% |
| `h4` | Service card titles, model card titles (1.1) | 26 | 22 | Regular | 1.15 | −2.5% |
| `h5` | Step titles, CTA card titles | 24 | 21 | Regular | 1.15 | −2% |
| `faq-q` | FAQ questions, bonus heading | 22 | 20 | Regular | 1.25 | −1.5% |
| `title` | Model list items, card titles | 20 | 18 | Regular | 1.2 | −1.5% |
| `spec` | Glass spec values ("Model-specific", "98%") | 20 | 18 | Light | 1.15 | −2% |
| `body-xl` | Offer intro paragraph | 20 | 18 | Regular | 1.45 | −1% |
| `body-lg` | Dark-section paragraphs, step intro, input text (1.3) | 17 | 16 | Regular | 1.55 | −0.5% |
| `body` | FAQ answers, CTA intro | 16 | 16 | Regular | 1.5 | −0.3% |
| `name` | Reviewer names (17), bullet titles (16) | 17 / 16 | 16 | Medium | 1.2 | −1% |
| `body-sm` | Section intro paragraphs (1.5), footer and menu links (1.3) | 15 | 15 | Regular | 1.5 | −0.3% |
| `small` | Captions, card text, proof labels | 14 | 14 | Regular | 1.3–1.5 | −0.3% |
| `link` | Text links ("Explore PPF") | 14 | 14 | Medium | 1.2 | −0.3% |
| `meta` | Indexes `(01)`, section labels, small notes | 13 | 13 | Medium (indexes) / Regular | 1.2 | 0 |
| `tag` | Soft pills (PPF, Model Y) | 13 | 13 | Medium | 1.0 | −0.5% |
| `button` | All buttons | 13 | 13 | SemiBold UPPERCASE | 1.0 | +2% |
| `eyebrow` | Chips on photos, glass labels | 11 | 11 | SemiBold UPPERCASE | 1.0 | +4% |
| `eyebrow-sm` | Tiny pills ("Delivery week", "Exact price") | 10 | 10 | SemiBold UPPERCASE | 1.0 | +4% |
| `micro` | Glass spec labels, axis labels | 11–12 | 11–12 | Regular / Medium | 1.2 | 0 |

**Rules specific to Master D:**
- **Section headlines are all one size (60) and two-tone.** Never bold.
- **Big numbers are Light**, with a smaller Regular unit beside them, baseline-aligned ("48 hrs", "$1,790 all in").
- Body text is never below 14px except the micro labels (10–12), which only appear on glass and photo chips.
- The giant footer wordmark must **fill the content width at every size**. Use a `vw` size, not `clamp` with a max that leaves a gap, and check that it never causes horizontal scroll.

---

## 6. Layout

### Rails: the structural signature

The page is framed by thin vertical and horizontal lines (`--border-rail`). Most sections start with a **section meta bar**:
- full width, 41px tall, with a top border;
- padding 24 / 40 / 0 / 40;
- `(0n)` index on the left and the section label on the right, both `meta` in `--text-tertiary`.

Some sections use the **3-column rail** instead: a 200px left rail, a 1040px centre and a 200px right rail, separated by vertical borders. Proof strip, Statement, How it works and Reviews use variations of it.

| Element | Value (Figma) |
|---|---|
| Frame width | 1440 |
| Side margins | 40 |
| Content width | 1360 |
| Grid | 12 columns, 12px gutter (columns ≈ 102px) |
| Card gap | 12 (offer cards: 16) |
| Section header row | Padding 56 top, 48–64 bottom. Headline 700–780px wide on the left, intro 320–380px wide aligned to the right edge. |
| Section bottom padding | 112 |
| Rail width | 200 |
| Split sections (Guarantee, Final CTA) | Dark half 768–772 + image half 668–672, full bleed, no margins |

**Common spans:**
- 4 install photos at 331 (3 columns each). They alternate 460 / 400 tall and are **bottom-aligned**, so the row looks staggered.
- 3 service cards at 445 (4 columns).
- 3 model cards at 319 + the dark card at 367.
- Price picker: model list 400 + photo 948.
- Offer: photo card 405 + bonuses 461 + price card 461.

### Mobile (proposed)

| Item | Mobile value |
|---|---|
| Side margins | 20 |
| Section bottom padding | 72 |
| Header row | Stacks: headline, then intro (gap 16) |

- **Rails:** below 1024 the 200px side rails collapse. The index and label move into the section meta bar; vertical borders are removed.
- **Card rows:**
  - install photos become a horizontal scroll-snap row (1.2 cards visible), with no stagger;
  - service, model and offer cards stack in 1 column (2 columns at 768).
- **Price picker:** the model list becomes a horizontally scrolling pill row above the photo, and the glass price panel moves below the photo.
- **Price table:** horizontal scroll with the first column sticky.
- **Split sections:** the dark half on top, the image half below at 4:3.
- **Hero:**
  - wordmark 64;
  - headline at the bottom;
  - buttons stack full width;
  - the side chips and the glass card are hidden below 768.

---

## 7. Components

All sizes are desktop.

| Component | Spec |
|---|---|
| **Header** | No inline nav at any size. The hero wordmark (128) sits top left at 56 / 36. The **menu button** (68 × 36, three lines) sits top right at 64px from the top. The header is part of the hero and is not sticky in the design. **Proposed:** after the hero, a compact sticky bar with a small wordmark and the menu button. |
| **Menu panel** | Opens from the right as a floating panel (520 wide, 16px from the edges, radius 24, `glass-menu`), over a backdrop of `#050814` at 35% that blurs the page. Contents: "Menu" label with an accent dot + round close button; 8 numbered links (`h3` 28, index `micro`, 50px rows, dividers white 14%, arrow icon; the current page gets a "You're here" accent pill instead of the arrow); a featured offer card (photo + title + price + round button); a full-width white CTA with an accent round icon; two contact columns. Follow BOILERPLATE §1.8 for behaviour (focus trap, Esc, scroll lock), with a slide-in-from-right motion. |
| **Button** | Pill, height 48 (md) / 52 (lg) / 42 (sm). Padding 0 22. `button` text (13 SemiBold UPPERCASE +2%). Arrow icon 16, gap 10. Variants: `dark` (ink fill, white text), `white` (white fill, ink text), `ghost` (1px ink 20%, ink text), `ghost-white` (1px white 40%, white text). **CTA variant:** white, height 56, padding 24 / 8, ending in a 40px accent circle with a white arrow. |
| **Round icon button** | 28–44 circle. Dark (ink fill, white icon) or outline (1px `--border-default`). Used for card arrows, FAQ toggles and close. |
| **Icon badge** | 44 circle in accent with a white 20px icon. Centred above a centred headline (Statement, How it works). |
| **Pill / tag** | Radius 999 or 8. `tag` (13 Medium) on `--brand-accent-soft`, padding 8 / 12, radius 8, for service tags. `eyebrow` white pill on photos, padding 6 / 12. Accent pill with white `eyebrow-sm` text, padding 5 / 8. Outline pill on dark: 1px white 30%, padding 8 / 14. |
| **Text link** | `link` 14 Medium + a 28 dark round arrow button, spread across the card width ("Explore PPF ↗"). |
| **Section meta bar** | See §6. |
| **Section header** | Two-tone `h2` (left, 700–780px) + `body-sm` intro in `--text-secondary` (right, 320–380px), or a ghost button on the right (Models). |
| **Proof strip** | Rails: `(01)` / 3 × [`stat` number + `small` label, centred] / "©2026", with vertical borders. |
| **Diagram (Why EV-only)** | Three problem points on the left (`h3` + `small` + soft tag), each linked by a 1px line ending in a 6px ink dot. The dots sit on a dotted 860px circle. A blue radial glow with a photo circle sits inside it, with the "Solution" block (`meta` + `h3-lg` + `body-sm`) on top. **Proposed for mobile:** stack the points, and show the circle as a smaller decorative block above them. |
| **Install photo card** | Photo (r4) + eyebrow white pill top-left + caption row: `small` caption + `meta` index on the right. |
| **Price picker** | Left: model list in a white card (r4, padding 28): "1. Pick your EV" + 5 rows (`title` 20, 67px rows with an 8% divider, round arrow on the right). The selected row is an accent pill with white text and a white check circle. Last row "Other EVs" in `--text-faint`. A note at the bottom. Right: photo of the selected model (r4, gradient) + "MODEL · MOST BOOKED" pill + `glass-lg` price panel: "2. Pick a package" + package pills (selected = white, others = outline white) + `price-xl` price + "all in" unit + description + white CTA button + "See the full price list ↗". **Interactive:** choosing a model swaps the photo and price, and choosing a package swaps the price and description. All data comes from `pricing.ts`. Use real radio inputs, styled. |
| **Price table** (Pricing page) | Rows = packages (`title` + `small` description), columns = models (`meta` brand + `body` model name). The most-booked column has a 55% accent-soft background and an accent pill. Cells use `price-md`; "n/a" in `--text-faint`. Use a real `<table>` with `<th scope>`. |
| **Offer block** | Index badge (36 accent circle + "Most popular" white pill) + `h2-xl` two-tone + `body-xl` intro. Three cards: photo card (r20, with an "INCLUDED" glass list of 3 rows, each with a check circle); bonuses card (white, r20, padding 28, 3 rows with a round icon + `name` + `small` + soft tag); price card (white, r20: model label, `price-xl` + savings accent pill, capacity bar of 8 slots (filled = ink, empty = ink 12%, r3), note, dark lg button full width). |
| **Split section** (Guarantee, Final CTA) | Dark half: 28 icon, `h2-dark`, `body-lg` (white 70%), fine print (white 45%), outline pills. Image half: photo + accent tint + glow + small wordmark + `glass-lg` panel with icon + caption, a `num-xl`/`num-lg` number + unit, a label and a progress bar (accent fill on white 25%, r4) with axis labels. |
| **Service card** | White, r6, padding 8. Photo 340 tall (r4) with a `(01)` index and a `glass-md` spec panel (icon + eyebrow + title + warranty pill, then 2 specs split by a divider). Text: `h4` + `small` secondary + check list (accent check, 8% dividers) + a text-link row at the bottom. |
| **Model card** | Photo, 500 tall, r4, gradient. Brand pill top-left. `glass-md` bottom panel: `h4` + `small` + accent "from" price pill + round white arrow. **Dark variant** ("Other EVs"): ink, lightning icon + `title`, text, faint circle line, accent "EXACT PRICE" pill, `num-lg` "1" + `unit` "hour". |
| **Steps** (How it works) | Centred icon badge + `h2` + `body-lg`. Then rails: left 500 (padding 40) with a progress photo card (r16, accent tint, 3 glass status rows with Done / In-progress pills) + caption; right: 4 step rows (padding 44 / 64, gap 56): round icon (the first is filled accent, the rest outline) + `meta` number + `h5` + `small`. |
| **Review row** | Rails: left 360 (avatar circle 36, ink or outline, with an initial + `name` + soft model tag + 5 stars); middle 760: `quote`; right 320: car photo (r4) with a "THEIR CAR" pill. Header right: `num-md` "4.9" + stars + `small` source. |
| **FAQ** | Left 560 rail (index, two-tone `h2`, `body` text, dark phone button). Right: items with an 8–10% divider, padding 28 / 0. Question `faq-q` + a 28 round toggle (open = dark with "−", closed = outline with "+"). Answer `body` at 60%, max width 560. Accordion as in BUILD_PROMPT. The FAQ page shows all items open by default. |
| **Form (dark)** | Two selects side by side (gap 32) + one input, each with a `micro` label at white 50%, `body-lg` value, and a white 25% underline. Then a white button + `meta` note. **Form (light, footer)**: one input with a `--border-strong` underline and a chat icon, plus a dark sm button. Use Netlify Forms. |
| **Footer** | Top: `meta` + `h2-sm` statement left; 3 link columns right (`meta` heading at 55% + `body-sm` links, gap 12, column gap 56). Middle: top border, legal + service area left; "Get your price by text" form right. Bottom: giant `wordmark-xl`, 24px from the left edge, sitting on the bottom of the page. |

---

## 8. Section order

**Home:**

| # | Section | Node | Type |
|---|---|---|---|
| — | Hero | `337:122` | Full-bleed photo, 900 tall |
| 01 | Proof strip | `337:164` | Rails |
| 02 | Statement | `337:178` | Rails, centred |
| — | Why EV-only diagram | `337:188` | Diagram |
| 03 | Recent installs | `337:1014` | Meta bar + header + photos |
| 04 | Pricing | `337:216` | Price picker |
| 05 | Signature offer | `337:309` | Offer block |
| — | Guarantee | `337:402` | Split, dark |
| 06 | Services | `337:438` | Cards |
| 07 | Models | `337:652` | Cards |
| — | How it works | `337:713` | Steps |
| 08 | Reviews | `337:784` | Rows |
| 09 | FAQ | `337:870` | FAQ |
| — | Final CTA | `337:918` | Split, dark + form |
| — | Footer | `337:972` | Footer |

⚠ Index numbers skip some sections (the diagram, Guarantee and How it works have none), and "05" appears as a badge, not in a meta bar. Keep this: in the section-order array, each section has a `numbered: true/false` flag, and numbering counts only numbered sections.

**Inner pages:**
- **Pricing:** Hero → Proof → Pricing (picker + table) → Offer → Guarantee → FAQ → CTA → Footer.
- **Model pages:** Hero → Proof → Installs → Pricing → Services → Guarantee → Reviews → FAQ → CTA → Footer.
- **Service pages:** the same idea, ordered as in Figma.
- **FAQ page:** Hero → long FAQ → How it works → Guarantee → CTA → Footer.

Every inner page uses the same hero component, with different photo, headline, chips and buttons.

---

## 9. Copy-length limits

| Slot | Limit |
|---|---|
| Hero headline | 2 lines, ≤ 30 characters per line |
| Section headline | 2–3 lines in 760px (about 60 characters total); the strong part ≤ 30 characters |
| Section intro | ≤ 2–3 lines at 320px (about 110 characters) |
| Proof strip | Exactly 3 stats; number ≤ 6 characters |
| Install photos, service cards, model cards | Exactly 4, 3, and 3 + 1 "other" |
| Steps | Exactly 4 |
| Reviews | 3 on Home |
| FAQ | 6 on Home, 8+ on the FAQ page |
| Menu links | ≤ 8 |
| Wordmark | One word (+ ®) that fits 1360px at 304px: about 9–10 characters. Longer names need a smaller footer wordmark size. |

---

## 10. Figma clean-up list

1. **No text styles at all:** 1,567 text layers, all unstyled. Create a style for every role in §5.
2. **Too many sizes:** 128/120, 88/84, 48/44, 28/26 and several line heights at 14px. They're merged in §5. Apply the merge in Figma.
3. **12 ink opacities and 8 white opacities**, reduced to 5 + 4 in §3.
4. **Border opacities** 8 / 10 / 14 / 15 / 18 / 20 / 25 / 30 / 32 / 35 / 40 are reduced to the tokens in §3.
5. **Radii** 3, 4, 6, 8, 10, 12, 14, 16, 20, 24 and 999. Suggest 4 / 8 / 12 / 16 / 20 / 24 / pill, with 6 → 8 and 14 → 16 in a later cleanup. The code keeps 6 and 14 for an exact clone.
6. **Backdrop blurs** 12 / 14 / 16 / 18 / 20 / 24 / 48, reduced to 12 / 16 / 24 / 48.
7. **Layer names:** a glow is named "Lime glow" but is blue. Many frames are just "Frame". Rename the slots before the next template use.
8. **No mobile frames, no hover states, and no sticky header behaviour after the hero.** Everything marked proposed should be designed at 390.
9. **Performance risk:** many large blurred glows (blur 180–220) plus backdrop-filter panels over photos. Keep glows as pre-blurred CSS gradients where possible, and test on a mid-range phone.
10. **Index numbering** isn't continuous (§8). Confirm whether that's intended.

---

## 11. `tokens.css`

Create `src/styles/tokens.css` with exactly this. Add the motion block from BOILERPLATE §7.2 at the end.

```css
:root {
  /* ---------- Brand (change per client) ---------- */
  --brand-paper: #F8F8F3;
  --brand-ink: #121212;
  --brand-accent: #3355FF;
  --brand-accent-soft: #E8EDFF;
  --brand-ink-rgb: 18 18 18;
  --brand-accent-rgb: 51 85 255;

  /* ---------- Surfaces ---------- */
  --bg-page: var(--brand-paper);
  --bg-card: #FFFFFF;
  --bg-inverse: var(--brand-ink);
  --bg-accent: var(--brand-accent);
  --bg-accent-soft: var(--brand-accent-soft);
  --bg-backdrop: rgb(5 8 20 / 0.35);

  /* ---------- Text ---------- */
  --text-primary: var(--brand-ink);
  --text-strong: rgb(var(--brand-ink-rgb) / 0.88);
  --text-secondary: rgb(var(--brand-ink-rgb) / 0.60);
  --text-tertiary: rgb(var(--brand-ink-rgb) / 0.55);
  --text-faint: rgb(var(--brand-ink-rgb) / 0.30);
  --text-on-dark: #FFFFFF;
  --text-on-dark-strong: rgb(255 255 255 / 0.85);
  --text-on-dark-secondary: rgb(255 255 255 / 0.72);
  --text-on-dark-tertiary: rgb(255 255 255 / 0.50);
  --text-on-accent: #FFFFFF;

  /* ---------- Borders ---------- */
  --border-rail: rgb(var(--brand-ink-rgb) / 0.10);
  --border-default: rgb(var(--brand-ink-rgb) / 0.15);
  --border-strong: rgb(var(--brand-ink-rgb) / 0.20);
  --border-line: rgb(var(--brand-ink-rgb) / 0.25);
  --border-on-dark: rgb(255 255 255 / 0.25);
  --border-on-dark-strong: rgb(255 255 255 / 0.40);
  --border-pill-on-dark: rgb(255 255 255 / 0.30);
  --border-glass: rgb(255 255 255 / 0.30);
  --border-menu: rgb(255 255 255 / 0.14);
  --icon-stroke: 1.8px;

  /* ---------- Glass ---------- */
  --glass-sm-bg: rgb(255 255 255 / 0.14);  --glass-sm-blur: 12px;
  --glass-md-bg: rgb(255 255 255 / 0.16);  --glass-md-blur: 16px;
  --glass-lg-bg: rgb(255 255 255 / 0.22);  --glass-lg-blur: 24px;
  --glass-menu-bg: linear-gradient(180deg, rgb(255 255 255 / 0.20), rgb(255 255 255 / 0.08));
  --glass-menu-blur: 48px;
  --glass-fallback-bg: rgb(var(--brand-ink-rgb) / 0.55);
  --shadow-menu: 0 24px 60px rgb(0 0 26 / 0.30);

  /* ---------- Overlays ---------- */
  --overlay-hero: linear-gradient(180deg, rgb(0 0 0 / 0.35) 0%, rgb(0 0 0 / 0.05) 45%, rgb(0 0 0 / 0.70) 100%);
  --overlay-card: linear-gradient(180deg, rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 0.55) 100%);
  --tint-accent: rgb(var(--brand-accent-rgb) / 0.22);

  /* ---------- Radius ---------- */
  --radius-xs: 3px;  --radius-media: 4px; --radius-card-sm: 6px; --radius-sm: 8px;
  --radius-md: 12px; --radius-glass-md: 14px; --radius-lg: 16px; --radius-xl: 20px;
  --radius-menu: 24px; --radius-pill: 999px;

  /* ---------- Spacing ---------- */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px; --space-5: 20px;
  --space-6: 24px; --space-7: 28px; --space-8: 32px; --space-10: 40px; --space-11: 44px;
  --space-14: 56px; --space-16: 64px; --space-18: 72px; --space-20: 80px; --space-28: 112px;

  /* ---------- Layout (mobile first; desktop below) ---------- */
  --side-pad: 20px;
  --content-max: 1360px;
  --grid-gutter: 12px;
  --rail-w: 0px;
  --section-pad-bottom: 72px;
  --section-head-pad: 40px 0 32px;
  --meta-bar-h: 41px;

  /* ---------- Component tokens ---------- */
  --btn-h-sm: 42px; --btn-h-md: 48px; --btn-h-lg: 52px; --btn-h-cta: 56px; --btn-pad-x: 22px;
  --icon-badge: 44px; --round-btn: 28px; --avatar: 36px;
  --menu-w: 520px; --menu-inset: 16px;

  /* ---------- Typography ---------- */
  --font-sans: var(--font-dm-sans, "DM Sans"), system-ui, -apple-system, sans-serif;
  --fw-light: 300; --fw-regular: 400; --fw-medium: 500; --fw-semibold: 600;

  --fs-wordmark-xl: clamp(5rem, 21.1vw, 19rem);
  --fs-wordmark: clamp(4rem, 2.5143rem + 6.0952vw, 8rem);
  --fs-num-xl:   clamp(6rem, 4.7464rem + 5.1429vw, 9.375rem);
  --fs-num-lg:   clamp(5.5rem, 4.525rem + 4vw, 8.125rem);
  --fs-num-md:   clamp(4rem, 3.2571rem + 3.0476vw, 6rem);
  --fs-price-xl: clamp(3.5rem, 2.7571rem + 3.0476vw, 5.5rem);
  --fs-hero:     clamp(2.5rem, 1.85rem + 2.6667vw, 4.25rem);
  --fs-h2-xl:    clamp(2.5rem, 1.9429rem + 2.2857vw, 4rem);
  --fs-h2:       clamp(2.375rem, 1.8643rem + 2.0952vw, 3.75rem);
  --fs-h2-dark:  clamp(2.25rem, 1.7857rem + 1.9048vw, 3.5rem);
  --fs-stat:     clamp(2.5rem, 2.2214rem + 1.1429vw, 3.25rem);
  --fs-h2-sm:    clamp(2.125rem, 1.8rem + 1.3333vw, 3rem);
  --fs-h3-lg:    clamp(1.875rem, 1.6429rem + 0.9524vw, 2.5rem);
  --fs-price-md: clamp(1.75rem, 1.5643rem + 0.7619vw, 2.25rem);
  --fs-quote:    clamp(1.5rem, 1.3607rem + 0.5714vw, 1.875rem);
  --fs-h3:       clamp(1.5rem, 1.4071rem + 0.381vw, 1.75rem);
  --fs-unit:     clamp(1.25rem, 1.0643rem + 0.7619vw, 1.75rem);
  --fs-h4:       clamp(1.375rem, 1.2821rem + 0.381vw, 1.625rem);
  --fs-h5:       clamp(1.3125rem, 1.2429rem + 0.2857vw, 1.5rem);
  --fs-faq-q:    clamp(1.25rem, 1.2036rem + 0.1905vw, 1.375rem);
  --fs-title:    clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem);
  --fs-body-xl:  clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem);
  --fs-body-lg:  clamp(1rem, 0.9768rem + 0.0952vw, 1.0625rem);
  --fs-body: 1rem;  --fs-body-sm: 0.9375rem; --fs-small: 0.875rem; --fs-meta: 0.8125rem;
  --fs-button: 0.8125rem; --fs-eyebrow: 0.6875rem; --fs-eyebrow-sm: 0.625rem; --fs-micro: 0.75rem;

  /* Line heights: mobile values first */
  --lh-wordmark-xl: 0.86; --lh-wordmark: 1; --lh-num: 0.9; --lh-price-xl: 0.95;
  --lh-hero: 1.05; --lh-h2: 1.08; --lh-stat: 1; --lh-h3-lg: 1.1; --lh-quote: 1.3;
  --lh-h3: 1.2; --lh-h4: 1.2; --lh-h5: 1.2; --lh-faq-q: 1.25; --lh-title: 1.2;
  --lh-body-xl: 1.45; --lh-body-lg: 1.55; --lh-body: 1.5; --lh-small: 1.45; --lh-ui: 1.2; --lh-tight: 1;

  /* Tracking (Figma % → em) */
  --ls-wordmark-xl: -0.06em; --ls-wordmark: -0.05em; --ls-num: -0.06em; --ls-num-md: -0.05em;
  --ls-price-xl: -0.05em; --ls-display: -0.04em; --ls-h3-lg: -0.03em; --ls-quote: -0.025em;
  --ls-h3: -0.025em; --ls-unit: -0.02em; --ls-h5: -0.02em; --ls-faq-q: -0.015em; --ls-name: -0.01em;
  --ls-body-xl: -0.01em; --ls-body-lg: -0.005em; --ls-body: -0.003em; --ls-tag: -0.005em;
  --ls-button: 0.02em; --ls-eyebrow: 0.04em;
}

@media (min-width: 1024px) {
  :root {
    --side-pad: 40px;
    --rail-w: 200px;
    --section-pad-bottom: 112px;
    --section-head-pad: 56px 0 56px;

    --lh-hero: 1; --lh-h2: 1.04; --lh-h3-lg: 1.04; --lh-quote: 1.25; --lh-h3: 1.15; --lh-h4: 1.15; --lh-h5: 1.15;
  }
}
```
