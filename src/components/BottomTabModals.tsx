'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Share2, Trash2, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { tours } from '@/lib/tours-data';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════════════════
   BOTTOM SHEET: TOUR SEARCH MINI-MODAL (PRO)
   ═══════════════════════════════════════════════════════ */
function SearchMiniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    if (!searchQuery.trim()) return tours.filter((tour) => tour.active);
    const q = searchQuery.toLowerCase();
    return tours.filter(
      (tour) =>
        tour.active &&
        (tour.nameEs.toLowerCase().includes(q) ||
          tour.nameEn.toLowerCase().includes(q) ||
          tour.destination.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-lg bg-[#141414] rounded-t-[28px] border-t border-white/10 overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Search className="w-4.5 h-4.5 text-[#D6B37F]" />
                <h3 className="text-sm font-bold text-[#D6B37F] uppercase tracking-wider">
                  {locale === 'es' ? 'Explorar Tours' : 'Explore Tours'}
                </h3>
                <span className="bg-[#D6B37F]/15 text-[#D6B37F] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {filteredTours.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-5 pb-3 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === 'es' ? '¿Qué destino buscas?' : 'What destination are you looking for?'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-[#1A1A1A] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D6B37F]/50 transition-colors"
                  autoFocus
                />
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Scrollable Tour List */}
            <div className="overflow-y-auto px-5 pb-5 flex-1">
              {filteredTours.length > 0 ? (
                <div className="space-y-2">
                  {filteredTours.map((tour) => {
                    const name = locale === 'es' ? tour.nameEs : tour.nameEn;
                    return (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl border border-white/5 hover:border-[#D6B37F]/20 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                          <Image
                            src={tour.image}
                            alt={name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#D6B37F] transition-colors">
                            {name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-[#D6B37F] font-mono">
                              ${Math.round(tour.priceUSD)} USD
                            </span>
                            <span className="text-[10px] text-white/30">·</span>
                            <span className="text-[10px] text-white/40">
                              {tour.duration} {t.tours.days}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#D6B37F] transition-colors shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-xs text-white/40">
                    {locale === 'es'
                      ? 'No se encontraron tours con ese nombre.'
                      : 'No tours found with that name.'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   BOTTOM SHEET: FAVORITES MINI-MODAL (PRO)
   ═══════════════════════════════════════════════════════ */
function FavoritesMiniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteTours = useMemo(
    () => tours.filter((tour) => favorites.has(tour.id)),
    [favorites]
  );

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(id);
  };

  const handleShare = (slug: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const fullUrl = `${window.location.origin}/tours/${slug}`;
    if (navigator.share) {
      navigator.share({ title: name, url: fullUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(fullUrl).then(() => {
        toast.success(
          locale === 'es' ? '¡Enlace copiado!' : 'Link copied!',
          { duration: 2000, icon: '🔗' }
        );
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="favorites-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-lg bg-[#141414] rounded-t-[28px] border-t border-white/10 overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Heart className="w-4.5 h-4.5 text-[#D6B37F] fill-[#D6B37F]" />
                <h3 className="text-sm font-bold text-[#D6B37F] uppercase tracking-wider">
                  {locale === 'es' ? 'Mis Favoritos' : 'My Favorites'}
                </h3>
                <span className="bg-[#D6B37F] text-[#0F0F0F] text-[10px] font-black px-1.5 py-0.5 rounded-md">
                  {favoriteTours.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Scrollable Favorites List */}
            <div className="overflow-y-auto px-5 pb-5 flex-1">
              {favoriteTours.length > 0 ? (
                <div className="space-y-2">
                  {favoriteTours.map((tour) => {
                    const name = locale === 'es' ? tour.nameEs : tour.nameEn;
                    return (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl border border-white/5 hover:border-[#D6B37F]/20 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                          <Image
                            src={tour.image}
                            alt={name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#D6B37F] transition-colors">
                            {name}
                          </h4>
                          <span className="text-[11px] text-[#D6B37F] font-mono">
                            ${Math.round(tour.priceUSD)} USD
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => handleShare(tour.slug, name, e)}
                            title={locale === 'es' ? 'Compartir enlace' : 'Share link'}
                            className="p-2 bg-white/5 hover:bg-[#D6B37F]/20 text-white/60 hover:text-[#D6B37F] rounded-lg transition-colors"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleRemove(tour.id, e)}
                            title={locale === 'es' ? 'Eliminar de favoritos' : 'Remove from favorites'}
                            className="p-2 bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#D6B37F] transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Heart className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="text-xs text-white/40 mb-1">
                    {locale === 'es'
                      ? 'Tu lista de favoritos está vacía.'
                      : 'Your favorites list is empty.'}
                  </p>
                  <p className="text-[11px] text-white/20">
                    {locale === 'es'
                      ? 'Explora nuestros tours y guarda tus favoritos.'
                      : 'Explore our tours and save your favorites.'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   COMBINED EXPORT — Wire to ModalContext
   ═══════════════════════════════════════════════════════ */
export default function BottomTabModals() {
  const { searchOpen, closeSearch, favoritesOpen, closeFavorites } = useModal();

  return (
    <>
      <SearchMiniModal isOpen={searchOpen} onClose={closeSearch} />
      <FavoritesMiniModal isOpen={favoritesOpen} onClose={closeFavorites} />
    </>
  );
}
