"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

const NEUTRAL = 'Opening hours';

/**
 * Open-now badge. Static and no-JS output is the neutral “Opening hours” (linking to the table when `href` is given);
 * the browser computes the status in the business time zone and refreshes it every minute.
 */
export function OpenBadge({ hours, className = '', href }: { hours: readonly OpeningHours[]; className?: string; href?: string }) {
  const [label, setLabel] = useState(NEUTRAL);
  useEffect(() => {
    const update = () => {
      const next = openingLabel(hours, site.timeZone);
      setLabel(next === 'See opening hours' ? NEUTRAL : next);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  const state = label.startsWith('Open now') ? 'open' : label.startsWith('Closed') ? 'closed' : 'neutral';
  const lamp = state === 'open' ? 'bg-leaf shadow-[0_0_0_4px_color-mix(in_srgb,var(--leaf)_30%,transparent)]'
    : state === 'closed' ? 'bg-chilli' : 'bg-turmeric';
  const content = <>
    <span aria-hidden="true" className={`inline-block size-2.5 flex-none rounded-full ${lamp}`} />
    <span role="status" aria-live="polite">{label}</span>
  </>;
  const classes = `inline-flex items-center gap-2 font-semibold whitespace-nowrap ${className}`;
  return href && state === 'neutral'
    ? <a href={href} className={`${classes} underline decoration-1 underline-offset-4`} data-state={state}>{content}</a>
    : <span className={classes} data-state={state}>{content}</span>;
}
