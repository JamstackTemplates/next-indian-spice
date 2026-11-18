import type { Metadata } from 'next';
import { RainCloud } from '../components/art/scenes';
import { ThaliPlate } from '../components/art/thali-plate';
import { PrintBorder } from '../components/art/print';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="dabu pb-6" aria-labelledby="not-found-heading">
      <div className="wrap grid justify-items-center pt-12 text-center">
        <div className="relative w-full max-w-[22rem]">
          <RainCloud className="absolute -top-6 left-1/2 z-10 w-36 -translate-x-1/2" />
          <ThaliPlate katoris={[]} className="mt-16 w-full" />
        </div>
        <p className="eyebrow mt-8">Error 404</p>
        <h1 id="not-found-heading" className="mt-3 font-accent text-[clamp(2.4rem,6vw,3.6rem)] leading-tight">This plate’s been cleared.</h1>
        <p className="mt-3 max-w-[40ch] text-[1.1rem] text-muted">The page you were after has gone back to the kitchen. Try the menu, or start again from the front door.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <SiteLink href="/menu/" className="button">See the curry menu</SiteLink>
          <SiteLink href="/" className="button button-quiet">Back to Home</SiteLink>
        </div>
      </div>
      <PrintBorder kind="buta" className="mt-14 text-primary dark:text-turmeric" />
    </section>
  );
}
