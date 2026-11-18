import { business } from '../content/business';
import type { Dietary } from '../content/menu';
import { Icon, type IconName } from './art/icons';

/** Four chilli slots; `heat` of them are filled. The label is always available to screen readers. */
export function HeatMeter({ heat, showLabel = false, className = '' }: { heat: number; showLabel?: boolean; className?: string }) {
  const label = business.heatScale[heat] ?? '';
  return (
    <span className={`relative inline-flex items-center gap-1.5 ${className}`}>
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3, 4].map(level => (
          <Icon key={level} name="chilli" filled={level <= heat}
            className={`-mr-0.5 size-[1.1rem] ${level <= heat ? 'text-chilli' : 'text-muted opacity-35'}`} />
        ))}
      </span>
      <span className={showLabel ? 'text-[.86rem] font-semibold text-muted' : 'sr-only'}>
        {showLabel ? label : `Heat: ${label}, ${heat} of 4`}
      </span>
    </span>
  );
}

export const DIET_MARKS: Record<Dietary, { icon: IconName; short: string; label: string; tone: string }> = {
  vegetarian: { icon: 'leaf', short: 'V', label: 'Vegetarian', tone: 'text-leaf' },
  vegan: { icon: 'sprout', short: 'VG', label: 'Vegan', tone: 'text-leaf' },
  'gluten-free': { icon: 'gluten-free', short: 'GF', label: 'Gluten-free', tone: 'text-ink' },
  'contains-nuts': { icon: 'almond', short: 'N', label: 'Contains nuts', tone: 'text-chilli' },
};

/** Dietary marks as small printed chips. Vegan implies vegetarian, so only “VG” is shown for vegan dishes. */
export function DietMarks({ dietary, className = '', long = false }: { dietary: readonly Dietary[]; className?: string; long?: boolean }) {
  const shown = dietary.includes('vegan') ? dietary.filter(tag => tag !== 'vegetarian') : dietary;
  if (!shown.length) return null;
  return (
    <ul className={`inline-flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Dietary">
      {shown.map(tag => {
        const mark = DIET_MARKS[tag];
        return (
          <li key={tag} title={mark.label}
            className={`inline-flex items-center gap-1 rounded-[3px] border border-current/40 px-1.5 py-px text-[.78rem] leading-5 font-semibold ${mark.tone}`}>
            <Icon name={mark.icon} filled={false} className="size-3.5" />
            {long ? <span>{mark.label}</span> : <><span aria-hidden="true">{mark.short}</span><span className="sr-only">{mark.label}</span></>}
          </li>
        );
      })}
    </ul>
  );
}
