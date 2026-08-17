import { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './ContactWidget.module.css';
import { contactWidgetData } from './data';

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.widgetContainer}>
      <div className={`${styles.menuCard} ${isOpen ? styles.menuOpen : ''}`}>
        <button 
          className={styles.closeCardBtn} 
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        
        <h4 className={styles.cardTitle}>Get in Touch</h4>
        
        <div className={styles.qrContainer}>
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/1234567890" 
            alt="Scan to WhatsApp" 
            className={styles.qrImage} 
          />
          <span className={styles.qrText}>Scan to WhatsApp</span>
        </div>

        <div className={styles.iconRow}>
          {contactWidgetData.map((contact) => {
            let IconComponent;
            if (contact.type === 'whatsapp') IconComponent = MessageCircle;
            else if (contact.type === 'phone') IconComponent = Phone;
            else if (contact.type === 'email') IconComponent = Mail;
            
            return (
              <a
                key={contact.id}
                href={contact.href}
                target={contact.type === 'whatsapp' ? '_blank' : undefined}
                rel={contact.type === 'whatsapp' ? 'noreferrer' : undefined}
                className={styles.iconLink}
                aria-label={contact.title}
              >
                {IconComponent && <IconComponent size={28} strokeWidth={2} />}
              </a>
            );
          })}
        </div>
      </div>
      
      <button 
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleOpen : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Us"
      >
        <img 
          src="/natobotics-logo.png" 
          alt="Contact Natobotics" 
          className={styles.iconChat} 
          style={{ width: '56px', height: '56px', objectFit: 'contain' }}
        />
        <svg className={styles.iconClose} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
