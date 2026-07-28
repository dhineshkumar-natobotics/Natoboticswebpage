import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { ScrollToTop } from './ScrollToTop';
import { HomePage } from '../pages/HomePage/HomePage';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { ServicesPage, ServiceDetailPage } from '../pages/ServicesPage/ServicesPage';
import { IndustriesPage, IndustryDetailPage } from '../pages/IndustriesPage/IndustriesPage';
import { CaseStudiesPage, CaseStudyDetailPage } from '../pages/CaseStudiesPage/CaseStudiesPage';
import { GlobalDeliveryPage } from '../pages/GlobalDeliveryPage/GlobalDeliveryPage';
import { CareersPage } from '../pages/CareersPage/CareersPage';
import { JobDetailPage } from '../pages/JobDetailPage/JobDetailPage';
import { ContactPage } from '../pages/ContactPage/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { TeamPage } from '../pages/TeamPage/TeamPage';
import { BlogPage } from '../pages/BlogPage/BlogPage';
import { WhitepapersPage } from '../pages/WhitepapersPage/WhitepapersPage';
import { FaqPage } from '../pages/FaqPage/FaqPage';
import { PortfolioPage } from '../pages/PortfolioPage/PortfolioPage';
import { ClientsPage } from '../pages/ClientsPage/ClientsPage';
import { PressPage } from '../pages/PressPage/PressPage';
import { PartnersPage } from '../pages/PartnersPage/PartnersPage';
import { PrivacyPage } from '../pages/PrivacyPage/PrivacyPage';
import { TermsPage } from '../pages/TermsPage/TermsPage';

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
