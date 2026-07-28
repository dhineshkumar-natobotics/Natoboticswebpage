import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Cpu, Building2, Info, Briefcase, Globe, Mail, BriefcaseBusiness, FileText, MapPin } from 'lucide-react';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { services } from '../../data/services';
import { industries } from '../../data/industries';
import { caseStudies } from '../../data/caseStudies';
import { jobs } from '../../data/jobs';
import clsx from 'clsx';
import styles from './Header.module.css';

type MenuPanel = 'services' | 'industries' | 'company' | 'careers' | 'case-studies' | 'global-delivery';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<MenuPanel>('services');
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setActivePanel('services');
    setMenuOpen(false);
  }, [location]);

  const handleNavEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setMegaOpen(true);
  };

  const handleNavLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  };

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const showSolidBg = !isHome || scrolled || megaOpen || menuOpen;
  const homeTransparent = isHome && !scrolled && !megaOpen && !menuOpen;

  const NAV_ITEMS: { key: MenuPanel; label: string }[] = [
    { key: 'services', label: 'Services' },
    { key: 'industries', label: 'Industries' },
    { key: 'company', label: 'Company' },
    { key: 'careers', label: 'Careers' },
    { key: 'case-studies', label: 'Case Studies' },
    { key: 'global-delivery', label: 'Global Delivery' },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-sticky-nav border-b transition-[background-color,border-color] duration-base ease-out-expo",
        homeTransparent
          ? "bg-transparent backdrop-blur-none border-transparent"
          : "bg-transparent border-transparent",
        showSolidBg && clsx("border-b", styles.headerSolid)
      )}
    >
      <Container className="flex items-center justify-between h-[76px]">
        <Link
          to="/"
          className={clsx("flex items-center gap-[10px] font-bold text-[1.15rem] tracking-tight transition-colors duration-fast ease-out-expo hover:opacity-90", homeTransparent ? styles.wordmarkTextTransparent : styles.wordmarkText)}
          onMouseEnter={handleNavLeave}
        >
          <img
            src="/natobotics-logo.png"
            alt="Natobotics"
            className={clsx(
              "w-[32px] h-[32px] rounded object-contain transition-all duration-fast",
              homeTransparent ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]" : "drop-shadow-[0_0_8px_rgba(255,111,60,0.3)]"
            )}
          />
          <span className={clsx(
            "transition-colors duration-fast",
            homeTransparent ? "text-white" : styles.wordmarkTextColor
          )}>Natobotics</span>
        </Link>

        <nav
          className={clsx(
            styles.navCapsule,
            homeTransparent && styles.navCapsuleTransparent,
            styles.navCapsuleResponsive
          )}
          aria-label="Primary"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onMouseEnter={() => setActivePanel(item.key)}
              onClick={() => setMegaOpen(megaOpen && activePanel === item.key ? false : true)}
              className={clsx(
                styles.navItem,
                homeTransparent && styles.navItemTransparent,
                megaOpen && activePanel === item.key && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
              )}
            >
              {item.label}
              <svg
                className={clsx(
                  "w-2.5 h-2.5 opacity-60 transition-transform duration-fast ease-out-expo",
                  megaOpen && activePanel === item.key && "rotate-180",
                  homeTransparent ? "text-white" : styles.chevronSecondary
                )}
                viewBox="0 0 8 8"
                fill="none"
              >
                <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2" onMouseEnter={handleNavLeave}>
          <span className="hidden lg:inline-flex">
            <Button
              to="/contact"
              size="sm"
              variant="secondary"
              className={
                homeTransparent
                  ? "bg-transparent! border-white/40! text-white! hover:bg-white/8! hover:border-white! hover:shadow-[4px_4px_0_0_#ffffff]!"
                  : ""
              }
            >
              Contact
            </Button>
          </span>
          <span className="hidden lg:inline-flex">
            <Button to="/contact" size="sm" variant="orange">
              Start a project
            </Button>
          </span>
          <button
            className="hidden max-lg:flex flex-col gap-[6px] bg-none border-none p-2 cursor-pointer"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={clsx(
                "w-[22px] h-[2px] transition-all duration-fast ease-out-expo",
                homeTransparent ? "bg-white" : styles.hamburgerBarSolid,
                menuOpen && "translate-y-[4px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "w-[22px] h-[2px] transition-all duration-fast ease-out-expo",
                homeTransparent ? "bg-white" : styles.hamburgerBarSolid,
                menuOpen && "-translate-y-[4px] -rotate-45"
              )}
            />
          </button>
        </div>
      </Container>

      {/* ───── Split-Pane Mega Menu ───── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className={styles.megaDropdown}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={handleNavLeave}
          >
            <Container className={styles.megaInner}>
              {/* Left: Master List */}
              <div className={styles.megaLeft}>
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    className={clsx(
                      styles.megaLeftItem,
                      activePanel === item.key && styles.megaLeftItemActive
                    )}
                    onMouseEnter={() => setActivePanel(item.key)}
                    onClick={() => {
                      if (item.key === 'case-studies' || item.key === 'global-delivery') {
                        setMegaOpen(false);
                      }
                    }}
                  >
                    <span className={styles.megaLeftLabel}>{item.label}</span>
                    <svg className={clsx(styles.megaLeftArrow, activePanel === item.key && styles.megaLeftArrowVisible)} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Right: Detail Preview */}
              <div className={styles.megaRight}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.megaRightContent}
                  >
                    {activePanel === 'services' && (
                      <>
                        <span className={styles.megaPanelLabel}>Core Services & Technologies</span>
                        <div className={styles.megaPanelGrid}>
                          {services.slice(0, 4).map((s) => (
                            <Link key={s.slug} to={`/services/${s.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                              <div className={clsx(styles.megaPanelIcon, styles.iconAccent)}><Layers size={13} /></div>
                              <div>
                                <div className={styles.megaPanelTitle}>{s.name}</div>
                                <p className={styles.megaPanelDesc}>{s.summary}</p>
                              </div>
                            </Link>
                          ))}
                          {services.slice(4, 8).map((t) => (
                            <Link key={t.slug} to={`/services/${t.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                              <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Cpu size={13} /></div>
                              <div>
                                <div className={styles.megaPanelTitle}>{t.name}</div>
                                <p className={styles.megaPanelDesc}>{t.summary}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link to="/services" className={styles.megaPanelCta} onClick={() => setMegaOpen(false)}>
                          View all services →
                        </Link>
                      </>
                    )}

                    {activePanel === 'industries' && (
                      <>
                        <span className={styles.megaPanelLabel}>Industries We Serve</span>
                        <div className={styles.megaPanelGrid}>
                          {industries.map((ind) => (
                            <Link key={ind.slug} to={`/industries/${ind.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                              <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><Building2 size={13} /></div>
                              <div>
                                <div className={styles.megaPanelTitle}>{ind.name}</div>
                                <p className={styles.megaPanelDesc}>{ind.summary}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {activePanel === 'company' && (
                      <>
                        <span className={styles.megaPanelLabel}>Our Company</span>
                        <div className={styles.megaPanelGrid}>
                          <Link to="/about-natobotics.html" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><Info size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>About Natobotics</div>
                              <p className={styles.megaPanelDesc}>Global leader in digital services and transformation.</p>
                            </div>
                          </Link>
                          <Link to="/company/careers" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Briefcase size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>Careers</div>
                              <p className={styles.megaPanelDesc}>Join our engineering community.</p>
                            </div>
                          </Link>
                          <Link to="/portfolio" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Layers size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>Project Portfolio</div>
                              <p className={styles.megaPanelDesc}>Projects delivered across cloud, analytics, and automation.</p>
                            </div>
                          </Link>
                          <Link to="/clients" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><Building2 size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>Client Portfolio</div>
                              <p className={styles.megaPanelDesc}>Enterprise clients we partner with.</p>
                            </div>
                          </Link>
                          <Link to="/contact" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, "bg-[#a855f7]/10 text-[#a855f7]")}><Mail size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>Contact Support</div>
                              <p className={styles.megaPanelDesc}>Speak with our technology consultants.</p>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}

                    {activePanel === 'careers' && (
                      <>
                        <span className={styles.megaPanelLabel}>Join Our Team</span>
                        <div className={styles.megaPanelGrid}>
                          {jobs.slice(0, 4).map((job) => (
                            <Link key={job.slug} to={`/company/careers/${job.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                              <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Briefcase size={13} /></div>
                              <div>
                                <div className={styles.megaPanelTitle}>{job.title}</div>
                                <p className={styles.megaPanelDesc}>{job.department} · {job.location}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link to="/company/careers" className={styles.megaPanelCta} onClick={() => setMegaOpen(false)}>
                          View all open roles →
                        </Link>
                      </>
                    )}

                    {activePanel === 'case-studies' && (
                      <>
                        <span className={styles.megaPanelLabel}>Featured Case Studies</span>
                        <div className={styles.megaPanelGrid}>
                          {caseStudies.slice(0, 4).map((cs) => (
                            <Link key={cs.slug} to={`/case-studies`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                              <div className={clsx(styles.megaPanelIcon, styles.iconAccent)}><FileText size={13} /></div>
                              <div>
                                <div className={styles.megaPanelTitle}>{cs.title}</div>
                                <p className={styles.megaPanelDesc}>{cs.client} — {cs.summary}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link to="/case-studies" className={styles.megaPanelCta} onClick={() => setMegaOpen(false)}>
                          View all case studies →
                        </Link>
                      </>
                    )}

                    {activePanel === 'global-delivery' && (
                      <>
                        <span className={styles.megaPanelLabel}>Global Delivery</span>
                        <div className={styles.megaPanelGrid}>
                          <Link to="/global-delivery" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconAccent)}><Globe size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>8 Global Offices</div>
                              <p className={styles.megaPanelDesc}>Hybrid delivery centers across UK, USA, UAE, and APAC.</p>
                            </div>
                          </Link>
                          <Link to="/global-delivery" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><MapPin size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>Nearshore & Offshore</div>
                              <p className={styles.megaPanelDesc}>Flexible engagement models to match your timezone.</p>
                            </div>
                          </Link>
                          <Link to="/global-delivery" className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                            <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><BriefcaseBusiness size={13} /></div>
                            <div>
                              <div className={styles.megaPanelTitle}>KPO / BPO Operations</div>
                              <p className={styles.megaPanelDesc}>Process outsourcing at scale across all regions.</p>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Container>

            {/* Bottom CTA Banner */}
            <div className={styles.megaBottomBanner}>
              {activePanel === 'services' && (
                <>
                  <span className={styles.megaBannerText}>Need a custom solution? <strong>Talk to our technology consultants</strong>.</span>
                  <Button to="/contact" size="sm" variant="orange">Book a call</Button>
                </>
              )}
              {activePanel === 'industries' && (
                <>
                  <span className={styles.megaBannerText}>Looking to transform your operations? <strong>Speak with our domain experts</strong>.</span>
                  <Button to="/contact" size="sm" variant="orange">Get in touch</Button>
                </>
              )}
              {activePanel === 'company' && (
                <>
                  <span className={styles.megaBannerText}>Join our engineering community. <strong>We are actively hiring</strong>!</span>
                  <Button to="/company/careers" size="sm" variant="orange">See open roles</Button>
                </>
              )}
              {activePanel === 'careers' && (
                <>
                  <span className={styles.megaBannerText}>We are growing across <strong>all offices and departments</strong>.</span>
                  <Button to="/company/careers" size="sm" variant="orange">Apply now</Button>
                </>
              )}
              {activePanel === 'case-studies' && (
                <>
                  <span className={styles.megaBannerText}>Want to see how we solve <strong>complex engineering challenges</strong>?</span>
                  <Button to="/case-studies" size="sm" variant="orange">View all studies</Button>
                </>
              )}
              {activePanel === 'global-delivery' && (
                <>
                  <span className={styles.megaBannerText}>Explore our <strong>8 global offices</strong> and delivery model.</span>
                  <Button to="/global-delivery" size="sm" variant="orange">View locations</Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className={styles.mobileDrawer}>
          <div className="w-full overflow-y-auto px-gutter py-5 flex flex-col">
            <span className={styles.drawerSectionLabel}>Services</span>
            {services.slice(0, 6).map((link) => (
              <NavLink key={link.slug} to={`/services/${link.slug}`} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}

            <span className={styles.drawerSectionLabel}>Technologies</span>
            {services.slice(6).map((link) => (
              <NavLink key={link.slug} to={`/services/${link.slug}`} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}

            <span className={styles.drawerSectionLabel}>Industries</span>
            {industries.map((link) => (
              <NavLink key={link.slug} to={`/industries/${link.slug}`} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}

            <span className={styles.drawerSectionLabel}>Company</span>
            <Link to="/about-natobotics.html" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>About Natobotics</Link>
            <NavLink to="/global-delivery" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Global Delivery</NavLink>
            <NavLink to="/company/careers" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Careers</NavLink>
            <NavLink to="/case-studies" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Case Studies</NavLink>
            <NavLink to="/portfolio" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Project Portfolio</NavLink>
            <NavLink to="/clients" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Client Portfolio</NavLink>
            <NavLink to="/contact" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
