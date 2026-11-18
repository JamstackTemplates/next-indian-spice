// Thali sets. Each katori (small bowl) is a dish ID from a regional section of content/menu.ts.
// Dietary tags and heat are worked out from those dishes, never typed here, so they stay in step with the menu.
// Marking a katori dish sold out on the menu shows a “one dish is swapped today” note on the thali.
import { DAYS, type Day, type OpeningHours } from '../lib/hours.ts';
import { business } from './business.ts';
import { findItem, menu, type LocatedItem, type MenuSection } from './menu.ts';

/** What sits in the middle of the plate. Every thali has rice and roti. */
export const ACCOMPANIMENTS = {
  rice: 'Steamed basmati',
  roti: 'Roti',
  papad: 'Papad',
  pickle: 'Lime pickle',
  raita: 'Cucumber raita',
  sweet: 'Gulab jamun',
} as const;
export type Accompaniment = keyof typeof ACCOMPANIMENTS;

export interface Thali {
  /** Stable, URL-safe and unique; also the thali's anchor on /thali/. */
  id: string;
  name: string;
  /** One or two sentences. */
  description: string;
  /** Price in pence, VAT included: 1500–4000. */
  pricePence: number;
  /** 3–5 distinct dish IDs from the regional sections of the menu, in the order drawn around the plate. */
  katoris: string[];
  /** Must include rice and roti. */
  accompaniments: Accompaniment[];
  /** Days it is served; leave out for every open day. Each day must be an open day. */
  servedOn?: Day[];
  /** Exactly one thali is featured on Home. */
  featured?: boolean;
}

