// FAQ (DESIGN_SYSTEM §9: 6 on Home, 8+ on the FAQ page).
// Source: Figma FAQ page (347:8062) — every answer verbatim.
import { site } from './site';

export interface FaqItem {
  /** `faq-q`, ≤ 50 characters. */
  q: string;
  /** `body`, ≤ 120 characters. */
  a: string;
}

export const faq: FaqItem[] = [
  { q: 'Will tint affect my phone key or GPS?', a: 'Not ours. We only install non-metal ceramic film, so signals pass through.' },
  { q: 'Is the tint legal in Texas?', a: 'Yes. We install Texas-legal shades by default and will tell you before we install anything darker.' },
  { q: 'Can I book before my car arrives?', a: "Yes. Most of our clients do. Pick your delivery week and we'll hold a slot." },
  { q: 'Does PPF void my warranty?', a: 'No. Film sits on top of the paint and can be removed by a pro without damage.' },
  { q: 'What about the wraparound camera and sensors?', a: 'Our patterns leave sensor windows clear, and we test every camera before you leave.' },
  { q: 'Do you work on gas cars?', a: "No. EVs only. That's how we stay this good at them." },
  {
    q: `What if my car isn't ready in ${site.turnaroundHours} hours?`,
    a: `Your tint is free. The ${site.turnaroundHours}-Hour Promise applies to Delivery Day and Front Shield packages.`,
  },
  { q: 'Do you pick up the car?', a: 'Yes. Delivery Day includes free pickup within 15 miles, from your house or the delivery center.' },
];
