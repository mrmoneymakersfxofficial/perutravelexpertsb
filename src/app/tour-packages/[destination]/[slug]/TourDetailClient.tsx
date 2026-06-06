'use client';

import React, { useState, use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star, Check, ArrowRight, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
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
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function TourDetailClient({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  const { destination, slug } = use(params);
  const { t, locale } = useLanguage();

  const sectionIds = ['tour-hero', 'tour-content', 'tour-related'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const [bookingOpen, setBookingOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.tourPackages, href: '/tour-packages' },
          { label: destName, href: `/tour-packages/${destination}` },
          { label: name },
        ]}
      />

      {/* Hero Image */}
      <section id="tour-hero" className="relative h-72 sm:h-96 md:h-[500px] overflow-hidden">
        {!imgError ? (
          <Image src={tour.image} alt={name} fill sizes="100vw" className="object-cover" priority onError={() => setImgError(true)} />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientFallbacks[tour.id] || 'from-gray-800 to-gray-600'}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge variant="outline" className={`text-xs ${diff.color}`}>{diffLabel}</Badge>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />{tour.duration} {t.tours.days}
              </div>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-[#8B8680] text-sm">{t.tours.price}</span>
              <span className="text-3xl md:text-4xl font-bold font-playfair text-[#D6B37F]">${Math.round(tour.priceUSD)}</span>
              <span className="text-[#8B8680] text-sm">{t.tours.perPerson}</span>
              {tour.highSeasonPrice && (
                <span className="text-[#8B8680] text-sm ml-2">({locale === 'es' ? 'Temporada alta' : 'High season'}: ${Math.round(tour.highSeasonPrice)})</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section id="tour-content" className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Descripción' : 'Description'}</h2>
                <p className="text-[#8B8680] text-base leading-relaxed">{description}</p>
              </div>
              {tour.gallery && tour.gallery.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.gallery}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tour.gallery.map((img, i) => (
                      <div key={i} className="relative h-48 rounded-xl overflow-hidden">
                        <Image src={img} alt={`${name} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-[#E8D5B5]/[0.04]">
                      <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-sm text-[#1C1C1C]/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {itinerary && itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-playfair text-2xl font-bold mb-6" style={{ color: '#1C1C1C' }}>{t.tourDetail.itinerary}</h2>
                  <div className="space-y-6">
                    {itinerary.map((day) => {
                      const dayTitle = locale === 'es' ? day.titleEs : day.titleEn;
                      const dayDesc = locale === 'es' ? day.descriptionEs : day.descriptionEn;
                      return (
                        <motion.div key={day.day} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#0F0F0F] font-bold text-sm flex-shrink-0">{day.day}</div>
                            <div className="w-0.5 flex-1 bg-[#E8D5B5] mt-2" />
                          </div>
                          <div className="pb-6">
                            <h3 className="font-playfair text-lg font-bold mb-2" style={{ color: '#1C1C1C' }}>{t.tourDetail.day} {day.day}: {dayTitle}</h3>
                            <p className="text-[#8B8680] text-sm leading-relaxed">{dayDesc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-[#E8D5B5]/[0.04]">
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
                  <a href="https://wa.me/51984000000" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm">WhatsApp</a>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-[#E8D5B5]/[0.04]">
                  <h3 className="font-playfair text-lg font-bold mb-3" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Navegación' : 'Navigation'}</h3>
                  <nav className="space-y-2">
                    <Link href={`/tour-packages/${destination}`} className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D6B37F] transition-colors"><ChevronRight className="w-4 h-4" />{t.tourDetail.toursIn} {destName}</Link>
                    <Link href="/tour-packages" className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D6B37F] transition-colors"><ChevronRight className="w-4 h-4" />{t.tourDetail.viewAllTours}</Link>
                    <Link href="/customized-tours" className="flex items-center gap-2 text-sm text-[#8B8680] hover:text-[#D6B37F] transition-colors"><ChevronRight className="w-4 h-4" />{t.customized.title}</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section id="tour-related" className="py-16 md:py-20 border-t border-[#E8D5B5]/20" style={{ backgroundColor: '#F8F6F2' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1C' }}>{t.tourDetail.relatedTours}</h2>
              <div className="w-20 h-0.5 mx-auto gold-gradient" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
