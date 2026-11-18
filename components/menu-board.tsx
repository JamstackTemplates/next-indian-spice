'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { business } from '../content/business';
import { formatPrice, menu, type MenuItem, type MenuSection } from '../content/menu';
import { DIET_FILTERS, HEAT_LIMITS, NO_FILTERS, isFiltered, matchesFilters, parseFilters, serializeFilters, type DietFilter, type HeatLimit, type MenuFilters } from '../lib/menu-filter';
import { PrintBorder, RegionStamp } from './art/print';
import { DietMarks, HeatMeter } from './marks';

const TONES = ['var(--saffron)', 'var(--turmeric)', 'var(--leaf)', 'var(--chilli)', 'var(--primary)'];
const total = menu.reduce((sum, section) => sum + section.items.length, 0);

function MenuLine({ item }: { item: MenuItem }) {
  const soldOut = !item.available;
  return (
    <li id={item.id} className={`menu-line scroll-mt-32 border-b-2 border-dotted border-rule py-3.5 last:border-0 ${soldOut ? 'text-muted' : ''}`}>
      <div className="flex items-baseline gap-2">
        <h3 className={`font-display text-[1.35rem] leading-tight ${soldOut ? 'line-through decoration-chilli decoration-2' : ''}`}>{item.name}</h3>
        <span className="leader" aria-hidden="true" />
        <span className="price tabular text-[1.3rem]">{formatPrice(item.pricePence)}</span>
      </div>
      <p className="mt-1 max-w-[52ch] text-[.98rem] leading-snug text-muted">{item.description}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <HeatMeter heat={item.heat} />
        <DietMarks dietary={item.dietary} />
        {item.seasonal ? <span className="stamp stamp-monsoon text-[.85rem]">Monsoon special</span> : null}
        {soldOut ? <span className="stamp text-[.85rem]">Sold out today</span> : null}
      </div>
    </li>
  );
}

function Panel({ section, index, items, filtered }: { section: MenuSection; index: number; items: MenuItem[]; filtered: boolean }) {
  const tone = TONES[index % TONES.length];
  const sides = section.kind === 'sides';
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}
      className={`menu-panel cloth mb-8 scroll-mt-28 break-inside-avoid shadow-[inset_0_0_0_1px_var(--rule)] ${sides ? 'mt-2' : ''}`}>
      <PrintBorder kind="buta" fill={tone} className="text-ink" />
      <div className="px-[clamp(1.1rem,3vw,2rem)] pt-5 pb-4">
        <header className="flex items-center gap-4 border-b-[3px] border-double border-rule pb-4">
          <RegionStamp stamp={section.stamp} tone={tone} className="size-16 flex-none text-ink sm:size-[4.5rem]" />
          <div>
            <h2 id={`${section.id}-title`} className="text-[clamp(2rem,4vw,2.6rem)]">{section.name}</h2>
            <p className="text-[.98rem] text-muted italic">{section.note}</p>
          </div>
        </header>
        {items.length
          ? <ul className={sides ? 'grid gap-x-10 md:grid-cols-2 xl:grid-cols-3' : ''}>{items.map(item => <MenuLine key={item.id} item={item} />)}</ul>
          : <p className="py-4 text-muted">{filtered ? 'Nothing here matches your filters.' : 'Nothing on today.'}</p>}
      </div>
      <PrintBorder kind="buta" fill={tone} className="text-ink" flip />
    </section>
  );
}

function Toggle({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick}
      className="min-h-10 rounded-[3px] border-2 border-ink/70 px-3 py-1 text-[.95rem] font-semibold whitespace-nowrap transition-colors hover:bg-raised aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:shadow-[3px_3px_0_var(--saffron)]">
      {children}
    </button>
  );
}

/**
 * The full menu with heat and diet filters. Without JavaScript the filter controls are not rendered,
 * every dish is listed and the region links work as plain anchors.
 */
export function MenuBoard() {
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState<MenuFilters>(NO_FILTERS);

  useEffect(() => {
    setFilters(parseFilters(window.location.search));
    setReady(true);
  }, []);

  function apply(next: MenuFilters) {
    setFilters(next);
    const { pathname, search, hash } = window.location;
    window.history.replaceState(window.history.state, '', `${pathname}${serializeFilters(next, search)}${hash}`);
  }
  const setHeat = (maxHeat: HeatLimit) => apply({ ...filters, maxHeat });
  const toggleDiet = (diet: DietFilter) => apply({
    ...filters,
    diets: filters.diets.includes(diet) ? filters.diets.filter(d => d !== diet) : DIET_FILTERS.map(f => f.id).filter(id => id === diet || filters.diets.includes(id)),
  });

  const filtered = ready && isFiltered(filters);
  const visible = menu.map(section => section.items.filter(item => !filtered || matchesFilters(item, filters)));
  const shown = visible.reduce((sum, items) => sum + items.length, 0);
  const regions = menu.filter(section => section.kind === 'region');
  const sides = menu.filter(section => section.kind === 'sides');

  return (
    <div>
      <div className="cloth z-30 border-y-2 border-rule md:sticky md:top-0 print:hidden">
        <div className="wrap py-3">
          <nav aria-label="Menu sections" className="-mx-1 overflow-x-auto">
            <ul className="flex gap-1 px-1 text-[.95rem] whitespace-nowrap">
              {menu.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="inline-block rounded-sm px-2 py-1 font-semibold text-link no-underline hover:bg-raised hover:underline">{section.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          {ready ? (
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dotted border-rule pt-3">
              <div role="group" aria-label="Heat" className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[.8rem] font-semibold tracking-[.14em] text-muted uppercase">Heat</span>
                {HEAT_LIMITS.map(limit => (
                  <Toggle key={String(limit)} pressed={filters.maxHeat === limit} onClick={() => setHeat(limit)}>
                    {limit === null ? 'Any heat' : `Up to ${business.heatScale[limit]}`}
                  </Toggle>
                ))}
              </div>
              <div role="group" aria-label="Diet" className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[.8rem] font-semibold tracking-[.14em] text-muted uppercase">Diet</span>
                {DIET_FILTERS.map(diet => (
                  <Toggle key={diet.id} pressed={filters.diets.includes(diet.id)} onClick={() => toggleDiet(diet.id)}>{diet.label}</Toggle>
                ))}
              </div>
              <p className="flex items-center gap-3 text-[.95rem] text-muted lg:ml-auto">
                <span role="status" aria-live="polite">{filtered ? `${shown} of ${total} dishes shown` : `All ${total} dishes shown`}</span>
                {filtered ? <button type="button" onClick={() => apply(NO_FILTERS)} className="font-semibold text-link underline underline-offset-4">Clear filters</button> : null}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="wrap pt-10">
        <div className="menu-panels grid items-start gap-x-8 lg:grid-cols-2">
          {regions.map(section => {
            const index = menu.indexOf(section);
            return <Panel key={section.id} section={section} index={index} items={visible[index]} filtered={filtered} />;
          })}
        </div>
        {sides.map(section => {
          const index = menu.indexOf(section);
          return <Panel key={section.id} section={section} index={index} items={visible[index]} filtered={filtered} />;
        })}
      </div>
    </div>
  );
}
