'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TourCard from '@/components/TourCard';
import ImmersiveHero from '@/components/ImmersiveHero';
import { Button } from '@/components/ui/button';
import { getDestinationBySlug, getToursByDestination, tourToView } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function DestinationClient({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = use(params);
  const { t, locale } = useLanguage();
  const { favorites } = useFavorites();

  const sectionIds = ['destination-tours'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const dest = getDestinationBySlug(destination);
  const destTours = getToursByDestination(destination);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-white mb-4">
            {locale === 'es' ? 'Destino no encontrado' : 'Destination not found'}
          </h1>
          <Link href="/our-tours">
            <Button className="btn-gold rounded-full px-6 mt-4">{t.tourDetail.viewAllTours}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const destName = locale === 'es' ? dest.nameEs : dest.nameEn;
  const destDesc = locale === 'es' ? dest.descriptionEs : dest.descriptionEn;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0F0F0F' }}>
      {/* ── Full-Bleed Immersive Hero ── */}
      <ImmersiveHero
        title={destName}
        subtitle={destDesc}
        bgImage={dest.image}
        height="65vh"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages, href: '/our-tours' },
          { label: destName },
        ]}
      >
        {/* Tour count badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide"
            style={{
              background: 'rgba(197,165,90,0.15)',
              border: '1px solid rgba(197,165,90,0.25)',
              color: '#C5A55A',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="font-bold">{destTours.length}</span>
            <span>{destTours.length === 1 ? (locale === 'es' ? 'tour disponible' : 'tour available') : (locale === 'es' ? 'tours disponibles' : 'tours available')}</span>
          </div>
        </div>
      </ImmersiveHero>

      {/* ── Tours Grid ── */}
      <section id="destination-tours" className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {destTours.map((tour) => (
              <TourCard key={tour.id} tour={tourToView(tour)} locale={locale} />
            ))}
          </motion.div>
          {destTours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">
                {locale === 'es' ? 'No hay tours disponibles en este destino.' : 'No tours available in this destination.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
