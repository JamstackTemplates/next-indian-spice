# Saffron & Monsoon: Indian restaurant template

A static Next.js website for a regional Indian restaurant, built from the JamstackTemplates starter and
published in the Jamstacks gallery as `next-indian-spice`. Saffron & Monsoon is fictitious: its email,
phone and address (Granary Square, a public landmark in King’s Cross) are sample details to replace.
No application code depends on the starter checkout or the portal repository.

The design is **“Block print and brass thali”**: hand-carved block-print borders on mulmul cotton, brass
thali plates and monsoon rain over deep teal. Light mode is sunlit cotton; dark mode is “monsoon night”.
All artwork is inline SVG drawn for this site; there is no photography.

## Build or preview

Local development requires Node 24 or later and npm. Run `npm ci`, then `npm run dev`, or
`npm run build && npm start` to preview the static export.

The `plan/` folder and `.claude/skills/` held the initial build brief. Once the site has been reviewed,
run `/cleanup-plan` or delete both folders by hand. The website never reads them.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with the jharokha scene, “Find us tonight”, the eight regional kitchens, the featured thali, the heat guide and gatherings; Restaurant JSON-LD |
| `/menu/` | The regional curry menu with heat and diet filters, allergen and price notes |
| `/thali/` | The four thali sets, each drawn as its plate, and how to eat a thali |
| `/visit/` | Address, open-now badge, hours board, map, getting here and access |
| `/contact/` | Hosted enquiry form when configured; email and phone always visible |
| `/404.html` | “This plate’s been cleared.” |

## Make it yours

| File | Owns |
| --- | --- |
| `content/business.ts` | Name, contact details, address, opening hours, last orders, heat-scale labels, private room and enquiry copy |
| `content/menu.ts` | Menu sections (regions plus breads, rice & sides) and every dish: price, heat, dietary tags, gravy colour, availability |
| `content/thalis.ts` | Thali sets: price, the menu dishes in each katori, accompaniments, days served, the featured thali |
| `app/page.tsx`, `app/<route>/page.tsx` | Page composition and editable copy such as headings, introductions and button labels |
| `site.config.json` | Public name, description, hostname, time zone and Jamstacks integration |
| `app/tailwind.input.css` | Palette tokens (light, automatic dark, explicit dark), textures, buttons, stamps and motion |
| `components/art/` | The SVG artwork: thali plate, jharokha scene, borders, region stamps, dabba, handi, icons |
| `components/site-header.tsx`, `site-footer.tsx` | Navigation and the themed shell |
| `lib/structured-data.ts` | Restaurant schema derived from content |
| `app/sitemap.ts` | Public routes; update when adding a page |

### Common edits

Each of these is a single data edit. Run `npm test` afterwards: a mistake fails with a message that names
the dish, section or thali to fix.

- **Sold out today:** set `available: false` on the dish in `content/menu.ts`. It stays on the menu,
  struck through with a “Sold out today” stamp. Any thali using it shows “One dish is swapped today”.
- **Seasonal dish:** set `seasonal: true` for the “Monsoon special” stamp, or remove the dish when the season ends
  (take it out of any thali’s `katoris` first).
- **Price or heat:** change `pricePence` (whole pence, 250–3000) or `heat` (0–4). Thali heat and dietary tags
  are worked out from their dishes, so they update automatically.
- **Swap a thali dish:** edit the thali’s `katoris` in `content/thalis.ts`. Only regional curries can go in a katori,
  3–5 per thali; the plate redraws with the new gravy colours.
- **Hours:** edit `hours` in `content/business.ts`. Services must open and close on the same day; overnight
  hours are rejected.
- **Page copy:** edit the text between component tags, for example
  `<Hero.Heading>Eight kitchens. <em>One brass plate.</em></Hero.Heading>` in `app/page.tsx`.

Rename in both `business.name` and `site.config.json`’s `name`. Do not put business content in
`site.config.json`: the Jamstacks provisioner replaces that file wholesale, possibly adding `provisioningId`.

## Appearance

Fonts are self-hosted from npm and licensed under the SIL Open Font License 1.1:

| Font | Package | Use |
| --- | --- | --- |
| Rozha One | `@fontsource/rozha-one` | Headings, wordmark, dish names, prices and numerals |
| Hind (400, 500, 600) | `@fontsource/hind` | Body text, labels and tables |
| Yatra One | `@fontsource/yatra-one` | Stamps such as “Sold out today”, “Monsoon special” and the 404 heading |

Colours originate in CSS tokens with light, automatic-dark and explicit-dark values plus `@theme inline`
mappings. Saffron and turmeric are fills only; text on them is clove ink. The primary teal carries white
button text in both themes, and `tests/contrast.test.ts` checks the key pairs against WCAG AA. The theme
toggle comes from the published `jamstacks` package. Keyboard focus, a skip link, reduced motion (the rain,
steam and stamp press stop) and print styles (the menu prints as a plain two-column list) are included.

The open-now badge and the hours table’s “today” row are computed in the browser in `Europe/London`
(from `site.config.json`) and refresh every minute. Static and no-JavaScript output shows the neutral
“Opening hours” and the full table. The menu filters (heat ceiling and diet, mirrored in `?heat=` and `?diet=`)
appear only with JavaScript; without it every dish is listed and the region links still work. The map
on Visit uses the inherited keyless Google embed.

## Public configuration

```json
{
  "name": "Saffron & Monsoon",
  "description": "Saffron & Monsoon cooks regional curries from eight Indian kitchens …",
  "domain": "next-indian-spice.jamstacks.net",
  "timeZone": "Europe/London",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

This gallery template uses its folder name plus `.jamstacks.net` as the demo domain; customers replace
it with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, menu and thali validation (each failure names
the dish or thali), derived thali tags, the menu filters, opening hours across London's DST changes,
WCAG contrast of the theme tokens, sitemap routes, enquiry wording and Restaurant structured data. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions and set its custom domain to the same value as site.config.json.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.
Do not add public/CNAME. Enable HTTPS after the certificate is ready. This starter performs no remote setup.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

`public/og.png` (1200×630) is composed from the site's own artwork: the featured thali plate on a
block-printed cloth under monsoon rain, with the wordmark. Regenerate it if the name or featured thali
changes. Before publication: confirm domain/Pages settings and HTTPS, and remove `plan/` and
`.claude/skills/` after review. The website never imports or links the planning folder.
