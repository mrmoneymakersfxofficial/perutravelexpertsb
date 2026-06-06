'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ArrowUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';

export default function FloatingPanel() {
  const { t } = useLanguage();
  const { favoritesCount } = useFavorites();
  const { openSearch, openFavorites, searchOpen, favoritesOpen, detailOpen } = useModal();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const anyModalOpen = searchOpen || favoritesOpen || detailOpen;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {!anyModalOpen && (
        <motion.div
          key="floating-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:flex flex-col items-end gap-3 fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence>
            {showScrollTop && (
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop} className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer" aria-label="Scroll to top">
                <ArrowUp className="w-5 h-5" style={{ color: '#0F0F0F' }} />
              </motion.button>
            )}
          </AnimatePresence>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={openSearch} className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#F8F6F2', border: '1px solid rgba(214,179,127,0.3)' }} aria-label="Search">
            <Search className="w-5 h-5" style={{ color: '#1C1C1C' }} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={openFavorites} className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative" style={{ backgroundColor: '#F8F6F2', border: '1px solid rgba(214,179,127,0.3)' }} aria-label={t.tours.favorites}>
            <Heart className="w-5 h-5" style={{ color: '#1C1C1C' }} />
            {favoritesCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: '#D6B37F' }}>{favoritesCount > 9 ? '9+' : favoritesCount}</span>}
          </motion.button>
          <motion.a href="https://wa.me/51984000000?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20tours%20de%20PeruTravelExpertsB" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#25D366' }} aria-label={t.whatsapp.tooltip} title={t.whatsapp.tooltip}>
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
