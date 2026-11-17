// Model pages (BUILD_PROMPT §3): one entry per page, rendered by
// src/pages/models/[model].astro. Adding a model = adding an entry here.
// Figma: Tesla 346:3011, Cybertruck 346:3881, Rivian 346:4751.
// Section order (Figma): Proof (01) → Recent installs (02) → Pricing (03,
// the model preselected) → Services (04) → Guarantee → Reviews (05) →
// FAQ (06) → Final CTA.
// Copy limits: hero headline 2 lines ≤ 30 characters; card text ≤ 28;
// intro ≤ 160 (DESIGN_SYSTEM §9).
import type { PageContent } from '../layouts/Page.astro';
import * as b from './blocks';
import { withProps } from '../lib/sections';
import { fromPrice } from './pricing';
import { site } from './site';
import modelY from '../assets/images/models/model-y.jpg';
import cybertruckHero from '../assets/images/heroes/cybertruck.jpg';
import rivian from '../assets/images/models/rivian.jpg';
import cardThumb from '../assets/images/heroes/card-thumb.png';

export interface ModelPage extends PageContent {
  /** URL: /models/<slug> */
  slug: string;
}

/** Sections shared by every model page; `pickerModel` is preselected in the price picker. */
const sections = (pickerModel: string) => [
  b.proof,
  b.installsSection,
  withProps(b.picker, { defaultModel: pickerModel }),
  b.servicesSection,
  b.guarantee,
  b.reviewsSection,
  b.faqSection,
  b.cta,
];

const title = (name: string) => `${name} paint protection, tint and coating — ${site.brand}${site.mark}`;

export const modelPages: ModelPage[] = [
  {
    slug: 'tesla',
    title: title('Tesla'),
    description:
      'Model-specific PPF patterns, signal-safe ceramic tint and roof heat film for Tesla Model 3, Y, S and X, fitted the week you take delivery in Austin.',
    hero: {
      image: modelY,
      headline: ['Tesla Model 3, Y, S & X.', `Protected in ${site.turnaroundHours} hours.`],
      chips: [{ label: 'Model 3' }, { label: 'Model Y', active: true }, { label: 'Model S & X' }],
      card: { image: cardThumb, tag: 'Model 3 & Y', text: `Front Shield from ${fromPrice(['model-3', 'model-y'], 'front-shield')}.` },
      actions: [
        { label: 'Reserve delivery week', href: '#get-price', variant: 'ghost-white' },
        { label: 'Get my Tesla price', href: '#pricing', variant: 'white' },
      ],
      intro:
        'The two most chipped cars on Austin highways. Model-specific film patterns, signal-safe tint and roof heat film, fitted the week you take delivery.',
    },
    sections: sections('model-y'),
  },
  {
    slug: 'cybertruck',
    title: title('Cybertruck'),
    description:
      'Stainless-safe paint protection film, ceramic tint and ceramic coating for the Tesla Cybertruck, from installers who have done it before.',
    hero: {
      image: cybertruckHero,
      headline: ['Cybertruck.', 'Different film. Different hands.'],
      chips: [{ label: 'Stainless-safe PPF' }, { label: 'Ceramic tint', active: true }, { label: 'Ceramic coating' }],
      card: { image: cardThumb, tag: 'Stainless-safe', text: `Full body from ${fromPrice(['cybertruck'], 'full-body')}.` },
      actions: [
        { label: 'See full-body PPF', href: '/pricing#price-list', variant: 'ghost-white' },
        { label: 'Get my Cybertruck price', href: '#pricing', variant: 'white' },
      ],
      intro:
        'Stainless panels need a stainless-safe film and installers who have done it before. Full-body protection in 3–4 days, exact day upfront.',
    },
    sections: sections('cybertruck'),
  },
  {
    slug: 'rivian',
    title: title('Rivian'),
    description:
      'Front Shield PPF, signal-safe ceramic tint and roof heat film for the Rivian R1S and R1T, cut for your exact model year in Austin.',
    hero: {
      image: rivian,
      headline: ['Rivian R1S & R1T.', 'Big front ends, covered.'],
      chips: [{ label: 'Front Shield' }, { label: 'Ceramic tint', active: true }, { label: 'Roof heat film' }],
      card: { image: cardThumb, tag: 'R1S & R1T', text: `Front Shield from ${fromPrice(['r1s'], 'front-shield')}.` },
      actions: [
        { label: 'Reserve delivery week', href: '#get-price', variant: 'ghost-white' },
        { label: 'Get my Rivian price', href: '#pricing', variant: 'white' },
      ],
      intro:
        'Big front ends mean big chip risk. Front Shield PPF, signal-safe ceramic tint and roof heat film for the R1S and R1T, cut for your exact model year.',
    },
    sections: sections('r1s'),
  },
];
