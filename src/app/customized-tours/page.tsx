import type { Metadata } from 'next';
import CustomizedToursClient from './CustomizedToursClient';

const BASE_URL = 'https://perutravelexpertsb.vercel.app';

export const metadata: Metadata = {
  title: 'Customized Tours | PeruTravelExpertsB - Multi-Destination Packages',
  description:
    'Design your perfect Peru adventure with our customized multi-destination tour packages. Combine Cusco, Machu Picchu, Lake Titicaca, Amazon and more.',
  openGraph: {
    title: 'Customized Tours | PeruTravelExpertsB',
    description: 'Design your perfect adventure combining destinations across Peru.',
    url: `${BASE_URL}/customized-tours`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function CustomizedToursPage() {
  return <CustomizedToursClient />;
}
