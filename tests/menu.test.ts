import assert from 'node:assert/strict';
import { test } from 'node:test';
import { allItems, formatPrice, menu, validateMenu, type MenuSection } from '../content/menu.ts';
import { matchesFilters, parseFilters, serializeFilters } from '../lib/menu-filter.ts';

/** A deep copy of the real menu with one dish changed. */
function withDish(id: string, change: Record<string, unknown>): MenuSection[] {
  return menu.map(section => ({ ...section, items: section.items.map(item => item.id === id ? { ...item, ...change } : { ...item }) }));
}

test('the menu is valid: 9 sections, 26 dishes, one signature per region', () => {
  assert.doesNotThrow(() => validateMenu(menu));
  assert.equal(menu.length, 9);
  assert.equal(allItems().length, 26);
  assert.deepEqual(menu.filter(s => s.kind === 'region').map(s => s.items.find(i => i.signature)?.id),
    ['dal-makhani', 'rogan-josh', 'shorshe-maach', 'pork-vindaloo', 'alleppey-fish-curry', 'chettinad-chicken', 'mirchi-ka-salan', 'undhiyu']);
  assert.equal(formatPrice(1150), '£11.50');
});

test('menu mistakes fail with a message naming the dish or section', () => {
  const cases: [string, Record<string, unknown>, RegExp][] = [
    ['dal-makhani', { pricePence: 11.5 }, /dish "dal-makhani".*pricePence/],
    ['dal-makhani', { pricePence: 3500 }, /dish "dal-makhani".*from 250 to 3000/],
    ['pork-vindaloo', { heat: 5 }, /dish "pork-vindaloo".*heat/],
    ['undhiyu', { dietary: ['vegan', 'gluten-free'] }, /dish "undhiyu".*vegan dishes must also be tagged vegetarian/],
    ['undhiyu', { dietary: ['vegetarian', 'halal'] }, /dish "undhiyu".*unknown dietary tag "halal"/],
    ['rogan-josh', { gravy: 'purple' }, /dish "rogan-josh".*gravy "purple"/],
    ['rogan-josh', { gravy: undefined }, /dish "rogan-josh".*need a gravy/],
    ['rogan-josh', { id: 'Rogan Josh' }, /dish "Rogan Josh".*lowercase/],
    ['dhaba-chicken', { id: 'dal-makhani' }, /dish "dal-makhani".*more than once/],
    ['dhaba-chicken', { signature: true }, /section "punjab".*exactly one signature.*dal-makhani, dhaba-chicken/],
    ['butter-naan', { signature: true }, /section "breads-rice-sides".*butter-naan/],
    ['jackfruit-curry', { available: 'no' }, /dish "jackfruit-curry".*available/],
  ];
  for (const [id, change, message] of cases) assert.throws(() => validateMenu(withDish(id, change)), message, `${id} ${JSON.stringify(change)}`);
  assert.throws(() => validateMenu(menu.map(s => s.id === 'goa' ? { ...s, stamp: 'tuk-tuk' as never } : s)), /section "goa".*stamp "tuk-tuk"/);
});

test('marking a dish sold out keeps it listed and valid', () => {
  const edited = withDish('dal-makhani', { available: false });
  assert.doesNotThrow(() => validateMenu(edited));
  assert.equal(allItems(edited).find(item => item.id === 'dal-makhani')?.available, false);
});

const shown = (search: string) => allItems().filter(item => matchesFilters(item, parseFilters(search))).map(item => item.id);

test('“Up to Medium” plus “Vegan” shows exactly the mild vegan dishes', () => {
  assert.deepEqual(shown('?heat=2&diet=vegan'),
    ['kerala-vegetable-stew', 'jackfruit-curry', 'undhiyu', 'tandoori-roti', 'steamed-basmati', 'pickle-tray']);
});

test('“No nuts” hides every dish tagged contains-nuts', () => {
  const hidden = allItems().map(item => item.id).filter(id => !shown('?diet=no-nuts').includes(id));
  assert.deepEqual(hidden, ['chicken-xacuti', 'ennai-kathirikai', 'mirchi-ka-salan', 'saffron-pulao']);
});

test('filters combine with AND, vegetarian includes vegan, and the query string round-trips', () => {
  assert.ok(shown('?diet=vegetarian').includes('undhiyu'));
  assert.ok(!shown('?diet=vegetarian').includes('rogan-josh'));
  assert.ok(shown('?diet=vegan,no-nuts&heat=3').every(id => !['ennai-kathirikai', 'mirchi-ka-salan'].includes(id)));
  assert.equal(shown('').length, 26);
  assert.equal(shown('?heat=9&diet=spicy').length, 26, 'unknown values are ignored');
  assert.deepEqual(parseFilters('?heat=1&diet=no-nuts,vegan'), { maxHeat: 1, diets: ['vegan', 'no-nuts'] });
  assert.equal(serializeFilters({ maxHeat: 2, diets: ['vegan', 'gluten-free'] }, '?x=1'), '?x=1&heat=2&diet=vegan,gluten-free');
  assert.equal(serializeFilters({ maxHeat: null, diets: [] }, '?heat=2'), '');
});
