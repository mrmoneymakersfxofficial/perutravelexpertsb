import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { getSiteSettings } from '@/lib/sanity-adapter';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Contact Us | PeruTravelExpertsB - Book Your VIP Tour in Cusco',
  description: 'Contact PeruTravelExpertsB to book your VIP tour in Cusco and Machu Picchu. WhatsApp, email, or visit us in Cusco, Peru.',
  openGraph: { title: 'Contact Us | PeruTravelExpertsB', description: 'Get in touch to plan your perfect trip to Cusco and Machu Picchu.', url: `${BASE_URL}/contact`, siteName: 'PeruTravelExpertsB', type: 'website' },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient sanitySettings={settings} />;
}
