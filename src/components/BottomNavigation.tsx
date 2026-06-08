'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Heart, Compass, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';

const WHATSAPP_URL = 'https://wa.me/51984215157?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20tours%20de%20PeruTravelExpertsB';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const { favoritesCount } = useFavorites();
  const { searchOpen, favoritesOpen, detailOpen } = useModal();
  const isHome = pathname === '/';

  // Hide bottom nav when ANY modal is open (Airbnb/Booking pattern)
  const anyModalOpen = searchOpen || favoritesOpen || detailOpen;

  const items = [
    { key: 'home' as const, icon: Home, label: locale === 'es' ? 'Inicio' : 'Home', href: '/', action: () => { if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' }); }, active: isHome },
    { key: 'search' as const, icon: Search, label: locale === 'es' ? 'Buscar' : 'Search', action: undefined, active: false },
    { key: 'favorites' as const, icon: Heart, label: locale === 'es' ? 'Favoritos' : 'Favorites', action: undefined, active: false, badge: favoritesCount },
    { key: 'tours' as const, icon: Compass, label: locale === 'es' ? 'Tours' : 'Tours', href: '/tour-packages', active: pathname.startsWith('/tour-packages') },
    { key: 'whatsapp' as const, icon: MessageCircle, label: 'WhatsApp', href: WHATSAPP_URL, external: true, active: false },
  ];

  return (
    <AnimatePresence>
      {!anyModalOpen && (
        <motion.nav
          key="bottom-nav"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] lg:hidden"
          style={{
            backgroundColor: 'rgba(15,15,15,0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(214,179,127,0.1)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
          aria-label="Bottom navigation"
        >
          <div className="flex items-center justify-around h-14 sm:h-16 px-1 sm:px-2 max-w-lg mx-auto">
            {items.map((item) => {
              if (item.external) {
                return (
                  <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full relative" style={{ minHeight: 44 }}>
                    <MessageCircle className="w-5 h-5 sm:w-[22px] sm:h-[22px] transition-colors" style={{ color: '#D6B37F' }} />
                    <span className="text-[9px] sm:text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                  </a>
                );
              }
              if (!item.href) {
                return (
                  <button key={item.key} className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full relative" style={{ minHeight: 44 }} aria-label={item.label}>
                    <div className="relative"><item.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] transition-colors" style={{ color: '#D6B37F' }} />
                      {item.badge && item.badge > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 sm:-top-1.5 -right-1.5 sm:-right-2 min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 px-0.5 sm:px-1 rounded-full text-[8px] sm:text-[9px] font-bold flex items-center justify-center" style={{ backgroundColor: '#D6B37F', color: '#0F0F0F' }}>{item.badge > 9 ? '9+' : item.badge}</motion.span>}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                  </button>
                );
              }
              return (
                <Link key={item.key} href={item.href!} onClick={item.action} className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full relative" style={{ minHeight: 44 }}>
                  <div className="relative"><item.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] transition-colors" style={{ color: item.active ? '#D6B37F' : 'rgba(255,255,255,0.5)' }} /></div>
                  <span className="text-[9px] sm:text-[10px] font-medium transition-colors" style={{ color: item.active ? '#D6B37F' : 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                  {item.active && <motion.div layoutId="bottomNavIndicator" className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full" style={{ backgroundColor: '#D6B37F' }} transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
