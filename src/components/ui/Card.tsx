import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  glow?: 'none' | 'accent' | 'ai';
}

export function Card({ children, className, interactive, glow = 'none' }: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        interactive && styles.interactive,
        glow !== 'none' && styles[`glow-${glow}`],
        className
      )}
    >
      {children}
    </div>
  );
}
