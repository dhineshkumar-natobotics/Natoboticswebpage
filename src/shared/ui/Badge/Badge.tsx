import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  tone?: 'default' | 'ai' | 'success' | 'warning';
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
  return <span className={clsx(styles.badge, styles[tone])}>{children}</span>;
}
