import type { Metadata } from 'next';
import TourPackagesClient from './TourPackagesClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Tour Packages | Intiquilla - Explore Peru',
  description:
    'Explore our curated tour packages across Peru: Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Lake Titicaca, Amazon, Arequipa and more.',
  openGraph: {
    title: 'Tour Packages | Intiquilla',
    description: 'Discover our curated tour packages across Peru\'s most incredible destinations.',
    url: `${BASE_URL}/tour-packages`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function TourPackagesPage() {
  return <TourPackagesClient />;
}
