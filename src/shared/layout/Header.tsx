import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Layers, Cpu, Building2,
  AppWindow, BarChart3, Cloud, Server, Gamepad2, FileCheck, LayoutTemplate, Code2, Braces, Smartphone, Database, CloudCog,
  PiggyBank, ShieldCheck, Film, Wifi, Zap
} from 'lucide-react';
import { Container } from '../ui/Container/Container';
import { Button } from '../ui/Button/Button';
import { services } from '../../domains/services/data/services';
import { industries } from '../../domains/industries/data/industries';
import clsx from 'clsx';
import styles from './Header.module.css';

const SERVICE_ICONS: Record<string, any> = {
  'application-services': AppWindow,
  'analytics-insights': BarChart3,
  'cloud-mobility': Cloud,
  'infrastructure-management': Server,
  'gaming-design': Gamepad2,
  'kpo-bpo': FileCheck,
  'adobe-indesign': LayoutTemplate,
  'react-js': Code2,
  'dotnet': Braces,
  'react-native': Smartphone,
  'hadoop': Database,
  'aws-azure': CloudCog,
};

const INDUSTRY_ICONS: Record<string, any> = {
  'banking-finance': PiggyBank,
  'insurance': ShieldCheck,
  'media-entertainment': Film,
  'telecom': Wifi,
  'oil-energy': Zap,
};

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

  const homeTransparent = isHome && !scrolled && !megaOpen && !menuOpen;

  type NavItem = { key: MenuPanel | string; label: string; hasDropdown?: boolean; path?: string };
  const NAV_ITEMS: NavItem[] = [
    { key: 'services', label: 'Services', hasDropdown: true, path: '/services' },
    { key: 'industries', label: 'Industries', hasDropdown: true, path: '/industries' },
    { key: 'company', label: 'Company', path: '/company' },
    { key: 'careers', label: 'Careers', path: '/careers' },
    { key: 'case-studies', label: 'Case Studies', path: '/case-studies' },
    { key: 'global-delivery', label: 'Global Delivery', path: '/global-delivery' },
  ];

  return (
    <>
      {/* ───── Independent Floating Logo ───── */}
      <a
        href="/"
        className={clsx(
          "fixed top-5 left-6 z-[60] group flex items-center gap-[10px] font-bold text-[1.35rem] tracking-tight transition-colors duration-fast ease-out-expo hover:opacity-90",
          homeTransparent ? styles.wordmarkTextTransparent : styles.wordmarkText
        )}
        onMouseEnter={handleNavLeave}
      >
        <img
          src="/natobotics-logo.png"
          alt="Natobotics"
          className={clsx(
            "w-[44px] h-[44px] rounded object-contain transition-all duration-fast",
            homeTransparent ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]" : "drop-shadow-[0_0_8px_rgba(255,111,60,0.3)]"
          )}
        />
        <span className={clsx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          homeTransparent 
            ? "max-w-[200px] opacity-100 text-white" 
            : `max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 ${styles.wordmarkTextColor}`
        )}>Natobotics</span>
      </a>

      {/* ───── Floating Mega Header ───── */}
      <header
        className={clsx(
          "fixed top-4 left-1/2 -translate-x-1/2 z-sticky-nav transition-[background-color,border-color,top,border-radius,left,right,width] duration-base ease-out-expo",
          styles.floatingHeader,
          homeTransparent && "!bg-transparent !backdrop-blur-none !border-transparent !shadow-none"
        )}
      >
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-[52px] px-4 lg:px-6">

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
              item.hasDropdown ? (
                <button
                  key={item.key}
                  onMouseEnter={() => setActivePanel(item.key as MenuPanel)}
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
                    <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <NavLink
                  key={item.key}
                  to={item.path || '#'}
                  onMouseEnter={() => {
                    setMegaOpen(false);
                  }}
                  className={({ isActive }) => clsx(
                    styles.navItem,
                    homeTransparent && styles.navItemTransparent,
                    isActive && (homeTransparent ? styles.navItemActiveTransparent : styles.navItemActive)
                  )}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2" onMouseEnter={handleNavLeave}>
            <span className="hidden lg:inline-flex">
              <Button
                to="/contact"
                variant="header"
                className={
                  homeTransparent
                    ? "text-white/80! hover:bg-white/10! hover:text-white!"
                    : ""
                }
              >
                Contact
              </Button>
            </span>
            <span className="hidden lg:inline-flex">
              <Button to="/contact" variant="header-orange">
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
        </div>

        {/* ───── Full-Width Mega Menu ───── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              className={styles.megaDropdown}
              initial={{ opacity: 0, y: 12, x: '-50%', scale: 0.96 }}
              animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
              exit={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={handleNavLeave}
            >
              <Container className={styles.megaInner}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.megaContent}
                  >
                    {activePanel === 'services' && (
                      <div className={styles.megaGridColumns}>
                        <div>
                          <span className={styles.megaPanelLabel}>Digital Transformation</span>
                          <div className={styles.megaPanelGrid}>
                            {services.slice(0, 4).map((s) => {
                              const Icon = SERVICE_ICONS[s.slug] || Layers;
                              return (
                                <Link key={s.slug} to={`/services/${s.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconAccent)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{s.name}</div>
                                    <p className={styles.megaPanelDesc}>{s.content?.title || 'Core services'}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <span className={styles.megaPanelLabel}>Cloud & Operations</span>
                          <div className={styles.megaPanelGrid}>
                            {services.slice(4, 8).map((s) => {
                              const Icon = SERVICE_ICONS[s.slug] || Server;
                              return (
                                <Link key={s.slug} to={`/services/${s.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{s.name}</div>
                                    <p className={styles.megaPanelDesc}>{s.content?.title || 'Digital ops'}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <span className={styles.megaPanelLabel}>Technologies</span>
                          <div className={styles.megaPanelGrid}>
                            {[
                              { slug: 'adobe-indesign', name: 'Adobe Indesign', desc: 'Design & Publishing' },
                              { slug: 'react-js', name: 'React.JS', desc: 'Web Interfaces' },
                              { slug: 'dotnet', name: '.Net', desc: 'Enterprise Apps' },
                              { slug: 'react-native', name: 'React Native', desc: 'Mobile Apps' },
                              { slug: 'hadoop', name: 'Hadoop', desc: 'Big Data' },
                              { slug: 'aws-azure', name: 'AWS & Azure', desc: 'Cloud Platforms' },
                            ].map((s) => {
                              const Icon = SERVICE_ICONS[s.slug] || Cpu;
                              return (
                                <Link key={s.slug} to={`/services/${s.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{s.name}</div>
                                    <p className={styles.megaPanelDesc}>{s.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between h-full bg-slate-50 p-6 rounded-xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">Modernize your core</h4>
                            <p className="text-slate-600 text-sm mb-4">Partner with Natobotics to accelerate your digital journey and reimagine your business architecture.</p>
                          </div>
                          <Button to="/services" variant="orange" size="sm" style={{ fontSize: 'var(--fs-caption)', padding: '6px 12px', whiteSpace: 'normal', textAlign: 'center' }}>Explore all services</Button>
                        </div>
                      </div>
                    )}

                    {activePanel === 'industries' && (
                      <div className={styles.megaGridColumns}>
                        <div>
                          <span className={styles.megaPanelLabel}>Financial & Insurance</span>
                          <div className={styles.megaPanelGrid}>
                            {industries.slice(0, 2).map((ind) => {
                              const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
                              return (
                                <Link key={ind.slug} to={`/industries/${ind.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconAi)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{ind.name}</div>
                                    <p className={styles.megaPanelDesc}>{ind.content?.title || 'Domain solutions'}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <span className={styles.megaPanelLabel}>Communications</span>
                          <div className={styles.megaPanelGrid}>
                            {industries.slice(2, 4).map((ind) => {
                              const Icon = INDUSTRY_ICONS[ind.slug] || Wifi;
                              return (
                                <Link key={ind.slug} to={`/industries/${ind.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconAccent)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{ind.name}</div>
                                    <p className={styles.megaPanelDesc}>{ind.content?.title || 'Telecom & Media'}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <span className={styles.megaPanelLabel}>Energy & Resources</span>
                          <div className={styles.megaPanelGrid}>
                            {industries.slice(4, 5).map((ind) => {
                              const Icon = INDUSTRY_ICONS[ind.slug] || Zap;
                              return (
                                <Link key={ind.slug} to={`/industries/${ind.slug}`} className={styles.megaPanelLink} onClick={() => setMegaOpen(false)}>
                                  <div className={clsx(styles.megaPanelIcon, styles.iconOrange)}><Icon size={14} /></div>
                                  <div>
                                    <div className={styles.megaPanelTitle}>{ind.name}</div>
                                    <p className={styles.megaPanelDesc}>{ind.content?.title || 'Energy sector'}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between h-full bg-slate-50 p-6 rounded-xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">Deep Domain Expertise</h4>
                            <p className="text-slate-600 text-sm mb-4">We engineer solutions specifically tailored to navigate the stringent regulatory constraints of your industry.</p>
                          </div>
                          <Button to="/contact" variant="orange" size="sm" style={{ fontSize: 'var(--fs-caption)', padding: '6px 12px', whiteSpace: 'normal', textAlign: 'center' }}>Talk to an expert</Button>
                        </div>
                      </div>
                    )}

                    {/* Company, Careers, Case Studies, Global Delivery panels removed as they are now direct links */}
                  </motion.div>
                </AnimatePresence>
              </Container>

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
              {[
                { slug: 'adobe-indesign', name: 'Adobe Indesign' },
                { slug: 'react-js', name: 'React.JS' },
                { slug: 'dotnet', name: '.Net' },
                { slug: 'react-native', name: 'React Native' },
                { slug: 'hadoop', name: 'Hadoop' },
                { slug: 'aws-azure', name: 'AWS & Azure' },
              ].map((link) => (
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
    </>
  );
}
