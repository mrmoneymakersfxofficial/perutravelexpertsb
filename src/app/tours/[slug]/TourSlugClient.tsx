'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  MapPin,
  Mountain,
} from 'lucide-react';
import TourSubpageHeroUltimate from '@/components/TourSubpageHeroUltimate';
import TourInfoTabs from '@/components/TourInfoTabs';
import TourImageGallery from '@/components/TourImageGallery';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/BookingModal';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { tours, destinations, tourToView, getRelatedTours } from '@/lib/tours-data';
import type { TourData } from '@/lib/tours-data';

interface TourSlugClientProps {
  tour: TourData | null | undefined;
}

export default function TourSlugClient({ tour }: TourSlugClientProps) {
  const { t, locale } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { anyModalOpen, bookingOpen, setBookingOpen } = useModal();

  // ── 404 State ──
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-center px-4">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            {locale === 'es' ? 'Tour no encontrado' : 'Tour not found'}
          </h1>
          <p className="text-white/50 mb-6 text-sm sm:text-base">
            {locale === 'es'
              ? 'Lo sentimos, el tour que buscas no existe o ha sido removido.'
              : 'Sorry, the tour you are looking for does not exist or has been removed.'}
          </p>
          <Link href="/tours">
            <Button className="rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide" style={{ backgroundColor: '#C5A55A', color: '#0F0F0F' }}>
              <ArrowRight className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Ver todos los tours' : 'View all tours'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Derived Data ──
  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const isFav = isFavorite(tour.id);
  const related = getRelatedTours(tour.id, tour.destination, 3);

  const destination = destinations.find((d) => d.slug === tour.destination);
  const destName = destination
    ? locale === 'es' ? destination.nameEs : destination.nameEn
    : tour.destination;

  const diffConfig: Record<string, { es: string; en: string }> = {
    beginner: { es: 'Principiante', en: 'Beginner' },
    moderate: { es: 'Moderado', en: 'Moderate' },
    advanced: { es: 'Avanzado', en: 'Advanced' },
  };
  const diffLabel = locale === 'es' ? diffConfig[tour.difficulty].es : diffConfig[tour.difficulty].en;

  const whatsappMessage = `Hola, estoy en la web revisando el tour "${name}" y deseo reservar.`;

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">

      {/* ══════════════════════════════════════════════
          100dvh FULL-VIEWPORT IMMERSIVE HERO
         ══════════════════════════════════════════════ */}
      <TourSubpageHeroUltimate
        title={name}
        bgImage={tour.image}
        destination={destName}
        duration={`${tour.duration} ${t.tours.days}`}
        level={diffLabel}
        price={tour.priceUSD}
        highSeasonPrice={tour.highSeasonPrice}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Tours' : 'Tours', href: '/tours' },
          { label: name },
        ]}
      />

      {/* ══════════════════════════════════════════════
          MAIN CONTENT — DARK THEME
         ══════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">

            {/* ═══ LEFT COLUMN (70%) ═══ */}
            <div className="lg:col-span-2 space-y-10 sm:space-y-12">

              {/* 1. Description */}
              <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
                  {locale === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <div className="h-[2px] w-16 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{description}</p>
              </motion.div>

              {/* 2. Image Gallery with Lightbox */}
              {tour.gallery && tour.gallery.length > 0 && (
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <TourImageGallery images={tour.gallery} title={name} />
                </motion.div>
              )}

              {/* 3. Tour Info Tabs (Itinerary / Includes / Policies) */}
              <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <TourInfoTabs
                  includes={includes}
                  excludes={locale === 'es'
                    ? ['Propinas voluntarias', 'Bebidas adicionales', 'Seguro de viaje personal', 'Souvenirs en mercados']
                    : ['Voluntary tips', 'Additional drinks', 'Personal travel insurance', 'Souvenirs at markets']}
                  policies={locale === 'es'
                    ? ['Cancelación gratuita hasta 48 horas antes del inicio de la experiencia.', 'Modificaciones de fecha permitidas sujetas a disponibilidad.', 'No presentarse (No Show) se penaliza con el 100%.']
                    : ['Free cancellation up to 48 hours before the experience.', 'Date changes allowed subject to availability.', 'No Show incurs a 100% penalty.']}
                />
              </motion.div>
            </div>

            {/* ═══ RIGHT COLUMN (30%) — Desktop Sticky ═══ */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl p-6 border border-white/[0.08] bg-[#141414]">
                  <div className="text-center mb-6">
                    <p className="text-sm text-white/50 mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair text-[#C5A55A]">${Math.round(tour.priceUSD)}</p>
                    <p className="text-xs text-white/40">{t.tours.perPerson}</p>
                    {tour.highSeasonPrice && (
                      <p className="text-xs text-white/30 mt-1">({locale === 'es' ? 'Temporada alta' : 'High season'}: ${Math.round(tour.highSeasonPrice)})</p>
                    )}
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-1.5"><Clock className="w-4 h-4" />{t.tours.duration}</span>
                      <span className="font-medium text-white">{tour.duration} {t.tours.days}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-1.5"><Mountain className="w-4 h-4" />{t.tours.difficulty}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md text-[#C5A55A] bg-[#C5A55A]/10 font-medium">{diffLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-1.5"><MapPin className="w-4 h-4" />{locale === 'es' ? 'Destino' : 'Destination'}</span>
                      <span className="font-medium text-white">{destName}</span>
                    </div>
                  </div>
                  <Button onClick={() => setBookingOpen(true)} className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200" style={{ backgroundColor: '#C5A55A', color: '#0F0F0F' }}>
                    {t.tourDetail.bookThisTour}
                  </Button>
                  <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-colors" style={{ backgroundColor: '#25D366', color: '#fff' }}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
                <div className="rounded-2xl p-6 border border-white/[0.08] bg-[#141414]">
                  <h3 className="font-playfair text-lg font-bold mb-3 text-white">{locale === 'es' ? 'Navegación' : 'Navigation'}</h3>
                  <nav className="space-y-2">
                    <Link href="/tours" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A55A] transition-colors"><ChevronRight className="w-4 h-4" />{locale === 'es' ? 'Volver a Tours' : 'Back to Tours'}</Link>
                    <Link href="/our-tours" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A55A] transition-colors"><ChevronRight className="w-4 h-4" />{t.tourDetail.ourDestinations}</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Info Panel ── */}
      <section className="lg:hidden py-6 sm:py-8 bg-[#0A0A0A]" style={{ borderTop: '1px solid rgba(197,165,90,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl p-4 sm:p-6 border border-white/[0.08] bg-[#141414]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-xs sm:text-sm text-white/50 mb-0.5">{t.tours.price}</p>
                <p className="text-2xl sm:text-3xl font-bold font-playfair text-[#C5A55A]">${Math.round(tour.priceUSD)}</p>
                <p className="text-[10px] sm:text-xs text-white/40">{t.tours.perPerson}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs px-2 py-0.5 rounded-md text-[#C5A55A] bg-[#C5A55A]/10 font-medium">{diffLabel}</span>
                <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs text-[#C5A55A] bg-white/[0.04]"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{tour.duration} {t.tours.days}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50"><Mountain className="w-4 h-4 text-[#C5A55A]" />{diffLabel}</div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50"><MapPin className="w-4 h-4 text-[#C5A55A]" />{destName}</div>
            </div>
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-colors" style={{ backgroundColor: '#25D366', color: '#fff' }}><MessageCircle className="w-4 h-4" />WhatsApp</a>
              <Button onClick={() => setBookingOpen(true)} className="flex-1 h-11 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-all duration-200" style={{ backgroundColor: '#C5A55A', color: '#0F0F0F' }}>{t.tours.bookNow}</Button>
            </div>
            <nav className="space-y-1.5 sm:space-y-2">
              <Link href="/tours" className="flex items-center gap-2 text-xs sm:text-sm text-white/50 hover:text-[#C5A55A] transition-colors"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{locale === 'es' ? 'Volver a Tours' : 'Back to Tours'}</Link>
              <Link href="/our-tours" className="flex items-center gap-2 text-xs sm:text-sm text-white/50 hover:text-[#C5A55A] transition-colors"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{t.tourDetail.ourDestinations}</Link>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA Bar ── */}
      <AnimatePresence>
        {!anyModalOpen && (
          <motion.div key="sticky-cta" initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} className="lg:hidden fixed bottom-0 left-0 right-0 z-[9997] px-3 sm:px-4 py-2.5 sm:py-3" style={{ backgroundColor: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(197,165,90,0.1)', paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}>
            <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
              <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none sm:px-5 flex items-center justify-center gap-1.5 sm:gap-2 h-10 sm:h-11 rounded-full text-xs sm:text-[13px] font-semibold shadow-lg transition-colors" style={{ backgroundColor: '#25D366', color: '#fff' }}><MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span className="hidden sm:inline">WhatsApp</span></a>
              <Button onClick={() => setBookingOpen(true)} className="flex-1 sm:flex-none sm:px-5 h-10 sm:h-11 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-lg" style={{ backgroundColor: '#C5A55A', color: '#0F0F0F' }}>{t.tours.bookNow}</Button>
              <button onClick={() => toggleFavorite(tour.id)} className="w-10 h-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center border transition-colors shrink-0" style={{ borderColor: isFav ? '#ef4444' : 'rgba(197,165,90,0.2)', backgroundColor: isFav ? 'rgba(239,68,68,0.1)' : 'rgba(197,165,90,0.05)' }}>
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-[#C5A55A]'}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Related Tours ── */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-[#0F0F0F]" style={{ borderTop: '1px solid rgba(197,165,90,0.1)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white">{t.tourDetail.relatedTours}</h2>
              <div className="w-16 sm:w-20 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {related.map((relTour) => (
                <Link key={relTour.id} href={`/tours/${relTour.slug}`} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/[0.06]">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image src={relTour.image} alt={locale === 'es' ? relTour.nameEs : relTour.nameEn} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-playfair font-bold text-sm sm:text-base line-clamp-1">{locale === 'es' ? relTour.nameEs : relTour.nameEn}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#C5A55A] font-bold text-xs sm:text-sm">${Math.round(relTour.priceUSD)}</span>
                        <span className="text-white/50 text-[10px] sm:text-xs">{relTour.duration} {t.tours.days}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Booking Modal ── */}
      {bookingOpen && (
        <BookingModal tour={tourToView(tour)} locale={locale} open={bookingOpen} onOpenChange={setBookingOpen} />
      )}
    </div>
  );
}
