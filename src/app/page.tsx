import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Intiquilla | Tours VIP en Cusco - Machu Picchu',
  description:
    'Experiencias exclusivas y tours VIP en Cusco y Machu Picchu. Tu agencia de turismo boutique de confianza. Exclusive VIP tours in Cusco and Machu Picchu.',
  openGraph: {
    title: 'Intiquilla | Tours VIP en Cusco - Machu Picchu',
    description: 'Experiencias exclusivas y tours VIP en Cusco y Machu Picchu.',
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
