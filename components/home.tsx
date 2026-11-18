import type { ReactNode } from 'react';
import { business } from '../content/business';
import { GRAVIES, allItems, formatPrice, regions } from '../content/menu';
import { ACCOMPANIMENTS, featuredThali, thaliFacts } from '../content/thalis';
import { Icon } from './art/icons';
import { PrintBorder, RegionStamp } from './art/print';
import { DishArt, Diya, Rangoli, SpiceScatter } from './art/food';
import { JharokhaScene, MasalaDabba } from './art/scenes';
import { ThaliPlate } from './art/thali-plate';
import { DIET_MARKS, HeatMeter } from './marks';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type Content = { children: ReactNode };
type LinkContent = Content & { href: string };

/** Block-print colourways rotated across stamps and panels. */
export const TONES = ['var(--saffron)', 'var(--turmeric)', 'var(--leaf)', 'var(--chilli)', 'var(--primary)'] as const;

/* ---------- Hero ---------- */

function HeroSection({ children }: Content) {
  const facts = thaliFacts(featuredThali);
  return (
    <section className="dabu relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="h-12 max-sm:h-10" aria-hidden="true" />
      <div className="wrap grid items-center gap-x-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,.94fr)]">
        <div className="relative z-10 pb-10 max-lg:-mt-9 max-lg:pt-5 lg:py-14 max-lg:cloth max-lg:pinked max-lg:px-5 max-lg:pb-12 max-lg:-mx-1 max-lg:shadow-[0_0_0_1px_var(--rule)]">
          {children}
        </div>
        <div className="relative max-lg:order-first max-lg:mx-auto max-lg:w-full max-lg:max-w-[19rem] lg:-mr-8 lg:-mb-20 lg:self-start lg:pt-8">
          <JharokhaScene katoris={facts.dishes.map(dish => dish.gravy!)} accompaniments={featuredThali.accompaniments} className="w-full max-lg:max-h-[18.5rem] lg:max-h-[min(46rem,calc(100svh-7rem))]" />
        </div>
      </div>
    </section>
  );
}
function HeroEyebrow({ children }: Content) { return <p className="eyebrow max-sm:text-[.7rem] max-sm:tracking-[.11em]">{children}</p>; }
function HeroHeading({ children }: Content) {
  return <h1 id="hero-heading" className="mt-3 text-[clamp(2.45rem,6.2vw,4.7rem)] leading-[.98] [&_em]:block [&_em]:text-primary [&_em]:not-italic dark:[&_em]:text-turmeric">{children}</h1>;
}
function HeroIntroduction({ children }: Content) {
  return <p className="mt-4 max-w-[40ch] text-[clamp(1.05rem,1.5vw,1.28rem)] leading-normal text-muted sm:mt-5">{children}</p>;
}
function HeroActions({ children }: Content) { return <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-7">{children}</div>; }
function HeroPrimary({ href, children }: LinkContent) {
  return <SiteLink href={href} className="button text-[1.1rem]">{children}<Icon name="arrow" filled={false} className="size-5" /></SiteLink>;
}
function HeroSecondary({ href, children }: LinkContent) {
  return <SiteLink href={href} className="text-link text-[1.05rem]">{children}</SiteLink>;
}
/** Badge, opening summary and the address, under the actions. */
function HeroStatus({ children }: Content) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dotted border-rule pt-4 text-[.98rem]">
      <OpenBadge hours={business.hours} href="#find-us" />
      <span className="inline-flex items-center gap-1.5 text-muted"><Icon name="pin" className="size-4.5 text-chilli" />{children}</span>
    </div>
  );
}
export const Hero = Object.assign(HeroSection, {
  Eyebrow: HeroEyebrow, Heading: HeroHeading, Introduction: HeroIntroduction,
  Actions: HeroActions, Primary: HeroPrimary, Secondary: HeroSecondary, Status: HeroStatus,
});

/* ---------- Find us tonight: slim turmeric band ---------- */

