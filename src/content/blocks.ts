// Shared section entries (DESIGN_SYSTEM §8). Home, Pricing, model, service
// and FAQ pages compose their section arrays from these, so the copy lives in
// one place. A page that needs a variation spreads an entry and overrides
// props (e.g. the picker's default model). Figma: Master D Home + inner pages.
import type { ProofProps } from '../components/sections/ProofStrip.astro';
import type { StatementProps } from '../components/sections/Statement.astro';
import type { WhyProps } from '../components/sections/WhyDiagram.astro';
import type { InstallsProps } from '../components/sections/Installs.astro';
import type { PickerProps } from '../components/sections/PricePicker.astro';
import type { OfferProps } from '../components/sections/Offer.astro';
import type { SplitProps } from '../components/sections/Split.astro';
import type { ServicesProps } from '../components/sections/Services.astro';
import type { ModelsProps } from '../components/sections/Models.astro';
import type { StepsProps } from '../components/sections/Steps.astro';
import type { ReviewsProps } from '../components/sections/Reviews.astro';
import type { FaqProps } from '../components/sections/Faq.astro';
import type { FinalCtaProps } from '../components/sections/FinalCta.astro';
import { reviews } from './reviews';
import { faq } from './faq';
import ctaPhoto from '../assets/images/cta/cta.jpg';
import { installs } from './installs';
import { services } from './services';
import modelY from '../assets/images/models/model-y.jpg';
import cybertruck from '../assets/images/models/cybertruck.png';
import rivian from '../assets/images/models/rivian.jpg';
import ppfPhoto from '../assets/images/services/ppf.jpg';
import type { SectionEntry } from '../lib/sections';
import { site, telHref } from './site';
import deliveryWeek from '../assets/images/home/delivery-week.jpg';

const thousands = new Intl.NumberFormat('en-US');

export type Section =
  | SectionEntry<'proof', ProofProps>
  | SectionEntry<'statement', StatementProps>
  | SectionEntry<'why', WhyProps>
  | SectionEntry<'installs', InstallsProps>
  | SectionEntry<'picker', PickerProps>
  | SectionEntry<'offer', OfferProps>
  | SectionEntry<'split', SplitProps>
  | SectionEntry<'services', ServicesProps>
  | SectionEntry<'models', ModelsProps>
  | SectionEntry<'steps', StepsProps>
  | SectionEntry<'reviews', ReviewsProps>
  | SectionEntry<'faq', FaqProps>
  | SectionEntry<'cta', FinalCtaProps>;

export const proof: SectionEntry<'proof', ProofProps> = {
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
};

export const statement: SectionEntry<'statement', StatementProps> = {
  kind: 'statement',
  numbered: true,
  props: {
    label: 'Why EV-only',
    icon: 'bolt',
    title: { strong: "EVs aren't like other cars.", soft: "Your installer shouldn't treat them like they are." },
  },
};

export const why: SectionEntry<'why', WhyProps> = {
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
};

export const installsSection: SectionEntry<'installs', InstallsProps> = {
  kind: 'installs',
  numbered: true,
  props: {
    label: 'Recent installs',
    title: { strong: 'Real EVs. Real installs.', soft: 'Straight from our Austin bay.' },
    intro: `${thousands.format(site.installsCount)}+ EVs protected. We text photos like these while we work on yours.`,
    items: installs,
  },
};

export const picker: SectionEntry<'picker', PickerProps> = {
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
};

export const offer: SectionEntry<'offer', OfferProps> = {
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
};

export const guarantee: SectionEntry<'split', SplitProps> = {
  kind: 'split',
  numbered: false,
  props: {
    id: 'guarantee',
    icon: 'clock',
    title: `The ${site.turnaroundHours}-Hour Promise.`,
    text: `If we quote ${site.turnaroundHours} hours and your car isn't ready in ${site.turnaroundHours} hours, your tint is free. Simple as that. We schedule tight on purpose: you bought an EV to drive it, not to leave it at a shop.`,
    fine: "Applies to Delivery Day and Front Shield packages. Full-body PPF takes 3–4 days, and we'll tell you the exact day upfront.",
    pills: [{ label: 'Delivery Day' }, { label: 'Front Shield' }, { label: 'Your tint is free' }],
    visual: {
      image: modelY,
      icon: 'clock',
      caption: ['Quoted. Ready.', 'Or your tint is free.'],
      number: String(site.turnaroundHours),
      unit: 'hrs',
      numberSize: 'xl',
      label: 'Delivery Day turnaround',
      progress: 260 / 332, // Figma bar fill
      axis: ['0h', `${site.turnaroundHours / 2}h`, `${site.turnaroundHours}h`],
    },
  },
};

export const servicesSection: SectionEntry<'services', ServicesProps> = {
  kind: 'services',
  numbered: true,
  props: {
    label: 'What we install',
    title: { strong: 'Everything we install.', soft: "Nothing we don't." },
    intro: 'Three services, each chosen for how electric cars are built and driven.',
    items: services,
  },
};

