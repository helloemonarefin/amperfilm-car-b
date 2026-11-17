# Build prompt — Master D (Astro)

You are building a marketing website in Astro that must be an **exact, pixel-accurate copy** of a Figma design called **Master D** ("amperfilm®", an EV protection studio). The site is also a **template**: afterwards it will be reused for other clients by changing brand values, copy, images and prices only. Build it so that's easy.

Work in phases. **Stop at the end of every phase**, report what you did, and wait for my OK before starting the next one.

---

## 1. The files you have

| File | What it is | How to read it |
|---|---|---|
| `DESIGN_SYSTEM-MASTER-D.md` | How Master D looks and behaves: colours, glass system, type roles, layout and rails, every component, section order per page, copy limits, Figma inconsistencies, and the full `tokens.css` (§11) | **Read it all.** It is the source of truth for design decisions. |
| `BOILERPLATE-GUIDELINES.md` | My standard build rules: project defaults (§4.0), setup (§4), conventions (§5), typography method (§6), **entrance animation system (§7)**, component patterns (§1–2) | It's long. **Read now:** Overview, §3, §4 (all), §5, §6, §7, Per-project inputs. **Read §1 and §2 only when you build the thing they describe** (e.g. §1.8 when you build the menu). |

Where the files disagree:
- the design system wins on **how things look**;
- the boilerplate wins on **how things are built**;
- if it's still unclear, ask me. Never guess.

**Ignore everything in the boilerplate about Keystatic/CMS, Embla, hero parallax, the hero arc/portrait and the text roll.** Master D doesn't use them.

---

## 2. The Figma design

- File: https://www.figma.com/design/FFs05OacP9URxrCuYpT1fT/My-Portfolio
- Page: **Master D** (page id `318:121`)
- All frames are desktop, 1440 wide. **There are no mobile frames.**
- Node ids of every page and every Home section are in DESIGN_SYSTEM §2 and §8.
- Inner-page section nodes: read the page frame with `get_metadata` once, then work section by section.

**How to read Figma:** use the Figma MCP tools.
- Call `get_design_context` and `get_screenshot` on **one section node at a time**. Never request a whole page: it's too large and wastes credits.
- If the Figma MCP isn't connected, tell me in Phase 0 and stop.

**How to use what Figma returns:**
- Treat the code it returns as a **reference for measurements**, not code to paste. Rebuild every value with the tokens and `.t-<role>` classes.
- The Figma file has **no text styles** and many near-duplicate values. DESIGN_SYSTEM §3–5 and §10 already merge them. Always map a Figma value to the nearest token or role listed there. If a value doesn't fit any of them, **list it and ask me**. Never add a random number.
- Copy every text **exactly**: words, punctuation, “ ” quotes, en dashes, `·`, `®`, `★`.

---

## 3. Fixed decisions (don't ask about these)

**Stack and project defaults:** exactly as BOILERPLATE §4.0 and §4.1.
- Latest stable Astro, static output, plain CSS, TypeScript strict, no UI framework, no CMS.
- `<html lang="en-US">`.
- Netlify (config only, never deploy).
- Playwright as a dev dependency for screenshot checks.
- Packages: `astro`, `@astrojs/sitemap`, `lenis`. Nothing else without asking.
- Font: **DM Sans** via Astro's fonts API with the Fontsource provider, weights 300/400/500/600.

**Tokens and CSS:**
- Create `src/styles/tokens.css` exactly from DESIGN_SYSTEM §11, then add the motion block from BOILERPLATE §7.2.
- CSS files and their order as in BOILERPLATE §4.0: tokens → typography → global → motion.
- Never hard-code a colour, size, spacing, radius, blur or duration in a component.

**Content and template structure:**

```
src/content/
  site.ts        ← brand name (drives every wordmark), phone, email, address, hours,
                   service area, rating, review count, installs count, turnaround
  pricing.ts     ← models × packages → price, description, warranty; "most booked" flags
  models.ts      ← one entry per model page (Tesla, Cybertruck, Rivian…): hero, chips, section list, copy
  services.ts    ← one entry per service page (Tint, Coating…)
  home.ts, faq.ts, reviews.ts, installs.ts
```

