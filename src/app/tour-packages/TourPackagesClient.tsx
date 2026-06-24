'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { Button } from '@/components/ui/button';
import { destinations, getToursByDestination } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function TourPackagesClient() {
  const { t, locale } = useLanguage();
  const { favorites } = useFavorites();

  const sectionIds = ['packages-destinations', 'packages-cta'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const destinationData = destinations.map(dest => ({
    ...dest,
    tourCount: getToursByDestination(dest.slug).length,
  }));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Full-Bleed Immersive Hero — No More Duplicate Headers */}
      <ImmersiveHero
        title={locale === 'es' ? 'Paquetes de Tours' : 'Tour Packages'}
        subtitle={locale === 'es'
          ? 'Explora nuestra selección de tours en los destinos más increíbles del Perú. Desde lo alto de los Andes hasta las profundidades de la selva amazónica.'
          : 'Explore our selection of tours in Peru\'s most incredible destinations. From the heights of the Andes to the depths of the Amazon rainforest.'}
        bgImage="/tours/machu-picchu.jpg"
        height="65vh"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages },
        ]}
      />

      {/* Destinations Grid Section */}
      <section id="packages-destinations" className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm text-[#C5A55A] font-bold tracking-widest uppercase block mb-2">
              // {t.tourDetail.ourDestinations}
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {locale === 'es' ? 'Nuestros Paquetes de Tours' : 'Our Tour Packages'}
            </h2>
            <div className="w-16 sm:w-20 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {destinationData.map((dest, index) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                <Link href={`/tour-packages/${dest.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden transition-all duration-300 border border-white/[0.06]">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={dest.image} alt={locale === 'es' ? dest.nameEs : dest.nameEn} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <MapPin className="w-3.5 h-3.5" />{dest.tourCount} {t.tourDetail.toursCount}
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <h3 className="font-playfair text-xl font-bold text-white drop-shadow-lg">{locale === 'es' ? dest.nameEs : dest.nameEn}</h3>
                      </div>
                    </div>
                    <div className="p-5 bg-[#141414]">
                      <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{locale === 'es' ? dest.descriptionEs : dest.descriptionEn}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                        <span className="text-xs text-[#C5A55A]">From ${Math.min(...getToursByDestination(dest.slug).map(t => t.priceUSD))}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#C5A55A] group-hover:gap-2 transition-all">{t.tourDetail.viewTours}<ArrowRight className="w-4 h-4" /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="packages-cta" className="py-12 md:py-16" style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid rgba(197,165,90,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">{locale === 'es' ? '¿No encuentras lo que buscas?' : 'Can\'t find what you\'re looking for?'}</h3>
          <p className="text-white/60 mb-6">{locale === 'es' ? 'Creamos paquetes personalizados según tus intereses y presupuesto.' : 'We create custom packages based on your interests and budget.'}</p>
          <Link href="/customized-tours"><Button className="btn-gold rounded-full px-8 py-3 text-base">{t.customized.title}</Button></Link>
        </div>
      </section>
    </div>
  );
}
