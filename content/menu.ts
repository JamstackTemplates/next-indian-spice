// The curry menu: one section per regional kitchen, then breads, rice and sides.
// Frequent edits: `available` (sold out today), `seasonal`, `pricePence`, `heat`. Run `npm test` after editing;
// a mistake fails with a message naming the dish or section to fix.

/** Dietary tags. Vegan dishes must also be tagged vegetarian. */
export const DIETARY = ['vegetarian', 'vegan', 'gluten-free', 'contains-nuts'] as const;
export type Dietary = typeof DIETARY[number];

/** Gravy colour keys: how a dish is painted in its katori (bowl) on the thali plates. */
export const GRAVIES = {
  golden: '#E2A72E',
  green: '#4F7A35',
  red: '#A8321F',
  cream: '#F1E2C0',
  brown: '#6A3B22',
  mustard: '#C99A1A',
} as const;
export type Gravy = keyof typeof GRAVIES;

/** How breads, rice and sides are drawn on their menu line (curries are drawn in their gravy colour). */
export const SIDE_ARTS = ['naan', 'roti', 'paratha', 'rice', 'pulao', 'raita', 'pickle'] as const;
export type SideArt = typeof SIDE_ARTS[number];

/** Block-print stamp drawn for each section (components/art/region-stamp.tsx). */
export const STAMPS = ['wheat', 'chinar', 'fish', 'palm', 'boat', 'tile', 'arch', 'mirror', 'tawa'] as const;
export type Stamp = typeof STAMPS[number];

export interface MenuItem {
  /** Stable, URL-safe and unique across the whole menu; also the dish's anchor on /menu/. */
  id: string;
  name: string;
  /** One sentence. */
  description: string;
  /** Price in pence, VAT included: 250–3000. */
  pricePence: number;
  /** 0 No heat, 1 Gentle, 2 Medium, 3 Hot, 4 Fiery (labels in content/business.ts). */
  heat: number;
  dietary: Dietary[];
  /** Required for regional curries; optional for sides. */
  gravy?: Gravy;
  /** Required for sides: how the dish is drawn on the menu. */
  art?: SideArt;
  /** false shows “Sold out today” and keeps the dish listed. */
  available: boolean;
  /** true shows a “Monsoon special” tag. */
  seasonal?: boolean;
  /** The one dish per region shown on Home. Sides have none. */
  signature?: boolean;
}

