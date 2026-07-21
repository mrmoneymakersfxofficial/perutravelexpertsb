import type { Metadata } from 'next';
import CustomizedToursClient from './CustomizedToursClient';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Customized Tours | PeruTravelExpertsB - Design Your Dream Trip',
  description:
    'Create your own personalized luxury tour in Peru. Choose your destinations, experiences, and travel style. We design the perfect itinerary for you.',
  openGraph: {
    title: 'Customized Tours | PeruTravelExpertsB',
    description: 'Design your dream luxury trip to Peru with our personalized tour builder.',
    url: `${BASE_URL}/customized-tours`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function CustomizedToursPage() {
  return <CustomizedToursClient />;
}