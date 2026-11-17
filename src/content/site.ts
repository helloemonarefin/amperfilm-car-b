// Client facts and global (every-page) copy. Each fact lives here once
// (DESIGN_SYSTEM §1). Fields marked TODO are filled from Figma when the
// section that shows them is built — never invented.
import type { ImageMetadata } from 'astro';
import deliveryWeek from '../assets/images/home/delivery-week.jpg';

export interface NavLink {
  label: string;
  /** Omit for an item with no page yet: it renders as plain text, never a dead link. */
  href?: string;
}

export interface Site {
  /** One word; drives every wordmark (hero 128, glass 15, footer 304).
   *  Limit: ≈ 9–10 characters to fit the footer at 304px (DESIGN_SYSTEM §9). */
  brand: string;
  /** Registered mark after the brand name; '' for none. */
  mark: string;
  /** Business name as written in the legal line ("©2026 Amperfilm"). */
  legalName: string;
  /** Production URL, no trailing slash. Also set `site` in astro.config.mjs. */
  url: string;
  /** Default meta description (≈ 150–160 characters). */
  description: string;
  /** Build year ("©YEAR"). Generated, never typed. */
  year: number;

  phone: string;
  email: string;
  address: { street: string; city: string };
  /** e.g. "Mon–Sat, 8am–6pm" (en dash). */
  hours: string;
  /** Towns listed after "Serving" (≤ 8, joined with " · "). */
  serviceArea: string[];
  /** Hours from drop-off to protected ("48 hours"). */
  turnaroundHours: number;
  /** Review rating out of 5 (shown "4.9★"). */
  rating: number;
  reviewCount: number;
  /** Where the reviews live ("Google"). */
  reviewSource: string;
  /** Installs to date; shown as "2,100+". */
  installsCount: number;
  /** Exact-price-by-text reply time for other EVs, in hours. */
  quoteHours: number;

  /** Menu links, in order (≤ 8, DESIGN_SYSTEM §9). */
  nav: NavLink[];

  menu: {
    /** Panel label next to the accent dot. */
    title: string;
    /** Pill on the current page's link. */
    here: string;
    offer: {
      /** ≤ 28 characters. */
      title: string;
      /** Model + package whose price shows on the card (from pricing.ts). */
      model: string;
      package: string;
      href: string;
      image: ImageMetadata;
      imageAlt: string;
      /** Shown after "<Model> <price> · " (≤ 30 characters). */
      note: string;
    };
    /** CTA label (≤ 30 characters, uppercase in the UI). */
    cta: { label: string; href: string };
    contactLabel: string;
    studioLabel: string;
  };

  footer: {
    /** `meta` line above the statement. */
    eyebrow: string;
    /** Statement lines (`h2-sm`); one entry per line at desktop, ≤ 2 lines. */
    statement: string[];
    columns: { heading: string; links: NavLink[] }[];
    rightsReserved: string;
    /** Prefix before the service-area list. */
    serving: string;
    /** Footer text form. */
    form: { label: string; placeholder: string; button: string };
  };
}

const TURNAROUND_HOURS = 48;

export const site: Site = {
  brand: 'amperfilm',
  mark: '®',
  legalName: 'Amperfilm',
  url: 'https://amperfilm.example', // placeholder: replace per client
  description:
    'Paint protection film, ceramic tint and ceramic coating, made for electric cars only. Book before delivery day and we’ll protect it the same week you get it.',
  year: new Date().getFullYear(),

  phone: '(512) 555-0187',
  email: 'hello@amperfilm.co',
  address: { street: '11604 Ridgeline Crossing, Bay 3', city: 'Austin, TX 78758' },
  hours: 'Mon–Sat, 8am–6pm',
  serviceArea: ['Austin', 'Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville', 'Lakeway', 'Bee Cave'],
  turnaroundHours: TURNAROUND_HOURS,
  rating: 4.9,
  reviewCount: 386,
  reviewSource: 'Google',
  installsCount: 2100,
  quoteHours: 1,

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Tesla', href: '/models/tesla' },
    { label: 'Cybertruck', href: '/models/cybertruck' },
    { label: 'Rivian', href: '/models/rivian' },
    { label: 'Tint', href: '/services/tint' },
    { label: 'Coating', href: '/services/coating' },
    { label: 'FAQ', href: '/faq' },
  ],

  menu: {
    title: 'Menu',
    here: "You're here",
    offer: {
      title: 'The Delivery Day Package',
      model: 'model-y',
      package: 'delivery-day', // a bundle id in pricing.ts
      href: '/#offer',
      image: deliveryWeek,
      imageAlt: '',
      note: `Protected within ${TURNAROUND_HOURS} hours`,
    },
    cta: { label: 'Get my price in 60 seconds', href: '/#get-price' },
    contactLabel: 'Call or text',
    studioLabel: 'Studio',
  },

  footer: {
    eyebrow: 'EV-only protection studio',
    statement: ['Protection built', 'for electric cars.'],
    columns: [
      {
        heading: 'Explore',
        links: [
          { label: 'Pricing', href: '/pricing' },
          { label: 'Tesla', href: '/models/tesla' },
          { label: 'Cybertruck', href: '/models/cybertruck' },
          { label: 'Rivian', href: '/models/rivian' },
        ],
      },
      {
        heading: 'Services',
        links: [
          { label: 'Tint', href: '/services/tint' },
          { label: 'Coating', href: '/services/coating' },
          { label: 'Warranty', href: '/#guarantee' },
          { label: 'Privacy' }, // no page yet → plain text (owner to confirm)
        ],
      },
    ],
    rightsReserved: 'All rights reserved',
    serving: 'Serving',
    form: { label: 'Get your price by text.', placeholder: 'Your phone number', button: 'Send' },
  },
};

/** Brand name as displayed, e.g. "amperfilm®". */
export const wordmark = `${site.brand}${site.mark}`;
/** "tel:" href from the display phone number. */
export const telHref = `tel:+1${site.phone.replace(/\D/g, '')}`;
