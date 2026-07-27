import { useState, useEffect } from 'react';
import { Compass, ArrowUpRight, Globe } from 'lucide-react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';
import { offices } from '../data/offices';
import InteractiveWorldMap from '../components/ui/InteractiveWorldMap';
import styles from './GlobalDeliveryPage.module.css';

function getMapIdForOffice(countryCode: string) {
  switch (countryCode) {
    case 'IN': return 'India';
    case 'US': return 'USA';
    case 'SG': return 'Singapore';
    case 'AE': return 'UAE';
    case 'DE':
    case 'NL':
    case 'PL':
    case 'ES':
      return 'Europe';
    default:
      return null;
  }
}

// Live ticking clock for each office's timezone
function LiveClock({ timezone }: { timezone: string }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZoneName: 'short',
        });
        setTimeStr(formatter.format(new Date()));
      } catch (e) {
        setTimeStr('--:--');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [timezone]);

  return <span className={styles.liveTime}>{timeStr}</span>;
}

export function GlobalDeliveryPage() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // SEO page title update
  useEffect(() => {
    document.title = "Global Delivery Offices — Natobotics";
  }, []);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Global delivery"
        title="Eight countries. One accountable delivery model."
        description="Natobotics operates through eight legal entities, each staffed with full-time engineers — not a brokered offshore bench."
      />
      <Section>
        <Container>
          <Reveal>
            <div className={styles.mapContainer}>
              <InteractiveWorldMap hoveredCountry={hoveredCountry} onLocationHover={setHoveredCountry} />
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {offices.map((o, i) => {
              const mapId = getMapIdForOffice(o.countryCode);
              const isHighlighted = hoveredCountry === mapId;
              const regionName = o.timezone.split('/')[0].toUpperCase();
              const category = `${o.type === 'headquarters' ? 'GLOBAL HQ' : 'REGIONAL OFFICE'} · ${regionName}`;
              
              return (
                <Reveal key={o.city} delay={Math.min(i, 4) * 0.05}>
                  <div
                    onMouseEnter={() => setHoveredCountry(mapId)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    className={styles.cardWrapper}
                  >
                    <Card
                      className={`${styles.card} ${isHighlighted ? styles.highlighted : ''}`}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.titleArea}>
                          <h3 className={styles.city}>{o.city}</h3>
                          <p className={styles.country}>{o.country}</p>
                        </div>
                        <div className={styles.arrowCircle}>
                          <ArrowUpRight size={16} className={styles.arrowIcon} />
                        </div>
                      </div>

                      <div className={styles.cardCategory}>
                        <Globe size={12} className={styles.miniIcon} />
                        {category}
                      </div>

                      <p className={styles.cardDesc}>{o.description}</p>

                      {o.type === 'headquarters' && (
                        <div className={styles.badgeWrapper}>
                          <Badge tone="ai">Headquarters</Badge>
                        </div>
                      )}

                      <div className={styles.cardFooter}>
                        <div className={styles.footerItem}>
                          <Compass size={14} className={styles.footerIcon} />
                          <span>{o.lat.toFixed(2)}°, {o.lng.toFixed(2)}°</span>
                        </div>
                        <div className={styles.footerItem}>
                          <LiveClock timezone={o.timezone} />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}


