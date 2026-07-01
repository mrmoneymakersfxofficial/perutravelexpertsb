'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Heart, Compass, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

const WHATSAPP_URL = getWhatsAppLink('Hola, me interesa información sobre los tours de PeruTravelExpertsB');

export default function BottomNavigation() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const { favoritesCount } = useFavorites();
  const { anyModalOpen, openSearch, openFavorites } = useModal();
  const isHome = pathname === '/';

  const items = [
    { key: 'home' as const, icon: Home, label: locale === 'es' ? 'Inicio' : 'Home', href: '/', action: () => { if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' }); }, active: isHome },
    { key: 'search' as const, icon: Search, label: locale === 'es' ? 'Buscar' : 'Search', action: openSearch, active: false },
    { key: 'favorites' as const, icon: Heart, label: locale === 'es' ? 'Favoritos' : 'Favorites', action: openFavorites, active: false, badge: favoritesCount },
    { key: 'tours' as const, icon: Compass, label: locale === 'es' ? 'Tours' : 'Tours', href: '/our-tours', active: pathname.startsWith('/our-tours') || pathname.startsWith('/tour-packages') || pathname.startsWith('/tours') },
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
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] lg:hidden"
          style={{
            backgroundColor: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(212,168,67,0.12)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
          aria-label="Bottom navigation"
        >
          <div className="flex items-center justify-around h-[60px] sm:h-[64px] px-2 max-w-lg mx-auto">
            {items.map((item) => {
              const isActive = item.active;
              const iconColor = isActive ? '#D4A843' : 'rgba(255,255,255,0.45)';
              const labelColor = isActive ? '#D4A843' : 'rgba(255,255,255,0.45)';

              // External links (WhatsApp)
              if (item.external) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-[3px] w-full h-full"
                    style={{ minHeight: 48 }}
                  >
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <item.icon className="w-[22px] h-[22px] transition-colors" style={{ color: iconColor }} strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-medium leading-none" style={{ color: labelColor }}>{item.label}</span>
                  </a>
                );
              }

              // Action-only buttons (search, favorites)
              if (!item.href && item.action) {
                return (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className="flex flex-col items-center justify-center gap-[3px] w-full h-full relative"
                    style={{ minHeight: 48 }}
                    aria-label={item.label}
                  >
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <item.icon className="w-[22px] h-[22px] transition-colors" style={{ color: iconColor }} strokeWidth={1.8} />
                      {item.badge && item.badge > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
                        >
                          {item.badge > 9 ? '9+' : item.badge}
                        </motion.span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium leading-none" style={{ color: labelColor }}>{item.label}</span>
                  </button>
                );
              }

              // Link items (home, tours)
              return (
                <Link
                  key={item.key}
                  href={item.href!}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center gap-[3px] w-full h-full relative"
                  style={{ minHeight: 48 }}
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <item.icon className="w-[22px] h-[22px] transition-all duration-200" style={{ color: iconColor }} strokeWidth={isActive ? 2.2 : 1.8} />
                    {isActive && (
                      <motion.div
                        layoutId="bottomNavDot"
                        className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ backgroundColor: '#D4A843' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium leading-none transition-colors duration-200" style={{ color: labelColor }}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}