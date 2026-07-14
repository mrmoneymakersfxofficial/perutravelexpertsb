'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { destinations, getToursByDestination, type DestinationData } from '@/lib/tours-data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function FeaturedToursSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="tours" className="py-20 md:py-28" style={{ backgroundColor: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#F8F6F2' }}
          >
            {t.home.featuredTours}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{t.tours.subtitle}</p>
        </motion.div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14">
          {destinations.map((dest: DestinationData, index: number) => {
            const name = locale === 'es' ? dest.nameEs : dest.nameEn;
            const desc = locale === 'es' ? dest.descriptionEs : dest.descriptionEn;
            const destTours = getToursByDestination(dest.slug);
            const tourCount = destTours.length;
            const minPrice = destTours.length > 0
              ? Math.min(...destTours.map(t => t.priceUSD))
              : 0;

            // First card spans 2 cols on lg for visual hierarchy
            const isLarge = index === 0;

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={isLarge ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <Link href={`/our-tours/${dest.slug}`} className="block group">
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer"
                    style={{
                      height: isLarge ? '420px' : '380px',
                      border: '1px solid rgba(212,168,67,0.06)',
                    }}
                  >
                    {/* Background Image */}
                    <Image
                      src={dest.image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                      className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                    />

                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/30 to-[#0F0F0F]/5 transition-all duration-500 group-hover:via-[#0F0F0F]/50 group-hover:from-[#0F0F0F]/95" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8">
                      {/* Tour count badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-3"
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(212,168,67,0.2)',
                          color: '#D4A843',
                        }}
                      >
                        {tourCount} {tourCount === 1 ? (locale === 'es' ? 'tour disponible' : 'tour available') : (locale === 'es' ? 'tours disponibles' : 'tours available')}
                      </div>

                      {/* Destination name */}
                      <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2 group-hover:text-[#D4A843] transition-colors duration-300">
                        {name}
                      </h3>

                      {/* Description */}
                      <p className="text-[12px] sm:text-[13px] md:text-sm leading-relaxed text-white/0 group-hover:text-white/60 transition-all duration-500 line-clamp-2 mb-4">
                        {desc}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-px mb-4" style={{ backgroundColor: 'rgba(212,168,67,0.1)' }} />

                      {/* Price + CTA */}
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.2em] text-white/30">
                            {locale === 'es' ? 'Desde' : 'From'}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black font-playfair" style={{ color: '#D4A843' }}>
                              ${minPrice}
                            </span>
                            <span className="text-[10px] text-white/30">USD</span>
                          </div>
                        </div>

                        <span
                          className="h-10 px-5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                          style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
                        >
                          {locale === 'es' ? 'Ver Tours' : 'View Tours'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tour-packages">
            <Button className="btn-gold rounded-full px-8 py-3 text-base tracking-wide flex items-center gap-2">
              {t.home.viewAllPackages}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/our-tours">
            <Button
              variant="ghost"
              className="btn-white-premium rounded-full px-8 py-3 text-base tracking-wide flex items-center gap-2"
            >
              {locale === 'es' ? 'Explorar Destinos' : 'Explore Destinations'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}