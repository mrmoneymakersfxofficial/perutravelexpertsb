import type { Metadata } from 'next';
import ToursCitiesClient from './ToursCitiesClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Community Tours | PeruTravelExpertsB - Authentic Andean Experiences',
  description:
    'Connect with Andean communities through responsible tourism. Community tours that directly support local families in Peru.',
  openGraph: {
    title: 'Community Tours | PeruTravelExpertsB',
    description: 'Authentic experiences in local Andean communities.',
    url: `${BASE_URL}/tours-cities`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function ToursCitiesPage() {
  return <ToursCitiesClient />;
}
