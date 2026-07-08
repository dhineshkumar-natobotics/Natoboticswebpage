import { Hero } from '../widgets/home/Hero';
import { TrustBar } from '../widgets/home/TrustBar';
import { ServicesGrid } from '../widgets/home/ServicesGrid';
import { IndustriesStrip } from '../widgets/home/IndustriesStrip';
import { Statistics } from '../widgets/home/Statistics';
import { GlobalDeliveryTeaser } from '../widgets/home/GlobalDeliveryTeaser';
import { CaseStudyPreview } from '../widgets/home/CaseStudyPreview';
import { FinalCta } from '../widgets/home/FinalCta';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <IndustriesStrip />
      <Statistics />
      <GlobalDeliveryTeaser />
      <CaseStudyPreview />
      <FinalCta />
    </>
  );
}
