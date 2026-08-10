import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export const GLOBAL_BUTTON_THEME = 1;

type Variant = 'primary' | 'secondary' | 'ghost' | 'orange' | 'header' | 'header-orange';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
  icon?: ReactNode;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  to?: undefined;
}

interface ButtonAsLink extends BaseProps {
  to: string;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = 'primary', size = 'md', className, style, icon } = props;
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    styles[`theme-${GLOBAL_BUTTON_THEME}`],
    className
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} style={style}>
        <span>{children}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </Link>
    );
  }

  const { to: _ignored, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