export const models: SectionEntry<'models', ModelsProps> = {
  kind: 'models',
  numbered: true,
  props: {
    label: 'Your model',
    title: { strong: 'Built around your car.', soft: 'Patterns for your exact model and year.' },
    cta: { label: 'See all model pricing', href: '/pricing' },
    cards: [
      {
        brand: 'Tesla', title: 'Model 3 & Y', text: 'The two most chipped cars on Austin highways.',
        image: modelY, alt: 'Close-up of a blue Tesla', href: '/models/tesla',
        priceTemplate: 'Front Shield from {price}', models: ['model-3', 'model-y'], package: 'front-shield',
      },
      {
        brand: 'Tesla', title: 'Cybertruck', text: 'Stainless panels need different film and different hands.',
        image: cybertruck, alt: 'Silhouette of an electric car against a pink sky', href: '/models/cybertruck',
        priceTemplate: 'Full body from {price}', models: ['cybertruck'], package: 'full-body',
      },
      {
        brand: 'Rivian', title: 'R1S & R1T', text: 'Big front ends, big chip risk.',
        image: rivian, alt: 'Front three-quarter view of a red SUV', href: '/models/rivian',
        priceTemplate: 'Front Shield from {price}', models: ['r1s'], package: 'front-shield',
      },
    ],
    other: {
      title: 'Lucid, BMW i & Mercedes EQ',
      text: `Plus Model S/X and R1T. Tell us the model and we'll reply with an exact number. 9am–6pm.`,
      pill: 'Exact price',
      number: String(site.quoteHours),
      unit: site.quoteHours === 1 ? 'hour' : 'hours',
      href: '#get-price',
    },
  },
};

export const steps: SectionEntry<'steps', StepsProps> = {
  kind: 'steps',
  numbered: false,
  props: {
    icon: 'bolt',
    title: 'Four steps. Zero guesswork.',
    intro: `From your first price to driving away protected, most packages take ${site.turnaroundHours} hours.`,
    photo: {
      image: ppfPhoto,
      alt: 'Paint protection film going onto a car in the bay',
      title: 'Model Y · Delivery Day',
      rows: [
        { title: 'Price sent', text: 'By text, 9:14am', done: true },
        { title: 'Slot booked', text: 'Delivery week, Mon', done: true },
        { title: 'Front Shield PPF', text: 'Photos texted at 2pm', done: false },
      ],
      doneLabel: 'Done',
      progressLabel: 'In progress',
      caption: 'Connecting every step to your phone.',
    },
    steps: [
      { icon: 'tag', title: 'Get your price', text: 'Pick your car and package. Exact price on screen or by text within 1 hour.' },
      { icon: 'calendar', title: 'Book your slot', text: 'Choose a day, or book your delivery week before you have the car.' },
      { icon: 'shield-plain', title: 'We protect it', text: `Most packages done in ${site.turnaroundHours} hours. We text photos while we work.` },
      { icon: 'key', title: 'Drive protected', text: 'Walkthrough at pickup, care guide in your inbox, warranty registered in your name.' },
    ],
  },
};

export const reviewsSection: SectionEntry<'reviews', ReviewsProps> = {
  kind: 'reviews',
  numbered: true,
  props: {
    label: 'Reviews',
    title: { strong: 'From people', soft: 'who drive what you drive.' },
    rating: { value: String(site.rating), source: `from ${site.reviewCount} ${site.reviewSource} reviews`, stars: 5 },
    photoLabel: 'Their car',
    items: reviews,
  },
};

export const faqSection: SectionEntry<'faq', FaqProps> = {
  kind: 'faq',
  numbered: true,
  props: {
    title: { strong: 'Questions', soft: 'EV owners ask us.' },
    intro: "Still unsure? Text us your model and we'll answer within the hour.",
    cta: { label: site.phone, href: telHref },
    items: faq.slice(0, 6),
    group: 'faq-home',
  },
};

export const cta: SectionEntry<'cta', FinalCtaProps> = {
  kind: 'cta',
  numbered: false,
  props: {
    id: 'get-price',
    icon: 'chat',
    title: 'Your EV, protected this week.',
    text: 'Get your exact price in 60 seconds. No call needed.',
    pills: [{ label: 'PPF' }, { icon: 'bolt' }, { label: 'Ceramic tint' }, { label: 'Ceramic coating' }],
    visual: {
      image: ctaPhoto,
      icon: 'bolt',
      caption: ['Pick your car.', 'See your exact price.'],
      number: '60',
      unit: 'sec',
      numberSize: 'lg',
      label: 'Time to your price',
      progress: 1,
    },
    form: {
      name: 'get-price',
      carLabel: 'Car',
      packageLabel: 'Package',
      contactLabel: 'Phone or email',
      contactPlaceholder: '(512) 555-0000',
      defaultModel: 'model-y',
      defaultPackage: 'delivery-day',
      submit: 'Show my price',
      note: "We text you back. We don't spam.",
    },
  },
};
