import type { Metadata } from 'next';
import { Icon } from '../../components/art/icons';
import { PrintBorder } from '../../components/art/print';
import { RainCloud } from '../../components/art/scenes';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business, phoneHref } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send an enquiry about a group table, a celebration or the Monsoon Room. We reply to confirm availability.',
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <PageHead eyebrow="Contact" title={business.enquiries.title} border="lotus" art={<RainCloud className="w-36 sm:w-48" />}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>
      <div className="wrap grid gap-10 pt-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
        <aside aria-labelledby="direct-heading" className="band order-first self-start p-[clamp(1.25rem,3vw,2rem)] shadow-[6px_6px_0_var(--saffron)] md:order-last">
          <h2 id="direct-heading" className="font-accent text-[1.5rem] text-band-accent">Write or call</h2>
          <p className="mt-3 flex items-center gap-2.5 text-[1.15rem]">
            <Icon name="mail" filled={false} className="size-5 flex-none text-band-accent" />
            <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
          {business.phone ? (
            <p className="mt-3 flex items-center gap-2.5 text-[1.15rem]">
              <Icon name="phone" filled={false} className="size-5 flex-none text-band-accent" />
              <a className="text-link" href={phoneHref()}>{business.phone}</a>
            </p>
          ) : null}
          <h2 className="mt-7 font-accent text-[1.3rem] text-band-accent">Useful to include</h2>
          <p className="mt-1 text-[.95rem] text-band-muted">The form has name, email and message. Put these details in your message:</p>
          <ul className="mt-3 grid gap-2">
            {business.enquiries.usefulToInclude.map(tip => (
              <li key={tip} className="flex gap-2.5"><Icon name="step" className="mt-2 size-3 flex-none text-saffron" />{tip}</li>
            ))}
          </ul>
          <p className="mt-6 border-t border-dotted border-band-accent/40 pt-4 text-[.95rem] text-band-muted">
            Sending a message is an enquiry, not a booking. We’ll reply to confirm availability, and your table is held only once we’ve confirmed.
          </p>
        </aside>
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-[clamp(2rem,4vw,2.6rem)]">Send an enquiry</h2>
          <p className="mt-2 text-muted">Group tables, birthdays, the Monsoon Room or a question about allergies before you visit.</p>
          <div className="cloth mt-6 p-[clamp(1rem,3vw,1.75rem)] shadow-[inset_0_0_0_1px_var(--rule)]">
            {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
              : <div>
                <h3 className="font-accent text-[1.3rem]">Write to us directly</h3>
                <p className="mt-2 text-muted">The enquiry form isn’t connected yet. Please email <a className="text-link" href={`mailto:${business.email}`}>{business.email}</a> and we’ll reply to confirm.</p>
              </div>}
          </div>
          <PrintBorder kind="lotus" className="mt-6 text-chilli" />
        </section>
      </div>
    </>
  );
}
