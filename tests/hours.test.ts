import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

// Saffron & Monsoon's own hours in Europe/London.
import { business } from '../content/business.ts';
import { zonedDay } from '../lib/hours.ts';
const london = (iso: string) => openingLabel(business.hours, 'Europe/London', new Date(iso));
test('restaurant hours: Tuesday opens at 12:00 and closes at 22:30; Monday is closed', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  assert.equal(london('2026-11-17T11:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(london('2026-11-17T12:00:00Z'), 'Open now · until 22:30');
  assert.equal(london('2026-11-17T22:30:00Z'), 'Closed · opens Wednesday at 12:00');
  for (const time of ['00:00', '12:00', '18:30', '23:59']) {
    assert.equal(london(`2026-11-16T${time}:00Z`), 'Closed · opens Tuesday at 12:00', `Monday ${time}`);
  }
});
test('restaurant hours: Friday is open at 22:59 and closed at 23:00', () => {
  assert.equal(london('2026-11-20T22:59:00Z'), 'Open now · until 23:00');
  assert.equal(london('2026-11-20T23:00:00Z'), 'Closed · opens Saturday at 12:00');
});
test('Saturday 12:00 opening holds across the London DST changes', () => {
  // 28 March 2026 is GMT; 4 April is BST (clocks change 29 March).
  assert.equal(london('2026-03-28T11:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(london('2026-03-28T12:00:00Z'), 'Open now · until 23:00');
  assert.equal(london('2026-04-04T10:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(london('2026-04-04T11:00:00Z'), 'Open now · until 23:00');
  // 24 October is BST; 31 October is GMT (clocks change 25 October).
  assert.equal(london('2026-10-24T11:00:00Z'), 'Open now · until 23:00');
  assert.equal(london('2026-10-31T11:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(london('2026-10-31T12:00:00Z'), 'Open now · until 23:00');
});
test('overnight hours are rejected for the restaurant data', () => {
  assert.throws(() => validateHours(business.hours.map(day => day.day === 'Saturday' ? { ...day, closes: '01:00' } : day)), /Saturday/);
});
test('today’s row uses the business zone, not the visitor’s', () => {
  assert.equal(zonedDay('Europe/London', new Date('2026-11-17T23:30:00Z')), 'Tuesday');
  assert.equal(zonedDay('Asia/Tokyo', new Date('2026-11-17T23:30:00Z')), 'Wednesday');
  assert.equal(zonedDay('', new Date()), undefined);
});
