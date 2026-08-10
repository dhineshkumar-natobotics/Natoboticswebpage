export interface ContactWidgetItem {
  id: string;
  type: 'whatsapp' | 'phone' | 'email';
  href: string;
  title: string;
}

export const contactWidgetData: ContactWidgetItem[] = [
  {
    id: 'whatsapp-contact',
    type: 'whatsapp',
    href: 'https://wa.me/placeholder',
    title: 'WhatsApp',
  },
  {
    id: 'phone-contact',
    type: 'phone',
    href: 'tel:placeholder',
    title: 'Phone',
  },
  {
    id: 'email-contact',
    type: 'email',
    href: 'mailto:info@natobotics.com',
    title: 'Email',
  },
];
