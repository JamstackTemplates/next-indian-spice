import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { ButaMark } from './art/scenes';
import { PrintBorder } from './art/print';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const navigation = [
  { href: '/menu/', label: 'Menu' },
  { href: '/thali/', label: 'Thalis' },
  { href: '/visit/', label: 'Visit' },
  { href: '/contact/', label: 'Contact' },
];

/** The wordmark with its ampersand set as a hand-painted saffron glyph. */
export function Wordmark({ className = '' }: { className?: string }) {
  const [first, second] = business.name.split(' & ');
  if (!second) return <span className={`font-display ${className}`}>{business.name}</span>;
  return (
    <span className={`font-display leading-none whitespace-nowrap ${className}`}>
      {first} <span className="font-accent text-turmeric" aria-hidden="true">&amp;</span><span className="sr-only">&amp;</span> {second}
    </span>
  );
}

/** Lamp-lit maroon band at the door, with a marigold and mango-leaf toran hanging over every page. */
export function SiteHeader() {
  return (
    <header className="band relative z-40 text-band-text print:bg-white print:text-black">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 md:min-h-(--header-h) md:flex-nowrap md:py-0">
        <SiteLink href="/" className="inline-flex min-w-0 items-center gap-2.5 no-underline hover:no-underline" aria-label={`${business.name}, home`}>
          <ButaMark className="size-10 flex-none sm:size-11" />
          <Wordmark className="text-[1.45rem] sm:text-[1.7rem]" />
        </SiteLink>
        <div className="flex items-center gap-3 md:order-last print:hidden">
          <OpenBadge hours={business.hours} className="text-[.9rem] text-band-text max-lg:hidden" />
          <DarkModeToggle className="flex-none" />
        </div>
        <nav aria-label="Main" className="w-full md:ml-auto md:w-auto">
          <ul className="flex justify-between gap-1 border-t border-band-accent/30 pt-1 md:justify-end md:border-0 md:pt-0">
            {navigation.map(item => (
              <li key={item.href}>
                <SiteLink href={item.href} markCurrent="section"
                  className="inline-block rounded-sm px-2.5 py-2 text-[1.02rem] font-semibold no-underline decoration-turmeric decoration-[3px] underline-offset-[.45em] hover:text-turmeric hover:no-underline aria-[current]:text-turmeric aria-[current]:underline sm:px-3.5">
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="h-1.5 bg-[repeating-linear-gradient(90deg,var(--saffron)_0_14px,var(--turmeric)_14px_28px,var(--rani)_28px_42px)]" aria-hidden="true" />
      <PrintBorder kind="toran" ink="#f4c14a" className="pointer-events-none absolute inset-x-0 top-full z-10 -mt-px print:hidden" />
    </header>
  );
}
