import type { ReactNode } from 'react';
import { GRAVIES, formatPrice, type Dietary } from '../content/menu';
import { ACCOMPANIMENTS, servedLabel, thaliFacts, type Thali } from '../content/thalis';
import { Icon } from './art/icons';
import { PrintBorder } from './art/print';
import { EatStep } from './art/scenes';
import { ThaliPlate } from './art/thali-plate';
import { DietMarks, HeatMeter } from './marks';
import { SiteLink } from './site-link';

type Content = { children: ReactNode };

/** One thali: its plate drawn from data beside the katori list. Alternate sets mirror the layout. */
export function ThaliSet({ thali, index }: { thali: Thali; index: number }) {
  const facts = thaliFacts(thali);
  const dietary: Dietary[] = [
    ...(facts.vegan ? ['vegetarian', 'vegan'] as const : facts.vegetarian ? ['vegetarian'] as const : []),
    ...(facts.glutenFree ? ['gluten-free'] as const : []),
    ...(facts.containsNuts ? ['contains-nuts'] as const : []),
  ];
  const mirrored = index % 2 === 1;
  return (
    <article id={thali.id} aria-labelledby={`${thali.id}-title`} className={`thali scroll-mt-6 ${mirrored ? 'dabu' : 'cloth'}`}>
      {index > 0 ? <PrintBorder kind="buta" className="text-primary dark:text-turmeric" /> : null}
      <div className="wrap grid items-center gap-x-14 gap-y-8 py-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-2">
        <ThaliPlate katoris={facts.dishes.map(dish => dish.gravy!)} accompaniments={thali.accompaniments}
          className={`mx-auto w-full max-w-[30rem] ${mirrored ? 'lg:order-last' : ''}`} />
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-[3px] border-double border-rule pb-3">
            <div>
              <h2 id={`${thali.id}-title`} className="text-[clamp(2.3rem,4.5vw,3.2rem)]">{thali.name}</h2>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[.95rem] font-semibold text-muted"><Icon name="clock" filled={false} className="size-4.5" />{servedLabel(thali)}</p>
            </div>
            <p className="font-display text-[clamp(2.8rem,5vw,3.8rem)] leading-none text-primary dark:text-turmeric">{formatPrice(thali.pricePence)}</p>
          </div>
          <p className="mt-4 max-w-[48ch] text-[1.08rem]">{thali.description}</p>
          {facts.swapped ? (
            <p className="mt-4 flex items-start gap-2.5 rounded-[3px] border-2 border-dashed border-chilli px-3.5 py-2.5 text-[.98rem] font-semibold text-chilli">
              <Icon name="step" className="mt-1 size-3.5 flex-none" />One dish is swapped today. Ask us what’s in the bowl.
            </p>
          ) : null}
          <h3 className="sr-only">Katoris on this plate</h3>
          <ol className="mt-5">
            {facts.dishes.map((dish, k) => (
              <li key={dish.id} data-k={k} className="thali-dish grid grid-cols-[1.1rem_1fr_auto] items-center gap-x-3 border-b border-dotted border-rule px-1.5 py-2.5 last:border-0">
                <span aria-hidden="true" className="size-4 rounded-full ring-2 ring-brass" style={{ background: GRAVIES[dish.gravy!] }} />
                <span>
                  <SiteLink href={`/menu/#${dish.id}`} className={`font-semibold ${dish.available ? '' : 'line-through decoration-chilli'}`}>{dish.name}</SiteLink>
                  <span className="ml-2 text-[.9rem] text-muted">{dish.section.name}</span>
                  {dish.available ? null : <span className="ml-2 text-[.85rem] font-semibold text-chilli">sold out today</span>}
                </span>
                <HeatMeter heat={dish.heat} />
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[.98rem] text-muted">
            <span className="font-semibold text-ink">On the plate:</span> {thali.accompaniments.map(item => ACCOMPANIMENTS[item]).join(', ')}.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t-2 border-dotted border-rule pt-4">
            <span className="inline-flex items-center gap-2 text-[.95rem]"><span className="font-semibold">Up to</span><HeatMeter heat={facts.maxHeat} showLabel /></span>
            <DietMarks dietary={dietary} long />
          </div>
          {facts.glutenFree ? <p className="mt-2 text-[.9rem] text-muted">Gluten-free when you ask us to swap the roti for extra rice.</p> : null}
          {thali.servedOn ? <p className="stamp stamp-monsoon mt-5">{thali.servedOn.length === 2 && thali.servedOn.every(day => day === 'Saturday' || day === 'Sunday') ? 'Weekends only' : servedLabel(thali)}</p> : null}
        </div>
      </div>
    </article>
  );
}

/* ---------- How to eat a thali: three vignettes in a strip ---------- */

function EatGuideSection({ children }: Content) {
  return (
    <section aria-labelledby="eat-heading" className="band">
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" flip />
      <div className="wrap py-[clamp(3rem,6vw,4.5rem)]">{children}</div>
      <PrintBorder kind="rain" ink="var(--rain)" fill="var(--rain)" className="bg-bg" />
    </section>
  );
}
function EatGuideHeading({ children }: Content) {
  return <h2 id="eat-heading" className="text-[clamp(2.2rem,4.5vw,3.2rem)]">{children}</h2>;
}
function EatGuideSteps({ children }: Content) {
  return <ol className="mt-8 grid gap-8 sm:grid-cols-3">{children}</ol>;
}
function EatGuideStep({ step, children }: Content & { step: 1 | 2 | 3 }) {
  return (
    <li className="relative">
      <span aria-hidden="true" className="absolute -top-2 left-0 font-display text-[4.5rem] leading-none text-band-accent [text-shadow:3px_3px_0_var(--saffron)]">{step}</span>
      <EatStep step={step} className="ml-auto w-[78%] max-w-[13rem]" />
      <p className="mt-3 border-t border-dotted border-band-accent/40 pt-3 text-[1.15rem] font-semibold">{children}</p>
    </li>
  );
}
export const EatGuide = Object.assign(EatGuideSection, { Heading: EatGuideHeading, Steps: EatGuideSteps, Step: EatGuideStep });

/** A single stamped line, e.g. the refill promise. */
export function StampedLine({ children }: Content) {
  return (
    <div className="wrap pt-12 text-center">
      <p className="stamp stamp-monsoon text-[1.15rem] whitespace-normal">{children}</p>
    </div>
  );
}

