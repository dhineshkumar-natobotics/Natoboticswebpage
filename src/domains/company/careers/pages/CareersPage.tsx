import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, DollarSign, ArrowUpRight, Search, Briefcase } from 'lucide-react';
import { PageHero } from '../../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../../shared/ui/Container/Container';
import { jobs } from '../../../../shared/data/jobs';
import styles from './CareersPage.module.css';

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'On-site'] as const;

// Custom logo vectors for "Trusted by" section to keep layout fully static and beautiful
const PartnerLogos = () => (
  <div className={styles.partnerLogosGrid}>
    <div className={styles.partnerLogo}>
      <span>▲</span> ACME CORP
    </div>
    <div className={styles.partnerLogo}>
      <span>◼</span> GLOBEX
    </div>
    <div className={styles.partnerLogo}>
      <span>◆</span> INITECH
    </div>
    <div className={styles.partnerLogo}>
      <span>❖</span> HOOLI
    </div>
    <div className={styles.partnerLogo}>
      <span>✚</span> UMBRELLA
    </div>
    <div className={styles.partnerLogo}>
      <span>▼</span> VEHEMENT
    </div>
  </div>
);

export function CareersPage() {
  const [filter, setFilter] = useState<(typeof WORK_MODES)[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // SEO page title update
  useEffect(() => {
    document.title = "Careers & Open Positions — Natobotics";
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const matchesFilter = filter === 'All' || job.workMode === filter;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className={styles.page}>
      {/* 1. HERO BANNER */}
      <PageHero eyebrow="Careers" title="Career" />

      {/* 2. CULTURE / TEAM INTRODUCTION */}
      <section className={styles.introSection}>
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <h2 className={styles.introTitle}>
                Meet the team working behind our success
              </h2>
            </div>
            <div className={styles.introRight}>
              <p className={styles.introDesc}>
                Our team consists of a group of talents. We solve customer problems with sincerity.
                All of our team members are very intelligent and skilled, bringing agile thinking
                and specialized digital customer experiences to enterprise clients worldwide.
              </p>
            </div>
          </div>

          <div className={styles.teamPhotoContainer}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Natobotics agile software engineering team working together"
              className={styles.teamPhoto}
            />
          </div>
        </Container>
      </section>

      {/* 3. OPEN POSITIONS GRID */}
      <section className={styles.positionsSection}>
        <Container>
          <div className={styles.positionsHeader}>
            <h2 className={styles.positionsTitle}>Currently open positions</h2>
            <p className={styles.positionsSubtitle}>
              Join a team of creators building high-performance systems. Browse or filter roles.
            </p>
          </div>

          {/* Controls: Search and Filters */}
          <div className={styles.controlsRow}>
            <div className={styles.filterRow} role="group" aria-label="Filter by work mode">
              {WORK_MODES.map((mode) => (
                <button
                  key={mode}
                  className={`${styles.filterButton} ${filter === mode ? styles.activeFilter : ''}`}
                  onClick={() => setFilter(mode)}
                >
                  {mode === 'All' ? 'Show All' : mode}
                </button>
              ))}
            </div>

            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search job title or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Positions Grid */}
          <motion.div layout className={styles.listGrid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((job) => (
                <motion.div
                  key={job.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/company/careers/${job.slug}`} className={styles.cardLink}>
                    <div className={styles.jobCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>{job.title}</h3>
                        <div className={styles.arrowCircle}>
                          <ArrowUpRight size={16} className={styles.arrowIcon} />
                        </div>
                      </div>

                      <div className={styles.cardCategory}>
                        <Briefcase size={12} className={styles.miniIcon} />
                        {job.workMode} · {job.department}
                      </div>

                      <p className={styles.cardDesc}>{job.description}</p>

                      <div className={styles.cardFooter}>
                        <div className={styles.footerItem}>
                          <MapPin size={14} className={styles.footerIcon} />
                          <span>{job.location}</span>
                        </div>
                        <div className={styles.footerItem}>
                          <DollarSign size={14} className={styles.footerIcon} />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <p>No open positions matching your search or filters at the moment.</p>
              <button
                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                className={styles.resetBtn}
              >
                Reset Search
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* 4. PARTNER LOGOS STRIP */}
      <section className={styles.logosSection}>
        <Container>
          <p className={styles.logosHeading}>
            Trusted by 1800+ of the world's most popular companies
          </p>
          <PartnerLogos />
        </Container>
      </section>
    </div>
  );
}