function FindUsSection({ children }: Content) {
  return (
    <section id="find-us" aria-labelledby="find-us-heading" className="relative z-0 scroll-mt-4">
      <div className="pinked-bottom relative bg-turmeric pb-2 text-clove [--tooth:22px]">
        <div aria-hidden="true" className="h-1.5 bg-[repeating-linear-gradient(90deg,var(--primary)_0_10px,transparent_10px_16px)]" />
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-5 lg:py-6">{children}</div>
      </div>
    </section>
  );
}
function FindUsHeading({ children }: Content) {
  return <h2 id="find-us-heading" className="font-accent text-[1.6rem] leading-none">{children}</h2>;
}
function FindUsText({ children }: Content) {
  return <p className="flex min-w-0 basis-full items-center gap-2 text-[1.04rem] font-medium md:basis-0 md:flex-1"><Icon name="train" filled={false} className="size-5 flex-none" /><span>{children}</span></p>;
}
function FindUsLink({ href, children }: LinkContent) {
  return (
    <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <OpenBadge hours={business.hours} className="rounded-full bg-[#fff9ec] px-3 py-1 text-[.95rem] text-clove" />
      <SiteLink href={href} className="font-semibold text-clove underline decoration-2 underline-offset-4">{children}</SiteLink>
    </span>
  );
}
export const FindUs = Object.assign(FindUsSection, { Heading: FindUsHeading, Text: FindUsText, Link: FindUsLink });

/* ---------- Eight regional kitchens: stamps printed along a cloth strip ---------- */

function KitchensSection({ children }: Content) {
  return (
    <section aria-labelledby="kitchens-heading" className="pt-[clamp(4rem,9vw,7rem)]">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        <div className="lg:pt-6">
          <p aria-hidden="true" className="font-display text-[clamp(7rem,16vw,11.5rem)] leading-[.8] text-saffron [text-shadow:5px_5px_0_var(--primary)]">0{regions.length}</p>
          {children}
        </div>
        <KitchenStrip />
      </div>
    </section>
  );
}
function KitchensHeading({ children }: Content) {
  return <h2 id="kitchens-heading" className="mt-6 text-[clamp(2.2rem,4vw,3rem)]">{children}</h2>;
}
function KitchensIntroduction({ children }: Content) { return <p className="mt-3 text-muted">{children}</p>; }
function KitchensLink({ href, children }: LinkContent) {
  return <SiteLink href={href} className="button button-quiet mt-6">{children}<Icon name="arrow" filled={false} className="size-5" /></SiteLink>;
}
function KitchenStrip() {
  return (
    <div className="cloth relative border-y-[3px] border-double border-rule max-lg:-mx-4">
      <PrintBorder kind="buta" className="text-primary dark:text-turmeric" />
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-2 lg:overflow-visible lg:px-6 lg:pb-10">
        {regions.map((region, i) => {
          const dish = region.items.find(item => item.signature)!;
          return (
            <li key={region.id} className={`relative w-[13.5rem] flex-none snap-start lg:w-auto ${i % 2 ? 'lg:translate-y-8' : ''}`}>
              <SiteLink href={`/menu/#${region.id}`} className="group block rounded-sm p-2 no-underline hover:no-underline">
                <span className="relative block w-fit">
                  <DishArt item={dish} className="press-in size-28 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                  <RegionStamp stamp={region.stamp} tone={TONES[i % TONES.length]} className="absolute -right-3 -bottom-1 size-11 rotate-6 text-ink drop-shadow-[2px_2px_0_var(--rule)]" />
                </span>
                <h3 className="mt-3 text-[1.6rem] group-hover:underline group-hover:decoration-saffron group-hover:decoration-2">{region.name}</h3>
                <p className="mt-1 text-[.92rem] leading-snug text-muted">{region.note}</p>
                <p className="mt-2.5 border-t border-dotted border-rule pt-2 text-[.95rem] font-semibold">{dish.name}</p>
                <HeatMeter heat={dish.heat} />
              </SiteLink>
            </li>
          );
        })}
      </ul>
      <PrintBorder kind="buta" className="text-primary dark:text-turmeric" flip />
    </div>
  );
}
export const Kitchens = Object.assign(KitchensSection, { Heading: KitchensHeading, Introduction: KitchensIntroduction, Link: KitchensLink });

/* ---------- The thali: full-bleed monsoon band ---------- */

