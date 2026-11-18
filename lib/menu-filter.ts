// Menu filters: a heat ceiling plus dietary needs. Diet filters combine with AND.
// State is mirrored in the query string (?heat=2&diet=vegan,no-nuts) so a filtered menu can be shared.
import type { Dietary } from '../content/menu.ts';

export type DietFilter = 'vegetarian' | 'vegan' | 'gluten-free' | 'no-nuts';
export const DIET_FILTERS: { id: DietFilter; label: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'no-nuts', label: 'No nuts' },
];

/** Heat ceilings offered as buttons; null means any heat. */
export const HEAT_LIMITS = [null, 1, 2, 3] as const;
export type HeatLimit = typeof HEAT_LIMITS[number];

export interface MenuFilters {
  maxHeat: HeatLimit;
  diets: DietFilter[];
}
export const NO_FILTERS: MenuFilters = { maxHeat: null, diets: [] };

export interface FilterFacts { heat: number; dietary: readonly Dietary[] }

export function matchesDiet(item: FilterFacts, diet: DietFilter): boolean {
  if (diet === 'no-nuts') return !item.dietary.includes('contains-nuts');
  if (diet === 'vegetarian') return item.dietary.includes('vegetarian') || item.dietary.includes('vegan');
  return item.dietary.includes(diet);
}

export function matchesFilters(item: FilterFacts, filters: MenuFilters): boolean {
  if (filters.maxHeat !== null && item.heat > filters.maxHeat) return false;
  return filters.diets.every(diet => matchesDiet(item, diet));
}

export function isFiltered(filters: MenuFilters): boolean {
  return filters.maxHeat !== null || filters.diets.length > 0;
}

/** Reads ?heat= and ?diet= leniently: unknown values are ignored rather than breaking the page. */
export function parseFilters(search: string): MenuFilters {
  const params = new URLSearchParams(search);
  const heat = Number(params.get('heat'));
  const maxHeat = (HEAT_LIMITS as readonly (number | null)[]).includes(heat) && params.get('heat') !== null ? heat as HeatLimit : null;
  const requested = (params.get('diet') ?? '').split(',');
  const diets = DIET_FILTERS.map(filter => filter.id).filter(id => requested.includes(id));
  return { maxHeat, diets };
}

/** Writes filters back into an existing query string, keeping other parameters. */
export function serializeFilters(filters: MenuFilters, search = ''): string {
  const params = new URLSearchParams(search);
  params.delete('heat');
  params.delete('diet');
  if (filters.maxHeat !== null) params.set('heat', String(filters.maxHeat));
  if (filters.diets.length) params.set('diet', filters.diets.join(','));
  const query = params.toString().replace(/%2C/g, ',');
  return query ? `?${query}` : '';
}
