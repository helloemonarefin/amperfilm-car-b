// Prices live here once (DESIGN_SYSTEM §1). The price picker, price table,
// model pages, offer card and menu card all read from this file.
// A price is never typed in a component.
// Source: Figma Pricing page price grid (346:2928) + Home price picker (338:121).
import type { ImageMetadata } from 'astro';
import modelY from '../assets/images/models/model-y.jpg';

export interface PriceModel {
  id: string;
  /** Brand line (table header `meta`, picker prefix). */
  brand: string;
  /** Model name (`title` 20 / table `body`). */
  name: string;
  /** Picker label; defaults to "<brand> <name>" (≤ 20 characters). */
  label?: string;
  mostBooked?: boolean;
  /** Picker photo. TODO(owner): Figma only has the Model Y photo. */
  image?: ImageMetadata;
}

export interface PricePackage {
  id: string;
  /** Table name, e.g. "Full Body PPF" (≤ 22 characters). */
  name: string;
  /** Picker pill name, e.g. "Full Body" (≤ 12 characters). */
  short: string;
  /** Table description (≤ 34 characters). */
  description: string;
  /** Picker description under the price (≤ 90 characters). TODO(owner): only Front Shield is in Figma. */
  pickerText?: string;
  /** Shown as a pill in the picker. */
  inPicker: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  /** Price per model id; omitted = not offered. */
  prices: Record<string, number>;
  /** "Save $199 vs. separate". */
  savings: number;
}

export interface Pricing {
  models: PriceModel[];
  packages: PricePackage[];
  /** prices[modelId][packageId] in whole dollars; null = "n/a". */
  prices: Record<string, Record<string, number | null>>;
  bundles: Bundle[];
  /** "Other EVs" row in the picker: no price, an exact quote by text. */
  other: { label: string; note: string };
  defaults: { model: string; package: string };
}

export const pricing: Pricing = {
  models: [
    { id: 'model-3', brand: 'Tesla', name: 'Model 3' },
    { id: 'model-y', brand: 'Tesla', name: 'Model Y', mostBooked: true, image: modelY },
    { id: 'cybertruck', brand: 'Tesla', name: 'Cybertruck' },
    { id: 'r1s', brand: 'Rivian', name: 'R1S' },
  ],
  packages: [
    {
      id: 'front-shield', name: 'Front Shield', short: 'Front Shield', description: 'Bumper, hood, fenders, mirrors',
      pickerText: 'Bumper, hood, fenders and mirrors. Done in 48 hours. 10-year film warranty.', inPicker: true,
    },
    { id: 'full-body', name: 'Full Body PPF', short: 'Full Body', description: 'Every painted panel', inPicker: true },
    { id: 'tint', name: 'Ceramic Tint', short: 'Tint', description: 'All sides + rear', inPicker: true },
    { id: 'roof', name: 'Glass Roof Heat Film', short: 'Roof film', description: 'Up to 98% infrared rejection', inPicker: false },
    { id: 'coating', name: 'Ceramic Coating', short: 'Coating', description: '5-year protection', inPicker: true },
  ],
  prices: {
    'model-3':    { 'front-shield': 1690, 'full-body': 5200, tint: 449, roof: 299,  coating: 1099 },
    'model-y':    { 'front-shield': 1790, 'full-body': 5600, tint: 499, roof: 349,  coating: 1199 },
    cybertruck:   { 'front-shield': 2490, 'full-body': 7900, tint: 599, roof: null, coating: 1499 },
    r1s:          { 'front-shield': 2190, 'full-body': 6800, tint: 549, roof: 399,  coating: 1399 },
  },
  bundles: [{ id: 'delivery-day', name: 'Delivery Day', prices: { 'model-y': 2590 }, savings: 199 }],
  other: {
    label: 'Lucid, BMW i, Mercedes EQ & more',
    note: 'Other EVs get an exact price by text within 1 hour, 9am–6pm.',
  },
  defaults: { model: 'model-y', package: 'front-shield' },
};

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
export const formatUsd = (value: number) => usd.format(value);

/** "$1,790", or null when the combination isn't offered ("n/a"). */
export function price(modelId: string, packageId: string): string | null {
  const bundle = pricing.bundles.find((b) => b.id === packageId);
  const value = bundle ? bundle.prices[modelId] : pricing.prices[modelId]?.[packageId];
  return value == null ? null : usd.format(value);
}

export function model(id: string): PriceModel {
  const m = pricing.models.find((x) => x.id === id);
  if (!m) throw new Error(`pricing.ts: unknown model "${id}"`);
  return m;
}
export const modelLabel = (m: PriceModel) => m.label ?? `${m.brand} ${m.name}`;

export function pkg(id: string): PricePackage {
  const p = pricing.packages.find((x) => x.id === id);
  if (!p) throw new Error(`pricing.ts: unknown package "${id}"`);
  return p;
}

export function bundle(id: string): Bundle {
  const b = pricing.bundles.find((x) => x.id === id);
  if (!b) throw new Error(`pricing.ts: unknown bundle "${id}"`);
  return b;
}

/** Lowest price of a package across several models ("from $1,690"). */
export function fromPrice(modelIds: string[], packageId: string): string | null {
  const values = modelIds
    .map((id) => pricing.prices[id]?.[packageId])
    .filter((v): v is number => typeof v === 'number');
  return values.length ? usd.format(Math.min(...values)) : null;
}
