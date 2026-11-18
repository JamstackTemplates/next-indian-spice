import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

const SCHEMA_DAYS = { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' } as const;

/** Restaurant schema derived from content/business.ts; URLs only when the deployed address is known. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const menuUrl = absoluteUrl('/menu/');
  const { address } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    description: business.introduction,
    servesCuisine: 'Indian',
    priceRange: '££',
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.area}`,
      addressLocality: address.city,
      postalCode: address.postcode,
      addressCountry: address.countryCode,
    },
    openingHoursSpecification: business.hours.filter(entry => entry.opens && entry.closes).map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[entry.day]}`,
      opens: entry.opens,
      closes: entry.closes,
    })),
    ...(url ? { url } : {}),
    ...(menuUrl ? { hasMenu: menuUrl } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
