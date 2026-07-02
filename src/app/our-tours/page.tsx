import type { Metadata } from 'next';
import TourPackagesClient from './TourPackagesClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Our Tours | PeruTravelExpertsB - Explore Peru',
  description:
    'Explore our curated tour packages across Peru: Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Lake Titicaca, Amazon, Arequipa and more.',
  openGraph: {
    title: 'Our Tours | PeruTravelExpertsB',
    description: 'Discover our curated tour packages across Peru\'s most incredible destinations.',
    url: `${BASE_URL}/our-tours`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function TourPackagesPage() {
  return <TourPackagesClient />;
}
