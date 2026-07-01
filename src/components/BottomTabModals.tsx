'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Share2, Trash2, ChevronRight, X } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useFavorites } from '@/components/FavoritesProvider';
import { tours } from '@/lib/tours-data';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════════════════
   BOTTOM SHEET: TOUR SEARCH MINI-MODAL (PRO)
   ═══════════════════════════════════════════════════════ */
function SearchMiniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    if (!searchQuery.trim()) return tours.filter((tour) => tour.active);
    const q = searchQuery.toLowerCase();
    return tours.filter(
      (tour) =>
        tour.active &&
        (tour.nameEn.toLowerCase().includes(q) ||
          tour.nameEs.toLowerCase().includes(q) ||
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
                <Search className="w-4 h-4 text-[#D4A843]" />
                <h3 className="text-sm font-bold text-[#D4A843] uppercase tracking-wider">Explore All Tours</h3>
                <span className="bg-[#D4A843]/15 text-[#D4A843] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {filteredTours.length}
                </span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-5 pb-3 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-[#1A1A1A] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A843]/50 transition-colors"
                  autoFocus
                />
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Scrollable Tour List */}
            <div className="overflow-y-auto px-5 pb-5 flex-1">
              {filteredTours.length > 0 ? (
                <div className="space-y-2">
                  {filteredTours.map((tour) => (
                    <Link
                      href={`/tours/${tour.slug}`}
                      key={tour.id}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl border border-white/5 hover:border-[#D4A843]/20 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                        <Image
                          src={tour.image}
                          alt={tour.nameEn}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#D4A843] transition-colors">
                          {tour.nameEn}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-[#D4A843] font-mono">
                            ${Math.round(tour.priceUSD)} USD
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#D4A843] transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-xs text-white/40">No tours found with that name.</p>
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
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteTours = useMemo(
    () => tours.filter((tour) => favorites.has(tour.id)),
    [favorites]
  );

  const handleRemove = (id: string, name: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(id);
  };

  const handleShare = (slug: string, name: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const fullUrl = `${window.location.origin}/tours/${slug}`;
    if (navigator.share) {
      navigator.share({ title: name, url: fullUrl }).catch(() => {
        fallbackCopy(fullUrl);
      });
    } else {
      fallbackCopy(fullUrl);
    }
  };

  const fallbackCopy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success('Link copied to clipboard!', { duration: 2500, icon: '🔗' });
      }).catch(() => {
        textareaCopy(text);
      });
    } else {
      textareaCopy(text);
    }
  };

  const textareaCopy = (text: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard!', { duration: 2500, icon: '🔗' });
    } catch {
      toast.error('Could not copy link', { duration: 2500 });
    }
    document.body.removeChild(ta);
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
                <Heart className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
                <h3 className="text-sm font-bold text-[#D4A843] uppercase tracking-wider">
                  My Favorites
                </h3>
                <span className="bg-[#D4A843] text-[#0F0F0F] text-[10px] font-black px-1.5 py-0.5 rounded-md">
                  {favoriteTours.length}
                </span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Scrollable Favorites List */}
            <div className="overflow-y-auto px-5 pb-5 flex-1">
              {favoriteTours.length > 0 ? (
                <div className="space-y-2">
                  {favoriteTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl border border-white/5 hover:border-[#D4A843]/20 transition-all group"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                        <Image
                          src={tour.image}
                          alt={tour.nameEn}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Tour info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#D4A843] transition-colors">
                          {tour.nameEn}
                        </h4>
                        <span className="text-[11px] text-[#D4A843] font-mono">
                          ${Math.round(tour.priceUSD)} USD
                        </span>
                      </div>

                      {/* Action buttons — stopPropagation prevents navigation */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => handleShare(tour.slug, tour.nameEn, e)}
                          onTouchEnd={(e) => { e.preventDefault(); handleShare(tour.slug, tour.nameEn, e); }}
                          className="p-2 bg-white/5 hover:bg-[#D4A843]/20 text-white/60 hover:text-[#D4A843] rounded-lg transition-colors active:scale-95"
                          aria-label="Share tour link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleRemove(tour.id, tour.nameEn, e)}
                          onTouchEnd={(e) => { e.preventDefault(); handleRemove(tour.id, tour.nameEn, e); }}
                          className="p-2 bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-400 rounded-lg transition-colors active:scale-95"
                          aria-label="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#D4A843] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Heart className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="text-xs text-white/40 mb-1">Your favorites list is empty.</p>
                  <p className="text-[11px] text-white/20">Explore our tours and save your favorites.</p>
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