import type { ReactNode } from 'react';
import styles from './Container.module.css';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div className={clsx(styles.container, narrow && styles.narrow, className)}>
      {children}
    </div>
  );
}
