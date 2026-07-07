'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Heart, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedTours, type TourData } from '@/lib/tours-data';
import { getWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';

const difficultyConfig = {
  beginner: { es: 'Principiante', en: 'Beginner', color: 'rgba(16,185,129,0.9)', border: 'rgba(16,185,129,0.3)' },
  moderate:  { es: 'Moderado',    en: 'Moderate',  color: 'rgba(245,158,11,0.9)', border: 'rgba(245,158,11,0.3)' },
  advanced:  { es: 'Avanzado',    en: 'Advanced',  color: 'rgba(239,68,68,0.9)', border: 'rgba(239,68,68,0.3)' },
} as const;

interface FeaturedToursSectionProps {
  /** Tours desde Sanity (opcional). Si no hay, usa datos locales. */
  sanityTours?: TourData[] | null;
}

export default function FeaturedToursSection({ sanityTours }: FeaturedToursSectionProps) {
  const { t, locale } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const featuredTours = (sanityTours && sanityTours.length > 0)
    ? sanityTours.slice(0, 6)
    : getFeaturedTours().slice(0, 6);

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

        {/* Deluxe Immersive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14">
          {featuredTours.map((tour, index) => {
            const name = locale === 'es' ? tour.nameEs : tour.nameEn;
            const desc = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
            const diff = difficultyConfig[tour.difficulty];
            const diffLabel = locale === 'es' ? diff.es : diff.en;
            const isFav = isFavorite(tour.id);
            const waMsg = `Hola, estoy en la web revisando el tour "${name}" y deseo reservar.`;
            const destName = locale === 'es'
              ? { cusco: 'Cusco', puno: 'Puno', amazon: 'Amazonía', arequipa: 'Arequipa', 'lima-ica': 'Lima-Ica' }[tour.destination]
              : tour.destination;

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/tours/${tour.slug}`} className="block group">
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer"
                    style={{ height: '480px', border: '1px solid rgba(212,168,67,0.06)' }}
                  >
                    {/* Background Image - fills entire card */}
                    <Image
                      src={tour.image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                    />

                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/40 to-[#0F0F0F]/10 transition-all duration-500 group-hover:via-[#0F0F0F]/60 group-hover:from-[#0F0F0F]/95" />

                    {/* Top bar - destination + favorite */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        {/* Destination badge */}
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase"
                          style={{
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.85)',
                          }}
                        >
                          <MapPin className="w-3 h-3" style={{ color: '#D4A843' }} />
                          {destName}
                        </div>
                        {/* Duration */}
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide"
                          style={{
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.85)',
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          {tour.duration} {t.tours.days}
                        </div>
                      </div>

                      {/* Favorite button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tour.id); }}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        aria-label={isFav ? t.tours.removeFromFavorites : t.tours.addToFavorites}
                      >
                        <Heart className={`w-4 h-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-white/80'}`} />
                      </button>
                    </div>

                    {/* Bottom content - hover reveals more */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 transition-all duration-500">
                      {/* Difficulty tag */}
                      <span
                        className="inline-block text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase rounded-full px-2.5 py-1 mb-3"
                        style={{ color: diff.color, background: `${diff.border}`, border: `1px solid ${diff.border}` }}
                      >
                        {diffLabel}
                      </span>

                      {/* Tour name */}
                      <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#D4A843] transition-colors duration-300">
                        {name}
                      </h3>

                      {/* Description - hidden by default, revealed on hover */}
                      <p className="text-[12px] sm:text-[13px] leading-relaxed text-white/0 group-hover:text-white/60 transition-all duration-500 line-clamp-2 mb-4">
                        {desc}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-px mb-4 transition-colors duration-300" style={{ backgroundColor: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.1)' }} />

                      {/* Price + CTA */}
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.2em] text-white/30">{t.tours.price}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black font-playfair" style={{ color: '#D4A843' }}>
                              ${Math.round(tour.priceUSD)}
                            </span>
                            <span className="text-[10px] text-white/30">{t.tours.perPerson}</span>
                          </div>
                          {tour.highSeasonPrice && (
                            <span className="text-[9px] text-white/25">
                              {locale === 'es' ? 'Temp. alta: ' : 'High: '} ${Math.round(tour.highSeasonPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* WhatsApp CTA */}
                          <a
                            href={getWhatsAppLink(waMsg)}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                            style={{ backgroundColor: '#25D366' }}
                          >
                            <MessageCircle className="w-4 h-4 text-white" />
                          </a>
                          {/* View Details CTA */}
                          <span
                            className="h-10 px-5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                            style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
                          >
                            {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA — Centered */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tours">
            <Button className="btn-gold rounded-full px-8 py-3 text-base tracking-wide flex items-center gap-2">
              {t.home.viewAllPackages}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/tour-packages">
            <Button
              variant="ghost"
              className="btn-white-premium rounded-full px-8 py-3 text-base tracking-wide flex items-center gap-2"
            >
              {locale === 'es' ? 'Paquetes de Tours' : 'Tour Packages'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
