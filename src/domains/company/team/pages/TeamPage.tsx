import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  X, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { Container } from '../../../../shared/ui/Container/Container';
import styles from './TeamPage.module.css';
import { LinkedinIcon, GithubIcon } from '../data/Icons';
import { teamData, timelineEvents } from '../data';
import type { TeamMember } from '../data';

export function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'leadership' | 'engineering' | 'design-product'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Set document title for SEO
  useEffect(() => {
    document.title = "Our Team — Natobotics";
  }, []);

  // Filter and search logic
  const filteredTeam = teamData.filter(member => {
    const matchesFilter = activeFilter === 'all' || member.category === activeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Handle modal actions
  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedMember(null);
    document.body.style.overflow = '';
  };

  // Close dialog on backdrop click
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [selectedMember]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMember) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  return (
    <div className={styles.page}>
      <Container>
        {/* Header Section */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <User size={12} className={styles.eyebrowIcon} />
            Our Leadership & Experts
          </span>
          <h1 className={styles.title}>Meet the Minds Powering Natobotics</h1>
          <p className={styles.subtitle}>
            A global team of tech visionaries, agile builders, and creative designers dedicated to steering enterprise digital journeys.
          </p>
        </div>

        {/* TIMELINE SECTION (Mockup "Program of the event") */}
        <section className={styles.timelineSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Knowledge Sharing & Events</h2>
            <p className={styles.sectionSubtitle}>
              Our experts regularly host events, workshops, and keynotes to drive continuous tech learning.
            </p>
          </div>

          <div className={styles.timelineContainer}>
            {timelineEvents.map((event, idx) => {
              const speaker = teamData.find(m => m.id === event.speakerId);
              return (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineBadge}>
                    <span className={styles.badgeDate}>{event.date.split(' ')[0]}</span>
                    <span className={styles.badgeMonth}>{event.date.split(' ')[1]}</span>
                  </div>
                  
                  <div className={styles.timelineContent}>
                    <div className={styles.timeLoc}>
                      <span className={styles.metaItem}>
                        <Clock size={12} className={styles.metaIcon} />
                        {event.time}
                      </span>
                      <span className={styles.metaItem}>
                        <MapPin size={12} className={styles.metaIcon} />
                        {event.location}
                      </span>
                    </div>

                    <h3 className={styles.timelineTopic}>{event.topic}</h3>
                    <p className={styles.timelineDesc}>{event.description}</p>
                    
                    {speaker && (
                      <div className={styles.timelineSpeaker} onClick={() => openModal(speaker)}>
                        <img 
                          src={speaker.photo} 
                          alt={speaker.name} 
                          className={speaker.id === '1' || speaker.id === '2' ? styles.speakerPhotoContain : styles.speakerPhoto} 
                        />
                        <div>
                          <span className={styles.speakerName}>{speaker.name}</span>
                          <span className={styles.speakerRole}>{speaker.role}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TEAM GRID SECTION */}
        <section className={styles.teamSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Specialists</h2>
            <p className={styles.sectionSubtitle}>
              Filter by department or search by name, role, or technical expertise.
            </p>
          </div>

          {/* Filters and Search controls */}
          <div className={styles.controlsRow}>
            <div className={styles.filterTabs}>
              {(['all', 'leadership', 'engineering', 'design-product'] as const).map(category => (
                <button
                  key={category}
                  className={`${styles.filterTab} ${activeFilter === category ? styles.activeTab : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category === 'all' ? 'Show All' : category === 'design-product' ? 'Design & Product' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search name, role, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearSearch}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Grid display */}
          <motion.div layout className={styles.teamGrid}>
            <AnimatePresence mode="popLayout">
              {filteredTeam.map(member => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={styles.teamCard}
                  onClick={() => openModal(member)}
                >
                  <div className={styles.photoContainer}>
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className={member.id === '1' || member.id === '2' ? styles.photoContain : styles.photo} 
                    />
                    <div className={styles.cardHoverOverlay}>
                      <span className={styles.viewProfileBtn}>
                        View Profile
                        <ArrowRight size={14} className={styles.arrowIcon} />
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <span className={styles.memberLoc}>
                      <MapPin size={10} className={styles.miniMapIcon} />
                      {member.location.split(',')[0]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredTeam.length === 0 && (
            <div className={styles.noResults}>
              <p>No specialists found matching "{searchQuery}" in this category.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }} 
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </Container>

      {/* Accessible native HTML Dialog Backdrop and modal content */}
      <dialog ref={dialogRef} className={styles.dialog} onClose={closeModal}>
        {selectedMember && (
          <div className={styles.dialogInner}>
            <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <div className={styles.dialogGrid}>
              <div className={styles.modalLeft}>
                <div className={styles.modalPhotoWrapper}>
                  <img 
                    src={selectedMember.photo} 
                    alt={selectedMember.name} 
                    className={selectedMember.id === '1' || selectedMember.id === '2' ? styles.modalPhotoContain : styles.modalPhoto} 
                  />
                </div>
                
                <div className={styles.modalMeta}>
                  <p className={styles.modalLocation}>
                    <MapPin size={14} />
                    {selectedMember.location}
                  </p>
                  <p className={styles.modalEmail}>
                    <Mail size={14} />
                    <a href={`mailto:${selectedMember.email}`}>{selectedMember.email}</a>
                  </p>
                </div>

                <div className={styles.modalSocials}>
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialBtn}
                  >
                    <LinkedinIcon />
                    LinkedIn
                    <ExternalLink size={12} className={styles.btnLinkIcon} />
                  </a>
                  
                  {selectedMember.github && (
                    <a 
                      href={selectedMember.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.socialBtn}
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.modalRight}>
                <span className={styles.modalCategoryBadge}>
                  {selectedMember.category === 'leadership' ? 'Leadership' : selectedMember.category === 'engineering' ? 'Engineering Expert' : 'Product & Design'}
                </span>
                
                <h2 className={styles.modalName}>{selectedMember.name}</h2>
                <p className={styles.modalRole}>{selectedMember.role}</p>
                
                <div className={styles.modalDivider}></div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Biography</h3>
                  <p className={styles.modalBio}>{selectedMember.bio}</p>
                </div>

                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Areas of Expertise</h3>
                  <div className={styles.skillsGrid}>
                    {selectedMember.skills.map((skill, idx) => (
                      <span key={idx} className={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
