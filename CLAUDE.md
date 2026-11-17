# CLAUDE.md — Master D (Astro)

This is a pixel-accurate Astro build of the Figma page **Master D** ("amperfilm®", an EV protection studio). It also serves as a **reskinnable template**: a new client changes brand tokens, copy, images and prices only.

**Spec files (read before working):**
- `BUILD_PROMPT-MASTER-D.md`: phases and fixed decisions.
- `DESIGN_SYSTEM-MASTER-D.md`: the source of truth for how things **look**.
- `BOILERPLATE-GUIDELINES.md`: the source of truth for how things are **built**. Read §1/§2 only when building the thing they describe. Ignore Keystatic/CMS, Embla, hero parallax, the hero arc/portrait and the text roll.

If the files still disagree after those two rules, ask the owner. Never guess.

**Figma:** file `FFs05OacP9URxrCuYpT1fT`, page `318:121`. Read **one section node at a time** (`get_design_context` + `get_screenshot`), never a whole page. Treat returned code as measurements, not code to paste.

---

## Agent working rules (BOILERPLATE §5.11 + BUILD_PROMPT §5)

- Read the spec files first.
- **Never invent design.** Check Figma, then the spec files, then ask.
- **One phase at a time.** Stop at the end of each phase and wait for the owner's OK.
- Commit at the end of each phase.
- No new libraries without asking.
- No push and no deploy until the owner says so.
- Keep the **Decisions log** below up to date, with dates, for every choice the files don't cover.
- Save credits: read Figma one section at a time, don't re-read unchanged files, and summarise instead of pasting.
- Keep reports short: what's done, what doesn't match Figma yet (and why), questions.

### Code conventions (BOILERPLATE §5)
- Mobile-first, `min-width` queries. Main switch at 1024, tablet tweaks at 768. Hover only inside `(hover: hover) and (pointer: fine)`, and every hover has a `:focus-visible` twin.
- BEM-like classes (`.block__el--mod`), `is-*` state classes, `.t-<role>` type classes with `.t-light/.t-regular/.t-medium` modifiers.
- JS hooks use `data-*` attributes only. Scripts loop over every instance.
- Files: `PascalCase.astro` components grouped by role, `camelCase.ts` scripts and libs, `kebab-case` slugs.
- Real elements for interaction. ARIA state is both the state and the style hook.
- Empty content hides its UI, so there are no empty rows or dead links.
- External links: `target="_blank" rel="noopener noreferrer"` + `.sr-only` "(opens in a new tab)".
- `flex: none` on icons and fixed-size children in flex rows.
- Comments explain *why*, date the owner's decisions, and each component header links to its spec section.
- Entrance animations start at `opacity: 0.001` and use the `translate` property.

---

## Fixed decisions (BUILD_PROMPT §3, don't re-ask)

**Stack**
- Latest stable Astro, static output, plain CSS, TypeScript strict, no UI framework, no CMS, no adapter.
- `<html lang="en-US">`.
- Netlify: config only, never deploy.
- Playwright as a dev dependency for screenshot checks.
- Packages: `astro`, `@astrojs/sitemap`, `lenis`. Nothing else without asking.
- Font: DM Sans via Astro's fonts API with the Fontsource provider, weights 300/400/500/600.

**Tokens and CSS**
- `src/styles/tokens.css` = DESIGN_SYSTEM §11 exactly + the BOILERPLATE §7.2 motion block.
- CSS order: tokens → typography → global → motion.
- Never hard-code a colour, size, spacing, radius, blur or duration in a component. Map every Figma value to the nearest token/role (DESIGN_SYSTEM §3–5, §10). If none fits, list it and ask.
- Copy every text exactly (“ ” quotes, en dashes, `·`, `®`, `★`).