export const thalis: Thali[] = [
  {
    id: 'garden-thali', name: 'Garden Thali', pricePence: 1950, featured: true,
    description: 'Four vegetarian curries from Punjab, Kashmir and Gujarat, with rice, roti and all the trimmings.',
    katoris: ['dal-makhani', 'sarson-saag-paneer', 'dum-aloo-kashmiri', 'gujarati-kadhi'],
    accompaniments: ['rice', 'roti', 'papad', 'pickle', 'raita', 'sweet'],
  },
  {
    id: 'plant-thali', name: 'Plant Thali', pricePence: 1950,
    description: 'A fully vegan plate from Kerala, Chettinad and Gujarat, built around this season’s jackfruit.',
    katoris: ['kerala-vegetable-stew', 'ennai-kathirikai', 'undhiyu', 'jackfruit-curry'],
    accompaniments: ['rice', 'roti', 'papad', 'pickle'],
  },
  {
    id: 'coast-thali', name: 'Coastal Thali', pricePence: 2400,
    description: 'Fish, prawns and coconut from the Bengal and Kerala coasts, with a mild stew to cool things down.',
    katoris: ['shorshe-maach', 'alleppey-fish-curry', 'chingri-malai', 'kerala-vegetable-stew'],
    accompaniments: ['rice', 'roti', 'pickle', 'sweet'],
  },
  {
    id: 'monsoon-feast-thali', name: 'Monsoon Feast Thali', pricePence: 2750, servedOn: ['Saturday', 'Sunday'],
    description: 'Our weekend centrepiece: five curries from five kitchens, from Kashmiri rogan josh to Chettinad pepper chicken.',
    katoris: ['rogan-josh', 'chettinad-chicken', 'dal-makhani', 'mirchi-ka-salan', 'undhiyu'],
    accompaniments: ['rice', 'roti', 'papad', 'pickle', 'raita', 'sweet'],
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const MIN_THALI_PENCE = 1500;
export const MAX_THALI_PENCE = 4000;

/** Throws one error listing every problem, each naming the thali (and dish) to fix. */
export function validateThalis(sets: readonly Thali[], sections: readonly MenuSection[] = menu, hours: readonly OpeningHours[] = business.hours): void {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const thali of sets) {
    const at = `thali "${thali.id}"`;
    if (!URL_SAFE_ID.test(thali.id)) problems.push(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (ids.has(thali.id)) problems.push(`${at}: id is used more than once`);
    ids.add(thali.id);
    if (!thali.name?.trim()) problems.push(`${at}: name is required`);
    if (!thali.description?.trim()) problems.push(`${at}: description is required`);
    if (!Number.isInteger(thali.pricePence) || thali.pricePence < MIN_THALI_PENCE || thali.pricePence > MAX_THALI_PENCE) {
      problems.push(`${at}: pricePence must be a whole number of pence from ${MIN_THALI_PENCE} to ${MAX_THALI_PENCE} (got ${thali.pricePence})`);
    }
    if (thali.katoris.length < 3 || thali.katoris.length > 5) problems.push(`${at}: needs 3 to 5 katoris (has ${thali.katoris.length})`);
    const seen = new Set<string>();
    for (const id of thali.katoris) {
      if (seen.has(id)) problems.push(`${at}: katori "${id}" appears twice`);
      seen.add(id);
      const dish = findItem(id, sections);
      if (!dish) problems.push(`${at}: katori "${id}" is not a dish on the menu`);
      else if (dish.section.kind !== 'region') problems.push(`${at}: katori "${id}" is a side, not a regional curry`);
      else if (!dish.gravy) problems.push(`${at}: katori "${id}" needs a gravy colour on the menu`);
    }
    for (const extra of thali.accompaniments) {
      if (!(extra in ACCOMPANIMENTS)) problems.push(`${at}: unknown accompaniment "${extra}"`);
    }
    for (const needed of ['rice', 'roti'] as const) {
      if (!thali.accompaniments.includes(needed)) problems.push(`${at}: accompaniments must include ${needed}`);
    }
    for (const day of thali.servedOn ?? []) {
      if (!DAYS.includes(day)) problems.push(`${at}: servedOn has unknown day "${day}"`);
      else if (!hours.find(entry => entry.day === day)?.opens) problems.push(`${at}: servedOn includes ${day}, when the restaurant is closed`);
    }
    if (thali.servedOn && !thali.servedOn.length) problems.push(`${at}: leave out servedOn for every open day, or list at least one day`);
  }
  const featured = sets.filter(thali => thali.featured).map(thali => thali.id);
  if (featured.length !== 1) problems.push(`thalis: exactly one must be featured (found ${featured.length ? featured.join(', ') : 'none'})`);
  if (problems.length) throw new Error(`Thalis need fixing:\n- ${problems.join('\n- ')}`);
}

export interface ThaliFacts {
  dishes: LocatedItem[];
  vegetarian: boolean;
  vegan: boolean;
  /** Every katori is gluten-free; the roti is swapped for extra rice on request. */
  glutenFree: boolean;
  containsNuts: boolean;
  maxHeat: number;
  /** At least one katori dish is sold out today, so the kitchen swaps it. */
  swapped: boolean;
}

/** Derives dietary tags, heat and today's swap note from the katori dishes. */
export function thaliFacts(thali: Thali, sections: readonly MenuSection[] = menu): ThaliFacts {
  const dishes = thali.katoris.map(id => {
    const dish = findItem(id, sections);
    if (!dish) throw new Error(`thali "${thali.id}": katori "${id}" is not a dish on the menu`);
    return dish;
  });
  const every = (tag: LocatedItem['dietary'][number]) => dishes.every(dish => dish.dietary.includes(tag));
  return {
    dishes,
    vegetarian: every('vegetarian'),
    vegan: every('vegan'),
    glutenFree: every('gluten-free'),
    containsNuts: dishes.some(dish => dish.dietary.includes('contains-nuts')),
    maxHeat: Math.max(...dishes.map(dish => dish.heat)),
    swapped: dishes.some(dish => !dish.available),
  };
}

/** “Every day we’re open” or “Saturday and Sunday”. */
export function servedLabel(thali: Thali): string {
  if (!thali.servedOn?.length) return 'Every day we’re open';
  const days = DAYS.filter(day => thali.servedOn!.includes(day));
  return days.length === 1 ? `${days[0]} only` : `${days.slice(0, -1).join(', ')} and ${days.at(-1)} only`;
}

export const featuredThali = thalis.find(thali => thali.featured) ?? thalis[0];

validateThalis(thalis);
