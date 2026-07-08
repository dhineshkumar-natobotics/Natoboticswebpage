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
import { StubPage } from '../pages/StubPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { TeamPage } from '../pages/TeamPage';
import { BlogPage } from '../pages/BlogPage';
import { WhitepapersPage } from '../pages/WhitepapersPage';
import { FaqPage } from '../pages/FaqPage';

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

          <Route
            path="/company/leadership"
            element={<TeamPage />}
          />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/company/careers/:slug" element={<JobDetailPage />} />
          <Route
            path="/company/press"
            element={
              <StubPage eyebrow="Company" title="Press" description="Newsroom content is scoped for Phase 4 (CMS)." />
            }
          />
          <Route
            path="/company/partners"
            element={
              <StubPage
                eyebrow="Company"
                title="Partners"
                description="Technology and delivery partner profiles are scoped for Phase 4 (CMS)."
              />
            }
          />

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

          <Route
            path="/legal/privacy"
            element={<StubPage eyebrow="Legal" title="Privacy Policy" description="Final legal copy pending review." />}
          />
          <Route
            path="/legal/terms"
            element={<StubPage eyebrow="Legal" title="Terms of Service" description="Final legal copy pending review." />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </>
  );
}
