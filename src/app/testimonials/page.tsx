import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

const BASE_URL = 'https://perutravelexpertsb.vercel.app';

export const metadata: Metadata = {
  title: 'Testimonials | PeruTravelExpertsB - Tours VIP en Cusco',
  description:
    'Read what our travelers say about their experiences with PeruTravelExpertsB. Real testimonials from unforgettable VIP tours in Cusco and Machu Picchu.',
  openGraph: {
    title: 'Testimonials | PeruTravelExpertsB',
    description:
      'Real stories from travelers who experienced our VIP tours in Cusco and Machu Picchu.',
    url: `${BASE_URL}/testimonials`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
