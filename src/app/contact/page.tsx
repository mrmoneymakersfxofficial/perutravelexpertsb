import type { Metadata } from 'next';
import ContactClient from './ContactClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Contact Us | Intiquilla - Book Your VIP Tour in Cusco',
  description:
    'Contact Intiquilla to book your VIP tour in Cusco and Machu Picchu. WhatsApp, email, or visit us in Cusco, Peru.',
  openGraph: {
    title: 'Contact Us | Intiquilla',
    description: 'Get in touch to plan your perfect trip to Cusco and Machu Picchu.',
    url: `${BASE_URL}/contact`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
