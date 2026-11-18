// Shared business details for Saffron & Monsoon, a fictitious restaurant used as the gallery sample.
// Replace every value here with the owner's real details before publishing.
import { validateHours, type OpeningHours } from '../lib/hours.ts';

export interface Address {
  /** First line as visitors would write it. */
  street: string;
  /** Neighbourhood shown beside the street on Home and in the footer. */
  area: string;
  city: string;
  postcode: string;
  /** Country name for display. */
  country: string;
  /** ISO 3166-1 alpha-2 code for structured data. */
  countryCode: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used in metadata and the social image alt text. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public number as it should be displayed; blank hides it. */
  phone: string;
  /** Demo location: a public landmark. Replace it with the real premises before publishing. */
  address: Address;
  /** One line on how to get here from the nearest station. */
  directions: string;
  /** Descriptive title for the embedded map on Visit. */
  mapTitle: string;
  /** Seven same-day services in the time zone set in site.config.json. Overnight hours are unsupported. */
  hours: OpeningHours[];
  /** Last orders this many minutes before closing. */
  lastOrdersMinutes: number;
  /** Heat scale labels, index = heat level 0–4 used by every dish in content/menu.ts. */
  heatScale: readonly [string, string, string, string, string];
  /** The private dining room offered by enquiry. */
  privateRoom: { name: string; seats: number };
  /** Largest group that can walk in without an enquiry. */
  walkInMaxGuests: number;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Saffron & Monsoon',
  tagline: 'Regional curries and brass-plate thalis in King’s Cross',
  introduction: 'Saffron & Monsoon cooks regional curries from eight Indian kitchens and serves brass-plate thalis at Granary Square, King’s Cross, with every dish marked for heat and diet.',
  email: 'namaste@example.com',
  phone: '020 7946 0612',
  address: {
    street: 'Granary Square',
    area: 'King’s Cross',
    city: 'London',
    postcode: 'N1C 4AA',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  directions: 'Five minutes’ walk from King’s Cross St Pancras, up King’s Boulevard to the fountains.',
  mapTitle: 'Map showing Saffron & Monsoon at Granary Square, King’s Cross',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '12:00', closes: '22:30' },
    { day: 'Wednesday', opens: '12:00', closes: '22:30' },
    { day: 'Thursday', opens: '12:00', closes: '22:30' },
    { day: 'Friday', opens: '12:00', closes: '23:00' },
    { day: 'Saturday', opens: '12:00', closes: '23:00' },
    { day: 'Sunday', opens: '12:00', closes: '21:30' },
  ],
  lastOrdersMinutes: 45,
  heatScale: ['No heat', 'Gentle', 'Medium', 'Hot', 'Fiery'],
  privateRoom: { name: 'The Monsoon Room', seats: 24 },
  walkInMaxGuests: 8,
  enquiries: {
    title: 'Plan a table with us',
    introduction: 'Send an enquiry about a group table, a celebration or the Monsoon Room. We’ll reply to confirm availability. Your table is held only once we’ve confirmed.',
    usefulToInclude: [
      'Your preferred date and time',
      'How many guests are coming',
      'The occasion, if there is one',
      'Any dietary needs or allergies',
      'Whether you’d like the Monsoon Room (up to 24 guests)',
    ],
  },
};

/** One-line address for maps, footers and directions links. */
export function formatAddress(address: Address = business.address): string {
  return `${address.street}, ${address.area}, ${address.city} ${address.postcode}, ${address.country}`;
}

/** Digits-only form of the phone number for tel: links. */
export function phoneHref(phone: string = business.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

validateHours(business.hours);
