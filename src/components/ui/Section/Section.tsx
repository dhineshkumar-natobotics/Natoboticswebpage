import type { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bleed?: boolean; // full-bleed background, e.g. mesh gradients
  style?: CSSProperties;
}

export function Section({ children, id, className, bleed, style }: SectionProps) {
  return (
    <section id={id} className={clsx(styles.section, bleed && styles.bleed, className)} style={style}>
      {children}
    </section>
  );
}
