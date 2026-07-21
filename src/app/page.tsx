import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getSiteSettings, getFeaturedToursFn, getFeaturedTestimonials, getStats } from '@/lib/sanity-adapter';

export const metadata: Metadata = {
  title: 'PeruTravelExpertsB | Tours VIP en Cusco - Machu Picchu',
  description:
    'Experiencias exclusivas y tours VIP en Cusco y Machu Picchu. Tu agencia de turismo boutique de confianza. Exclusive VIP tours in Cusco and Machu Picchu.',
  openGraph: {
    title: 'PeruTravelExpertsB | Tours VIP en Cusco - Machu Picchu',
    description: 'Experiencias exclusivas y tours VIP en Cusco y Machu Picchu.',
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default async function HomePage() {
  // Pre-fetch Sanity data (cae a datos locales si Sanity no está configurado)
  const [settings, featuredTours, testimonials, stats] = await Promise.all([
    getSiteSettings(),
    getFeaturedToursFn(),
    getFeaturedTestimonials(),
    getStats(),
  ]);

  return (
    <HomeClient
      settings={settings}
      featuredTours={featuredTours}
      testimonials={testimonials}
      stats={stats}
    />
  );
}
