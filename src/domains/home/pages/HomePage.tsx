import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { ServicesGrid } from '../../services/components/ServicesGrid';
import { IndustriesStrip } from '../../industries/components/IndustriesStrip';
import { CaseStudyPreview } from '../../case-studies/components/CaseStudyPreview';
import { Statistics } from '../components/Statistics';
import { GlobalDeliveryTeaser } from '../components/GlobalDeliveryTeaser';
import { FinalCta } from '../components/FinalCta';
import { useHeader } from '../../../shared/layout/HeaderContext';

export function HomePage() {
  const { setHeaderVisible } = useHeader();

  useEffect(() => {

    const SHOW_HEADER = true; 
    
    setHeaderVisible(SHOW_HEADER);

    return () => setHeaderVisible(true);
  }, [setHeaderVisible]);

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