**Content and template structure**
- `src/content/`: `site.ts` (brand name drives every wordmark, plus phone, email, address, hours, service area, rating, review count, installs count, turnaround), `pricing.ts` (models × packages → price, description, warranty, "most booked" flags), `models.ts`, `services.ts`, `home.ts`, `faq.ts`, `reviews.ts`, `installs.ts`.
- Every section is a component that takes its content as props. No copy is typed in components.
- Each page's section order is an array. Each entry has `numbered: true/false`, and `(0n)` indexes are generated from the numbered entries only.
- Model pages and service pages each come from one dynamic route built from `models.ts` / `services.ts`. Adding a model needs no new page file.
- Every price reads from `pricing.ts`. The wordmark is live text from `site.ts`.
- DESIGN_SYSTEM §9 copy limits are written as comments next to the content fields.

**Interactive parts** (vanilla TS, progressive enhancement, readable without JS)
1. Menu panel: opens from the right on every page and at every size. Focus trap, Esc, scroll lock, `aria-expanded`, and the current page marked with "You're here" + `aria-current="page"`.
2. Price picker: real radio inputs for model and package. Updates photo, price, description and CTA link from `pricing.ts`. Without JS, the default model and package show.
3. FAQ accordion: `<details>`/`<summary>` or buttons with `aria-expanded`. **Get the approach approved first.** The FAQ page shows all items open.
4. Forms (final CTA, footer): Netlify Forms + honeypot, real `<label>`s, `type="tel"`, native `<select>`s styled to match.
5. Sticky compact header after the hero: **ask before building** (not in Figma).

**Glass and glows**
- Follow DESIGN_SYSTEM §4. Use `backdrop-filter` with the `-webkit-` prefix and a no-support fallback.
- Glows are decorative and `aria-hidden`. Check scroll smoothness; if it stutters, use a pre-blurred `radial-gradient` and report it.

**Motion** (BOILERPLATE §7, subtle)
- Hero intro: wordmark → headline → buttons → glass card and chips.
- Scroll reveal on headings, cards, rows, stats and photos.
- Button hover: colour only, 200ms. No nav intro.
- Menu: the panel slides in from the right (≈24px + fade, `--ease-smooth`), the backdrop fades, and links reveal with the §7 stagger.
- Progress bars fill once on reveal.
- Reduced motion handled per BOILERPLATE §1.12 and §7.7.

**Mobile:** no mobile frames exist. Use DESIGN_SYSTEM §6 proposals and the §11 fluid type. Log every undocumented layout decision.

**Accessibility**
- One `<h1>` per page (the hero headline, not the wordmark).
- Sections use `aria-labelledby`. The price table is a real `<table>`, and unstyled lists get `role="list"`.
- Text over photos meets 4.5:1.
- Tap targets ≥ 24px, inputs ≥ 16px.

**QA targets:** Lighthouse Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100, CLS < 0.05.

---

## Decisions log

