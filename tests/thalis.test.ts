import assert from 'node:assert/strict';
import { test } from 'node:test';
import { menu, type MenuSection } from '../content/menu.ts';
import { featuredThali, servedLabel, thaliFacts, thalis, validateThalis, type Thali } from '../content/thalis.ts';

const thali = (id: string) => thalis.find(item => item.id === id)!;
const withThali = (id: string, change: Partial<Thali>) => thalis.map(item => item.id === id ? { ...item, ...change } : item);

test('the four thalis are valid and the Garden Thali is featured', () => {
  assert.doesNotThrow(() => validateThalis(thalis));
  assert.deepEqual(thalis.map(item => item.id), ['garden-thali', 'plant-thali', 'coast-thali', 'monsoon-feast-thali']);
  assert.equal(featuredThali.id, 'garden-thali');
  assert.equal(servedLabel(thali('monsoon-feast-thali')), 'Saturday and Sunday only');
  assert.equal(servedLabel(thali('garden-thali')), 'Every day we’re open');
});

test('dietary tags and heat are derived from the katori dishes', () => {
  const garden = thaliFacts(thali('garden-thali'));
  assert.equal(garden.vegetarian, true);
  assert.equal(garden.vegan, false);
  assert.equal(garden.glutenFree, true);
  assert.equal(garden.maxHeat, 2);
  const plant = thaliFacts(thali('plant-thali'));
  assert.equal(plant.vegan, true);
  assert.equal(plant.containsNuts, true);
  const feast = thaliFacts(thali('monsoon-feast-thali'));
  assert.equal(feast.maxHeat, 4);
  assert.equal(feast.vegetarian, false);
  assert.ok(thalis.every(item => !thaliFacts(item).swapped), 'no thali dish is sold out in the sample data');
});

test('thali mistakes fail with a message naming the thali and dish', () => {
  const cases: [string, Partial<Thali>, RegExp][] = [
    ['garden-thali', { katoris: ['dal-makhani', 'butter-naan', 'undhiyu'] }, /thali "garden-thali".*"butter-naan" is a side/],
    ['garden-thali', { katoris: ['dal-makhani', 'paneer-tikka', 'undhiyu'] }, /thali "garden-thali".*"paneer-tikka" is not a dish/],
    ['garden-thali', { katoris: ['dal-makhani', 'dal-makhani', 'undhiyu'] }, /thali "garden-thali".*"dal-makhani" appears twice/],
    ['coast-thali', { katoris: ['shorshe-maach', 'chingri-malai'] }, /thali "coast-thali".*3 to 5 katoris/],
    ['coast-thali', { accompaniments: ['rice', 'papad'] }, /thali "coast-thali".*must include roti/],
    ['monsoon-feast-thali', { servedOn: ['Monday', 'Sunday'] }, /thali "monsoon-feast-thali".*Monday, when the restaurant is closed/],
    ['plant-thali', { pricePence: 999 }, /thali "plant-thali".*1500 to 4000/],
    ['plant-thali', { featured: true }, /exactly one must be featured.*garden-thali, plant-thali/],
  ];
  for (const [id, change, message] of cases) assert.throws(() => validateThalis(withThali(id, change)), message, id);
});

test('owner edit: sold-out Dal Makhani swaps a dish on the two thalis that use it', () => {
  const edited: MenuSection[] = menu.map(section => ({ ...section, items: section.items.map(item => item.id === 'dal-makhani' ? { ...item, available: false } : item) }));
  assert.doesNotThrow(() => validateThalis(thalis, edited));
  const swapped = thalis.filter(item => thaliFacts(item, edited).swapped).map(item => item.id);
  assert.deepEqual(swapped, ['garden-thali', 'monsoon-feast-thali']);
});
