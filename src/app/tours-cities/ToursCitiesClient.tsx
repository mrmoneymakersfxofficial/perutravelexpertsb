'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { communityTours } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function ToursCitiesClient() {
  const { t, locale } = useLanguage();

  const sectionIds = ['community-tours'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Full-Bleed Immersive Hero */}
      <ImmersiveHero
        title={t.communityTours.title}
        subtitle={locale === 'es'
          ? 'Conéctate con las comunidades andinas a través de experiencias turísticas responsables. Cada tour contribuye directamente al desarrollo de las familias locales.'
          : 'Connect with Andean communities through responsible tourism experiences. Each tour directly contributes to the development of local families.'}
        bgImage="/tours/andean-community.jpg"
        height="65vh"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.communityTours.title },
        ]}
      />

      {/* Community Tours Grid */}
      <section id="community-tours" className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {communityTours.map((tour, index) => {
              const name = locale === 'es' ? tour.nameEs : tour.nameEn;
              const desc = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;

              return (
                <motion.div key={tour.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                  <Link href={`/tours-cities/${tour.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden transition-all duration-300 border border-white/[0.06]">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={tour.image} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Clock className="w-3.5 h-3.5" />{tour.duration} {t.tours.days}
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="font-playfair text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
                        </div>
                      </div>
                      <div className="p-6 bg-[#141414]">
                        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">{desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                          <span className="text-2xl font-bold font-playfair text-[#C5A55A]">${Math.round(tour.priceUSD)}</span>
                          <span className="flex items-center gap-1 text-sm font-medium text-[#C5A55A] group-hover:gap-2 transition-all">{t.tours.viewDetails}<ArrowRight className="w-4 h-4" /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
