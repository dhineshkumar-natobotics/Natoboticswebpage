import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { ScrollToTop } from './ScrollToTop';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage, ServiceDetailPage } from '../pages/ServicesPage';
import { IndustriesPage, IndustryDetailPage } from '../pages/IndustriesPage';
import { CaseStudiesPage, CaseStudyDetailPage } from '../pages/CaseStudiesPage';
import { GlobalDeliveryPage } from '../pages/GlobalDeliveryPage';
import { CareersPage } from '../pages/CareersPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { TeamPage } from '../pages/TeamPage';
import { BlogPage } from '../pages/BlogPage';
import { WhitepapersPage } from '../pages/WhitepapersPage';
import { FaqPage } from '../pages/FaqPage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { ClientsPage } from '../pages/ClientsPage';
import { PressPage } from '../pages/PressPage';
import { PartnersPage } from '../pages/PartnersPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-natobotics.html" element={<AboutPage />} />

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

          <Route
            path="/company/leadership"
            element={<TeamPage />}
          />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/company/careers/:slug" element={<JobDetailPage />} />
          <Route path="/company/press" element={<PressPage />} />
          <Route path="/company/partners" element={<PartnersPage />} />

          <Route
            path="/resources/blog"
            element={<BlogPage />}
          />
          <Route
            path="/resources/whitepapers"
            element={<WhitepapersPage />}
          />
          <Route
            path="/resources/faqs"
            element={<FaqPage />}
          />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </>
  );
}
