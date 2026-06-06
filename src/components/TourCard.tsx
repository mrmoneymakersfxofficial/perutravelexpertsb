'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TourView } from '@/lib/types';
import BookingModal from '@/components/BookingModal';

interface TourCardProps {
  tour: TourView;
  locale: string;
}

const difficultyConfig = {
  beginner: {
    es: 'Principiante',
    en: 'Beginner',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  moderate: {
    es: 'Moderado',
    en: 'Moderate',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  advanced: {
    es: 'Avanzado',
    en: 'Advanced',
    color: 'bg-red-100 text-red-800 border-red-200',
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function TourCard({ tour, locale }: TourCardProps) {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const diff = difficultyConfig[tour.difficulty];
  const diffLabel = locale === 'es' ? diff.es : diff.en;
  const isFav = isFavorite(tour.id);

  const gradientFallbacks: Record<string, string> = {
    'machu-picchu-vip': 'from-emerald-800 to-teal-600',
    'city-tour-cusco': 'from-amber-800 to-orange-600',
    'valle-sagrado-full': 'from-green-800 to-lime-600',
    'inca-trail-classic': 'from-stone-800 to-amber-700',
    'rainbow-mountain': 'from-rose-800 to-violet-600',
    'humantay-lagoon': 'from-cyan-800 to-blue-600',
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -3, transition: { duration: 0.3 } }}
        className="group rounded-2xl overflow-hidden transition-all duration-300 bg-white/[0.02] border border-[#E8D5B5]/[0.04]"
      >
        {/* Image */}
        <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden">
          {!imgError ? (
            <Image
              src={tour.image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradientFallbacks[tour.id] || 'from-gray-800 to-gray-600'}`} />
          )}
          <div className="tour-image-overlay absolute inset-0" />

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tour.id);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center z-10 hover:bg-white/20 active:bg-white/30 transition-colors"
            aria-label={isFav ? t.tours.removeFromFavorites : t.tours.addToFavorites}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                isFav ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </button>

          {/* Duration badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full glass-card text-white text-[10px] sm:text-xs font-medium">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {tour.duration} {t.tours.days}
          </div>

          {/* Tour name overlay */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-12 sm:right-12 z-10">
            <h3 className="font-playfair text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg leading-tight">
              {name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 md:p-5 pt-3 sm:pt-4">
          {/* Difficulty */}
          <div className="mb-2 sm:mb-3">
            <Badge variant="outline" className={`text-[10px] sm:text-xs ${diff.color}`}>
              {diffLabel}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-[#8B8680] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {description}
          </p>

          {/* Includes preview */}
          {includes.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {includes.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-[#F8F6F2]/60 text-[#8B8680]"
                  >
                    {item}
                  </span>
                ))}
                {includes.length > 3 && (
                  <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-[#F8F6F2] text-[#8B8680]">
                    +{includes.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2 sm:pt-3">
            <div>
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="text-[10px] sm:text-xs text-[#8B8680]">{t.tours.price}</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>
                  ${Math.round(tour.priceUSD)}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-[#8B8680]">{t.tours.perPerson}</span>
            </div>
            <Button
              onClick={() => setBookingOpen(true)}
              className="btn-gold rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm"
            >
              {t.tours.bookNow}
            </Button>
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
