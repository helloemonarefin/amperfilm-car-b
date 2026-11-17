// Home page content + section order (DESIGN_SYSTEM §8).
// Reorder or switch sections by editing `sections`; (0n) indexes are
// generated from entries with `numbered: true`.
import type { HeroProps } from '../components/sections/Hero.astro';
import type { ProofProps } from '../components/sections/ProofStrip.astro';
import type { StatementProps } from '../components/sections/Statement.astro';
import type { WhyProps } from '../components/sections/WhyDiagram.astro';
import type { SectionEntry } from '../lib/sections';
import type { ImageMetadata } from 'astro';
import { site } from './site';
import deliveryWeek from '../assets/images/home/delivery-week.jpg';

const thousands = new Intl.NumberFormat('en-US');

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

export type HomeSection =
  | SectionEntry<'proof', ProofProps>
  | SectionEntry<'statement', StatementProps>
  | SectionEntry<'why', WhyProps>;

export const home: { title: string; description: string; sections: HomeSection[] } = {
  title: `${site.brand}${site.mark} — EV paint protection film, tint and coating in Austin`,
  description: site.description,
  sections: [
    {
      kind: 'proof',
      numbered: true,
      props: {
        srTitle: 'At a glance',
        stats: [
          { value: `${site.rating}★`, label: `${site.reviewCount} ${site.reviewSource} reviews` },
          { value: `${thousands.format(site.installsCount)}+`, label: 'EVs protected' },
          { value: `${site.turnaroundHours} hrs`, label: 'Most installs done' },
        ],
        aside: `©${site.year}`,
      },
    },
    {
      kind: 'statement',
      numbered: true,
      props: {
        label: 'Why EV-only',
        icon: 'bolt',
        title: { strong: "EVs aren't like other cars.", soft: "Your installer shouldn't treat them like they are." },
      },
    },
    {
      kind: 'why',
      numbered: false,
      props: {
        points: [
          {
            title: 'Paint that chips easily.',
            text: "Many EV owners find their factory paint chips fast. Front-end PPF is the first thing most owners wish they'd done.",
            tag: 'PPF',
          },
          {
            title: 'Signal-safe tint.',
            text: 'Cheap metal tints can block GPS, cell and key-card signals. We only install non-metal ceramic tint.',
            tag: 'Ceramic tint',
          },
          {
            title: 'Glass roofs.',
            text: 'Big glass roofs heat the cabin. Our roof film blocks up to 98% of infrared heat. Range stays where it should.',
            tag: 'Roof film',
          },
        ],
        solution: {
          label: 'Solution',
          title: ['One studio.', 'Electric cars only.'],
          text: 'Model-specific film patterns, signal-safe ceramic tint and roof heat film, from installers who only work on EVs.',
        },
      },
    },
  ],
};
