import { business, formatAddress, phoneHref } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { Icon } from './art/icons';
import { PrintBorder } from './art/print';
import { ButaMark } from './art/scenes';
import { HoursTable } from './hours-table';
import { Wordmark } from './site-header';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/** Stepping out into the monsoon night: rain and lotus borders over deep teal with address, hours and contact. */
export function SiteFooter() {
  return (
    <footer className="night mt-20 print:mt-8">
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" />
      <PrintBorder kind="lotus" fill="var(--saffron)" ink="#f4c14a" className="mt-6" />
      <div className="wrap grid gap-10 pt-10 pb-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <SiteLink href="/" className="inline-flex items-center gap-3 no-underline hover:no-underline">
            <ButaMark className="size-12" />
            <Wordmark className="text-[1.8rem]" />
          </SiteLink>
          <p className="mt-4 max-w-[34ch] text-night-muted">Regional curries from eight Indian kitchens and brass-plate thalis, cooked in King’s Cross.</p>
        </div>
        <div>
          <h2 className="font-accent text-[1.15rem] text-night-accent">Find us</h2>
          <address className="mt-2 not-italic">
            {business.address.street}<br />{business.address.area}<br />{business.address.city} {business.address.postcode}
          </address>
          <a className="mt-3 inline-flex items-center gap-1.5 text-link font-semibold" href={mapDirectionsUrl(formatAddress())}>
            <Icon name="pin" className="size-4.5" /> Directions
          </a>
        </div>
        <div>
          <h2 className="font-accent text-[1.15rem] text-night-accent">Hours</h2>
          <HoursTable hours={business.hours} compact className="mt-2 max-w-60 text-[.95rem]" />
          <TimeZoneNote className="text-night-muted" />
        </div>
        <div>
          <h2 className="font-accent text-[1.15rem] text-night-accent">Say namaste</h2>
          <ul className="mt-2 grid gap-2">
            <li><a className="inline-flex items-center gap-2 wrap-anywhere hover:text-night-accent" href={`mailto:${business.email}`}><Icon name="mail" filled={false} className="size-4.5 flex-none" />{business.email}</a></li>
            {business.phone ? <li><a className="inline-flex items-center gap-2 hover:text-night-accent" href={phoneHref()}><Icon name="phone" filled={false} className="size-4.5 flex-none" />{business.phone}</a></li> : null}
            <li><SiteLink href="/contact/" className="text-link font-semibold">Send an enquiry</SiteLink></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-accent/25">
        <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 py-5 text-[.9rem] text-night-muted">
          <p>Tables for up to {business.walkInMaxGuests} walk in. Larger groups, please send an enquiry.</p>
          <p>Made with care by <a className="underline decoration-1 underline-offset-4 hover:text-night-accent" href="https://jamstacks.net">jamstacks.net</a></p>
        </div>
      </div>
    </footer>
  );
}
