import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'About Us | Intiquilla - Your Boutique Travel Agency in Cusco',
  description:
    'Learn about Intiquilla, your trusted boutique travel agency in Cusco. Expert local guides, VIP service, and authentic Andean experiences.',
  openGraph: {
    title: 'About Us | Intiquilla',
    description: 'Your trusted boutique travel agency in Cusco, Peru.',
    url: `${BASE_URL}/about-us`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
