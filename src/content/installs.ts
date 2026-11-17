// Recent install photos (DESIGN_SYSTEM §9: exactly 4 on Home).
// Photos alternate tall / short in the row (bottom-aligned).
import type { ImageMetadata } from 'astro';
import ppf from '../assets/images/services/ppf.jpg';
import deliveryWeek from '../assets/images/home/delivery-week.jpg';
import tint from '../assets/images/services/tint.jpg';
import coating from '../assets/images/services/coating.jpg';

export interface Install {
  image: ImageMetadata;
  /** Describes the photo for screen readers. */
  alt: string;
  /** White pill on the photo (≤ 18 characters, shown uppercase). */
  tag: string;
  /** Caption "<Model> · <note>" (≤ 36 characters). */
  caption: string;
}

export const installs: Install[] = [
  { image: ppf, alt: 'Clear paint protection film going onto a car in the bay', tag: 'Full Body PPF', caption: 'Model Y · Film going on, day 2' },
  { image: deliveryWeek, alt: 'Installer finishing a film edge by hand on a white car', tag: 'Front Shield', caption: 'Model 3 · Hand-finished edges' },
  { image: tint, alt: 'White car with dark ceramic window tint', tag: 'Ceramic Tint', caption: 'Model 3 · Signal-safe, Texas legal' },
  { image: coating, alt: 'Ceramic coating being applied to a headlight with a foam pad', tag: 'Ceramic Coating', caption: 'Rivian R1S · 5-year coating' },
];
