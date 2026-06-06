'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, MapPin, ChevronLeft, ChevronRight, MessageCircle, Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useRecentlyViewed } from '@/components/RecentlyViewedProvider';
import { ShareTour } from '@/components/ShareTour';
import type { TourData } from '@/lib/tours-data';
import BookingModal from '@/components/BookingModal';
import { tourToView } from '@/lib/tours-data';

interface TourDetailModalProps { tour: TourData | null; open: boolean; onOpenChange: (open: boolean) => void; }

const difficultyConfig = {
  beginner: { es: 'Principiante', en: 'Beginner', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  moderate: { es: 'Moderado', en: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  advanced: { es: 'Avanzado', en: 'Advanced', color: 'bg-red-100 text-red-800 border-red-200' },
} as const;

export default function TourDetailModal({ tour, open, onOpenChange }: TourDetailModalProps) {
  const { locale, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addViewed } = useRecentlyViewed();
  const [bookingOpen, setBookingOpen] = useState(false);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (tour && open) addViewed(tour.id); }, [tour, open, addViewed]);
  if (!tour) return null;

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const itinerary = locale === 'es' ? tour.itineraryEs : tour.itineraryEn;
  const diff = difficultyConfig[tour.difficulty];
  const diffLabel = locale === 'es' ? diff.es : diff.en;
  const isFav = isFavorite(tour.id);
  const heartClass = 'w-5 h-5 transition-colors ' + (isFav ? 'text-red-500 fill-red-500' : 'text-[#8B8680]');
  const galleryImages = tour.gallery?.length ? [tour.image, ...tour.gallery] : [tour.image];

  const whatsappMessage = encodeURIComponent(`Hola, me interesa el tour "${name}" ($${tour.priceUSD} USD). ¿Podrían darme más información?`);
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) galleryScrollRef.current.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const Content = (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" ref={galleryScrollRef}>
          {galleryImages.map((img, idx) => (
            <div key={idx} className="relative w-full min-w-[280px] h-56 sm:h-64 rounded-xl overflow-hidden shrink-0">
              <Image src={img} alt={`${name} - ${idx + 1}`} fill sizes="400px" className="object-cover" />
            </div>
          ))}
        </div>
        {galleryImages.length > 1 && (
          <>
            <button onClick={() => scrollGallery('left')} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"><ChevronLeft className="w-4 h-4 text-white" /></button>
            <button onClick={() => scrollGallery('right')} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"><ChevronRight className="w-4 h-4 text-white" /></button>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className={`text-xs ${diff.color}`}>{diffLabel}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-[#8B8680]"><Clock className="w-4 h-4" />{tour.duration} {t.tours.days}</span>
        <span className="flex items-center gap-1.5 text-sm text-[#8B8680]"><MapPin className="w-4 h-4" />{(t.nav as Record<string, string>)[tour.destination] || tour.destination}</span>
      </div>
      <p className="text-sm text-[#8B8680] leading-relaxed">{description}</p>
      <div>
        <h4 className="font-playfair font-semibold text-sm mb-3" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">{includes.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-[#8B8680]"><Check className="w-4 h-4 text-[#D6B37F] shrink-0 mt-0.5" /><span>{item}</span></li>
        ))}</ul>
      </div>
      {itinerary && itinerary.length > 0 && (
        <div>
          <h4 className="font-playfair font-semibold text-sm mb-3" style={{ color: '#1C1C1C' }}>{t.tourDetail.itinerary}</h4>
          <Accordion type="single" collapsible className="space-y-2">
            {itinerary.map((day, idx) => {
              const title = locale === 'es' ? day.titleEs : day.titleEn;
              const desc = locale === 'es' ? day.descriptionEs : day.descriptionEn;
              return (
                <AccordionItem key={idx} value={`day-${idx}`} className="border border-[#E8D5B5]/20 rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                    <span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ backgroundColor: '#D6B37F' }}>{day.day}</span>{title}</span>
                  </AccordionTrigger>
                  <AccordionContent><p className="text-sm text-[#8B8680] leading-relaxed pl-8">{desc}</p></AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8D5B5]/20">
        <div>
          <div className="flex items-baseline gap-1"><span className="text-xs text-[#8B8680]">{t.tours.price}</span><span className="text-2xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(tour.priceUSD)}</span></div>
          <span className="text-xs text-[#8B8680]">{t.tours.perPerson}</span>
          {tour.highSeasonPrice && <p className="text-[11px] text-[#8B8680] mt-0.5">{locale === 'es' ? 'Temporada alta: ' : 'High season: '}<span className="font-medium">${Math.round(tour.highSeasonPrice)}</span></p>}
        </div>
        <div className="flex items-center gap-2">
          <a href={`https://wa.me/51984000000?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-semibold bg-[#25D366] hover:bg-[#1ebe57] text-white transition-colors shadow-lg"><MessageCircle className="w-4 h-4" />WhatsApp</a>
          <Button onClick={() => setBookingOpen(true)} className="h-10 px-5 rounded-full text-[13px] font-semibold transition-all duration-200 shadow-lg" style={{ backgroundColor: '#D6B37F', color: '#0F0F0F' }}>{t.tours.bookNow}</Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="hidden md:block max-w-3xl max-h-[85vh] overflow-y-auto p-6 rounded-2xl" style={{ backgroundColor: '#F8F6F2' }}>
          <div className="flex items-start justify-between mb-2">
            <DialogHeader><DialogTitle className="font-playfair text-2xl font-bold" style={{ color: '#1C1C1C' }}>{name}</DialogTitle></DialogHeader>
            <div className="flex items-center gap-2 shrink-0">
              <ShareTour tourName={name} tourSlug={tour.slug} />
              <button onClick={() => toggleFavorite(tour.id)} className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Heart className={heartClass} />
              </button>
            </div>
          </div>
          {Content}
        </DialogContent>
      </Dialog>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="md:hidden h-[90vh] rounded-t-2xl overflow-y-auto p-5 pb-8" style={{ backgroundColor: '#F8F6F2' }}>
          <SheetHeader>
            <div className="flex items-start justify-between pr-6">
              <SheetTitle className="font-playfair text-xl font-bold" style={{ color: '#1C1C1C' }}>{name}</SheetTitle>
              <div className="flex items-center gap-1">
                <ShareTour tourName={name} tourSlug={tour.slug} />
                <button onClick={() => toggleFavorite(tour.id)} className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Heart className={heartClass} />
                </button>
              </div>
            </div>
          </SheetHeader>
          <div className="mt-4">{Content}</div>
        </SheetContent>
      </Sheet>
      {bookingOpen && tour && (
        <BookingModal tour={tourToView(tour)} locale={locale} open={bookingOpen} onOpenChange={setBookingOpen} />
      )}
    </>
  );
}
