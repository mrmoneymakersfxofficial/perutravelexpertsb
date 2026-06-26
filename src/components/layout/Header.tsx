'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { useLanguage } from '@/components/LanguageProvider';
import SearchModal from '@/components/SearchModal';
import FavoritesModal from '@/components/FavoritesModal';
import TourDetailModal from '@/components/TourDetailModal';
import BookingModal from '@/components/BookingModal';

/* ══════════════════════════════════════════════════════════════════
   HOOK: Desktop detection (fixes Radix portal double-modal bug)
   ══════════════════════════════════════════════════════════════════ */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

/* ══════════════════════════════════════════════════════════════════
   NAVIGATION CONFIG
   ══════════════════════════════════════════════════════════════════ */
const navLinks = [
  { label: 'Tours', href: '/tour-packages' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

const dropdownDestinations = [
  { label: 'Tour Packages', href: '/tour-packages' },
  { label: 'Cusco', href: '/tour-packages/cusco' },
  { label: 'Puno', href: '/tour-packages/puno' },
  { label: 'Amazon', href: '/tour-packages/amazon' },
  { label: 'Arequipa', href: '/tour-packages/arequipa' },
  { label: 'Lima & Ica', href: '/tour-packages/lima-ica' },
];

/* ══════════════════════════════════════════════════════════════════
   SMART PAGE CLASSIFICATION
   Routes with dark immersive image heroes → transparent header
   All other routes (light/no hero) → solid dark header
   ══════════════════════════════════════════════════════════════════ */
const DARK_HERO_EXACT = new Set([
  '/',                   // Home
  '/tour-packages',      // Tour Packages listing
  '/tours',              // Tours listing
  '/tours-cities',       // Tours by City
  '/customized-tours',   // Customized Tours
  '/projects-we-support',// Projects We Support
]);

const DARK_HERO_PREFIXES = [
  '/tour-packages/',
  '/tours/',
  '/tours-cities/',
  '/customized-tours/',
  '/projects-we-support/',
];

function hasDarkHero(pathname: string): boolean {
  if (DARK_HERO_EXACT.has(pathname)) return true;
  return DARK_HERO_PREFIXES.some(p => pathname.startsWith(p));
}

const SCROLL_THRESHOLD = 80;

/* ══════════════════════════════════════════════════════════════════
   ACTIVE PAGE DETECTION
   ══════════════════════════════════════════════════════════════════ */
function isNavActive(pathname: string, href: string): boolean {
  if (href === '/tour-packages') {
    return pathname === '/tour-packages' || pathname.startsWith('/tour-packages/');
  }
  return pathname === href;
}

/* ══════════════════════════════════════════════════════════════════
   HEADER COMPONENT
   ══════════════════════════════════════════════════════════════════ */
export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const { favoritesCount } = useFavorites();
  const {
    searchOpen, setSearchOpen,
    favoritesOpen, setFavoritesOpen,
    detailTour, detailOpen, setDetailOpen, openDetail,
    bookingOpen, setBookingOpen,
  } = useModal();
  const isDesktop = useIsDesktop();

  /* ─── Page classification ─── */
  const pageHasDarkHero = useMemo(() => hasDarkHero(pathname), [pathname]);
  const isSolidHeader = !pageHasDarkHero;
  const isTransparent = pageHasDarkHero && !isScrolled;

  /* ─── Body background adaptation ───
   * On dark-hero pages, set body bg to #0F0F0F so the transparent
   * header never shows cream bleeding through.
   * On light pages, restore cream.
   */
  useEffect(() => {
    if (pageHasDarkHero) {
      document.body.style.backgroundColor = '#0F0F0F';
    } else {
      document.body.style.backgroundColor = '#F8F6F2';
    }
    return () => {
      document.body.style.backgroundColor = '#F8F6F2';
    };
  }, [pageHasDarkHero]);

  /* ─── Scroll listener (80px threshold) ─── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── Reset state on navigation ─── */
  useEffect(() => {
    setIsScrolled(false);
    setDropdownOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  /* ─── Click outside to close dropdown ─── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownOpen && !(e.target as HTMLElement).closest('[data-tours-dropdown]')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setDropdownOpen(false), 200);
    setDropdownTimeout(timeout);
  };

  /* ══════════════════════════════════════════════════════════════════════
     STYLES — Aman / Belmond / Four Seasons / Airbnb Luxe standard
     ══════════════════════════════════════════════════════════════════════ */

  const headerStyle = useMemo((): React.CSSProperties => {
    const base: React.CSSProperties = { transition: 'all 0.35s ease' };

    if (isSolidHeader) {
      // Light pages: always solid dark
      return {
        ...base,
        background: 'rgba(15,15,15,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 1px 20px rgba(0,0,0,0.1)',
      };
    }
    if (isTransparent) {
      // Dark hero, not scrolled: fully transparent
      return {
        ...base,
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: 'none',
      };
    }
    // Dark hero, scrolled 80px+: glass
    return {
      ...base,
      background: 'rgba(15,15,15,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    };
  }, [isSolidHeader, isTransparent]);

  // Nav text — always white since header is always dark (solid or glass)
  const textClass = 'text-white/90 hover:text-[#D4A843] active:text-[#B89020]';

  // Transparent state needs extra text shadow for readability over hero image
  const transparentTextClass = `${textClass} [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]`;

  const navTextClass = isTransparent ? transparentTextClass : textClass;
  const mutedTextClass = isTransparent ? 'text-white/60 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]' : 'text-white/60';

  // Logo filter
  const logoFilter = useMemo((): React.CSSProperties => {
    if (isTransparent) {
      return { filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' };
    }
    return { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' };
  }, [isTransparent]);

  // Book Now — consistent gold on all states
  const bookClass = 'bg-[#D4A843] hover:bg-[#B89020] text-[#0F0F0F] shadow-lg shadow-black/10 hover:shadow-[#D4A843]/20 hover:scale-[1.02] active:scale-[0.98]';

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HEADER BAR
          ══════════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 w-full z-[9999] flex items-center"
        style={headerStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* ─── Responsive heights: Mobile 64px / Tablet 68px / Desktop 72px ─── */}
          <div className="flex items-center justify-between h-16 md:h-[68px] lg:h-[72px]">

            {/* ─── LOGO ─── */}
            <Link href="/" className="flex items-center h-full shrink-0">
              <Image
                src="/logo.png"
                alt="PeruTravelExpertsB"
                width={280}
                height={85}
                className="h-10 sm:h-11 md:h-12 lg:h-[52px] w-auto object-contain transition-all duration-300 hover:scale-[1.02]"
                style={logoFilter}
                priority
              />
            </Link>

            {/* ─── DESKTOP NAVIGATION ─── */}
            <nav className="hidden lg:flex items-center gap-7">

              {/* Tours Dropdown */}
              <div className="relative" data-tours-dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                  className={`flex items-center gap-1.5 text-[14px] font-semibold tracking-[0.02em] uppercase transition-all duration-200 ${navTextClass} ${isNavActive(pathname, '/tour-packages') ? 'text-[#D4A843]' : ''}`}
                >
                  Tours
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {/* Active underline */}
                  {isNavActive(pathname, '/tour-packages') && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #D4A843, #B89020)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[#141414] border border-white/10 p-2 shadow-2xl z-50"
                    >
                      {dropdownDestinations.map((dest, idx) => (
                        <Link
                          key={idx}
                          href={dest.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 capitalize ${
                            pathname === dest.href
                              ? 'text-[#D4A843] bg-[#D4A843]/5'
                              : 'text-white/80 hover:text-[#D4A843] hover:bg-white/[0.03]'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#D4A843]/60 shrink-0">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {dest.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links with active underline */}
              {navLinks.filter(l => l.label !== 'Tours').map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[14px] font-semibold tracking-[0.02em] uppercase transition-all duration-200 ${active ? 'text-[#D4A843]' : navTextClass}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #D4A843, #B89020)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Separator */}
              <div className="w-px h-5 bg-white/20" />

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`transition-all duration-200 p-1.5 rounded-full hover:bg-white/5 ${navTextClass}`}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              {/* Favorites */}
              <button
                onClick={() => setFavoritesOpen(true)}
                className={`transition-all duration-200 p-1.5 rounded-full hover:bg-white/5 relative ${navTextClass}`}
                aria-label="Favorites"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold text-[#0F0F0F] flex items-center justify-center" style={{ backgroundColor: '#D4A843' }}>
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </button>

              {/* Separator */}
              <div className="w-px h-5 bg-white/20" />

              {/* Language Toggle */}
              <button
                onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                className={`text-[14px] uppercase font-semibold tracking-[0.02em] transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:opacity-80 active:scale-95 ${navTextClass}`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'ES' : 'EN'}
              </button>

              {/* Book Now CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className={`py-2.5 px-6 rounded-full text-[13px] font-bold tracking-wide transition-all duration-200 ${bookClass}`}
              >
                Book Now
              </button>
            </nav>

            {/* ─── MOBILE: Language + Hamburger ─── */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                className={`text-[12px] uppercase font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95 ${mutedTextClass}`}
                aria-label="Toggle language"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                {locale === 'en' ? 'ES' : 'EN'}
              </button>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="transition-all duration-200 p-1 text-white"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE FULL OVERLAY MENU
          ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-md lg:hidden"
            />
            <motion.div
              key="menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-[280px] z-[10001] bg-[#141414] p-6 flex flex-col justify-between text-white border-l border-white/5 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-[#D4A843] uppercase tracking-widest">// Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-white/50 hover:text-white transition-colors">&times;</button>
              </div>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => {
                  const active = isNavActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base font-semibold uppercase tracking-wide transition-colors ${active ? 'text-[#D4A843]' : 'text-white/80 hover:text-[#D4A843]'}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Destinations */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <p className="text-[11px] text-[#D4A843] uppercase tracking-wider mb-3 font-semibold">Destinations</p>
                  <div className="flex flex-col gap-3">
                    {dropdownDestinations.filter(d => d.label !== 'Tour Packages').map((dest, idx) => (
                      <Link
                        key={idx}
                        href={dest.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D4A843] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#D4A843]/60 shrink-0">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {dest.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Search & Favorites */}
                <button
                  onClick={() => { setIsMenuOpen(false); setSearchOpen(true); }}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D4A843] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); setFavoritesOpen(true); }}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D4A843] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(214,179,127,0.2)', color: '#D4A843' }}>
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </nav>
              <button
                onClick={() => { setIsMenuOpen(false); setBookingOpen(true); }}
                className="w-full h-11 bg-[#D4A843] text-[#0F0F0F] font-bold rounded-full text-xs uppercase transition-colors hover:bg-[#B89020] active:scale-[0.98]"
              >
                Book Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          MODALS (Search + Favorites desktop only; BottomTabModals handles mobile)
          ══════════════════════════════════════════════════════════════ */}
      {isDesktop && (
        <SearchModal
          open={searchOpen}
          onOpenChange={setSearchOpen}
          onTourSelect={openDetail}
        />
      )}

      {isDesktop && (
        <FavoritesModal
          open={favoritesOpen}
          onOpenChange={setFavoritesOpen}
          onTourSelect={openDetail}
          hideSheet
        />
      )}

      <TourDetailModal
        tour={detailTour}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        locale={locale}
      />
    </>
  );
}