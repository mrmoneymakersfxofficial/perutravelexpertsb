import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'About Us | PeruTravelExpertsB - Your Boutique Travel Agency in Cusco',
  description:
    'Learn about PeruTravelExpertsB, your trusted boutique travel agency in Cusco. Expert local guides, VIP service, and authentic Andean experiences.',
  openGraph: {
    title: 'About Us | PeruTravelExpertsB',
    description: 'Your trusted boutique travel agency in Cusco, Peru.',
    url: `${BASE_URL}/about-us`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
