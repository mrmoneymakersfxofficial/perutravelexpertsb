'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, MapPin } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { customizedTours } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function CustomizedToursClient() {
  const { t, locale } = useLanguage();

  const sectionIds = ['customized-description', 'customized-packages'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader title={t.customized.title} subtitle={t.customized.subtitle} breadcrumbs={[{ label: locale === 'es' ? 'Inicio' : 'Home', href: '/' }, { label: t.customized.title }]} />

      <section id="customized-description" className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#8B8680] text-lg leading-relaxed mb-6">
            {locale === 'es'
              ? 'Nuestros paquetes multi-destino están diseñados para que no tengas que elegir. Combina lo mejor de Cusco, Puno, Arequipa, Lima y la Amazonía en una sola experiencia inolvidable.'
              : 'Our multi-destination packages are designed so you don\'t have to choose. Combine the best of Cusco, Puno, Arequipa, Lima and the Amazon in one unforgettable experience.'}
          </p>
          <div className="w-20 h-0.5 mx-auto gold-gradient" />
        </div>
      </section>

      <section id="customized-packages" className="pb-16 md:pb-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {customizedTours.map((pkg, index) => {
              const name = locale === 'es' ? pkg.nameEs : pkg.nameEn;
              const desc = locale === 'es' ? pkg.descriptionEs : pkg.descriptionEn;
              const includes = locale === 'es' ? pkg.includesEs : pkg.includesEn;

              return (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                  <Link href={`/customized-tours/${pkg.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden transition-all duration-300 border border-[#E8D5B5]/[0.04]">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={pkg.image} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="tour-image-overlay absolute inset-0" />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                          <Clock className="w-3.5 h-3.5" />{pkg.duration} {t.tours.days}
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="font-playfair text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-[#8B8680] text-sm leading-relaxed mb-4 line-clamp-3">{desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pkg.destinations.map((dest) => (
                            <span key={dest} className="text-xs px-2.5 py-1 rounded-full bg-[#F8F6F2] text-[#8B8680] border border-[#E8D5B5]/[0.06] flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{(t.destinations as Record<string, string>)[dest] || dest}
                            </span>
                          ))}
                        </div>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1.5">
                            {includes.slice(0, 4).map((item, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#F8F6F2] text-[#8B8680] border border-[#E8D5B5]/[0.06]">{item}</span>
                            ))}
                            {includes.length > 4 && <span className="text-xs px-2 py-1 rounded-md bg-[#F8F6F2] text-[#8B8680]">+{includes.length - 4}</span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-[#E8D5B5]/[0.06]">
                          <div>
                            <span className="text-2xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(pkg.priceUSD)}</span>
                            <span className="text-xs text-[#8B8680] ml-1">{t.tours.perPerson}</span>
                          </div>
                          <span className="flex items-center gap-1 text-sm font-medium text-[#D6B37F] group-hover:gap-2 transition-all">{t.customized.viewPackage}<ArrowRight className="w-4 h-4" /></span>
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
