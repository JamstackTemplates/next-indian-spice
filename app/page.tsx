import type { Metadata } from 'next';
import { FeaturedThali, FindUs, Gatherings, HeatGuide, Hero, Kitchens } from '../components/home';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Eyebrow>Regional Indian kitchen · King’s Cross</Hero.Eyebrow>
        <Hero.Heading>Eight kitchens. <em>One brass plate.</em></Hero.Heading>
        <Hero.Introduction>
          Curries cooked the way each region cooks them, from Kashmiri rogan josh to Chettinad pepper chicken,
          with every dish marked for heat and diet.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.Primary href="/menu/">Explore the curry menu</Hero.Primary>
          <Hero.Secondary href="/visit/">Plan your visit</Hero.Secondary>
        </Hero.Actions>
        <Hero.Status>Granary Square, King’s Cross · Tuesday to Sunday from 12:00</Hero.Status>
      </Hero>

      <FindUs>
        <FindUs.Heading>Find us tonight</FindUs.Heading>
        <FindUs.Text>Granary Square, five minutes’ walk from King’s Cross St Pancras.</FindUs.Text>
        <FindUs.Link href="/visit/">Directions &amp; hours</FindUs.Link>
      </FindUs>

      <Kitchens>
        <Kitchens.Heading>Eight regional kitchens</Kitchens.Heading>
        <Kitchens.Introduction>
          Each region keeps its own spice box, its own oil and its own way with the pot. Pick a stamp to
          see what that kitchen is cooking.
        </Kitchens.Introduction>
        <Kitchens.Link href="/menu/">See every curry</Kitchens.Link>
      </Kitchens>

      <FeaturedThali>
        <FeaturedThali.Eyebrow>The thali</FeaturedThali.Eyebrow>
        <FeaturedThali.Heading>A whole meal on <em>one brass plate</em></FeaturedThali.Heading>
        <FeaturedThali.Introduction>
          Our Garden Thali brings four vegetarian curries to the table at once, each in its own katori,
          around a mound of basmati with roti, papad and a gulab jamun to finish.
        </FeaturedThali.Introduction>
        <FeaturedThali.Link href="/thali/">See all four thalis</FeaturedThali.Link>
      </FeaturedThali>

      <HeatGuide>
        <HeatGuide.Heading>Know your heat</HeatGuide.Heading>
        <HeatGuide.Note>
          Every dish carries up to four chillies. Most dishes can be cooked a notch milder. Ask when you order.
        </HeatGuide.Note>
      </HeatGuide>

      <Gatherings>
        <Gatherings.Stamp>The Monsoon Room</Gatherings.Stamp>
        <Gatherings.Heading>Gatherings, birthdays and long tables</Gatherings.Heading>
        <Gatherings.Text>
          Our private room seats 24 under a block-printed canopy, and the main room can join tables for
          larger groups. Tell us the date, the numbers and the occasion.
        </Gatherings.Text>
        <Gatherings.Action href="/contact/">Send an enquiry</Gatherings.Action>
        <Gatherings.Note>
          Tables for up to eight walk in. Larger groups send an enquiry and we reply to confirm.
        </Gatherings.Note>
      </Gatherings>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    </>
  );
}
