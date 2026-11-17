// Pricing and FAQ pages: hero copy + section order (DESIGN_SYSTEM §8).
// Figma: Pricing 346:2068, FAQ 347:7345. Shared section copy: blocks.ts.
import type { PageContent } from '../layouts/Page.astro';
import * as b from './blocks';
import { withProps } from '../lib/sections';
import { faq } from './faq';
import { site, smsHref } from './site';
import pricingPhoto from '../assets/images/heroes/pricing.png';
import modelY from '../assets/images/models/model-y.jpg';
import cardThumb from '../assets/images/heroes/card-thumb.png';

const title = (name: string) => `${name} — ${site.brand}${site.mark}`;

export const pricingPage: PageContent = {
  title: title('EV protection pricing'),
  description:
    'Clear prices for paint protection film, ceramic tint, roof heat film and ceramic coating on Tesla and Rivian. The number on screen is the number on your invoice.',
  hero: {
    image: pricingPhoto,
    headline: ['Your exact price.', 'Before you ever call.'],
    chips: [{ label: 'Front Shield' }, { label: 'Full body', active: true }, { label: 'Tint & coating' }],
    card: { image: cardThumb, tag: 'No surprises', text: 'Same price on the website.' },
    actions: [
      { label: 'Reserve delivery week', href: '#offer', variant: 'ghost-white' },
      { label: 'Get my price in 60 seconds', href: '#get-price', variant: 'white' },
    ],
    intro: `Clear prices for the most popular EVs. The number on screen is the number on your invoice. Other EVs get an exact price by text within ${site.quoteHours} hour.`,
  },
  sections: [
    b.proof,
    withProps(b.picker, {
      more: { label: 'See the full price list', href: '#price-list' },
      table: {
        title: { strong: 'The full price list.', soft: 'Five packages, four popular EVs.' },
        packageLabel: 'Package',
        mostBooked: 'Most booked',
        na: 'n/a',
      },
    }),
    b.offer,
    b.guarantee,
    b.faqSection,
    b.cta,
  ],
};

export const faqPage: PageContent = {
  title: title('Questions EV owners ask'),
  description:
    'Tint and signals, Texas law, warranty, sensors and booking before delivery: straight answers about protecting your EV.',
  hero: {
    image: modelY,
    headline: ['Questions EV owners ask us.', 'Straight answers.'],
    chips: [{ label: 'Tint & signals' }, { label: 'Warranty', active: true }, { label: 'Booking' }],
    card: { image: cardThumb, tag: `Answered in ${site.quoteHours} hour`, text: 'Text your model.' },
    actions: [
      { label: 'See pricing', href: '/pricing', variant: 'ghost-white' },
      { label: 'Text us a question', href: smsHref, variant: 'white' },
    ],
    intro: `Tint and signals, Texas law, warranty, sensors and booking before delivery. Still unsure? Text your model to ${site.phone} and we'll answer within the hour.`,
  },
  sections: [
    withProps(b.faqSection, {
      title: { strong: 'Every question,', soft: 'answered.' },
      items: faq,
      allOpen: true,
    }),
    b.steps,
    b.guarantee,
    b.cta,
  ],
};

// 404 (BOILERPLATE §4.8). Not in Figma: built from the shared hero, no new
// design. TODO(owner): confirm the copy.
export const notFoundPage: PageContent = {
  title: title('Page not found'),
  description: 'This page doesn’t exist. Head back home or see our EV protection prices.',
  hero: {
    image: modelY,
    headline: ['This page doesn’t exist.', 'Let’s get you back on track.'],
    actions: [
      { label: 'Back to home', href: '/', variant: 'ghost-white' },
      { label: 'See pricing', href: '/pricing', variant: 'white' },
    ],
    intro: `Text your model to ${site.phone} and we'll answer within the hour.`,
  },
  sections: [],
  noindex: true,
};
