// Services (DESIGN_SYSTEM §9: exactly 3 cards on Home). The service pages
// (Phase 6) extend these entries. Figma: Home Services (337:438).
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/ui/Icon.astro';
import ppf from '../assets/images/services/ppf.jpg';
import tint from '../assets/images/services/tint.jpg';
import coating from '../assets/images/services/coating.jpg';

export interface ServiceCard {
  id: string;
  image: ImageMetadata;
  alt: string;
  icon: IconName;
  /** Glass panel: eyebrow (≤ 10), name (≤ 20), warranty pill (≤ 18). */
  eyebrow: string;
  name: string;
  warranty: string;
  /** Exactly 2 specs: value (`spec`, ≤ 14) + label (≤ 16). */
  specs: [{ value: string; label: string }, { value: string; label: string }];
  /** Card title (`h4`, ≤ 24) + text (≤ 80). */
  title: string;
  text: string;
  /** 3–5 check items, ≤ 32 characters each. */
  checks: string[];
  link: { label: string; href?: string };
}

export const services: ServiceCard[] = [
  {
    id: 'ppf', image: ppf, alt: 'Clear paint protection film being applied to a car in the bay', icon: 'shield',
    eyebrow: 'PPF', name: 'Self-healing film', warranty: '10-yr warranty',
    specs: [{ value: 'Model-specific', label: 'Film patterns' }, { value: 'Gloss · Satin', label: 'Finish options' }],
    title: 'Paint Protection Film',
    text: 'Self-healing film cut from patterns made for your exact model and year.',
    checks: ['Model-specific patterns', 'Self-healing in the sun', 'Gloss or satin', '10-year warranty', 'Cybertruck stainless-safe film'],
    // No PPF page in Figma: links to the price list until one exists (owner default, 2026-11-17).
    link: { label: 'Explore PPF', href: '/pricing' },
  },
  {
    id: 'tint', image: tint, alt: 'White car with dark ceramic window tint', icon: 'tint',
    eyebrow: 'Tint', name: 'Non-metal ceramic', warranty: 'Lifetime warranty',
    specs: [{ value: '98%', label: 'Infrared rejected' }, { value: 'TX legal', label: 'By default' }],
    title: 'Ceramic Window Tint',
    text: 'Non-metal ceramic film. Blocks heat, not signals.',
    checks: ['Up to 98% infrared rejection', 'No GPS or phone interference', 'Texas legal by default', 'Lifetime warranty'],
    link: { label: 'Explore Tint', href: '/services/tint' },
  },
  {
    id: 'coating', image: coating, alt: 'Ceramic coating being applied to a headlight with a foam pad', icon: 'coating',
    eyebrow: 'Coating', name: 'Ceramic coating', warranty: '5 or 7 years',
    specs: [{ value: '10 min', label: 'Wash time' }, { value: 'Safe over', label: 'PPF' }],
    title: 'Ceramic Coating',
    text: 'A hard, slick layer that makes washing a 10-minute job.',
    checks: ['Paint correction first', 'Wheels and glass included', '5- or 7-year options', 'Safe over PPF'],
    link: { label: 'Explore Coating', href: '/services/coating' },
  },
];