| Date | Decision | Why / who |
|---|---|---|
| 2026-11-17 | **Contrast:** keep the Figma values `--text-tertiary` 55% (4.04:1 on paper) and `--text-faint` 30% (1.97:1). Lighthouse Accessibility may lose the `color-contrast` audit because of them, and that's accepted. All other checks still target 100. | Owner prefers the look over the Lighthouse score. |
| 2026-11-17 | **Images:** export the photos from Figma and use them as the template's sample images. | Owner |
| 2026-11-17 | **FAQ:** `<details>`/`<summary>`, no JS. Home: exclusive (`name="faq"`, one open at a time, the item open in Figma starts open). FAQ page: every item `open` and independent. Height animates with `::details-content` + `interpolate-size` where supported, otherwise opens instantly. | Owner delegated; exclusive keeps the Home section height stable and matches Figma's one-open state. |
| 2026-11-17 | **Sticky header:** a compact bar (small wordmark + menu button) that appears only after the hero **and** only while scrolling up. Hidden while scrolling down. | Owner |
| 2026-11-17 | **Forms:** after sending, use Netlify's default success page (no `/thanks` page). | Owner |
| 2026-11-17 | **Proof strip "©YEAR":** generated from the build year (`new Date().getFullYear()` at build time). | Owner |
| 2026-11-17 | **Body/eyebrow sizes below the boilerplate minimums** (14/15px body, 10–11px eyebrows): follow the design. | Design system wins on looks (BUILD_PROMPT §1). |
| 2026-11-17 | **Dev dependencies** `@astrojs/check` + `typescript` added (dev only, never shipped). | Needed to run `astro check` (BUILD_PROMPT Phase 7). |
| 2026-11-17 | **Placeholder icons and OG image** are generated at build time by endpoints (`/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/og.png`). They take the brand letter/name from `site.ts` and the colours from `tokens.css`, and rasterise with `sharp`, Astro's own image dependency (no new package). OG gets the hero photo composited in Phase 3. | BOILERPLATE §4.0: placeholders until the client supplies them. |
| 2026-11-17 | **tokens.css extensions** after §11 + §7.2: `--m-hover-time` 200ms / `--m-hover-ease`; focus ring (`--focus-color` = accent, 2px, offset 2px); glow fills and blurs from DESIGN_SYSTEM §4. | No hard-coded durations, colours or blurs in components. |
| 2026-11-17 | **Skip link** ("Skip to content" → `#main`), visually hidden until focused. | Keyboard accessibility; invisible in the design. |
| 2026-11-17 | **Site URL placeholder** `https://amperfilm.example` in `astro.config.mjs` + `site.ts`. | Replace per client. |
| 2026-11-17 | **Lenis is skipped under reduced motion** (native scrolling). Anchors use no offset because the sticky bar only shows while scrolling up. | BOILERPLATE §1.12 noted Lenis's own reduced-motion handling was unverified. |
| 2026-11-17 | **`body { overflow-x: clip }`** as a guard against sideways scroll from glows and the giant wordmark. Each component must still fit on its own (checked in Phase 4). | DESIGN_SYSTEM §5 / Phase 4. |
| 2026-11-17 | **Footer wordmark sizing:** keep the §11 token `clamp(5rem, 21.1vw, 19rem)`; the planned `cqi` approach is NOT needed. With the variable font it measures 1271px at 1440 (Figma 1309) and ends at 368 / 358px on 390 / 360 screens (no overflow). | Measured in Phase 2. Supersedes the Phase 0 cqi plan. |
| 2026-11-17 | **URLs:** `/models/<slug>` and `/services/<slug>`. | Owner accepted the recommendation (Phase 0, Q4). |
| 2026-11-17 | **Variable DM Sans** (`weights: ['300 600']`) with automatic optical sizing. Fontsource's static files are small-size cuts that made large text ~10% wider than Figma. Figma renders with auto opsz (its "opsz 14" is only a label). After the switch: body text matches within 1px and headings within 1%; the wordmark is still ~3% narrower than Figma (562 → 548 hero, 1309 → 1271 footer). | Measured in Phase 2. |
| 2026-11-17 | **Blur convention:** blur tokens hold Figma values; CSS uses `calc(token / 2)` (Figma blur = 2 × CSS standard deviation; the glow SVG exports blur 220 as stdDeviation 110). | Keeps tokens.css = §11 exactly and matches Figma visually. |
| 2026-11-17 | **Component tokens added** (tokens.css extensions): pill paddings, round sizes 28/32/40/44, menu button bars, `--gap-tight` 10, header widths 760/320, `--lh-tighter` 1.1 / `--lh-snug` 1.3, menu panel and footer values, menu motion, z-index. | BOILERPLATE §4.0: a value used by one component becomes a component token. |
| 2026-11-17 | **Hover colours (PROPOSED, awaiting OK):** dark/white buttons and dark round buttons → accent fill + white text; ghost → ink fill; ghost-white → white fill + ink text; CTA circle → ink; outline round → ink border; menu links → full white. | Figma has no hover states. |
| 2026-11-17 | **Figma → role mappings:** menu "Menu" label 12/SemiBold/+6% → `eyebrow` 11/+4%; menu contact values 13 → `meta` + `lh-snug`; menu offer title 16 Medium → `name` at body size; offer sub 12 → `micro`; footer column heading 14 → `meta` 13; legal line 12 Medium caps → `micro` Medium + uppercase + `--ls-button`; footer input 15 → 16 (input rule); hero glass card blur Figma 20 → glass-sm 12; services glass Figma 24 → glass-md 16. | DESIGN_SYSTEM §5/§10 merges. |
| 2026-11-17 | **Text link button** is 32 with a 14 icon (Figma Services), not 28 as written in DESIGN_SYSTEM §7. | Figma measurement wins on looks. |
| 2026-11-17 | **Menu panel gradient** uses the §11 token (180°); Figma uses ~110°. Border 28% → `--border-glass` 30%. | Token kept; small visual difference. |
| 2026-11-17 | **Menu behaviour built in Phase 2** (tested again in Phase 5): focus goes to the close button on open; the backdrop, close, Esc and a link click all close it; Tab is trapped; scroll is locked; `aria-expanded` is synced on every toggle. Without JS the menu stays closed and the footer carries the links. | BOILERPLATE §1.8. |
| 2026-11-17 | **Link targets not in Figma:** menu offer card → `/#offer`; menu CTA → `/#get-price` (final CTA form); footer "Warranty" → `/#guarantee`; footer "Privacy" is plain text until a page exists. | No dead links (BOILERPLATE §5). |
| 2026-11-17 | **Footer mobile:** link columns 2-up below 768 (Studio wraps to its own row), 3-up at 768, Figma row at 1024+. The menu contact columns stack below 480. | Not in Figma (no mobile frames). |
| 2026-11-17 | **Defaults applied (no reply yet):** proposed hover colours kept; "Explore PPF" → `/pricing` until a PPF page exists. | Owner to confirm. |
| 2026-11-17 | **Section architecture:** `src/lib/sections.ts` numbers entries with `numbered: true`; `SectionRenderer.astro` maps `kind` → component; Home order lives in `src/content/home.ts`. The Hero is rendered separately (it's the page header, not a numbered section). | BUILD_PROMPT §3. |
| 2026-11-17 | **Hero links:** "See model pricing" → `#pricing` (Home section 04); "Get my price in 60 seconds" → `#get-price` (final CTA). Chips are a plain list (not links). | Not in Figma. |
| 2026-11-17 | **Hero responsive:** Figma composition (absolute) from 1280; between 1024 and 1279 the headline and actions stack bottom-left (side by side they would overlap); chips, card and decor ring/line from 768/1024 as in DESIGN_SYSTEM §6. Headline line breaks apply from 768; below that the headline wraps balanced (no one-word lines). Phones get a smaller menu button (44 × 24) so it clears the 64px wordmark. | Proposed (no mobile frames). |
| 2026-11-17 | **Hero measurements:** chips sit 56 from the right (Figma 1222 + width), not 64; glass card at x 66 with strokes inside (68 tall). | Figma. |
| 2026-11-17 | **Proof strip mobile:** rails collapse into a meta bar "(01) … ©YEAR"; stats stack one per row below 768, 3 across from 768. The section has an sr-only `h2` ("At a glance") for `aria-labelledby`. | Proposed. |
| 2026-11-17 | **Why EV-only diagram:** Figma canvas from 1360 (circle anchored right, lines stretch with the width; below 1360 the middle line would vanish). Below 1360: the circle (max 560) with the Solution text centred inside, then the 3 points stacked (3 across from 768). The empty "Car photo circle" layer (transparent 64px image) is omitted. Dots are 10px (Figma), not 6 as in DESIGN_SYSTEM §7. Solution paragraph 75% → `--text-secondary` 60%. | Figma + proposed. |
| 2026-11-17 | **OG image** now composites the Home hero photo + overlay + wordmark (`/og.png`). | BOILERPLATE §4.0 placeholder. |
| 2026-11-17 | **Hero intro order (owner):** every element animates on its own, 0.05s apart (`--m-intro-stagger` 0.07 → 0.05): wordmark → menu button → each chip → glass card → each headline line → each button → intro paragraph (top-left → top-right → bottom-left → bottom-right). Last item starts at 0.6s, so the whole intro ends ≈ 1.3s. | Owner feedback: groups animating together looked flat. |
| 2026-11-17 | **Menu button morph (owner):** on open, the middle bar collapses and the top/bottom bars rotate ±45° into a cross (`--m-burger-time` 0.35s). The panel's close button uses the same three-bar icon and morphs into the cross after the panel arrives, so the hamburger visually "becomes" the close. Reverses on close. | Owner feedback: the menu felt static. |
| 2026-11-17 | **Diagram dotted ring spins** continuously, one turn per 90s (`--m-ring-time`); stops under reduced motion. | Owner request. |
| 2026-11-17 | **Hero photo is swappable without code:** `home.ts` picks up the single `src/assets/images/home/hero.{jpg,jpeg,png,webp,avif}` (build error if 0 or 2+); responsive widths up to 2560 are generated from whatever is uploaded; `imagePosition` controls the crop. The owner will upload a sharper photo. | Owner request. |
| 2026-11-17 | **pricing.ts filled** from the Figma Pricing page grid (346:2928): 4 models × 5 packages, Cybertruck roof film = n/a. Picker pills use short names and omit Roof film (as in Figma). The Delivery Day bundle ($2,590 Model Y, "Save $199") is stored as a bundle. Only Front Shield has a picker description in Figma; the others fall back to the table description until the owner supplies copy. Only Model Y has a picker photo. | Figma; missing copy/photos asked. |
| 2026-11-17 | **Headings wrap greedily from 1024** (`text-wrap-style: auto`), balanced below 1024. Figma breaks two-tone headlines by filling the line first; balanced wrapping moved the faint half to its own line. | Matches Figma line breaks at 1440. |
| 2026-11-17 | **Section header options:** headline width 760/780, intro width 320/340/380, bottom padding 48/56/64 and a two-tone `body-xl` intro (offer) as props with tokens, all from Figma per section. Button gained `spread` (label left, arrow right) for full-width card buttons. | Figma varies these per section. |
| 2026-11-17 | **Price picker layout:** glass panel and glow are anchored to the photo's right edge (84 / −146 from Figma's 948-wide photo) so they hold between 1024 and 1440. Rows use real radios; the selected row/pill is styled with `:has(:checked)` so selection shows without JS; price/photo swapping comes in Phase 5. "Other EVs" row text uses `--text-tertiary` (Figma 50%; DESIGN_SYSTEM says faint). Mobile: models → horizontal pill row; photo 4:3; panel below the photo on ink. | Figma + DESIGN_SYSTEM §6. |
| 2026-11-17 | **Offer:** card widths 405/461/461 (Figma), the "Included" glass rows are 392 wide and run off the photo card's right edge as in Figma; the index circle uses the generated section number. Mobile: cards stack; at 768 the photo spans the top and bonuses + price sit side by side. | Figma + proposed. |
| 2026-11-17 | **Recent installs mobile:** horizontal scroll-snap row (80% cards at 390, 45% at 768), no stagger, photos 331:400. Alt text written per photo in installs.ts. | DESIGN_SYSTEM §6 (1.2 visible) + proposed. |
| 2026-11-17 | **Hero photo replaced** with the owner's `landing page hero section car.png` (1586 × 992) as `src/assets/images/home/hero.png`; hero WebP quality raised to 90 (smooth gradients band at the default). The same picture also exists as `landing page hero section car 2.png` at 7680 × 4800. | Owner. |
| 2026-11-17 | **Hero rebuilt to Figma "Hero v2.2" (388:246)** — replaces 337:122 for Home. Header row (wordmark + menu) spans the full viewport width with `--side-pad` (owner: the menu must line up with the right-hand menu panel); the bottom row (left: card + h1, gap 44; right: chips + buttons + intro, gap 44) stays in the 1360 container; the rows are pushed apart (space-between) with 24 top / 46 bottom padding; menu sits 28 below the wordmark top. Headline + card text use `text-box: trim-both cap alphabetic` as in Figma. No dark overlay on Home (v2.2 has none; `overlay` prop keeps it for other pages). | Owner feedback + Figma. |
| 2026-11-17 | **Hero height:** from 1024, `height: min(100vw × 0.625, 100svh)` (keeps the 1440 × 900 ratio, never taller than the screen) with `min-height: min-content` so content never clips; the photo fills (cover). Below 1024 the hero stays full-screen (`max(100svh, 40rem)`). Bottom row side by side from 1280; stacked below 1280. | Owner. |
| 2026-11-17 | **Hero intro:** wordmark and menu drop in from the top (`data-intro="down"`, negative rise); everything else rises from below. Order: wordmark → menu → card → headline lines → chips → buttons → paragraph. | Owner. |
| 2026-11-17 | **Proof strip, Statement, Why EV-only updated to Figma "Master D — Home v2.1" (388:1130).** Rail frame is now 40 gutter \| 200 rail \| centre \| 200 rail \| 40 gutter, with lines at the gutter edges (x 40 / 1400) and rail edges (x 240 / 1200); proof stats become 3 × 320; Statement centre 960 wide (headline wraps to 3 lines, section 479 tall). Diagram points move to x 40, tops 156 / 410 / 665; all three lines start at x 461 and keep their y (215 / 465 / 715) on the circle, so lines are positioned from the circle, not from the points. | Owner + Figma v2.1. |
| 2026-11-17 | **Hero decor group:** the vertical line + ring move together; the line sits on the Proof strip's leftmost rail line (gutter edge; same pixel at every width, centred frame above 1440); the ring keeps its Figma offset (−108 from the line). | Owner. |
| 2026-11-17 | **Arrow swap on hover (owner):** `ArrowSwap.astro` — two copies of the arrow in a clipped box; on hover/focus of the nearest `.arrow-trigger`, the arrow leaves (→ right, ↗ top-right) and the second slides in from the opposite side fading 0 → 1 (`--m-arrow-time` 0.45s, smooth). Used on every Button (incl. the CTA circle), the menu links (↗), menu offer card (→), text-link rows (↗) and "See the full price list" (↗). | Owner feedback. |
| 2026-11-17 | **Menu link hover (owner):** row gets a subtle white background (`--menu-link-hover-bg` 12%, radius 8, bleeding 12px past the text column so text keeps its position) + full-white text + the ↗ swap. Same on keyboard focus. | Owner feedback. |
| 2026-11-17 | **Liquid glow (owner):** the diagram's CSS glow is replaced (when JS runs and motion is allowed) by a 300px canvas covering the circle: the Figma base glow (700/860, accent 55% → 30%) + 4 soft blobs that drift slowly; on hover each blob springs toward the pointer at its own stiffness and stretches along its motion (liquid trail), staying within 0.2 of the centre; on leave they flow back. CSS blur (Figma 90 → 45) softens it. Runs only while on screen (IntersectionObserver). No library (vanilla canvas, no three.js/GSAP). Reduced motion / no JS: the static CSS glow. | Owner request; vanilla kept the JS budget tiny. |
| 2026-11-17 | **Hero bottom row aligned to the rails (owner):** the bottom row uses the rail frame (max 1440) with 2 × side-pad inset from 1024, so the card/headline start at the "(01)" rail text (x 80 at 1440) and the buttons/intro end at the "©2026" rail text (x 1360). Columns sit side by side only when 703 + 486 + a 64 minimum gap fit (container query ≥ 1253px of content, i.e. ≥ 1413 viewport); narrower they stack, so they never collide. | Owner feedback. |
| 2026-11-17 | **Mirrored hero decor (owner):** a second line + ring group on the right, the line on the Proof strip's right rail line (x 1400), the ring mirrored (right edge 108 past the line, bulging toward the centre). | Owner. |
| 2026-11-17 | **Menu open/close (owner):** the hamburger never moves. On open, a stand-in copy (`[data-menu-ghost]`, the dialog's close button) is placed exactly over the clicked button (size, bar thickness, colour copied), the real button hides (`.is-menu-source`), the copy morphs into the cross, and the panel's background grows out of the button as a circular clip-path (`--m-menu-reveal-time` 0.7s). Close reverses it; the real button reappears when the cross is a hamburger again. Replaces the panel's own round close button and the slide-in. Inspiration link not received yet — to fine-tune against it. | Owner feedback. |
| 2026-11-17 | **Menu header clears the cross (owner):** the panel's header row is as tall as the cross (computed from the stand-in's position/size), then the usual 28px gap before the links, so the Home row's hover background never overlaps the cross; "Menu" lines up with the cross's centre. Inspiration: rakibulhrocky.com (owner confirmed the interaction matches). | Owner feedback. |
| 2026-11-17 | **Scroll reveal is element-by-element everywhere (owner):** every visible item has its own `data-reveal` (meta-bar index + label, heading, intro, each stat number/label, each diagram point title/text/tag/line, each install photo + caption, picker card + label + each model row + note, photo, pill, glass panel + label + each package + price + text + button + link, offer badge parts, each included row, each bonus row, price-card items incl. each capacity slot, footer heading/link/legal/field/button/wordmark). Items entering together reveal in DOM (reading) order, 0.05s apart — heading → right intro → content; left column before right. Stagger cap raised 0.4 → 1.6s. Card/panel containers with a background reveal first, then their contents. | Owner feedback; applies to all future sections. |
| 2026-11-17 | **Bug fixed:** time tokens can compute as "50ms"; reveal.ts now converts ms/s (it was reading 50 s and capping every delay). | Found while testing. |
| 2026-11-17 | **Capacity bar:** booked slots now the same height as empty ones (20px; Figma had 28 / 20). | Owner. |
| 2026-11-17 | **Batch 3 built — Guarantee, Services, Models, How it works.** Guarantee is a generic `Split.astro` (Final CTA will reuse it with a form): 768/672 split (Pricing-page metadata; Home code shows flex-1), glass panel 24px right of centre with the wordmark (Figma x 320.5 / 170 in the 672 half); progress bar fills once on reveal (`--m-bar-time` 1.2s, full without JS/reduced motion). Services cards from `services.ts`; Models cards' "from" prices computed from pricing.ts (`fromPrice`: lowest across the card's models); Models columns 319/319/319/367; How it works rails 500 / rest. Cybertruck card uses the original 735px hero photo (Figma's fill) — soft; Rivian photo 2048px. | Figma 337:402 / 438 / 652 / 713. |
| 2026-11-17 | **Big-number spacing:** `.t-num-*` / `.t-price-xl` get a trailing margin equal to their negative tracking, because browsers apply letter-spacing after the last glyph and Figma doesn't ("48 hrs", "1 hour", "$1,790 all in" now sit at Figma distance). | Measured vs Figma. |
| 2026-11-17 | **Responsive (proposed):** Split stacks (dark half, then the image half with the panel in flow); Services 1 → 2 (768) → 3 (1024) columns; Models 1 → 2 (768) → Figma 4 (1024); How it works stacks the photo card above the steps. | No mobile frames. |
