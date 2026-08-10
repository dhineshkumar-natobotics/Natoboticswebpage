import { useState, useEffect } from 'react';
import { Compass, ArrowUpRight, Globe, MapPin } from 'lucide-react';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Card } from '../../../shared/ui/Card/Card';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { offices } from '../../../shared/data/offices';
import InteractiveWorldMap from '../../../shared/ui/InteractiveWorldMap/InteractiveWorldMap';
import styles from './GlobalDeliveryPage.module.css';

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
      } catch {
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

  useEffect(() => {
    document.title = "Global Delivery Offices — Natobotics";
  }, []);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Global delivery"
        title="Our Locations"
        description="We operate seamlessly across continents, combining international scale with on-the-ground knowledge to deliver consistent quality and exceptional results."
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
              const mapId = `office-${i}`;
              const isHighlighted = hoveredCountry === mapId;
              const regionName = o.timezone.split('/')[0].replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
              const category = `${o.type === 'headquarters' ? 'Global HQ' : 'Regional office'} · ${regionName}`;

              return (
                <Reveal key={o.city + o.country} delay={Math.min(i, 4) * 0.05}>
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

                      <div className={styles.addressBlock}>
                        <MapPin size={12} className={styles.addressIcon} />
                        <span className={styles.addressText}>{o.address}</span>
                      </div>

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
