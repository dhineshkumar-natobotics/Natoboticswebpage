export interface ContactDetail {
    title: string;
    desc: string;
    contact: string;
    icon: string;
}

export const contactdetails: ContactDetail[] = [
    {
        title: 'Talk to Sales',
        desc: 'Interested in Natobotics Offerings? Just pick up the phone to chat with a member of our sales team.',
        contact: '+1 877 929 0687',
        icon: 'Phone',
    },
    {
        title: 'Contact Support',
        desc: 'Need help with an existing project? Our support team is available around the clock.',
        contact: 'info@natobotics.com',
        icon: 'Headset',
    },
];