import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import styles from './Footer.module.css';

// Custom inline SVG components for Square Social Icons to keep things lightweight & robust
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

// Custom Natobotics stylized geometric LogoMark SVG
const LogoMarkSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.logoSvg}>
    {/* Geometric digital transformation horse icon inspired by TwelveLabs logo style */}
    <rect x="10" y="50" width="10" height="8" rx="2" fill="var(--color-orange-500)" />
    <rect x="20" y="42" width="12" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="20" y="50" width="15" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="32" y="34" width="18" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="35" y="42" width="20" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="35" y="50" width="15" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="47" y="26" width="15" height="8" rx="2" fill="var(--color-orange-500)" />
    <rect x="50" y="34" width="25" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="55" y="42" width="10" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="68" y="18" width="8" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="75" y="26" width="15" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="62" y="34" width="10" height="8" rx="2" fill="var(--color-text-primary)" />
    <rect x="15" y="58" width="8" height="12" rx="2" fill="var(--color-text-primary)" />
    <rect x="30" y="58" width="8" height="12" rx="2" fill="var(--color-text-primary)" />
    <rect x="50" y="58" width="8" height="12" rx="2" fill="var(--color-text-primary)" />
    <rect x="80" y="34" width="8" height="12" rx="2" fill="var(--color-text-primary)" />
  </svg>
);

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.topGrid}>
          {/* Column 1: Product & Social */}
          <div className={styles.linkColumn}>
            <div className={styles.group}>
              <h4 className={styles.heading}>Product</h4>
              <ul className={styles.list}>
                <li><Link to="/services">Services Overview</Link></li>
                <li><Link to="/about">AI Capabilities</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/contact">Request Demo</Link></li>
                <li><Link to="/resources/whitepapers">Whitepapers</Link></li>
              </ul>
            </div>
            
            <div className={styles.group}>
              <h4 className={styles.heading}>Social</h4>
              <div className={styles.socialGrid}>
                <a 
                  href="https://linkedin.com/company/natobotics" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialSquare}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialSquare}
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a 
                  href="https://github.com/natobotics" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialSquare}
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialSquare}
                  aria-label="Twitter/X"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Developers & Research */}
          <div className={styles.linkColumn}>
            <div className={styles.group}>
              <h4 className={styles.heading}>For Developers</h4>
              <ul className={styles.list}>
                <li><Link to="/resources/faqs">Developer Hub</Link></li>
                <li><Link to="/services">API Documentation</Link></li>
                <li><a href="https://github.com/natobotics" target="_blank" rel="noopener noreferrer">Open Source</a></li>
                <li><Link to="/contact">System Status</Link></li>
                <li><Link to="/resources/faqs">FAQs</Link></li>
              </ul>
            </div>
            
            <div className={styles.group}>
              <h4 className={styles.heading}>Research</h4>
              <ul className={styles.list}>
                <li><Link to="/resources/whitepapers">AI & Big Data Reports</Link></li>
                <li><Link to="/about">Enterprise Security</Link></li>
                <li><Link to="/global-delivery">Infrastructure Standards</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Solutions & Company */}
          <div className={styles.linkColumn}>
            <div className={styles.group}>
              <h4 className={styles.heading}>Solutions</h4>
              <ul className={styles.list}>
                <li><Link to="/industries/aerospace-defense">Aerospace & Defense</Link></li>
                <li><Link to="/industries/automotive-transit">Automotive & Transit</Link></li>
                <li><Link to="/industries/healthcare-biotech">Healthcare & Biotech</Link></li>
                <li><Link to="/industries/financial-services">Financial Services</Link></li>
                <li><Link to="/industries">All Industries</Link></li>
              </ul>
            </div>
            
            <div className={styles.group}>
              <h4 className={styles.heading}>Company</h4>
              <ul className={styles.list}>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/company/careers">Careers</Link></li>
                <li><Link to="/resources/blog">Blog</Link></li>
                <li><Link to="/company/leadership">Our Team</Link></li>
                <li><Link to="/global-delivery">Global Delivery</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Legal & Badge */}
          <div className={styles.linkColumn}>
            <div className={styles.group}>
              <h4 className={styles.heading}>Legal</h4>
              <ul className={styles.list}>
                <li><Link to="/legal/terms">Terms of Use</Link></li>
                <li><Link to="/legal/privacy">Privacy Policy</Link></li>
                <li><Link to="/about">Trust Center</Link></li>
                <li><Link to="/legal/privacy">Cookie Policy</Link></li>
                <li><Link to="/legal/terms">Acceptable Use Policy</Link></li>
              </ul>
            </div>

            <div className={styles.badgeWrapper}>
              <div className={styles.trustBadge}>
                <span className={styles.badgeTextTop}>ISO 27001</span>
                <span className={styles.badgeTextBottom}>SECURED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Brand Logo Section inspired by mockup */}
        <div className={styles.logoBannerContainer}>
          <div className={styles.logoRow}>
            <LogoMarkSVG />
            <span className={styles.hugeBrandText}>Natobotics</span>
          </div>
        </div>

        {/* Bottom copyright alignment */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Natobotics Technologies Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
