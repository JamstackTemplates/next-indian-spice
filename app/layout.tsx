import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource/rozha-one/latin-400.css';
import '@fontsource/yatra-one/latin-400.css';
import '@fontsource/hind/latin-400.css';
import '@fontsource/hind/latin-500.css';
import '@fontsource/hind/latin-600.css';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const title = `${business.name} · Regional curries & thalis`;
// Absolute URLs only when the deployed URL is known at build time. Never fall back to localhost.
const socialImage = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${business.name}: ${business.tagline}` }] : undefined;

export const metadata: Metadata = {
  title: { default: title, template: `%s · ${business.name}` },
  description,
  applicationName: business.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title,
    description,
    locale: 'en_GB',
    ...(site.url ? { url: `${site.url}/` } : {}),
    images: socialImage,
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f5257' },
    { media: '(prefers-color-scheme: dark)', color: '#071618' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
