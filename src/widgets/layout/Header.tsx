import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Cpu, Building2, Info, Briefcase, Globe, Mail } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { services } from '../../data/services';
import { industries } from '../../data/industries';
import { caseStudies } from '../../data/caseStudies';
import clsx from 'clsx';
import styles from './Header.module.css';

const LogoMarkSVG = ({ className, homeTransparent }: { className?: string; homeTransparent?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} style={{ width: '24px', height: '24px' }}>
    {/* Geometric digital transformation horse icon */}
    <rect x="10" y="50" width="10" height="8" rx="2" fill="var(--color-orange-500)" />
    <rect x="20" y="42" width="12" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="20" y="50" width="15" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="32" y="34" width="18" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="35" y="42" width="20" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="35" y="50" width="15" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="47" y="26" width="15" height="8" rx="2" fill="var(--color-orange-500)" />
    <rect x="50" y="34" width="25" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="55" y="42" width="10" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="68" y="18" width="8" height="8" rx="2" fill="var(--color-accent-500)" />
    <rect x="75" y="26" width="15" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="62" y="34" width="10" height="8" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="15" y="58" width="8" height="12" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="30" y="58" width="8" height="12" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="50" y="58" width="8" height="12" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
    <rect x="80" y="34" width="8" height="12" rx="2" fill={homeTransparent ? "#ffffff" : "var(--color-text-primary)"} />
  </svg>
);
 
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'industries' | 'company' | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveTab(null);
    setMenuOpen(false);
  }, [location]);
 
  const handleMouseEnter = (tab: 'services' | 'industries' | 'company') => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveTab(tab);
  };
 
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveTab(null);
    }, 350);
  };
 
  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };
 
  const showSolidBg = !isHome || scrolled || activeTab || menuOpen;
  const homeTransparent = isHome && !scrolled && !activeTab && !menuOpen;

  const renderFeaturedCaseStudies = (casesList: typeof caseStudies) => {
    return (
      <div className={styles.featuredCaseList}>
        {casesList.map((cs) => (
          <Link
            key={cs.slug}
            to="/case-studies"
            className={styles.featuredCaseItem}
            onClick={() => setActiveTab(null)}
          >
            <img src={cs.image} alt={cs.title} className={styles.caseThumb} />
            <div className={styles.caseMeta}>
              <span className={styles.caseClient}>{cs.client}</span>
              <span className={styles.caseTitle}>{cs.title}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  };
 
  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-sticky-nav border-b border-transparent bg-transparent transition-[background-color,border-color] duration-base ease-out-expo",
        showSolidBg && "bg-bg-base border-b border-border-default shadow-sm"
      )}
    >
      <Container className="flex items-center justify-between h-[76px]">
        <Link
          to="/"
          className="flex items-center gap-[10px] font-bold text-[1.15rem] tracking-tight text-text-primary transition-opacity duration-fast ease-out-expo hover:opacity-90"
          onMouseEnter={handleMouseLeave}
        >
          <LogoMarkSVG
            className={clsx(
              "transition-all duration-fast",
              homeTransparent ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]" : "drop-shadow-[0_0_8px_rgba(255,111,60,0.3)]"
            )}
            homeTransparent={homeTransparent}
          />
          <span
            className={clsx(
              "bg-gradient-to-r bg-clip-text text-transparent font-sans",
              homeTransparent ? "from-white to-[#dcdcdc]" : "from-black to-[#4b4f54]"
            )}
          >
            Natobotics
          </span>
        </Link>
 
        <nav 
          className={clsx(
            styles.navCapsule,
            homeTransparent && styles.navCapsuleTransparent,
            "max-lg:hidden"
          )} 
          aria-label="Primary" 
          onMouseLeave={handleMouseLeave}
        >
          {/* Services Link & Menu */}
          <div
            className="group relative flex items-center h-[40px]"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveTab(activeTab === 'services' ? null : 'services')}
              className={clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                activeTab === 'services' && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )}
            >
              Services{" "}
              <svg
                className={clsx(
                  "w-2.5 h-2.5 opacity-60 transition-transform duration-fast ease-out-expo",
                  activeTab === 'services' && "rotate-180",
                  homeTransparent ? "text-white" : "text-text-secondary"
                )}
                viewBox="0 0 8 8"
                fill="none"
              >
                <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
 
          {/* Industries Link & Menu */}
          <div
            className="group relative flex items-center h-[40px]"
            onMouseEnter={() => handleMouseEnter('industries')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveTab(activeTab === 'industries' ? null : 'industries')}
              className={clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                activeTab === 'industries' && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )}
            >
              Industries{" "}
              <svg
                className={clsx(
                  "w-2.5 h-2.5 opacity-60 transition-transform duration-fast ease-out-expo",
                  activeTab === 'industries' && "rotate-180",
                  homeTransparent ? "text-white" : "text-text-secondary"
                )}
                viewBox="0 0 8 8"
                fill="none"
              >
                <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
 
          {/* Company Link & Menu */}
          <div
            className="group relative flex items-center h-[40px]"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveTab(activeTab === 'company' ? null : 'company')}
              className={clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                activeTab === 'company' && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )}
            >
              Company{" "}
              <svg
                className={clsx(
                  "w-2.5 h-2.5 opacity-60 transition-transform duration-fast ease-out-expo",
                  activeTab === 'company' && "rotate-180",
                  homeTransparent ? "text-white" : "text-text-secondary"
                )}
                viewBox="0 0 8 8"
                fill="none"
              >
                <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
 
          <NavLink
            to="/case-studies"
            className={({ isActive }) =>
              clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                isActive && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )
            }
            onMouseEnter={handleMouseLeave}
          >
            Case Studies
          </NavLink>
 
          <NavLink
            to="/global-delivery"
            className={({ isActive }) =>
              clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                isActive && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )
            }
            onMouseEnter={handleMouseLeave}
          >
            Global Delivery
          </NavLink>
        </nav>
 
        <div className="flex items-center gap-3" onMouseEnter={handleMouseLeave}>
          <Button
            to="/contact"
            size="md"
            variant="secondary"
            className={clsx(
              "hidden lg:inline-flex",
              homeTransparent
                ? "bg-transparent! border-white/40! text-white! hover:bg-white/8! hover:border-white! hover:shadow-[4px_4px_0_0_#ffffff]!"
                : ""
            )}
          >
            Contact
          </Button>
          <Button to="/contact" size="md" variant="orange">
            Start a project
          </Button>
          <button
            className="hidden max-lg:flex flex-col gap-[6px] bg-none border-none p-2 cursor-pointer"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={clsx(
                "w-[22px] h-[2px] transition-all duration-fast ease-out-expo",
                homeTransparent ? "bg-white" : "bg-text-primary",
                menuOpen && "translate-y-[4px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "w-[22px] h-[2px] transition-all duration-fast ease-out-expo",
                homeTransparent ? "bg-white" : "bg-text-primary",
                menuOpen && "-translate-y-[4px] -rotate-45"
              )}
            />
          </button>
        </div>
      </Container>
 
      {/* Mega Dropdown Panel */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            className={styles.dropdownCard}
            initial={{ opacity: 0, y: 8, scale: 0.99, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 6, scale: 0.99, x: "-50%" }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.megamenuGrid}>
              <div className={styles.leftContent}>
                {activeTab === 'services' && (
                  <div>
                    <span className="block font-mono text-[0.725rem] text-text-tertiary uppercase tracking-[0.08em] mb-4 font-semibold">Core Services & Technologies</span>
                    <div className={styles.menuItemsGrid}>
                      <div className="flex flex-col gap-2">
                        <span className="block text-[0.675rem] font-bold text-text-tertiary uppercase tracking-wider mb-1">Services</span>
                        {services.slice(0, 6).map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className={styles.menuItemLink}
                            onClick={() => setActiveTab(null)}
                          >
                            <div className={clsx(styles.iconWrapper, "bg-accent-500/10 text-accent-500")}>
                              <Layers size={16} />
                            </div>
                            <div>
                              <div className={styles.menuItemTitle}>{service.name}</div>
                              <p className={styles.menuItemDesc}>{service.summary}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="block text-[0.675rem] font-bold text-text-tertiary uppercase tracking-wider mb-1">Technologies</span>
                        {services.slice(6).map((tech) => (
                          <Link
                            key={tech.slug}
                            to={`/services/${tech.slug}`}
                            className={styles.menuItemLink}
                            onClick={() => setActiveTab(null)}
                          >
                            <div className={clsx(styles.iconWrapper, "bg-orange-500/10 text-orange-500")}>
                              <Cpu size={16} />
                            </div>
                            <div>
                              <div className={styles.menuItemTitle}>{tech.name}</div>
                              <p className={styles.menuItemDesc}>{tech.summary}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {activeTab === 'industries' && (
                  <div>
                    <span className="block font-mono text-[0.725rem] text-text-tertiary uppercase tracking-[0.08em] mb-4 font-semibold">Industries We Serve</span>
                    <div className={styles.menuItemsGrid}>
                      {industries.map((ind) => (
                        <Link
                          key={ind.slug}
                          to={`/industries/${ind.slug}`}
                          className={styles.menuItemLink}
                          onClick={() => setActiveTab(null)}
                        >
                          <div className={clsx(styles.iconWrapper, "bg-ai-500/10 text-ai-500")}>
                            <Building2 size={16} />
                          </div>
                          <div>
                            <div className={styles.menuItemTitle}>{ind.name}</div>
                            <p className={styles.menuItemDesc}>{ind.summary}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
 
                {activeTab === 'company' && (
                  <div>
                    <span className="block font-mono text-[0.725rem] text-text-tertiary uppercase tracking-[0.08em] mb-4 font-semibold">Our Company</span>
                    <div className={styles.menuItemsGrid}>
                      <Link to="/about-natobotics.html" className={styles.menuItemLink} onClick={() => setActiveTab(null)}>
                        <div className={clsx(styles.iconWrapper, "bg-ai-500/10 text-ai-500")}>
                          <Info size={16} />
                        </div>
                        <div>
                          <div className={styles.menuItemTitle}>About Natobotics</div>
                          <p className={styles.menuItemDesc}>Global leader in digital services, transformation coaching, and process management.</p>
                        </div>
                      </Link>
 
                      <Link to="/company/careers" className={styles.menuItemLink} onClick={() => setActiveTab(null)}>
                        <div className={clsx(styles.iconWrapper, "bg-orange-500/10 text-orange-500")}>
                          <Briefcase size={16} />
                        </div>
                        <div>
                          <div className={styles.menuItemTitle}>Careers</div>
                          <p className={styles.menuItemDesc}>Join our engineering community. Shape digital-first solutions at scale.</p>
                        </div>
                      </Link>
 
                      <Link to="/global-delivery" className={styles.menuItemLink} onClick={() => setActiveTab(null)}>
                        <div className={clsx(styles.iconWrapper, "bg-accent-500/10 text-accent-500")}>
                          <Globe size={16} />
                        </div>
                        <div>
                          <div className={styles.menuItemTitle}>Global Delivery</div>
                          <p className={styles.menuItemDesc}>8 global offices and hybrid delivery centers spanning UK, USA, UAE, and APAC.</p>
                        </div>
                      </Link>
 
                      <Link to="/contact" className={styles.menuItemLink} onClick={() => setActiveTab(null)}>
                        <div className={clsx(styles.iconWrapper, "bg-[#a855f7]/10 text-[#a855f7]")}>
                          <Mail size={16} />
                        </div>
                        <div>
                          <div className={styles.menuItemTitle}>Contact Support</div>
                          <p className={styles.menuItemDesc}>Speak with technology consultants about custom project estimations.</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
 
              {/* Explore Panel (Right side) */}
              {activeTab === 'services' && (
                <div className={clsx(styles.explorePanel, styles.exploreServices)}>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold">Featured Work</span>
                    {renderFeaturedCaseStudies(caseStudies.slice(0, 2))}
                  </div>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-accent-600 hover:text-accent-700 mt-4 self-start"
                    onClick={() => setActiveTab(null)}
                  >
                    View all case studies{" "}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}
 
              {activeTab === 'industries' && (
                <div className={clsx(styles.explorePanel, styles.exploreIndustries)}>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold">Featured Success</span>
                    {renderFeaturedCaseStudies(caseStudies.slice(1, 3))}
                  </div>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-ai-600 hover:text-ai-700 mt-4 self-start"
                    onClick={() => setActiveTab(null)}
                  >
                    View all case studies{" "}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}
 
              {activeTab === 'company' && (
                <div className={clsx(styles.explorePanel, styles.exploreCompany)}>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold">Global Presence</span>
                    <p className="text-[0.825rem] text-text-secondary leading-[1.5] mt-3">
                      Natobotics operates hybrid delivery centers spanning the UK, Europe, USA, UAE, and APAC with 8 offices worldwide.
                    </p>
                    <div className="flex items-center justify-center p-5 bg-orange-500/5 border border-orange-500/10 rounded-xl my-4">
                      <Globe className="w-10 h-10 text-orange-500/70" />
                    </div>
                  </div>
                  <Link
                    to="/global-delivery"
                    className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-orange-500 hover:text-orange-600 mt-4 self-start"
                    onClick={() => setActiveTab(null)}
                  >
                    View locations{" "}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}
 
              {/* Bottom Banner */}
              <div className={styles.bottomBanner}>
                {activeTab === 'services' && (
                  <>
                    <span className={styles.bottomBannerText}>
                      Need a custom solution? <strong>Talk to our technology consultants</strong> about estimations.
                    </span>
                    <Button to="/contact" size="md" variant="orange">
                      Book a call
                    </Button>
                  </>
                )}
                {activeTab === 'industries' && (
                  <>
                    <span className={styles.bottomBannerText}>
                      Looking to transform your operations? <strong>Speak with our domain experts</strong> today.
                    </span>
                    <Button to="/contact" size="md" variant="orange">
                      Get in touch
                    </Button>
                  </>
                )}
                {activeTab === 'company' && (
                  <>
                    <span className={styles.bottomBannerText}>
                      Join our engineering community. <strong>We are actively hiring</strong> across all offices!
                    </span>
                    <Button to="/company/careers" size="md" variant="orange">
                      See open roles
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed top-[76px] left-0 right-0 bottom-0 bg-bg-base z-overlay border-t border-border-subtle flex">
          <div className="w-full overflow-y-auto px-gutter py-5 flex flex-col">
            <span className="font-mono text-caption text-text-tertiary uppercase tracking-[0.05em] mb-2">Services</span>
            {services.slice(0, 6).map((link) => (
              <NavLink key={link.slug} to={`/services/${link.slug}`} className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
 
            <span className="font-mono text-caption text-text-tertiary uppercase tracking-[0.05em] mb-2 mt-4">Technologies</span>
            {services.slice(6).map((link) => (
              <NavLink key={link.slug} to={`/services/${link.slug}`} className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
 
            <span className="font-mono text-caption text-text-tertiary uppercase tracking-[0.05em] mb-2 mt-4">Industries</span>
            {industries.map((link) => (
              <NavLink key={link.slug} to={`/industries/${link.slug}`} className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
 
            <span className="font-mono text-caption text-text-tertiary uppercase tracking-[0.05em] mb-2 mt-4">Company</span>
            <Link to="/about-natobotics.html" className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>About Natobotics</Link>
            <NavLink to="/global-delivery" className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>Global Delivery</NavLink>
            <NavLink to="/company/careers" className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>Careers</NavLink>
            <NavLink to="/case-studies" className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>Case Studies</NavLink>
            <NavLink to="/contact" className="py-3 text-text-secondary border-b border-border-subtle text-body-sm hover:text-text-primary" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
