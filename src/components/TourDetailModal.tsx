'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { getWhatsAppLink } from '@/lib/whatsapp';

interface TourDetailModalProps { tour: TourData | null; open: boolean; onOpenChange: (open: boolean) => void; }

const diffCfg = {
  beginner: { es: 'Principiante', en: 'Beginner', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  moderate:  { es: 'Moderado',    en: 'Moderate',  cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  advanced:  { es: 'Avanzado',    en: 'Advanced',  cls: 'bg-red-50 text-red-700 border-red-200' },
} as const;

export default function TourDetailModal({ tour, open, onOpenChange }: TourDetailModalProps) {
  const { locale, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addViewed } = useRecentlyViewed();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => { if (tour && open) addViewed(tour.id); }, [tour, open, addViewed]);
  if (!tour) return null;

  const name        = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes    = locale === 'es' ? tour.includesEs : tour.includesEn;
  const itinerary   = locale === 'es' ? tour.itineraryEs : tour.itineraryEn;
  const diff = diffCfg[tour.difficulty] || diffCfg.beginner;
  const diffLabel   = locale === 'es' ? diff.es : diff.en;
  const isFav       = isFavorite(tour.id);
  const images      = tour.gallery?.length ? [tour.image, ...tour.gallery] : [tour.image];
  const destName    = (t.nav as Record<string, string>)[tour.destination] || tour.destination;
  const waMsg = `Hola, me interesa el tour "${name}" ($${tour.priceUSD} USD). ¿Podrían darme más información?`;

  const scroll = (dir: 'left' | 'right') => {
    galleryRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  /* ───── Gallery ───── */
  const Gallery = (
    <div className="relative -mx-5 sm:-mx-6 md:mx-0">
      <div
        ref={galleryRef}
        className="flex gap-2 overflow-x-auto px-5 sm:px-6 md:px-0 scrollbar-hide snap-x snap-mandatory"
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-[260px] sm:w-[300px] md:w-full md:min-w-0 h-[180px] sm:h-[220px] md:h-[260px] rounded-lg sm:rounded-xl overflow-hidden shrink-0 snap-start">
            <Image src={img} alt={`${name} ${i + 1}`} fill sizes="400px" className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={() => scroll('left')}  className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-card flex items-center justify-center z-10 active:scale-90 transition-transform"><ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /></button>
          <button onClick={() => scroll('right')} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-card flex items-center justify-center z-10 active:scale-90 transition-transform"><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /></button>
        </>
      )}
    </div>
  );

  /* ───── Tags ───── */
  const Tags = (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline" className={`text-[10px] sm:text-xs font-medium ${diff.cls}`}>{diffLabel}</Badge>
      <span className="flex items-center gap-1 text-[11px] sm:text-xs" style={{ color: '#8B8680' }}><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{tour.duration} {t.tours.days}</span>
      <span className="flex items-center gap-1 text-[11px] sm:text-xs" style={{ color: '#8B8680' }}><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{destName}</span>
    </div>
  );

  /* ───── Description ───── */
  const Desc = (
    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#8B8680' }}>{description}</p>
  );

  /* ───── Includes ───── */
  const Includes = (
    <div>
      <h4 className="font-playfair font-semibold text-xs sm:text-sm mb-2.5" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs" style={{ color: '#8B8680' }}>
            <Check className="w-3.5 h-3.5 shrink-0 mt-px" style={{ color: '#D4A843' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  /* ───── Itinerary ───── */
  const Itinerary = itinerary && itinerary.length > 0 && (
    <div>
      <h4 className="font-playfair font-semibold text-xs sm:text-sm mb-2.5" style={{ color: '#1C1C1C' }}>{t.tourDetail.itinerary}</h4>
      <Accordion type="single" collapsible className="space-y-1.5">
        {itinerary.map((day, i) => {
          const title = locale === 'es' ? day.titleEs : day.titleEn;
          const desc  = locale === 'es' ? day.descriptionEs : day.descriptionEn;
          return (
            <AccordionItem key={i} value={`d-${i}`} className="rounded-lg px-3" style={{ border: '1px solid rgba(232,213,181,0.15)' }}>
              <AccordionTrigger className="py-2.5 text-[11px] sm:text-xs font-medium" style={{ color: '#1C1C1C' }}>
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: '#D4A843' }}>{day.day}</span>
                  {title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[11px] sm:text-xs leading-relaxed pb-1 pl-7" style={{ color: '#8B8680' }}>{desc}</p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );

  /* ───── Bottom CTA ───── */
  const BottomCTA = (
    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(232,213,181,0.15)' }}>
      <div className="min-w-0 mr-3">
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] sm:text-xs" style={{ color: '#8B8680' }}>{t.tours.price}</span>
          <span className="text-lg sm:text-xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(tour.priceUSD)}</span>
        </div>
        <span className="text-[10px]" style={{ color: '#8B8680' }}>{t.tours.perPerson}</span>
        {tour.highSeasonPrice && (
          <p className="text-[10px] mt-0.5" style={{ color: '#8B8680' }}>
            {locale === 'es' ? 'Temp. alta: ' : 'High season: '}<span className="font-medium">${Math.round(tour.highSeasonPrice)}</span>
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={getWhatsAppLink(waMsg)}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold text-white shadow-md active:scale-95 transition-transform"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <Button
          onClick={() => setBookingOpen(true)}
          className="h-9 sm:h-10 px-4 sm:px-5 rounded-full text-[11px] sm:text-xs font-semibold shadow-md active:scale-95 transition-transform"
          style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
        >
          {t.tours.bookNow}
        </Button>
      </div>
    </div>
  );

  /* ───── Scrollable body content ───── */
  const Body = (
    <div className="space-y-4 sm:space-y-5">
      {Gallery}
      {Tags}
      {Desc}
      {Includes}
      {Itinerary}
      {BottomCTA}
    </div>
  );

  /* ════════════════════════════════════════════
     RENDER — Desktop Dialog + Mobile Sheet
     ════════════════════════════════════════════ */
  return (
    <>
      {/* ── Desktop ── */}
      <Dialog open={open && isDesktop} onOpenChange={onOpenChange}>
        <DialogContent
          className="hidden md:block max-w-[680px] p-0 rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#F8F6F2' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-5 pb-3">
            <DialogHeader>
              <DialogTitle className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: '#1C1C1C' }}>{name}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-1.5 shrink-0 -mt-0.5">
              <ShareTour tourName={name} tourSlug={tour.slug} />
              <button
                onClick={() => toggleFavorite(tour.id)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: isFav ? 'rgba(239,68,68,0.08)' : 'rgba(0,0,0,0.04)' }}
              >
                <Heart className={`w-4 h-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-[#8B8680]'}`} />
              </button>
            </div>
          </div>
          {/* Body */}
          <div className="px-6 pb-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
            {Body}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Mobile Sheet ── */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="md:hidden rounded-t-[28px] overflow-hidden p-0"
          style={{ backgroundColor: '#F8F6F2', maxHeight: '90vh' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-9 h-[3px] rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
          </div>

          <SheetHeader className="sr-only">
            <SheetTitle>{name}</SheetTitle>
          </SheetHeader>

          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-2 pb-3 pr-5">
            <h2 className="font-playfair text-lg font-bold leading-tight flex-1 min-w-0" style={{ color: '#1C1C1C' }}>{name}</h2>
            <div className="flex items-center gap-1 shrink-0 ml-2 -mr-1">
              <ShareTour tourName={name} tourSlug={tour.slug} />
              <button
                onClick={() => toggleFavorite(tour.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: isFav ? 'rgba(239,68,68,0.08)' : 'rgba(0,0,0,0.04)' }}
              >
                <Heart className={`w-4 h-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-[#8B8680]'}`} />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto px-0 scrollbar-hide" style={{ maxHeight: 'calc(90vh - 70px)', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
            {Body}
          </div>
        </SheetContent>
      </Sheet>

      {bookingOpen && tour && (
        <BookingModal tour={tourToView(tour)} locale={locale} open={bookingOpen} onOpenChange={setBookingOpen} />
      )}
    </>
  );
}
