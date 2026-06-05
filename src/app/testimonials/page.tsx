import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Testimonials | Intiquilla - Tours VIP en Cusco',
  description:
    'Read what our travelers say about their experiences with Intiquilla. Real testimonials from unforgettable VIP tours in Cusco and Machu Picchu.',
  openGraph: {
    title: 'Testimonials | Intiquilla',
    description:
      'Real stories from travelers who experienced our VIP tours in Cusco and Machu Picchu.',
    url: `${BASE_URL}/testimonials`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
