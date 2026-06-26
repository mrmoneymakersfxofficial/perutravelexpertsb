import type { Metadata } from 'next';
import TourPackagesClient from './TourPackagesClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Tour Packages | PeruTravelExpertsB - Explore Peru',
  description:
    'Explore our curated tour packages across Peru: Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Lake Titicaca, Amazon, Arequipa and more.',
  openGraph: {
    title: 'Tour Packages | PeruTravelExpertsB',
    description: 'Discover our curated tour packages across Peru\'s most incredible destinations.',
    url: `${BASE_URL}/tour-packages`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function TourPackagesPage() {
  return <TourPackagesClient />;
}
