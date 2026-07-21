'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '@/lib/tours-data';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import type { TourData } from '@/lib/tours-data';

interface FavoritesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTourSelect?: (tour: TourData) => void;
  hideSheet?: boolean;
}

export default function FavoritesModal({ open, onOpenChange, onTourSelect, hideSheet }: FavoritesModalProps) {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();
  const favoritedTours = tours.filter(tour => favorites.has(tour.id));

  const handleTourClick = (tour: TourData) => {
    onOpenChange(false);
    router.push(`/tours/${tour.slug}`);
  };

  const EmptyState = (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(212,168,67,0.08)' }}>
        <Heart className="w-7 h-7" style={{ color: 'rgba(212,168,67,0.4)' }} />
      </div>
      <p className="font-playfair text-base font-semibold mb-1.5" style={{ color: '#1C1C1C' }}>
        {locale === 'es' ? 'Sin favoritos aún' : 'No favorites yet'}
      </p>
      <p className="text-xs text-center leading-relaxed" style={{ color: '#8B8680', maxWidth: 220 }}>
        {locale === 'es'
          ? 'Toca el corazón en cualquier tour para guardarlo aquí'
          : 'Tap the heart on any tour to save it here'}
      </p>
    </div>
  );

  /* ───── Tour Item ───── */
  const TourItem = ({ tour, index }: { tour: TourData; index: number }) => {
    const name = locale === 'es' ? tour.nameEs : tour.nameEn;
    const destination = (t.nav as Record<string, string>)[tour.destination] || tour.destination;
    const remove = (e: React.MouseEvent) => { e.stopPropagation(); toggleFavorite(tour.id); };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96, x: -40 }}
        transition={{ duration: 0.2, delay: index * 0.04 }}
        onClick={() => handleTourClick(tour)}
        className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98]"
        style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.12)' }}
      >
        {/* Thumbnail */}
        <div className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden shrink-0">
          <Image src={tour.image} alt={name} fill sizes="72px" className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-playfair font-semibold text-[13px] sm:text-sm truncate" style={{ color: '#1C1C1C' }}>{name}</p>
          <div className="flex items-center gap-2.5 mt-1">
            <span className="flex items-center gap-1 text-[11px]" style={{ color: '#8B8680' }}>
              <MapPin className="w-3 h-3" />{destination}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: '#8B8680' }}>
              <Clock className="w-3 h-3" />{tour.duration} {t.tours.days}
            </span>
          </div>
          <p className="font-bold text-[13px] sm:text-sm mt-1" style={{ color: '#D4A843' }}>
            ${Math.round(tour.priceUSD)}
            <span className="font-normal text-[10px] ml-0.5" style={{ color: '#8B8680' }}>/ {t.tours.perPerson}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            className="h-7 sm:h-8 px-3 sm:px-4 rounded-full text-[10px] sm:text-[11px] font-bold shadow-sm"
            style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
            onClick={(e) => { e.stopPropagation(); handleTourClick(tour); }}
          >
            {t.tours.bookNow}
          </Button>
          <button
            onClick={remove}
            className="p-1.5 rounded-full transition-colors hover:bg-red-50"
            aria-label="Remove"
          >
            <Trash2 className="w-3.5 h-3.5" style={{ color: '#bbb' }} />
          </button>
        </div>
      </motion.div>
    );
  };

  const TourList = (
    <div className="space-y-2 overflow-y-auto px-1 scrollbar-hide" style={{ maxHeight: 'calc(80vh - 140px)' }}>
      <AnimatePresence mode="popLayout">
        {favoritedTours.map((tour, i) => (
          <TourItem key={tour.id} tour={tour} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );

  /* ───── Header ───── */
  const Header = (
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,168,67,0.12)' }}>
          <Heart className="w-4 h-4" style={{ color: '#D4A843' }} />
        </div>
        <div>
          <h2 className="font-playfair text-lg font-bold leading-tight" style={{ color: '#1C1C1C' }}>{t.tours.favorites}</h2>
          {favoritesCount > 0 && (
            <p className="text-[11px] mt-0.5" style={{ color: '#8B8680' }}>
              {favoritesCount} {favoritesCount === 1
                ? (locale === 'es' ? 'tour guardado' : 'tour saved')
                : (locale === 'es' ? 'tours guardados' : 'tours saved')}
            </p>
          )}
        </div>
      </div>
      {favoritesCount > 0 && (
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}>
          {favoritesCount}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop Dialog ── */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="hidden md:block max-w-[440px] p-0 rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#F8F6F2' }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{t.tours.favorites}</DialogTitle>
          </DialogHeader>
          {Header}
          <div className="px-5 pb-5">
            {favoritedTours.length === 0 ? EmptyState : TourList}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Mobile Sheet (hidden when BottomTabModals handles mobile) ── */}
      {!hideSheet && (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="md:hidden rounded-t-[28px] overflow-hidden p-0"
          style={{ backgroundColor: '#F8F6F2', maxHeight: '80vh' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-0">
            <div className="w-9 h-[3px] rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
          </div>
          <SheetHeader className="sr-only">
            <SheetTitle>{t.tours.favorites}</SheetTitle>
          </SheetHeader>
          {Header}
          <div className="px-4 pb-6" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
            {favoritedTours.length === 0 ? EmptyState : TourList}
          </div>
        </SheetContent>
      </Sheet>
      )}
    </>
  );
}
