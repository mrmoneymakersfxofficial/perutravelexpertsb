import type { Metadata } from 'next';
import CustomizedToursClient from './CustomizedToursClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Customized Tours | Intiquilla - Multi-Destination Packages',
  description:
    'Design your perfect Peru adventure with our customized multi-destination tour packages. Combine Cusco, Machu Picchu, Lake Titicaca, Amazon and more.',
  openGraph: {
    title: 'Customized Tours | Intiquilla',
    description: 'Design your perfect adventure combining destinations across Peru.',
    url: `${BASE_URL}/customized-tours`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function CustomizedToursPage() {
  return <CustomizedToursClient />;
}
