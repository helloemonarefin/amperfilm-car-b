// Service pages (BUILD_PROMPT §3): one entry per page, rendered by
// src/pages/services/[service].astro. Kept apart from services.ts (the
// cards) because blocks.ts imports the cards and these pages import blocks.
// Figma: Tint 347:5621, Coating 347:6483.
import type { PageContent } from '../layouts/Page.astro';
import * as b from './blocks';
import { withProps } from '../lib/sections';
import { fromPrice, pricing } from './pricing';
import { tintFaq, coatingFaq } from './faq';
import tint from '../assets/images/services/tint.jpg';
import coating from '../assets/images/services/coating.jpg';
import cardThumb from '../assets/images/heroes/card-thumb.png';
import { site } from './site';

export interface ServicePage extends PageContent {
  /** URL: /services/<slug> */
  slug: string;
}

const allModels = pricing.models.map((m) => m.id);
const title = (name: string) => `${name} for EVs in Austin — ${site.brand}${site.mark}`;

export const servicePages: ServicePage[] = [
  {
    // Figma order: Proof (01) → Why EV-only diagram → Services (02) →
    // Pricing (03) → Guarantee → How it works → FAQ (04) → Final CTA.
    slug: 'tint',
    title: title('Ceramic window tint'),
    description:
      'Non-metal ceramic tint with up to 98% infrared rejection. No GPS, phone-key or cell interference. Texas legal by default, lifetime warranty.',
    hero: {
      image: tint,
      headline: ['Ceramic tint that blocks heat.', 'Not your signal.'],
      chips: [{ label: 'Up to 98% IR' }, { label: 'Signal safe', active: true }, { label: 'Texas legal' }],
      card: { image: cardThumb, tag: 'Signal safe', text: `Ceramic tint from ${fromPrice(allModels, 'tint')}.` },
      actions: [
        { label: 'Add roof heat film', href: '/pricing#price-list', variant: 'ghost-white' },
        { label: 'Get my tint price', href: '#pricing', variant: 'white' },
      ],
      intro:
        'Non-metal ceramic film with up to 98% infrared rejection. No GPS, phone-key or cell interference. Texas legal by default, lifetime warranty.',
    },
    sections: [
      b.proof,
      b.why,
      b.servicesSection,
      b.picker,
      b.guarantee,
      b.steps,
      withProps(b.faqSection, { items: tintFaq }),
      b.cta,
    ],
  },
  {
    // Figma order: Proof (01) → Recent installs (02) → Services (03) →
    // Pricing (04) → Guarantee → Reviews (05) → FAQ (06) → Final CTA.
    slug: 'coating',
    title: title('Ceramic coating'),
    description:
      'A hard, slick ceramic layer over paint, PPF, wheels and glass, with paint correction first. 5- or 7-year options for electric cars.',
    hero: {
      image: coating,
      headline: ['A 10-minute wash.', 'For the next seven years.'],
      chips: [{ label: 'Paint correction' }, { label: 'Wheels & glass', active: true }, { label: 'Safe over PPF' }],
      card: { image: cardThumb, tag: '5 or 7 years', text: `Ceramic coating from ${fromPrice(allModels, 'coating')}.` },
      actions: [
        { label: 'Pair it with PPF', href: '/pricing#price-list', variant: 'ghost-white' },
        { label: 'Get my coating price', href: '#pricing', variant: 'white' },
      ],
      intro:
        'A hard, slick ceramic layer over paint, PPF, wheels and glass. Paint correction first, so the gloss you lock in is the best your car has ever looked.',
    },
    sections: [
      b.proof,
      b.installsSection,
      b.servicesSection,
      b.picker,
      b.guarantee,
      b.reviewsSection,
      withProps(b.faqSection, { items: coatingFaq }),
      b.cta,
    ],
  },
];
