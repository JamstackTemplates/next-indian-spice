# Local verification

Saffron & Monsoon (`next-indian-spice`), verified locally on 2026-11-18:

- `npm ci` and `npm run check` pass: 48 Node tests, typecheck and the static export.
- A project-path build (`PAGES_BASE_PATH=/preview`, `PAGES_BASE_URL=https://jamstacktemplates.github.io/preview`,
  `JAMSTACKS_SITE=saffron-demo`) renders one form host and one bootstrap on Contact only, with base-path
  links, canonical URLs, sitemap and `og:image` under `/preview/`. The unconfigured build shows the email fallback
  with no host or script.
- Browser checks (Playwright with Chromium): every page in light and dark at 1440px and 390px with no
  horizontal overflow; menu filters, live count and `?heat=`/`?diet=` round trip; menu without JavaScript;
  thali katori highlight on keyboard focus; skip link and focus ring; full-document navigation to and from Contact.
- `node --test jamstacks/config.test.mjs` passes after fresh light and dark gallery captures.
- Not verified: deployment, Pages/DNS/HTTPS, real enquiry delivery, and the Google map iframe's contents.
