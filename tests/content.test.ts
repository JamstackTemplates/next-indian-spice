import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { business, formatAddress } from '../content/business.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  assert.equal(business.heatScale.length, 5, 'business.heatScale: one label for each heat level 0–4');
  assert.ok(business.privateRoom.seats > 0 && Number.isInteger(business.privateRoom.seats), 'business.privateRoom.seats: whole number');
  assert.equal(formatAddress(), 'Granary Square, King’s Cross, London N1C 4AA, United Kingdom');
});

test('site.config.json name matches business.name and holds no business data', () => {
  const config = JSON.parse(read('site.config.json'));
  assert.equal(config.name, business.name, 'rename in both content/business.ts and site.config.json');
  assert.deepEqual(Object.keys(config).sort(), ['description', 'domain', 'jamstacks', 'name', 'timeZone']);
  assert.equal(config.timeZone, 'Europe/London');
});

test('enquiry copy never implies a confirmed booking, and the site takes no orders or payment', () => {
  assert.match(business.enquiries.introduction, /reply to confirm/);
  assert.match(business.enquiries.introduction, /held only once we’ve confirmed/);
  const forbidden = /\b(order online|online order|delivery|deposit|booked|payment|pay now|checkout|reservation confirmed)\b/i;
  const sources = ['app', 'components'].flatMap(dir => readdirSync(new URL(`${dir}/`, root), { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.tsx')).map(file => `${dir}/${file}`))
    .filter(file => file !== 'components/jamstacks-support-form.tsx');
  for (const file of sources) {
    const match = read(file).match(forbidden);
    assert.equal(match, null, `${file}: remove “${match?.[0]}”; enquiries are confirmed only by reply`);
  }
  assert.match(read('app/contact/page.tsx'), /an enquiry, not a booking/);
});

test('allergen and service-charge notes appear where the brief requires them', () => {
  for (const file of ['app/menu/page.tsx', 'app/thali/page.tsx']) {
    assert.match(read(file), /Our kitchen handles nuts, dairy, gluten, mustard and sesame/, `${file}: allergen note`);
  }
  assert.match(read('app/menu/page.tsx'), /12\.5% service charge is added\s+for tables of six or more/);
});

test('every route is in the sitemap', () => {
  const sitemap = read('app/sitemap.ts');
  const routes = readdirSync(new URL('app/', root), { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('page.tsx'))
    .map(file => `/${file.replace(/page\.tsx$/, '')}`.replace(/\/+$/, '/'));
  assert.deepEqual(routes.sort(), ['/', '/contact/', '/menu/', '/thali/', '/visit/']);
  for (const route of routes) assert.ok(sitemap.includes(`'${route}'`), `app/sitemap.ts: add ${route}`);
});

test('Restaurant structured data derives from content', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'Restaurant');
  assert.equal(data.servesCuisine, 'Indian');
  assert.equal(data.address.postalCode, business.address.postcode);
  assert.equal(data.openingHoursSpecification.length, business.hours.filter(day => day.opens).length);
  assert.deepEqual(data.openingHoursSpecification[0], { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Tuesday', opens: '12:00', closes: '22:30' });
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
