'use client';

import React from 'react';
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
}

export default function FavoritesModal({ open, onOpenChange, onTourSelect }: FavoritesModalProps) {
  const { locale, t } = useLanguage();
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();
  const favoritedTours = tours.filter(tour => favorites.has(tour.id));

  const handleReserve = (tour: TourData) => { onTourSelect?.(tour); onOpenChange(false); };
  const EmptyState = (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(214,179,127,0.1)' }}>
        <Heart className="w-10 h-10" style={{ color: '#D6B37F' }} />
      </div>
      <h3 className="font-playfair text-lg font-semibold mb-2" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Sin favoritos aún' : 'No favorites yet'}</h3>
      <p className="text-sm text-center text-[#8B8680]">{locale === 'es' ? 'Explora nuestros tours y guarda los que más te gusten' : 'Explore our tours and save the ones you like most'}</p>
    </div>
  );

  const TourList = (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
      <AnimatePresence mode="popLayout">
        {favoritedTours.map((tour, index) => {
          const name = locale === 'es' ? tour.nameEs : tour.nameEn;
          const destination = (t.nav as Record<string, string>)[tour.destination] || tour.destination;
          return (
            <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} layout transition={{ delay: index * 0.05 }} onClick={() => handleReserve(tour)} className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors border border-[#E8D5B5]/[0.04]">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0"><Image src={tour.image} alt={name} fill sizes="80px" className="object-cover" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-playfair font-semibold text-sm truncate" style={{ color: '#1C1C1C' }}>{name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-[#8B8680]"><MapPin className="w-3 h-3" />{destination}</span>
                  <span className="flex items-center gap-1 text-xs text-[#8B8680]"><Clock className="w-3 h-3" />{tour.duration} {t.tours.days}</span>
                </div>
                <p className="font-bold text-sm mt-1" style={{ color: '#D6B37F' }}>${tour.priceUSD}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" className="h-9 px-4 rounded-full text-xs font-semibold" style={{ backgroundColor: '#D6B37F', color: '#0F0F0F' }} onClick={(e) => { e.stopPropagation(); handleReserve(tour); }}>{t.tours.bookNow}</Button>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(tour.id); }} className="p-2 rounded-full hover:bg-red-50 transition-colors" aria-label={t.tours.removeFromFavorites}><Trash2 className="w-4 h-4 text-[#8B8680] hover:text-red-500" /></button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="hidden md:block max-w-lg p-6 rounded-2xl" style={{ backgroundColor: '#F8F6F2' }}>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" style={{ color: '#D6B37F' }} />
              <DialogTitle className="font-playfair text-xl font-bold" style={{ color: '#1C1C1C' }}>{t.tours.favorites}</DialogTitle>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(214,179,127,0.15)', color: '#D6B37F' }}>{favoritesCount}</span>
            </div>
          </DialogHeader>
          <div className="mt-4">{favoritedTours.length === 0 ? EmptyState : TourList}</div>
        </DialogContent>
      </Dialog>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="md:hidden rounded-t-2xl overflow-y-auto" style={{ backgroundColor: '#F8F6F2' }}>
          <SheetHeader className="px-5 pt-5 pb-2">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" style={{ color: '#D6B37F' }} />
              <SheetTitle className="font-playfair text-xl font-bold" style={{ color: '#1C1C1C' }}>{t.tours.favorites}</SheetTitle>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(214,179,127,0.15)', color: '#D6B37F' }}>{favoritesCount}</span>
            </div>
          </SheetHeader>
          <div className="px-5 pb-8">{favoritedTours.length === 0 ? EmptyState : TourList}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
