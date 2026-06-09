'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useFavorites } from '@/components/FavoritesProvider';
import { tours } from '@/lib/tours-data';

/* ═══════════════════════════════════════════════════════
   BOTTOM SHEET: TOUR SEARCH MINI-MODAL
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
            className="w-full max-w-md bg-[#141414] rounded-t-3xl border-t border-white/10 p-6 text-white max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-base font-bold text-[#D6B37F] uppercase tracking-wider">Explore All Tours</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search your destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 text-sm text-white mb-4 focus:outline-none focus:border-[#D6B37F] placeholder:text-white/30"
              autoFocus
            />
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <Link
                    href={`/tours/${tour.slug}`}
                    key={tour.id}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-[#D6B37F]/20 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-semibold truncate group-hover:text-[#D6B37F] transition-colors">
                        {tour.nameEn}
                      </h4>
                      <span className="text-[11px] text-[#D6B37F]">From ${Math.round(tour.priceUSD)} USD</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-white/40 text-center py-8">No tours found with that name.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   BOTTOM SHEET: FAVORITES MINI-MODAL
   ═══════════════════════════════════════════════════════ */
function FavoritesMiniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteTours = useMemo(
    () => tours.filter((tour) => favorites.has(tour.id)),
    [favorites]
  );

  const shareTourLink = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.origin}/tours/${slug}`);
    alert('Link copied to clipboard! Ready to share.');
  };

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(id);
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
            className="w-full max-w-md bg-[#141414] rounded-t-3xl border-t border-white/10 p-6 text-white max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#D6B37F] uppercase tracking-wider">My Favorites ({favoriteTours.length})</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {favoriteTours.length > 0 ? (
                favoriteTours.map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between p-2 bg-white/[0.02] rounded-xl border border-white/5">
                    <Link href={`/tours/${tour.slug}`} onClick={onClose} className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold truncate hover:text-[#D6B37F] transition-colors">{tour.nameEn}</h4>
                      <span className="text-[11px] text-[#D6B37F] font-mono">${Math.round(tour.priceUSD)} USD</span>
                    </Link>
                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => shareTourLink(tour.slug, e)}
                        className="text-xs bg-white/5 hover:bg-[#D6B37F] text-white hover:text-[#0F0F0F] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Share
                      </button>
                      <button
                        onClick={(e) => removeFavorite(tour.id, e)}
                        className="text-xs bg-white/5 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-white/40 text-center py-8">Your wishlist is empty.</p>
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
