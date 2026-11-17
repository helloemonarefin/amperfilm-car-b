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
| 2026-11-17 | **Footer wordmark sizing:** to be sized with container-query units against the footer, so it fills the content width at every size (Phase 2, footer). At 304px with −6% tracking, "amperfilm®" is slightly wider than 1360. | Owner accepted the proposal (Phase 0, Q2). |
| 2026-11-17 | **URLs:** `/models/<slug>` and `/services/<slug>`. | Owner accepted the recommendation (Phase 0, Q4). |