function FeaturedThaliSection({ children }: Content) {
  const thali = featuredThali;
  const facts = thaliFacts(thali);
  return (
    <section aria-labelledby="thali-heading" className="band thali relative mt-[clamp(5rem,10vw,8rem)]">
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" flip />
      <div className="wrap grid items-center gap-10 py-[clamp(3rem,7vw,5.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative">
          <ThaliPlate leaf katoris={facts.dishes.map(dish => dish.gravy!)} accompaniments={thali.accompaniments}
            className="mx-auto w-full max-w-[38rem] lg:-my-16 lg:-ml-10 lg:max-w-none" />
          <svg viewBox="-40 -80 80 92" className="absolute -bottom-6 left-0 w-16 sm:w-20" aria-hidden="true" data-art><Diya x={0} y={0} /></svg>
          <svg viewBox="-40 -80 80 92" className="absolute -top-4 right-2 w-12 sm:w-16" aria-hidden="true" data-art><Diya x={0} y={0} /></svg>
        </div>
        <div>
          {children}
          <ol className="mt-6 border-y border-band-accent/30">
            {facts.dishes.map((dish, k) => (
              <li key={dish.id} data-k={k} className="thali-dish flex items-center gap-3 border-b border-dotted border-band-accent/30 px-2 py-2.5 last:border-0">
                <span aria-hidden="true" className="size-4 flex-none rounded-full ring-2 ring-band-accent/70" style={{ background: GRAVIES[dish.gravy!] }} />
                <SiteLink href={`/menu/#${dish.id}`} className="font-semibold">{dish.name}</SiteLink>
                <span className="text-[.9rem] text-band-muted">{dish.section.name}</span>
                <HeatMeter heat={dish.heat} className="ml-auto [&_.text-muted]:text-band-muted" />
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[.95rem] text-band-muted">With {thali.accompaniments.filter(a => a !== 'rice' && a !== 'roti').map(a => ACCOMPANIMENTS[a].toLowerCase()).join(', ')}, rice and roti.</p>
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
            <p className="font-display text-[clamp(3rem,6vw,4.4rem)] leading-none text-band-accent">{formatPrice(thali.pricePence)}</p>
            {facts.vegetarian ? <p className="stamp mb-2 text-band-accent">{facts.vegan ? 'Vegan' : 'Vegetarian'}</p> : null}
          </div>
        </div>
      </div>
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" />
    </section>
  );
}
function FeaturedThaliEyebrow({ children }: Content) { return <p className="eyebrow text-band-muted">{children}</p>; }
function FeaturedThaliHeading({ children }: Content) {
  return <h2 id="thali-heading" className="mt-3 text-[clamp(2.4rem,5vw,3.8rem)] [&_em]:text-band-accent [&_em]:not-italic">{children}</h2>;
}
function FeaturedThaliIntroduction({ children }: Content) { return <p className="mt-4 max-w-[46ch] text-band-muted">{children}</p>; }
function FeaturedThaliLink({ href, children }: LinkContent) {
  return <SiteLink href={href} className="button mt-8 border-band-accent bg-band-accent text-clove shadow-[4px_4px_0_var(--saffron)] hover:border-band-accent hover:bg-turmeric">{children}<Icon name="arrow" filled={false} className="size-5" /></SiteLink>;
}
export const FeaturedThali = Object.assign(FeaturedThaliSection, {
  Eyebrow: FeaturedThaliEyebrow, Heading: FeaturedThaliHeading, Introduction: FeaturedThaliIntroduction, Link: FeaturedThaliLink,
});

/* ---------- Know your heat: vertical scale beside the masala dabba ---------- */

/** One example dish per heat level, preferring a region's signature dish. */
export function heatExamples() {
  const dishes = allItems().filter(item => item.section.kind === 'region');
  return business.heatScale.map((label, heat) => {
    const atHeat = dishes.filter(dish => dish.heat === heat);
    return { heat, label, example: atHeat.find(dish => dish.signature) ?? atHeat[0] };
  });
}

function HeatGuideSection({ children }: Content) {
  const steps = heatExamples();
  return (
    <section aria-labelledby="heat-heading" className="wrap pt-[clamp(5rem,10vw,8rem)]">
      <div className="cloth pinked relative grid items-center gap-10 px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,6vw,4.5rem)] shadow-[inset_0_0_0_1px_var(--rule)] lg:grid-cols-[1fr_minmax(0,24rem)]">
        <div>
          {children}
          <ol className="mt-8 grid gap-0">
            {steps.map(step => (
              <li key={step.heat} className="grid grid-cols-[3.2rem_7.5rem_1fr] items-center gap-3 border-b-2 border-dotted border-rule py-2.5 last:border-0 sm:grid-cols-[3.6rem_8.5rem_9rem_1fr]">
                <span aria-hidden="true" className="font-display text-[2.6rem] leading-none text-saffron [text-shadow:2px_2px_0_var(--primary)]">{step.heat}</span>
                <HeatMeter heat={step.heat} />
                <span className="text-[1.15rem] font-semibold">{step.label}</span>
                {step.example ? <SiteLink href={`/menu/#${step.example.id}`} className="text-[.95rem] text-muted max-sm:col-span-2 max-sm:col-start-2">{step.example.name}</SiteLink> : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="relative mx-auto w-full max-w-[22rem] max-lg:order-first max-lg:max-w-[15rem]">
          <MasalaDabba className="w-full" />
          <SpiceScatter count={6} className="absolute -bottom-10 -left-10 w-48 rotate-6" />
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t-[3px] border-double border-rule pt-5 lg:col-span-2" aria-label="Dietary key">
          {Object.values(DIET_MARKS).map(mark => (
            <li key={mark.label} className={`inline-flex items-center gap-2 font-semibold ${mark.tone}`}>
              <span className="inline-flex items-center gap-1 rounded-[3px] border border-current/40 px-1.5 text-[.8rem] leading-6">
                <Icon name={mark.icon} filled={false} className="size-4" /><span aria-hidden="true">{mark.short}</span>
              </span>
              <span className="text-ink">{mark.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function HeatGuideHeading({ children }: Content) {
  return <h2 id="heat-heading" className="text-[clamp(2.4rem,5vw,3.6rem)]">{children}</h2>;
}
function HeatGuideNote({ children }: Content) { return <p className="mt-3 max-w-[44ch] text-[1.1rem] text-muted">{children}</p>; }
export const HeatGuide = Object.assign(HeatGuideSection, { Heading: HeatGuideHeading, Note: HeatGuideNote });

/* ---------- Gatherings: narrow lotus-framed panel ---------- */

function GatheringsSection({ children }: Content) {
  return (
    <section aria-labelledby="gatherings-heading" className="wrap pt-[clamp(5rem,10vw,8rem)]">
      <div className="mx-auto max-w-[44rem] text-center">
        <PrintBorder kind="lotus" className="text-chilli" />
        <div className="dabu-offset border-x-2 border-dotted border-rule px-[clamp(1.25rem,5vw,3.5rem)] pt-6 pb-12">
          <Rangoli className="mx-auto -mt-4 mb-6 w-44 sm:w-52 [&_*]:origin-center" />
          {children}
        </div>
        <PrintBorder kind="lotus" className="text-chilli" flip />
      </div>
    </section>
  );
}
function GatheringsStamp({ children }: Content) {
  return <p className="stamp stamp-rani text-[1.5rem]" aria-hidden="true">{children}</p>;
}
function GatheringsHeading({ children }: Content) {
  return <h2 id="gatherings-heading" className="mt-6 text-[clamp(2.3rem,5vw,3.4rem)]">{children}</h2>;
}
function GatheringsText({ children }: Content) { return <p className="mx-auto mt-4 max-w-[48ch] text-[1.08rem] text-muted">{children}</p>; }
function GatheringsAction({ href, children }: LinkContent) { return <SiteLink href={href} className="button mt-8">{children}</SiteLink>; }
function GatheringsNote({ children }: Content) { return <p className="mx-auto mt-6 max-w-[44ch] text-[.95rem] text-muted">{children}</p>; }
export const Gatherings = Object.assign(GatheringsSection, {
  Stamp: GatheringsStamp, Heading: GatheringsHeading, Text: GatheringsText, Action: GatheringsAction, Note: GatheringsNote,
});
