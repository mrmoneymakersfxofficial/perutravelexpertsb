'use client';

import React, { useState, use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star, Check, ArrowRight, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TourCard from '@/components/TourCard';
import BookingModal from '@/components/BookingModal';
import {
  getDestinationBySlug,
  getToursByDestination,
  getRelatedTours,
  tourToView,
} from '@/lib/tours-data';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function TourDetailClient({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  const { destination, slug } = use(params);
  const { t, locale } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { searchOpen, favoritesOpen, detailOpen, bookingOpen, setBookingOpen } = useModal();

  const sectionIds = ['tour-hero', 'tour-content', 'tour-related'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const [imgError, setImgError] = useState(false);

  const dest = getDestinationBySlug(destination);
  const destTours = getToursByDestination(destination);
  const tour = destTours.find(t => t.slug === slug);

  if (!tour || !dest) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#1C1C1C' }}>
            {locale === 'es' ? 'Tour no encontrado' : 'Tour not found'}
          </h1>
          <Link href="/tour-packages">
            <Button className="btn-gold rounded-full px-6 mt-4">{t.tourDetail.viewAllTours}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const itinerary = locale === 'es' ? tour.itineraryEs : tour.itineraryEn;
  const destName = locale === 'es' ? dest.nameEs : dest.nameEn;
  const related = getRelatedTours(tour.id, destination, 3);
  const isFav = isFavorite(tour.id);

  const diffConfig: Record<string, { es: string; en: string; color: string }> = {
    beginner: { es: 'Principiante', en: 'Beginner', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    moderate: { es: 'Moderado', en: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    advanced: { es: 'Avanzado', en: 'Advanced', color: 'bg-red-100 text-red-800 border-red-200' },
  };
  const diff = diffConfig[tour.difficulty];
  const diffLabel = locale === 'es' ? diff.es : diff.en;

  const gradientFallbacks: Record<string, string> = {
    'city-tour-cusco': 'from-amber-800 to-orange-600',
    'valle-sagrado': 'from-green-800 to-lime-600',
    'machu-picchu': 'from-emerald-800 to-teal-600',
    'montana-colores': 'from-rose-800 to-violet-600',
    'lake-humantay': 'from-cyan-800 to-blue-600',
    'inka-trail-2d': 'from-stone-800 to-amber-700',
    'inka-trail-4d': 'from-stone-800 to-amber-700',
    'inka-trail-5d': 'from-stone-800 to-amber-700',
    'full-day-titikaka-lake': 'from-blue-800 to-cyan-600',
    'home-stay-2d-1n': 'from-blue-800 to-cyan-600',
    'amazon-3d-2n': 'from-green-800 to-emerald-600',
    'amazon-4d-3n': 'from-green-800 to-emerald-600',
    'city-tour-arequipa': 'from-gray-800 to-white/20',
    'colca-canyon-2d': 'from-red-800 to-amber-600',
    'ica-2d-1n': 'from-amber-700 to-yellow-500',
    'ica-3d-2n': 'from-amber-700 to-yellow-500',
  };

  const whatsappMessage = `Hola, me interesa el tour "${name}" ($${tour.priceUSD} USD). ¿Podrían darme más información?`;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      {/* ── Full-Bleed Immersive Hero (70vh) ── */}
      <ImmersiveHero
        title={name}
        bgImage={tour.image}
        height="70vh"
        bottomColor="#F8F6F2"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages, href: '/tour-packages' },
          { label: destName, href: `/tour-packages/${destination}` },
          { label: name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Badge variant="outline" className={`text-[10px] sm:text-xs ${diff.color}`}>{diffLabel}</Badge>
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{tour.duration} {t.tours.days}
          </div>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-white/50 text-xs sm:text-sm">{t.tours.price}</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair" style={{ color: '#D4A843' }}>${Math.round(tour.priceUSD)}</span>
          <span className="text-white/50 text-xs sm:text-sm">{t.tours.perPerson}</span>
          {tour.highSeasonPrice && (
            <span className="text-white/40 text-xs sm:text-sm ml-1 sm:ml-2">({locale === 'es' ? 'Temporada alta' : 'High season'}: ${Math.round(tour.highSeasonPrice)})</span>
          )}
        </div>
      </ImmersiveHero>

      {/* Content */}
      <section id="tour-content" className="py-8 sm:py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8 sm:mb-10">
                <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Descripción' : 'Description'}</h2>
                <p className="text-[#8B8680] text-sm sm:text-base leading-relaxed">{description}</p>
              </div>
              {tour.gallery && tour.gallery.length > 0 && (
                <div className="mb-8 sm:mb-10">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.gallery}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {tour.gallery.map((img, i) => (
                      <div key={i} className="relative h-36 sm:h-44 md:h-48 rounded-lg sm:rounded-xl overflow-hidden">
                        <Image src={img} alt={`${name} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-8 sm:mb-10">
                <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-[#E8CC6A]/[0.04]">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#1C1C1C]/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {itinerary && itinerary.length > 0 && (
                <div className="mb-8 sm:mb-10">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1C1C1C' }}>{t.tourDetail.itinerary}</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {itinerary.map((day) => {
                      const dayTitle = locale === 'es' ? day.titleEs : day.titleEn;
                      const dayDesc = locale === 'es' ? day.descriptionEs : day.descriptionEn;
                      return (
                        <motion.div key={day.day} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex gap-3 sm:gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gold-gradient flex items-center justify-center text-[#0F0F0F] font-bold text-xs sm:text-sm flex-shrink-0">{day.day}</div>
                            <div className="w-0.5 flex-1 bg-[#E8CC6A] mt-1.5 sm:mt-2" />
                          </div>
                          <div className="pb-4 sm:pb-6">
                            <h3 className="font-playfair text-base sm:text-lg font-bold mb-1.5 sm:mb-2" style={{ color: '#1C1C1C' }}>{t.tourDetail.day} {day.day}: {dayTitle}</h3>
                            <p className="text-[#8B8680] text-xs sm:text-sm leading-relaxed">{dayDesc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-[#E8CC6A]/[0.04]">
                  <div className="text-center mb-6">
                    <p className="text-sm text-[#8B8680] mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(tour.priceUSD)}</p>
                    <p className="text-xs text-[#8B8680]">{t.tours.perPerson}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8B8680]">{t.tours.duration}</span>
                      <span className="font-medium" style={{ color: '#1C1C1C' }}>{tour.duration} {t.tours.days}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8B8680]">{t.tours.difficulty}</span>
                      <Badge variant="outline" className={`text-xs ${diff.color}`}>{diffLabel}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8B8680]">{locale === 'es' ? 'Destino' : 'Destination'}</span>
                      <span className="font-medium" style={{ color: '#1C1C1C' }}>{destName}</span>
                    </div>
                  </div>
                  <Button onClick={() => setBookingOpen(true)} className="btn-gold rounded-full w-full py-3 text-base">{t.tourDetail.bookThisTour}</Button>
                  <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm">WhatsApp</a>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-[#E8CC6A]/[0.04]">
                  <h3 className="font-playfair text-lg font-bold mb-3" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Navegación' : 'Navigation'}</h3>
                  <nav className="space-y-2">
                    <Link href={`/tour-packages/${destination}`} className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-4 h-4" />{t.tourDetail.toursIn} {destName}</Link>
                    <Link href="/tour-packages" className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-4 h-4" />{t.tourDetail.viewAllTours}</Link>
                    <Link href="/customized-tours" className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-4 h-4" />{t.customized.title}</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Info Panel (shown only on mobile/tablet, before related tours) */}
      <section className="lg:hidden py-6 sm:py-8 border-t border-[#E8CC6A]/20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white/[0.02] rounded-2xl p-4 sm:p-6 border border-[#E8CC6A]/[0.04]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-xs sm:text-sm text-[#8B8680] mb-0.5">{t.tours.price}</p>
                <p className="text-2xl sm:text-3xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(tour.priceUSD)}</p>
                <p className="text-[10px] sm:text-xs text-[#8B8680]">{t.tours.perPerson}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Badge variant="outline" className={`text-[10px] sm:text-xs ${diff.color}`}>{diffLabel}</Badge>
                <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full glass-card text-white text-[10px] sm:text-xs">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{tour.duration} {t.tours.days}
                </div>
              </div>
            </div>
            <nav className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              <Link href={`/tour-packages/${destination}`} className="flex items-center gap-2 text-xs sm:text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{t.tourDetail.toursIn} {destName}</Link>
              <Link href="/tour-packages" className="flex items-center gap-2 text-xs sm:text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{t.tourDetail.viewAllTours}</Link>
              <Link href="/customized-tours" className="flex items-center gap-2 text-xs sm:text-sm text-[#8B8680] hover:text-[#D4A843] transition-colors"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{t.customized.title}</Link>
            </nav>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA Bar - hides when modals open */}
      <AnimatePresence>
        {!searchOpen && !favoritesOpen && !detailOpen && !bookingOpen && (
          <motion.div
            key="sticky-cta"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[9997] px-3 sm:px-4 py-2.5 sm:py-3"
            style={{ backgroundColor: 'rgba(248,246,242,0.97)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(212,168,67,0.1)', paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
              <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none sm:px-5 flex items-center justify-center gap-1.5 sm:gap-2 h-10 sm:h-11 rounded-full text-xs sm:text-[13px] font-semibold bg-[#25D366] hover:bg-[#1ebe57] text-white transition-colors shadow-lg">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <Button onClick={() => setBookingOpen(true)} className="flex-1 sm:flex-none sm:px-5 h-10 sm:h-11 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-lg" style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}>
                {t.tours.bookNow}
              </Button>
              <button onClick={() => toggleFavorite(tour.id)} className="w-10 h-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center border transition-colors shrink-0" style={{ borderColor: isFav ? '#ef4444' : 'rgba(212,168,67,0.2)', backgroundColor: isFav ? 'rgba(239,68,68,0.1)' : 'rgba(212,168,67,0.05)' }}>
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-[#D4A843]'}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {related.length > 0 && (
        <section id="tour-related" className="py-12 sm:py-16 md:py-20 border-t border-[#E8CC6A]/20" style={{ backgroundColor: '#F8F6F2' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" style={{ color: '#1C1C1C' }}>{t.tourDetail.relatedTours}</h2>
              <div className="w-16 sm:w-20 h-0.5 mx-auto gold-gradient" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {related.map((relTour) => (
                <TourCard key={relTour.id} tour={tourToView(relTour)} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {bookingOpen && <BookingModal tour={tourToView(tour)} locale={locale} open={bookingOpen} onOpenChange={setBookingOpen} />}
    </div>
  );
}
