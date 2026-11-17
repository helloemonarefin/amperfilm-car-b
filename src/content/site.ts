// Client facts — each lives here once (DESIGN_SYSTEM §1).
// Fields still marked TODO are filled from Figma when the section that shows
// them is built (Phase 2 footer / Phase 3), never invented.

export interface Site {
  /** One word; drives every wordmark (hero 128, glass 15, footer 304).
   *  Limit: fits 1360px at 304px ≈ 9–10 characters (DESIGN_SYSTEM §9). */
  brand: string;
  /** Registered mark after the brand name; '' for none. */
  mark: string;
  /** Production URL, no trailing slash. Also set `site` in astro.config.mjs. */
  url: string;
  /** Default meta description (≈ 150–160 characters). */
  description: string;
  /** Build year, shown as "©YEAR" in the proof strip. Generated, never typed. */
  year: number;
}

export const site: Site = {
  brand: 'amperfilm',
  mark: '®',
  url: 'https://amperfilm.example', // placeholder: replace per client
  // TODO(Phase 3): confirm exact copy from the hero node.
  description:
    'Paint protection film, ceramic tint and ceramic coating, made for electric cars only. Book before delivery day and we’ll protect it the same week you get it.',
  year: new Date().getFullYear(),
};

/** Brand name as displayed, e.g. "amperfilm®". */
export const wordmark = `${site.brand}${site.mark}`;
