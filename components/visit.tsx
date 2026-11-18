import type { ReactNode } from 'react';
import { business, formatAddress, phoneHref } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { Icon, type IconName } from './art/icons';
import { PrintBorder } from './art/print';
import { GoogleMap } from './google-map';
import { HoursTable } from './hours-table';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Content = { children: ReactNode };

/* ---------- Address and the brass-framed hours board ---------- */

function WhereWhenSection({ children }: Content) {
  return (
    <section aria-labelledby="where-heading" className="wrap grid gap-10 pt-12 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-16">
      <div>{children}</div>
      <div className="relative rounded-[6px] bg-brass p-2.5 shadow-[6px_6px_0_var(--brass-dark)]">
        <div className="rounded-[3px] border-2 border-dotted border-brass-dark/60 bg-surface p-5 [background-image:var(--weave)]">
          <h2 className="flex items-center justify-between gap-3 font-accent text-[1.45rem]">
            Opening hours <Icon name="clock" filled={false} className="size-6 text-saffron" />
          </h2>
          <HoursTable hours={business.hours} className="mt-3 text-[1.05rem]" />
          <TimeZoneNote />
          <p className="mt-1 text-[.9rem] text-muted">Last orders {business.lastOrdersMinutes} minutes before close.</p>
        </div>
      </div>
    </section>
  );
}
function WhereWhenHeading({ children }: Content) {
  return <h2 id="where-heading" className="text-[clamp(2.2rem,4.5vw,3.2rem)]">{children}</h2>;
}
function WhereWhenAddress() {
  const { address } = business;
  return (
    <>
      <address className="mt-4 text-[1.25rem] leading-snug not-italic">
        {address.street}, {address.area}<br />{address.city} {address.postcode}
      </address>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <OpenBadge hours={business.hours} className="rounded-full border-2 border-rule bg-surface px-3.5 py-1.5" />
        <a className="button" href={mapDirectionsUrl(formatAddress())}><Icon name="pin" filled={false} className="size-5" />Get directions</a>
      </div>
      {business.phone ? <p className="mt-5"><a className="inline-flex items-center gap-2 text-link" href={phoneHref()}><Icon name="phone" filled={false} className="size-5" />{business.phone}</a></p> : null}
    </>
  );
}
function WhereWhenText({ children }: Content) { return <p className="mt-5 max-w-[46ch] text-muted">{children}</p>; }
export const WhereWhen = Object.assign(WhereWhenSection, { Heading: WhereWhenHeading, Address: WhereWhenAddress, Text: WhereWhenText });

/** The inherited map in a pinked cloth frame. */
export function MapFrame() {
  return (
    <div className="wrap mt-14">
      <div className="cloth pinked p-3 py-5 shadow-[inset_0_0_0_1px_var(--rule)]">
        <GoogleMap address={formatAddress()} title={business.mapTitle} />
      </div>
    </div>
  );
}

/* ---------- Printed lists ---------- */

export function PrintedLists({ children }: Content) {
  return <div className="wrap mt-14 grid gap-12 md:grid-cols-2">{children}</div>;
}
function PrintedListSection({ title, children }: Content & { title: string }) {
  return (
    <section aria-label={title}>
      <h2 className="text-[clamp(1.9rem,3.5vw,2.5rem)]">{title}</h2>
      <PrintBorder kind="buta" className="mt-3 text-primary dark:text-turmeric" />
      <ul className="mt-2">{children}</ul>
    </section>
  );
}
function PrintedListItem({ icon, children }: Content & { icon: IconName }) {
  return (
    <li className="flex gap-3.5 border-b-2 border-dotted border-rule py-3.5 last:border-0">
      <Icon name={icon} filled={false} className="mt-0.5 size-6 flex-none text-saffron" />
      <span>{children}</span>
    </li>
  );
}
export const PrintedList = Object.assign(PrintedListSection, { Item: PrintedListItem });

/* ---------- Group tables band ---------- */

function GroupBandSection({ children }: Content) {
  return (
    <section className="band mt-16">
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" flip />
      <div className="wrap flex flex-wrap items-center justify-between gap-6 py-10">{children}</div>
    </section>
  );
}
function GroupBandText({ children }: Content) {
  return <p className="max-w-[40ch] font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight">{children}</p>;
}
function GroupBandAction({ href, children }: Content & { href: string }) {
  return <SiteLink href={href} className="button border-band-accent bg-band-accent text-clove hover:border-band-accent hover:bg-turmeric">{children}</SiteLink>;
}
export const GroupBand = Object.assign(GroupBandSection, { Text: GroupBandText, Action: GroupBandAction });
