// Home page content + section order (DESIGN_SYSTEM §8).
// Reorder or switch sections by editing `sections`; (0n) indexes are
// generated from entries with `numbered: true`. Section copy: blocks.ts.
import type { HeroProps } from '../components/sections/Hero.astro';
import type { ImageMetadata } from 'astro';
import { site } from './site';
import * as b from './blocks';
import deliveryWeek from '../assets/images/home/delivery-week.jpg';

// HERO PHOTO — to replace it, drop ONE file named `hero.jpg` / `hero.jpeg` /
// `hero.png` / `hero.webp` / `hero.avif` into src/assets/images/home/ and
// delete the old one. No code change needed. Use at least 2560 px wide for a
// sharp result on large screens (Astro makes the smaller sizes). Adjust the
// crop on phones with `imagePosition` below.
const heroFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/home/hero.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const heroMatches = Object.values(heroFiles);
if (heroMatches.length !== 1) {
  throw new Error(
    `home.ts: expected exactly one hero.* image in src/assets/images/home/, found ${heroMatches.length}.`,
  );
}
const heroImage = heroMatches[0].default;

export const hero: HeroProps = {
  image: heroImage,
  imagePosition: 'center',
  overlay: false, // Hero v2.2 has no dark gradient over the photo
  quality: 90, // the owner's photo has smooth gradients that band at 80
  headline: ['Protect your EV in 48 hours.', 'Before the first rock chip.'],
  chips: [
    { label: 'Paint protection film' },
    { label: 'Ceramic tint', active: true },
    { label: 'Ceramic coating' },
  ],
  card: { image: deliveryWeek, tag: 'Delivery week', text: 'Book before delivery day.' },
  actions: [
    { label: 'See model pricing', href: '#pricing', variant: 'ghost-white' },
    { label: 'Get my price in 60 seconds', href: '#get-price', variant: 'white' },
  ],
  intro:
    "Paint protection film, ceramic tint and ceramic coating, made for electric cars only. Book before delivery day and we'll protect it the same week you get it.",
};

export const home: { title: string; description: string; sections: b.Section[] } = {
  title: `${site.brand}${site.mark} — EV paint protection film, tint and coating in Austin`,
  description: site.description,
  sections: [
    b.proof, b.statement, b.why, b.installsSection, b.picker, b.offer, b.guarantee,
    b.servicesSection, b.models, b.steps, b.reviewsSection, b.faqSection, b.cta,
  ],
};