export interface MenuSection {
  /** Stable, URL-safe and unique; also the section's anchor on /menu/. */
  id: string;
  /** `region` sections are the regional kitchens (thali katoris come from these); `sides` is breads, rice & sides. */
  kind: 'region' | 'sides';
  name: string;
  /** One line on how the region cooks. */
  note: string;
  stamp: Stamp;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: 'punjab', kind: 'region', name: 'Punjab', stamp: 'wheat',
    note: 'Slow dals, mustard greens and the dhaba’s iron pot.',
    items: [
      { id: 'dal-makhani', name: 'Dal Makhani', pricePence: 1150, heat: 1, dietary: ['vegetarian', 'gluten-free'], gravy: 'brown', available: true, signature: true,
        description: 'Black urad and kidney beans simmered overnight on the tandoor’s embers, finished with butter and a little cream.' },
      { id: 'sarson-saag-paneer', name: 'Sarson Saag Paneer', pricePence: 1300, heat: 1, dietary: ['vegetarian', 'gluten-free'], gravy: 'green', available: true,
        description: 'Mustard greens and spinach slow-cooked with ginger and green chilli, folded through cubes of fresh paneer.' },
      { id: 'dhaba-chicken', name: 'Dhaba Chicken Curry', pricePence: 1550, heat: 2, dietary: ['gluten-free'], gravy: 'red', available: true,
        description: 'Bone-in chicken cooked the roadside-dhaba way with browned onion, tomato and whole garam masala.' },
    ],
  },
  {
    id: 'kashmir', kind: 'region', name: 'Kashmir', stamp: 'chinar',
    note: 'Kashmiri chilli for colour, fennel and dried ginger for warmth.',
    items: [
      { id: 'rogan-josh', name: 'Kashmiri Rogan Josh', pricePence: 1750, heat: 2, dietary: ['gluten-free'], gravy: 'red', available: true, signature: true,
        description: 'Lamb shoulder slow-cooked with Kashmiri chilli, fennel and dried ginger, deep red but not fierce.' },
      { id: 'dum-aloo-kashmiri', name: 'Dum Aloo Kashmiri', pricePence: 1200, heat: 2, dietary: ['vegetarian', 'gluten-free'], gravy: 'red', available: true,
        description: 'Baby potatoes fried, pricked and sealed in the pot with yoghurt, fennel and Kashmiri chilli.' },
    ],
  },
  {
    id: 'bengal', kind: 'region', name: 'Bengal', stamp: 'fish',
    note: 'Mustard seed, mustard oil and river fish.',
    items: [
      { id: 'shorshe-maach', name: 'Shorshe Maach', pricePence: 1700, heat: 2, dietary: ['gluten-free'], gravy: 'mustard', available: true, signature: true,
        description: 'Hake steamed in a sharp paste of black and yellow mustard seed, green chilli and mustard oil.' },
      { id: 'chingri-malai', name: 'Chingri Malai Curry', pricePence: 1850, heat: 1, dietary: ['gluten-free'], gravy: 'cream', available: true,
        description: 'King prawns in a mild coconut-milk gravy with ghee, whole spices and a pinch of sugar.' },
    ],
  },
  {
    id: 'goa', kind: 'region', name: 'Goa', stamp: 'palm',
    note: 'Vinegar, palm toddy and Portuguese-era spice.',
    items: [
      { id: 'pork-vindaloo', name: 'Goan Pork Vindaloo', pricePence: 1650, heat: 4, dietary: ['gluten-free'], gravy: 'red', available: true, signature: true,
        description: 'Pork shoulder marinated in palm vinegar, garlic and dried red chilli: the hottest dish we make.' },
      { id: 'chicken-xacuti', name: 'Chicken Xacuti', pricePence: 1550, heat: 3, dietary: ['gluten-free', 'contains-nuts'], gravy: 'brown', available: true,
        description: 'Chicken in a dark gravy of roasted coconut, poppy seed, star anise and cashew.' },
    ],
  },
  {
    id: 'kerala', kind: 'region', name: 'Kerala', stamp: 'boat',
    note: 'Coconut, curry leaf and tamarind.',
    items: [
      { id: 'alleppey-fish-curry', name: 'Alleppey Fish Curry', pricePence: 1750, heat: 3, dietary: ['gluten-free'], gravy: 'red', available: true, signature: true,
        description: 'Sea bream in a tangy gravy of kudampuli, raw mango and coconut, tempered with curry leaves.' },
      { id: 'kerala-vegetable-stew', name: 'Kerala Vegetable Stew', pricePence: 1200, heat: 0, dietary: ['vegetarian', 'vegan', 'gluten-free'], gravy: 'cream', available: true,
        description: 'Carrot, potato, beans and peas in gentle coconut milk with black pepper and curry leaf.' },
      { id: 'jackfruit-curry', name: 'Monsoon Jackfruit Curry', pricePence: 1350, heat: 2, dietary: ['vegetarian', 'vegan', 'gluten-free'], gravy: 'golden', available: true, seasonal: true,
        description: 'Young jackfruit cooked with roasted coconut and turmeric, made only while the monsoon crop lasts.' },
    ],
  },
  {
    id: 'chettinad', kind: 'region', name: 'Chettinad', stamp: 'tile',
    note: 'Black pepper, star anise and kalpasi, roasted and ground.',
    items: [
      { id: 'chettinad-chicken', name: 'Chettinad Pepper Chicken', pricePence: 1600, heat: 4, dietary: ['gluten-free'], gravy: 'brown', available: true, signature: true,
        description: 'Chicken roasted dry with crushed black pepper, kalpasi, star anise and a fistful of curry leaves.' },
      { id: 'ennai-kathirikai', name: 'Ennai Kathirikai', pricePence: 1250, heat: 3, dietary: ['vegetarian', 'vegan', 'gluten-free', 'contains-nuts'], gravy: 'brown', available: true,
        description: 'Baby aubergines stuffed with roasted peanut, sesame and chilli, slow-cooked in sesame oil and tamarind.' },
    ],
  },
  {
    id: 'hyderabad', kind: 'region', name: 'Hyderabad', stamp: 'arch',
    note: 'Peanut, sesame and slow dum cooking.',
    items: [
      { id: 'mirchi-ka-salan', name: 'Mirchi ka Salan', pricePence: 1250, heat: 3, dietary: ['vegetarian', 'vegan', 'gluten-free', 'contains-nuts'], gravy: 'green', available: true, signature: true,
        description: 'Long green chillies in a nutty gravy of peanut, sesame and tamarind, the classic partner to biryani.' },
      { id: 'hyderabadi-dalcha', name: 'Hyderabadi Dalcha', pricePence: 1650, heat: 2, dietary: ['gluten-free'], gravy: 'golden', available: false,
        description: 'Lamb and chana dal cooked with tamarind and bottle gourd, sealed and slow-cooked dum style.' },
    ],
  },
  {
    id: 'gujarat', kind: 'region', name: 'Gujarat', stamp: 'mirror',
    note: 'Sweet, sour and gentle, with winter vegetables.',
    items: [
      { id: 'undhiyu', name: 'Undhiyu', pricePence: 1300, heat: 1, dietary: ['vegetarian', 'vegan', 'gluten-free'], gravy: 'green', available: true, signature: true,
        description: 'Winter vegetables, purple yam and fenugreek dumplings slow-cooked with green garlic and coconut.' },
      { id: 'gujarati-kadhi', name: 'Gujarati Kadhi', pricePence: 1000, heat: 0, dietary: ['vegetarian', 'gluten-free'], gravy: 'golden', available: true,
        description: 'Yoghurt and gram flour simmered thin with ginger, curry leaves and a touch of jaggery.' },
    ],
  },
  {
    id: 'breads-rice-sides', kind: 'sides', name: 'Breads, rice & sides', stamp: 'tawa',
    note: 'From the tandoor and the tawa.',
    items: [
      { id: 'butter-naan', name: 'Butter Naan', pricePence: 350, heat: 0, dietary: ['vegetarian'], art: 'naan', available: true,
        description: 'Leavened bread from the tandoor, brushed with butter.' },
      { id: 'garlic-coriander-naan', name: 'Garlic & Coriander Naan', pricePence: 400, heat: 0, dietary: ['vegetarian'], art: 'naan', available: true,
        description: 'Naan studded with garlic and fresh coriander.' },
      { id: 'malabar-paratha', name: 'Malabar Paratha', pricePence: 400, heat: 0, dietary: ['vegetarian'], art: 'paratha', available: true,
        description: 'Flaky, layered Kerala-style flatbread from the tawa.' },
      { id: 'tandoori-roti', name: 'Tandoori Roti', pricePence: 300, heat: 0, dietary: ['vegetarian', 'vegan'], art: 'roti', available: true,
        description: 'Wholewheat bread from the tandoor, with no butter or dairy.' },
      { id: 'steamed-basmati', name: 'Steamed Basmati', pricePence: 350, heat: 0, dietary: ['vegetarian', 'vegan', 'gluten-free'], art: 'rice', available: true,
        description: 'Long-grain basmati, steamed plain.' },
      { id: 'saffron-pulao', name: 'Saffron Pulao', pricePence: 450, heat: 0, dietary: ['vegetarian', 'gluten-free', 'contains-nuts'], art: 'pulao', available: true,
        description: 'Basmati cooked with saffron, cardamom and toasted cashews.' },
      { id: 'cucumber-raita', name: 'Cucumber Raita', pricePence: 350, heat: 0, dietary: ['vegetarian', 'gluten-free'], gravy: 'cream', art: 'raita', available: true,
        description: 'Cool yoghurt with cucumber, mint and roasted cumin.' },
      { id: 'pickle-tray', name: 'Lime Pickle & Chutney Tray', pricePence: 400, heat: 2, dietary: ['vegetarian', 'vegan', 'gluten-free'], art: 'pickle', available: true,
        description: 'Lime pickle, mango chutney and fresh coriander chutney.' },
    ],
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const MIN_PRICE_PENCE = 250;
export const MAX_PRICE_PENCE = 3000;

/** Throws one error listing every problem, each naming the section or dish to fix. */
export function validateMenu(sections: readonly MenuSection[]): void {
  const problems: string[] = [];
  const sectionIds = new Set<string>();
  const itemIds = new Set<string>();
  for (const section of sections) {
    const at = `menu section "${section.id}"`;
    if (!URL_SAFE_ID.test(section.id)) problems.push(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (sectionIds.has(section.id)) problems.push(`${at}: id is used more than once`);
    sectionIds.add(section.id);
    if (!section.name?.trim()) problems.push(`${at}: name is required`);
    if (!section.note?.trim()) problems.push(`${at}: note is required`);
    if (!STAMPS.includes(section.stamp)) problems.push(`${at}: stamp "${section.stamp}" must be one of ${STAMPS.join(', ')}`);
    if (!section.items.length) problems.push(`${at}: add at least one dish`);
    const signatures = section.items.filter(item => item.signature).map(item => item.id);
    if (section.kind === 'region' && signatures.length !== 1) {
      problems.push(`${at}: needs exactly one signature dish (found ${signatures.length ? signatures.join(', ') : 'none'})`);
    }
    if (section.kind === 'sides' && signatures.length) problems.push(`${at}: sides have no signature dish (remove it from ${signatures.join(', ')})`);
    for (const item of section.items) {
      const dish = `dish "${item.id}" in ${section.id}`;
      if (!URL_SAFE_ID.test(item.id)) problems.push(`${dish}: id must be lowercase letters, numbers and hyphens`);
      if (itemIds.has(item.id)) problems.push(`${dish}: id is used more than once on the menu`);
      itemIds.add(item.id);
      if (!item.name?.trim()) problems.push(`${dish}: name is required`);
      if (!item.description?.trim()) problems.push(`${dish}: description is required`);
      if (!Number.isInteger(item.pricePence) || item.pricePence < MIN_PRICE_PENCE || item.pricePence > MAX_PRICE_PENCE) {
        problems.push(`${dish}: pricePence must be a whole number of pence from ${MIN_PRICE_PENCE} to ${MAX_PRICE_PENCE} (got ${item.pricePence})`);
      }
      if (!Number.isInteger(item.heat) || item.heat < 0 || item.heat > 4) problems.push(`${dish}: heat must be a whole number from 0 to 4 (got ${item.heat})`);
      for (const tag of item.dietary) if (!DIETARY.includes(tag)) problems.push(`${dish}: unknown dietary tag "${tag}"`);
      if (new Set(item.dietary).size !== item.dietary.length) problems.push(`${dish}: dietary tags repeat`);
      if (item.dietary.includes('vegan') && !item.dietary.includes('vegetarian')) problems.push(`${dish}: vegan dishes must also be tagged vegetarian`);
      if (item.gravy !== undefined && !(item.gravy in GRAVIES)) problems.push(`${dish}: gravy "${item.gravy}" must be one of ${Object.keys(GRAVIES).join(', ')}`);
      if (section.kind === 'region' && item.gravy === undefined) problems.push(`${dish}: regional curries need a gravy colour`);
      if (item.art !== undefined && !SIDE_ARTS.includes(item.art)) problems.push(`${dish}: art "${item.art}" must be one of ${SIDE_ARTS.join(', ')}`);
      if (section.kind === 'sides' && item.art === undefined) problems.push(`${dish}: sides need an art key (${SIDE_ARTS.join(', ')}) so they can be drawn`);
      if (typeof item.available !== 'boolean') problems.push(`${dish}: available must be true or false`);
    }
  }
  if (sections.filter(section => section.kind === 'sides').length > 1) problems.push('menu: only one sides section is supported');
  if (problems.length) throw new Error(`Menu needs fixing:\n- ${problems.join('\n- ')}`);
}

/** “£11.50”. */
export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export interface LocatedItem extends MenuItem {
  section: MenuSection;
}

/** Every dish with its section, in menu order. */
export function allItems(sections: readonly MenuSection[] = menu): LocatedItem[] {
  return sections.flatMap(section => section.items.map(item => ({ ...item, section })));
}

export function findItem(id: string, sections: readonly MenuSection[] = menu): LocatedItem | undefined {
  return allItems(sections).find(item => item.id === id);
}

export const regions = menu.filter(section => section.kind === 'region');

validateMenu(menu);
