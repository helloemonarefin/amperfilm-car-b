// Reviews (DESIGN_SYSTEM §9: 3 on Home). Figma: Home Reviews (337:784).
import type { ImageMetadata } from 'astro';
import modelY from '../assets/images/models/model-y.jpg';
import cybertruck from '../assets/images/models/cybertruck.png';
import rivian from '../assets/images/models/rivian.jpg';

export interface Review {
  /** "First L." */
  name: string;
  /** Model tag (≤ 14 characters). */
  model: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** `quote` 30, with “ ” quotes; ≤ 170 characters. */
  quote: string;
  photo: ImageMetadata;
  photoAlt: string;
  /** Accent-filled avatar (Figma: the first review). */
  featured?: boolean;
}

export const reviews: Review[] = [
  {
    name: 'Kevin L.', model: 'Model Y', stars: 5, featured: true,
    quote: '“Booked them before my Model Y delivery. Picked it up on Saturday, it was back to me Monday with PPF and tint. Easiest thing I\'ve done since buying the car.”',
    photo: modelY, photoAlt: "Kevin's blue Model Y",
  },
  {
    name: 'Ana M.', model: 'Cybertruck', stars: 5,
    quote: '“The only shop that knew the Cybertruck needed a different film. Zero lifting after 8 months.”',
    photo: cybertruck, photoAlt: "Ana's car",
  },
  {
    name: 'Josh P.', model: 'Rivian R1S', stars: 5,
    quote: '“Clear price on the website, same price on the invoice. That\'s rare.”',
    photo: rivian, photoAlt: "Josh's red SUV",
  },
];
