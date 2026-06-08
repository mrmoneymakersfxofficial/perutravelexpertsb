'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TourView } from '@/lib/types';
import BookingModal from '@/components/BookingModal';

interface TourCardProps {
  tour: TourView;
  locale: string;
}

const difficultyConfig = {
  beginner: { es: 'Principiante', en: 'Beginner', cls: 'text-emerald-400 border-emerald-400/30' },
  moderate:  { es: 'Moderado',    en: 'Moderate',  cls: 'text-amber-400 border-amber-400/30' },
  advanced:  { es: 'Avanzado',    en: 'Advanced',  cls: 'text-red-400 border-red-400/30' },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function TourCard({ tour, locale }: TourCardProps) {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const diff = difficultyConfig[tour.difficulty];
  const diffLabel = locale === 'es' ? diff.es : diff.en;
  const isFav = isFavorite(tour.id);

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ height: '380px' }}
      >
        {/* Background Image - fills entire card */}
        {!imgError ? (
          <Image
            src={tour.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600" />
        )}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent transition-all duration-500 group-hover:via-black/70" />

        {/* Top bar - duration + favorite */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-3 sm:p-4">
          {/* Duration badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Clock className="w-3.5 h-3.5 text-white/90" />
            <span className="text-[11px] sm:text-xs font-semibold text-white/90 tracking-wide">
              {tour.duration} {t.tours.days}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(tour.id); }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label={isFav ? t.tours.removeFromFavorites : t.tours.addToFavorites}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-white/80'}`} />
          </button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 pt-16">
          {/* Difficulty tag */}
          <span className={`inline-block text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full px-2.5 py-0.5 mb-2 ${diff.cls}`}>
            {diffLabel}
          </span>

          {/* Tour name */}
          <h3 className="font-playfair text-lg sm:text-xl font-bold text-white leading-tight mb-2 group-hover:text-[#D6B37F] transition-colors duration-300">
            {name}
          </h3>

          {/* Includes chips - only on sm+ */}
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
            {includes.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {item}
              </span>
            ))}
            {includes.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: 'rgba(214,179,127,0.15)', color: '#D6B37F' }}>
                +{includes.length - 3}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-3 transition-colors duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

          {/* Price + CTA */}
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40">{t.tours.price}</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl sm:text-2xl font-black font-playfair" style={{ color: '#D6B37F' }}>
                  ${Math.round(tour.priceUSD)}
                </span>
                <span className="text-[10px] text-white/40">{t.tours.perPerson}</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setBookingOpen(true); }}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 active:scale-95 shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D6B37F'; e.currentTarget.style.color = '#0F0F0F'; e.currentTarget.style.borderColor = '#D6B37F'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              {t.tours.bookNow}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          tour={tour}
          locale={locale}
          open={bookingOpen}
          onOpenChange={setBookingOpen}
        />
      )}
    </>
  );
}