- **Every section is a component that takes its content as props.** No copy is typed inside a component.
- **Each page's section order is an array.** Each entry has `numbered: true/false`, and the `(0n)` indexes are generated from the numbered entries only (DESIGN_SYSTEM §8).
- **Model pages and service pages come from one dynamic route each** (`src/pages/[model].astro`, `src/pages/services/[service].astro`, or flat slugs matching the Figma names), built from `models.ts` / `services.ts`. Adding a model must not need a new page file.
- **Every price on the site reads from `pricing.ts`.**
- **The wordmark is live text** from `site.ts` (DESIGN_SYSTEM §1).
- Write the DESIGN_SYSTEM §9 copy limits as comments next to the content fields.

**Interactive parts.** Vanilla TypeScript, with progressive enhancement: the content must be readable without JS.
1. **Menu panel** (DESIGN_SYSTEM §7): opens from the right on every page and at every size. Focus trap, Esc, scroll lock, `aria-expanded`, and the current page marked with "You're here" + `aria-current="page"`.
2. **Price picker:** model and package as real radio inputs. Updates the photo, price, description and CTA link from `pricing.ts`. Without JS, the default model and package show.
3. **FAQ accordion:** built on `<details>`/`<summary>` or buttons with `aria-expanded`. Show me the approach before you build it. The FAQ page shows all items open.
4. **Forms** (final CTA, footer): Netlify Forms with a honeypot, real `<label>`s, `type="tel"` for the phone, and native `<select>`s styled to match.
5. **Proposed sticky header:** after the hero, a compact bar (small wordmark + menu button) appears. Ask me before building it; it isn't in Figma.

**Glass and glows:** follow DESIGN_SYSTEM §4.
- Use `backdrop-filter` with the `-webkit-` prefix, and provide the no-support fallback.
- Glows are decorative and `aria-hidden`.
- **Check the scroll smoothness** with the glows on. If it stutters, replace the blur filter with a pre-blurred `radial-gradient` and tell me.

**Motion:** subtle, exactly as in BOILERPLATE §7.
- Hero page-load intro (§7.4): wordmark → headline → buttons → glass card and chips.
- Scroll reveal (§7.6) on headings, cards, rows, stats and photos.
- Button hover: colour change only, 200ms.
- Menu: the panel slides in from the right (≈24px + fade, `--ease-smooth`) and the backdrop fades. Links reveal with the §7 stagger.
- Progress bars in the glass panels fill once on reveal.
- **No nav intro**: the header has no inline nav.
- Reduced motion handled as in BOILERPLATE §1.12 and §7.7.

**Mobile:** no mobile frames exist. Use the proposed rules in DESIGN_SYSTEM §6 and the fluid type in §11. List every layout decision you make that isn't written down.

