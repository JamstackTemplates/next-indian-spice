import type { ReactNode } from 'react';
import { Icon } from './art/icons';

type Content = { children: ReactNode };

/** Turmeric-edged footnote box under the menu and thalis: allergens and prices. */
function MenuNotesBox({ children }: Content) {
  return (
    <aside aria-label="Allergens and prices" className="wrap mt-4">
      <div className="grid gap-4 border-l-[6px] border-turmeric bg-raised px-[clamp(1.1rem,3vw,2rem)] py-5 md:grid-cols-2 md:gap-8">{children}</div>
    </aside>
  );
}
function Allergens({ children }: Content) {
  return <p className="flex gap-3"><Icon name="almond" filled={false} className="mt-1 size-5 flex-none text-chilli" /><span><strong className="font-semibold">Allergens.</strong> {children}</span></p>;
}
function Prices({ children }: Content) {
  return <p className="flex gap-3"><Icon name="step" className="mt-1.5 size-4 flex-none text-saffron" /><span><strong className="font-semibold">Prices.</strong> {children}</span></p>;
}
export const MenuNotes = Object.assign(MenuNotesBox, { Allergens, Prices });
