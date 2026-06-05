import type { Metadata } from 'next';
import ToursCitiesClient from './ToursCitiesClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Community Tours | Intiquilla - Authentic Andean Experiences',
  description:
    'Connect with Andean communities through responsible tourism. Community tours that directly support local families in Peru.',
  openGraph: {
    title: 'Community Tours | Intiquilla',
    description: 'Authentic experiences in local Andean communities.',
    url: `${BASE_URL}/tours-cities`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function ToursCitiesPage() {
  return <ToursCitiesClient />;
}
