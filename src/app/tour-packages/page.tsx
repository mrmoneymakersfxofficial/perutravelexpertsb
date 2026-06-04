'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { destinations, tours, getToursByDestination } from '@/lib/tours-data';

export default function TourPackagesPage() {
  const { t, locale } = useLanguage();
  const { favorites } = useFavorites();

  const destinationData = destinations.map(dest => ({
    ...dest,
    tourCount: getToursByDestination(dest.slug).length,
  }));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <PageHeader
        title={t.pageHeaders.tourPackages}
        subtitle={locale === 'es'
          ? 'Explora nuestra selección de tours en los destinos más increíbles del Perú. Desde lo alto de los Andes hasta las profundidades de la selva amazónica.'
          : 'Explore our selection of tours in Peru\'s most incredible destinations. From the heights of the Andes to the depths of the Amazon rainforest.'}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/tours/machu-picchu.jpg"
            alt="Peru Tours"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C14]/70 to-[#0C0C14]" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'es' ? 'Nuestros Paquetes de Tours' : 'Our Tour Packages'}
            </h2>
            <p className="text-[#E8D5B5] text-lg max-w-2xl mx-auto px-4">
              {t.tourDetail.ourDestinations}
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {destinationData.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <Link href={`/tour-packages/${dest.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8D5B5]/20">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={locale === 'es' ? dest.nameEs : dest.nameEn}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="tour-image-overlay absolute inset-0" />
                      {/* Tour count badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {dest.tourCount} {t.tourDetail.toursCount}
                      </div>
                      {/* Destination name */}
                      <div className="absolute bottom-4 right-4">
                        <h3 className="font-playfair text-xl font-bold text-white drop-shadow-lg">
                          {locale === 'es' ? dest.nameEs : dest.nameEn}
                        </h3>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <p className="text-[#8B8680] text-sm leading-relaxed mb-4 line-clamp-2">
                        {locale === 'es' ? dest.descriptionEs : dest.descriptionEn}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E8D5B5]/20">
                        <span className="text-xs text-[#8B8680]">From ${Math.min(...getToursByDestination(dest.slug).map(t => t.priceUSD))}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#C8A97E] group-hover:gap-2 transition-all">
                          {t.tourDetail.viewTours}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours CTA */}
      <section className="py-12" style={{ backgroundColor: '#0C0C14' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
            {locale === 'es' ? '¿No encuentras lo que buscas?' : 'Can\'t find what you\'re looking for?'}
          </h3>
          <p className="text-[#8B8680] mb-6">
            {locale === 'es'
              ? 'Creamos paquetes personalizados según tus intereses y presupuesto.'
              : 'We create custom packages based on your interests and budget.'}
          </p>
          <Link href="/customized-tours">
            <Button className="btn-gold rounded-full px-8 py-3 text-base">
              {t.customized.title}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
