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
import { Container } from '../components/ui/Container';
import styles from './TeamPage.module.css';

// Custom inline SVG components for LinkedIn and GitHub to avoid version conflicts in lucide-react
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'leadership' | 'engineering' | 'design-product';
  photo: string;
  bio: string;
  linkedin: string;
  github?: string;
  website?: string;
  email: string;
  location: string;
  skills: string[];
}

const teamData: TeamMember[] = [
  { 
    id: '1', 
    name: 'Kannagi Swayam Prakasam', 
    role: 'Co-Founder & Director', 
    category: 'leadership',
    photo: '/images/team/kannagi.png',
    bio: 'Kannagi has over 15 years of leadership experience in software consultancy and IT services. As Co-Founder of Natobotics, he steers the company\'s long-term technology vision and oversees strategic delivery networks across Europe, North America, and Asia.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'kannagi@natobotics.com',
    location: 'Chennai, India',
    skills: ['Strategic Leadership', 'IT Consulting', 'Global Delivery', 'Operations Management']
  },
  { 
    id: '2', 
    name: 'Kirubanandam Swayamprakasam', 
    role: 'Co-Founder & Managing Director', 
    category: 'leadership',
    photo: '/images/team/kirubanandam.png',
    bio: 'Kirubanandam is a seasoned business leader managing global operations for Natobotics and its UK-based subsidiaries. He specializes in enterprise digital consulting, process automation frameworks, and structuring international client alliances.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'kirubanandam@natobotics.com',
    location: 'London, United Kingdom',
    skills: ['Enterprise Strategy', 'Business Development', 'Process Automation', 'Alliances & Partnerships']
  },
  { 
    id: '3', 
    name: 'Alice Smith', 
    role: 'Engineering Lead & Architect', 
    category: 'engineering',
    photo: '/images/team/alice.png',
    bio: 'Alice leads the core engineering squads at Natobotics, specializing in cloud-native applications, distributed databases, and high-performance microservices. She has a passion for building scalable, fault-tolerant infrastructure.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'alice.smith@natobotics.com',
    location: 'San Francisco, USA',
    skills: ['Cloud Architecture', 'Distributed Systems', 'Go / Java', 'Kubernetes']
  },
  { 
    id: '4', 
    name: 'Bob Johnson', 
    role: 'Design Head & Creative Director', 
    category: 'design-product',
    photo: '/images/team/bob.png',
    bio: 'Bob is a visionary design leader with over a decade of experience crafting digital customer experiences. He champions user-centric design principles, responsive design systems, and sleek interfaces that drive customer satisfaction.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'bob.johnson@natobotics.com',
    location: 'New York, USA',
    skills: ['Creative Direction', 'UI/UX Design', 'Design Systems', 'User Research']
  },
  { 
    id: '5', 
    name: 'Charlie Davis', 
    role: 'Product Manager & Strategy Lead', 
    category: 'design-product',
    photo: '/images/team/charlie.png',
    bio: 'Charlie defines product roadmaps and bridges the gap between client requirements and engineering execution. His focus is on agile product delivery, data-driven decisions, and scaling SaaS platforms for enterprise adoption.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'charlie.davis@natobotics.com',
    location: 'Austin, USA',
    skills: ['Product Strategy', 'Agile Delivery', 'SaaS Metrics', 'Stakeholder Management']
  },
  { 
    id: '6', 
    name: 'Diana Evans', 
    role: 'Senior Frontend Developer', 
    category: 'engineering',
    photo: '/images/team/diana.png',
    bio: 'Diana is a frontend specialist focused on clean code, web accessibility (a11y), and responsive interactions. She is an expert in React, TypeScript, and CSS architecture, crafting interactive experiences that are fast and accessible.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'diana.evans@natobotics.com',
    location: 'Berlin, Germany',
    skills: ['React / Next.js', 'TypeScript', 'CSS/CSS Modules', 'Web Accessibility (a11y)']
  },
  { 
    id: '7', 
    name: 'Eve Foster', 
    role: 'Lead Data Scientist', 
    category: 'engineering',
    photo: '/images/team/eve.png',
    bio: 'Eve leads the AI and machine learning initiatives at Natobotics. She builds predictive analytics pipelines, natural language processing models, and recommendation engines that empower enterprises with data-driven decision capabilities.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'eve.foster@natobotics.com',
    location: 'Singapore',
    skills: ['Machine Learning', 'Python / PyTorch', 'Data Pipelines', 'NLP & LLMs']
  },
  { 
    id: '8', 
    name: 'Frank Green', 
    role: 'Principal Cloud Architect', 
    category: 'engineering',
    photo: '/images/team/frank.png',
    bio: 'Frank architected the multi-cloud infrastructure strategy for Natobotics\' enterprise clients. He is an expert in AWS, Azure, Google Cloud Platform, and automated CI/CD deployment pipelines.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'frank.green@natobotics.com',
    location: 'Dubai, UAE',
    skills: ['Multi-Cloud', 'DevOps / CI-CD', 'Terraform', 'Infrastructure as Code']
  }
];

interface TimelineEvent {
  date: string;
  time: string;
  location: string;
  topic: string;
  description: string;
  speakerId: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '12 Oct 2026',
    time: '10:00 AM',
    location: 'Main Conference Hall',
    topic: 'The Future of Enterprise Cloud Transformation',
    description: 'An in-depth keynote address exploring strategies to scale multi-cloud infrastructures in Fortune 500 companies.',
    speakerId: '2' // Kirubanandam
  },
  {
    date: '15 Oct 2026',
    time: '02:00 PM',
    location: 'Virtual Webinar',
    topic: 'Designing Secure, High-Throughput REST & gRPC APIs',
    description: 'A practical session on optimization strategies, connection pooling, and payload compression for backend architectures.',
    speakerId: '3' // Alice
  },
  {
    date: '28 Oct 2026',
    time: '11:00 AM',
    location: 'Virtual Roundtable',
    topic: 'AI-Powered Automation in Modern Business Operations',
    description: 'Roundtable discussion with industry leaders on implementing predictive analytics and generative AI securely.',
    speakerId: '1' // Kannagi
  },
  {
    date: '05 Nov 2026',
    time: '04:30 PM',
    location: 'Design Workshop',
    topic: 'UX/UI Best Practices for Accessible SaaS Applications',
    description: 'Hands-on workshop on typography scales, interactive states, and design token integration in component libraries.',
    speakerId: '4' // Bob
  }
];

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
