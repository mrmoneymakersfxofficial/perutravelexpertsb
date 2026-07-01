import type { Metadata } from 'next';
import CustomizedToursClient from './CustomizedToursClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Tour Packages | PeruTravelExpertsB - Multi-Destination Packages',
  description:
    'Discover Machu Picchu in one unforgettable day. Browse our curated multi-destination tour packages across Peru.',
  openGraph: {
    title: 'Tour Packages | PeruTravelExpertsB',
    description: 'Discover Machu Picchu in one unforgettable day. Multi-destination packages across Peru.',
    url: `${BASE_URL}/tour-packages`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function CustomizedToursPage() {
  return <CustomizedToursClient />;
}
