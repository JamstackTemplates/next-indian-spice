import type { Metadata } from 'next';
import { CopperHandi } from '../../components/art/scenes';
import { MenuBoard } from '../../components/menu-board';
import { MenuNotes } from '../../components/menu-notes';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'The curry menu',
  description: 'Regional curries from Punjab, Kashmir, Bengal, Goa, Kerala, Chettinad, Hyderabad and Gujarat, each marked for heat and diet, with breads, rice and sides.',
  alternates: { canonical: absoluteUrl('/menu/') },
};

export default function MenuPage() {
  return (
    <>
      <PageHead eyebrow="Menu" title="The curry menu" art={<CopperHandi className="w-36 sm:w-48 md:w-56" />}>
        <p>Eight regions, each cooked to its own recipe. Breads, rice and sides at the end.</p>
      </PageHead>
      <MenuBoard />
      <MenuNotes>
        <MenuNotes.Allergens>
          Our kitchen handles nuts, dairy, gluten, mustard and sesame. Tags describe the recipe, not a
          guarantee against traces. Please tell us about allergies before you order.
        </MenuNotes.Allergens>
        <MenuNotes.Prices>
          Prices in pounds and include VAT. A discretionary 12.5% service charge is added for tables of six or more.
        </MenuNotes.Prices>
      </MenuNotes>
    </>
  );
}