**Accessibility:**
- Semantic HTML: one `<h1>` per page (the hero headline; the hero wordmark isn't the `<h1>`), sections with `aria-labelledby`, a real `<table>` for the price table, lists with `role="list"`.
- Text over photos must meet 4.5:1 contrast. Check the glass panels.
- Tap targets ≥ 24px. Inputs ≥ 16px.

---

## 4. Phases

### Phase 0 — Read and plan (no code)
1. Read both files as described in §1.
2. Confirm Figma MCP access with a screenshot of the Hero node `337:122`.
3. Create `CLAUDE.md` with:
   - the agent working rules (BOILERPLATE §5);
   - this prompt's §3 fixed decisions;
   - an empty **Decisions log**.
4. Give me:
   - your build plan;
   - the component list;
   - the content-file shapes (TypeScript types);
   - anything unclear or contradictory;
   - numbered questions.

**Stop.**

### Phase 1 — Setup and styleguide
Set up the project:
- the Astro project and packages;
- fonts, sitemap and `Base.astro` (full meta, Open Graph, favicon placeholders per BOILERPLATE §4.0);
- `git init` and the first commit;
- `tokens.css`, `typography.css` (every role in DESIGN_SYSTEM §5);
- `global.css`: reset, container, rails and grid helpers, `.glass` + modifiers, section meta bar, focus ring, `.sr-only`;
- `motion.css` (BOILERPLATE §7).

Then build a private `/styleguide` page (`noindex`, not in the sitemap) showing:
- colour swatches;
- every type role at its real size, with desktop and mobile sizes;
- the spacing scale;
- radii;
- the three glass variants on a photo;
- a glow;
- the rails;
- the grid overlay.

**Stop.**

### Phase 2 — Core components
Build these components:
- Wordmark
- Icon set (Figma paths)
- Button (dark, white, ghost, ghost-white, CTA; sm, md, lg)
- Round icon button, Icon badge
- Pills and tags (all variants)
- Text link
- Section meta bar, Section header (two-tone)
- Glass panel
- Form fields (dark + light)
- Menu button + Menu panel
- Footer

Add every component to the styleguide in all its states.

**Stop.**

### Phase 3 — Home, section by section
For **each** section, in the DESIGN_SYSTEM §8 order:
1. `get_design_context` + `get_screenshot` for that node only.
2. Build it from the core components, tokens and content files.
3. Use Playwright to screenshot it at a 1440 viewport and compare with Figma. Check:
   - sizes, weights, line heights, colours and opacities;
   - gaps and padding;
   - rail and grid alignment;
   - image crops;
   - headline line breaks;
   - glass blur and borders.
   Fix every difference, then compare again.
4. List anything you couldn't match exactly and why.

Report to me after every **3–4 sections**, with your screenshots next to the Figma ones. **Stop** at each report.

### Phase 4 — Responsive
Check Home at 390, 768, 1024, 1280 and 1440, plus every 50px between 360 and 1440.

At every width check for:
- no horizontal scroll (watch the giant wordmark and the glows);
- no text overflow;
- no single-word heading lines at 390;
- glass text still readable;
- tap targets ≥ 24px, inputs ≥ 16px.

Send me screenshots at 390 and 768, plus your mobile decisions list.

**Stop.**

### Phase 5 — Interactions and motion
Build:
- the price picker;
- the FAQ (after I approve the approach);
- the forms;
- the menu behaviour;
- all motion from §3.

Then:
- run the BOILERPLATE §7.8 checklist;
- test keyboard-only through the whole page (menu, picker, FAQ, forms);
- test with reduced motion on.

**Stop.**

### Phase 6 — Inner pages
Build:
- Pricing (with the full price table);
- the model-page template, then Tesla, Cybertruck and Rivian from data;
- the service-page template, then Tint and Coating;
- the FAQ page.

Reuse the section components. Only build a new component for a block that really is new, and tell me which ones are new. Verify each page at 1440 and 390, the same way as Phase 3.

**Stop** after Pricing, after the model pages, and after the service + FAQ pages.

### Phase 7 — QA and launch prep
- Lighthouse on every page. Targets: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100, CLS < 0.05.
- Run `astro check` and a production build with no warnings.
- Add a 404 page, `robots.txt` and `netlify.toml`.
- Check every link and image. Alt text everywhere; decorative images get `alt=""`.
- Write `TEMPLATE.md`: how to reskin for a new client in 10 steps or fewer. Cover brand tokens, font, brand name (wordmark), `site.ts`, `pricing.ts`, adding a model, adding a service, section arrays and images.

**Stop.** Don't deploy or push until I say so.

---

## 5. Working rules

- **One phase at a time.** Wait for my OK between phases. Commit at the end of each phase.
- **Never invent design.** If Figma doesn't show it and the files don't say it, ask me.
- **Keep the Decisions log in `CLAUDE.md` up to date** with every choice that isn't in the files, with the date.
- **Save credits:**
  - read Figma one section at a time;
  - read boilerplate sections only when needed;
  - don't re-read unchanged files;
  - summarise instead of pasting large files.
- **Reports are short:**
  - what's done;
  - what doesn't match Figma yet, and why;
  - your questions.

Start with Phase 0.
