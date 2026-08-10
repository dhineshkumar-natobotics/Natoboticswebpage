import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layout';
import { HeaderProvider } from '../layout/HeaderContext';
import { ScrollToTop } from './index';
import { HomePage } from '../../domains/home';
import { AboutPage, TeamPage, CareersPage, JobDetailPage, PressPage, PartnersPage } from '../../domains/company';
import { ServicesPage, ServiceDetailPage } from '../../domains/services';
import { IndustriesPage, IndustryDetailPage } from '../../domains/industries';
import { CaseStudiesPage, CaseStudyDetailPage } from '../../domains/case-studies';
import { GlobalDeliveryPage } from '../../domains/global-delivery';
import { ContactPage } from '../../domains/contact';
import { NotFoundPage } from '../../domains/not-found';
import { BlogPage, WhitepapersPage, FaqPage } from '../../domains/resources';
import { PortfolioPage } from '../../domains/portfolio';
import { ClientsPage } from '../../domains/clients';
import { PrivacyPage, TermsPage } from '../../domains/legal';

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <HeaderProvider>
        <RootLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-natobotics.html" element={<AboutPage />} />

            {/* Fallbacks for direct links to avoid 404s */}
            <Route path="/company" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:slug" element={<JobDetailPage />} />

            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailPage />} />

            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />

            <Route path="/global-delivery" element={<GlobalDeliveryPage />} />

            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/clients" element={<ClientsPage />} />

            <Route path="/company/leadership" element={<TeamPage />} />
            <Route path="/company/careers" element={<CareersPage />} />
            <Route path="/company/careers/:slug" element={<JobDetailPage />} />
            <Route path="/company/press" element={<PressPage />} />
            <Route path="/company/partners" element={<PartnersPage />} />

            <Route path="/resources/blog" element={<BlogPage />} />
            <Route path="/resources/whitepapers" element={<WhitepapersPage />} />
            <Route path="/resources/faqs" element={<FaqPage />} />

            <Route path="/contact" element={<ContactPage />} />

            <Route path="/legal/privacy" element={<PrivacyPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </RootLayout>
      </HeaderProvider>
    </>
  );
}
