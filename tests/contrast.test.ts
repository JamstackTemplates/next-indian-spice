import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// WCAG AA contrast for the theme tokens in app/tailwind.input.css, in light, automatic dark and explicit dark.
const css = readFileSync(new URL('../app/tailwind.input.css', import.meta.url), 'utf8');
function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `missing ${selector}`);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(m => [m[1], m[2]]));
}
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
};
const ratio = (a: string, b: string) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const themes = { light: block(':root {'), 'automatic dark': block(':root:not(.light) {'), 'explicit dark': block(':root.dark {') };
const CLOVE = '#2a1a12';

test('dark blocks stay in step', () => {
  assert.deepEqual(themes['automatic dark'], themes['explicit dark']);
});

for (const [name, t] of Object.entries(themes)) {
  test(`${name}: text, primary buttons, chilli tags and turmeric/saffron fills meet WCAG AA`, () => {
    const pairs: [string, string, string, number][] = [
      ['text on page', t.text, t.bg, 4.5], ['text on surface', t.text, t.surface, 4.5], ['text on raised', t.text, t.raised, 4.5],
      ['muted on page', t.muted, t.bg, 4.5], ['muted on surface', t.muted, t.surface, 4.5],
      ['white on primary', '#ffffff', t.primary, 4.5], ['white on primary hover', '#ffffff', t['primary-hover'], 4.5],
      ['link on page', t.link, t.bg, 4.5], ['chilli on page', t.chilli, t.bg, 4.5], ['chilli on surface', t.chilli, t.surface, 4.5],
      ['leaf on surface', t.leaf, t.surface, 4.5],
      ['clove on turmeric', CLOVE, t.turmeric, 4.5], ['clove on saffron', CLOVE, t.saffron, 4.5],
      ['band text on band', t['band-text'], t.band, 4.5], ['band accent on band', t['band-accent'], t.band, 4.5],
      ['band muted on band', t['band-muted'], t.band, 4.5], ['header text on header teal', '#fbf3e2', t.band, 4.5],
    ];
    for (const [label, fg, bg, min] of pairs) {
      assert.ok(fg && bg, `${name}: ${label} token missing`);
      assert.ok(ratio(fg, bg) >= min, `${name}: ${label} is ${ratio(fg, bg).toFixed(2)}:1, needs ${min}:1`);
    }
  });
}
