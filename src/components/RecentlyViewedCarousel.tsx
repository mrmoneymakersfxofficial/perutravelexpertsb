'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { tours } from '@/lib/tours-data';
import { useLanguage } from '@/components/LanguageProvider';
import { useRecentlyViewed } from '@/components/RecentlyViewedProvider';
import type { TourData } from '@/lib/tours-data';

interface RecentlyViewedCarouselProps { onTourClick?: (tour: TourData) => void; }

export default function RecentlyViewedCarousel({ onTourClick }: RecentlyViewedCarouselProps) {
  const { locale, t } = useLanguage();
  const { getRecentIds } = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);
  const recentIds = getRecentIds();
  const recentTours = recentIds.map(id => tours.find(tour => tour.id === id)).filter((tour): tour is TourData => tour !== undefined && tour !== undefined);
  if (recentTours.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-playfair text-xl md:text-2xl font-bold" style={{ color: '#1C1C1C' }}>
            {locale === 'es' ? 'Continuar explorando' : 'Continue exploring'}
          </h2>
          {recentTours.length > 3 && (
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full border border-[#DCC99A]/30 flex items-center justify-center hover:bg-white/80 transition-colors" style={{ color: '#C5A55A' }}><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full border border-[#DCC99A]/30 flex items-center justify-center hover:bg-white/80 transition-colors" style={{ color: '#C5A55A' }}><ChevronRight className="w-4 h-4" /></button>
            </div>
          )}
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {recentTours.map((tour, index) => (
            <motion.div key={tour.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="snap-start shrink-0 w-[240px] sm:w-[260px]">
              <button onClick={() => onTourClick?.(tour)} className="w-full group rounded-xl overflow-hidden transition-all duration-300 border border-[#DCC99A]/[0.04] text-left" style={{ backgroundColor: 'rgba(248,246,242,0.02)' }}>
                <div className="relative h-36 overflow-hidden">
                  <Image src={tour.image} alt={locale === 'es' ? tour.nameEs : tour.nameEn} fill sizes="260px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-playfair font-semibold text-sm truncate" style={{ color: '#1C1C1C' }}>{locale === 'es' ? tour.nameEs : tour.nameEn}</h3>
                  <p className="text-sm font-bold mt-1" style={{ color: '#C5A55A' }}>${tour.priceUSD}<span className="text-[10px] font-normal text-[#8B8680] ml-1">{t.tours.perPerson}</span></p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
