// Home page content + section order (DESIGN_SYSTEM §8).
// Reorder or switch sections by editing `sections`; (0n) indexes are
// generated from entries with `numbered: true`.
import type { HeroProps } from '../components/sections/Hero.astro';
import type { ProofProps } from '../components/sections/ProofStrip.astro';
import type { StatementProps } from '../components/sections/Statement.astro';
import type { WhyProps } from '../components/sections/WhyDiagram.astro';
import type { InstallsProps } from '../components/sections/Installs.astro';
import type { PickerProps } from '../components/sections/PricePicker.astro';
import type { OfferProps } from '../components/sections/Offer.astro';
import { installs } from './installs';
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
  overlay: false, // Hero v2.2 has no dark gradient over the photo
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
  | SectionEntry<'why', WhyProps>
  | SectionEntry<'installs', InstallsProps>
  | SectionEntry<'picker', PickerProps>
  | SectionEntry<'offer', OfferProps>;

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
    {
      kind: 'installs',
      numbered: true,
      props: {
        label: 'Recent installs',
        title: { strong: 'Real EVs. Real installs.', soft: 'Straight from our Austin bay.' },
        intro: `${thousands.format(site.installsCount)}+ EVs protected. We text photos like these while we work on yours.`,
        items: installs,
      },
    },
    {
      kind: 'picker',
      numbered: true,
      props: {
        label: 'Simple pricing',
        title: { strong: 'Your price, before you call.', soft: 'Pick your EV, see one number.' },
        intro: 'No "call for quote". The price you see is the price on the invoice.',
        modelsLabel: '1. Pick your EV',
        packagesLabel: '2. Pick a package',
        unit: 'all in',
        mostBooked: 'Most booked',
        cta: { label: 'Get my price in 60 seconds', href: '#get-price' },
        more: { label: 'See the full price list', href: '/pricing' },
      },
    },
    {
      kind: 'offer',
      numbered: true,
      props: {
        badge: 'Most popular',
        title: { strong: 'The Delivery Day Package.', soft: `Protected within ${site.turnaroundHours} hours of delivery.` },
        intro: {
          strong: 'Book before you pick up your car.',
          soft: `We protect it within ${site.turnaroundHours} hours of delivery, before it ever sees MoPac traffic.`,
        },
        bundleId: 'delivery-day',
        modelId: 'model-y',
        photo: { image: deliveryWeek, alt: 'Installer finishing paint protection film on a new EV' },
        includedLabel: 'Included',
        included: [
          { title: 'Front Shield PPF', text: 'Bumper, hood, fenders, mirrors, headlights' },
          { title: 'Ceramic tint, all windows', text: 'Texas legal, signal safe' },
          { title: 'Glass roof heat film', text: 'Cooler cabin, better summer range' },
        ],
        bonuses: {
          label: 'Bonuses',
          title: 'Three things we add so delivery week goes right.',
          items: [
            { icon: 'list', title: 'The Delivery Inspection Checklist', text: 'A 15-minute checklist to catch panel gaps and paint flaws before you sign for the car.', tag: 'Bonus' },
            { icon: 'pin', title: 'Free pickup within 15 miles', text: 'We collect it from your house or the delivery center.', tag: '$150 value' },
            { icon: 'eye', title: 'Free 6-month film check', text: 'We inspect every edge and fix anything that lifted.', tag: 'Bonus' },
          ],
        },
        savingsTemplate: 'Save {amount} vs. separate',
        capacity: { label: 'Delivery-week slots this week', total: 8, booked: 5, note: '{booked} of {total} booked · booked slots show on the calendar' },
        cta: { label: 'Reserve my delivery week', href: '#get-price' },
      },
    },
  ],
};
