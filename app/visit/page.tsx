import type { Metadata } from 'next';
import { RainCloud } from '../../components/art/scenes';
import { PageHead } from '../../components/page-head';
import { GroupBand, MapFrame, PrintedList, PrintedLists, WhereWhen } from '../../components/visit';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Visit',
  description: 'Find Saffron & Monsoon at Granary Square, King’s Cross: opening hours, directions from King’s Cross St Pancras, access and group tables.',
  alternates: { canonical: absoluteUrl('/visit/') },
};

export default function VisitPage() {
  return (
    <>
      <PageHead eyebrow="Visit" title="Come in from the rain" art={<RainCloud className="w-40 sm:w-52" />}>
        <p>We’re on Granary Square in King’s Cross, open Tuesday to Sunday from midday.</p>
      </PageHead>

      <WhereWhen>
        <WhereWhen.Heading>Granary Square</WhereWhen.Heading>
        <WhereWhen.Address />
        <WhereWhen.Text>
          Look for the teal awning on the canal side of the square, beside the fountains.
        </WhereWhen.Text>
      </WhereWhen>

      <MapFrame />

      <PrintedLists>
        <PrintedList title="Getting here">
          <PrintedList.Item icon="train">
            King’s Cross St Pancras is a five-minute walk, on the Northern, Piccadilly, Victoria, Circle,
            Hammersmith &amp; City and Metropolitan lines.
          </PrintedList.Item>
          <PrintedList.Item icon="pin">Buses stop on York Way, two minutes from the square.</PrintedList.Item>
          <PrintedList.Item icon="step">There is no on-site parking. Cycle racks line the square.</PrintedList.Item>
        </PrintedList>
        <PrintedList title="At the restaurant">
          <PrintedList.Item icon="step">Step-free entrance and an accessible toilet.</PrintedList.Item>
          <PrintedList.Item icon="leaf">High chairs on request.</PrintedList.Item>
          <PrintedList.Item icon="raindrop">The Monsoon Room seats 24 for private dining, by enquiry.</PrintedList.Item>
        </PrintedList>
      </PrintedLists>

      <GroupBand>
        <GroupBand.Text>Up to eight walk in. Larger groups send an enquiry.</GroupBand.Text>
        <GroupBand.Action href="/contact/">Enquire about a group table</GroupBand.Action>
      </GroupBand>
    </>
  );
}
