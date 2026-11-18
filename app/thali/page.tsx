import type { Metadata } from 'next';
import { MenuNotes } from '../../components/menu-notes';
import { PageHead } from '../../components/page-head';
import { EatGuide, StampedLine, ThaliSet } from '../../components/thali-set';
import { ThaliPlate } from '../../components/art/thali-plate';
import { thalis } from '../../content/thalis';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Thali sets',
  description: 'Four thali sets on brass plates: three to five katoris of regional curry with rice, roti and the trimmings, marked for heat and diet.',
  alternates: { canonical: absoluteUrl('/thali/') },
};

export default function ThaliPage() {
  return (
    <>
      <PageHead eyebrow="Thalis" title="Thali sets"
        art={<ThaliPlate katoris={['golden', 'red', 'green']} accompaniments={['rice', 'roti']} className="w-40 sm:w-52 md:-mr-16 md:mb-[-4.5rem] md:w-72" />}>
        <p>A full meal on one brass plate: three to five katoris (small bowls) of curry with rice, bread and the trimmings.</p>
      </PageHead>

      {thalis.map((thali, index) => <ThaliSet key={thali.id} thali={thali} index={index} />)}

      <EatGuide>
        <EatGuide.Heading>How to eat a thali</EatGuide.Heading>
        <EatGuide.Steps>
          <EatGuide.Step step={1}>Start with the dal and rice</EatGuide.Step>
          <EatGuide.Step step={2}>Tear the roti, scoop the curry</EatGuide.Step>
          <EatGuide.Step step={3}>Finish with the sweet</EatGuide.Step>
        </EatGuide.Steps>
      </EatGuide>

      <StampedLine>Dal, rice and roti refills are on the house for thalis eaten in.</StampedLine>

      <MenuNotes>
        <MenuNotes.Allergens>
          Our kitchen handles nuts, dairy, gluten, mustard and sesame. Thali tags are worked out from the
          dishes in each katori. Please tell us about allergies before you order.
        </MenuNotes.Allergens>
        <MenuNotes.Prices>
          Prices in pounds and include VAT. A discretionary 12.5% service charge is added for tables of six or more.
        </MenuNotes.Prices>
      </MenuNotes>
    </>
  );
}
