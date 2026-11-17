// Section order helpers (BUILD_PROMPT §3, DESIGN_SYSTEM §8).
// Each page's sections are an ordered array. Only entries with
// `numbered: true` get an index, so "(0n)" is generated, never typed.

export interface SectionEntry<K extends string = string, P extends object = object> {
  /** Which section component renders this entry (see SectionRenderer). */
  kind: K;
  /** Counts toward the (0n) numbering. */
  numbered: boolean;
  /** Content props for the section component. */
  props: P;
}

export type NumberedEntry<E extends SectionEntry> = E & { index?: number };

/** Adds `index` (1-based) to numbered entries, in page order. */
export function numberSections<E extends SectionEntry>(entries: E[]): NumberedEntry<E>[] {
  let n = 0;
  return entries.map((e) => (e.numbered ? { ...e, index: ++n } : { ...e }));
}

/** "(01)" */
export const formatIndex = (i: number) => `(${String(i).padStart(2, '0')})`;
