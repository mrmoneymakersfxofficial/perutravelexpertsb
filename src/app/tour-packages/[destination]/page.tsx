'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import TourCard from '@/components/TourCard';
import { getDestinationBySlug, getToursByDestination, tourToView } from '@/lib/tours-data';

export default function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = use(params);
  const dest = getDestinationBySlug(destination);
  const destTours = getToursByDestination(destination);

  return (
    <DestinationContent destination={destination} dest={dest} destTours={destTours} />
  );
}

function DestinationContent({
  destination,
  dest,
  destTours,
}: {
  destination: string;
  dest: ReturnType<typeof getDestinationBySlug>;
  destTours: ReturnType<typeof getToursByDestination>;
}) {
  const { t, locale } = useLanguage();
  const { favorites } = useFavorites();

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#2C1810' }}>
            {locale === 'es' ? 'Destino no encontrado' : 'Destination not found'}
          </h1>
          <Link href="/tour-packages">
            <Button className="btn-gold rounded-full px-6 mt-4">
              {t.tourDetail.viewAllTours}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const destName = locale === 'es' ? dest.nameEs : dest.nameEn;
  const destDesc = locale === 'es' ? dest.descriptionEs : dest.descriptionEn;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <PageHeader
        title={`${t.tourDetail.toursIn} ${destName}`}
        subtitle={destDesc}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages, href: '/tour-packages' },
          { label: destName },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={dest.image}
            alt={destName}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C14]/70 to-[#0C0C14]" />
        </div>
        <div className="relative z-10 flex items-end justify-center h-full pb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {destName}
          </h2>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {destTours.map((tour) => (
              <TourCard key={tour.id} tour={tourToView(tour)} locale={locale} />
            ))}
          </motion.div>

          {destTours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8B8680] text-lg">
                {locale === 'es'
                  ? 'No hay tours disponibles en este destino.'
                  : 'No tours available in this destination.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
