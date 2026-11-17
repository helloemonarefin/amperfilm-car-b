// Prices live here once (DESIGN_SYSTEM §1). The price picker, price table,
// model pages, offer card and menu card all read from this file.
// A price is never typed in a component.
//
// TODO(Phase 3, Pricing section 337:216 + Pricing page table): fill the full
// models × packages matrix. Only values already seen in Figma are entered.

export interface PriceModel {
  id: string;
  /** Brand line shown above the name in the price table (`meta`). */
  brand: string;
  /** Model name (`title` 20). */
  name: string;
  mostBooked?: boolean;
}

export interface PricePackage {
  id: string;
  /** Package name (≤ 20 characters so pills stay on one line). */
  name: string;
  /** One-line description (≤ 90 characters). */
  description: string;
  warranty: string;
}

export interface Pricing {
  models: PriceModel[];
  packages: PricePackage[];
  /** prices[modelId][packageId] in whole dollars; null = "n/a". */
  prices: Record<string, Record<string, number | null>>;
  defaults: { model: string; package: string };
}

export const pricing: Pricing = {
  models: [{ id: 'model-y', brand: 'Tesla', name: 'Model Y', mostBooked: true }],
  packages: [{ id: 'delivery-day', name: 'Delivery Day', description: '', warranty: '' }],
  prices: { 'model-y': { 'delivery-day': 2590 } },
  defaults: { model: 'model-y', package: 'delivery-day' },
};

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** "$2,590", or null when the combination isn't offered. */
export function price(modelId: string, packageId: string): string | null {
  const value = pricing.prices[modelId]?.[packageId];
  return value == null ? null : usd.format(value);
}

export function model(id: string): PriceModel {
  const m = pricing.models.find((x) => x.id === id);
  if (!m) throw new Error(`pricing.ts: unknown model "${id}"`);
  return m;
}

export function pkg(id: string): PricePackage {
  const p = pricing.packages.find((x) => x.id === id);
  if (!p) throw new Error(`pricing.ts: unknown package "${id}"`);
  return p;
}
