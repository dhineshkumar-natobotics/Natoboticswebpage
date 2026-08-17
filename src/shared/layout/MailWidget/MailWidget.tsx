import { useState } from 'react';
import { mailContacts } from '../../data/mail';
import styles from './MailWidget.module.css';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MailItemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export function MailWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact us"
      >
        <MailIcon />
      </button>

      {open && (
        <div className={styles.popover}>
          <p className={styles.title}>Get in touch</p>
          <ul className={styles.list}>
            {mailContacts.map((c) => (
              <li
                key={c.id}
                className={styles.item}
                onClick={() => {
                  window.location.href = `mailto:${c.email}`;
                  setOpen(false);
                }}
              >
                <span className={styles.itemIcon}>
                  <MailItemIcon />
                </span>
                <span className={styles.itemText}>
                  <span className={styles.itemLabel}>{c.label}</span>
                  <span className={styles.itemEmail}>{c.email}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
