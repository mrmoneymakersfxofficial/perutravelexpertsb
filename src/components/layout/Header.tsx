'use client';

import React, { useState, useEffect } from 'react';
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

const navLinks = [
  { label: 'Tour Packages', href: '/tour-packages' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

const dropdownDestinations = [
  { label: 'Tour Packages', href: '/tour-packages' },
  { label: 'Cusco', href: '/our-tours/cusco' },
  { label: 'Puno', href: '/our-tours/puno' },
  { label: 'Amazon', href: '/our-tours/amazon' },
  { label: 'Arequipa', href: '/our-tours/arequipa' },
  { label: 'Lima & Ica', href: '/our-tours/lima-ica' },
];

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

  // Pages with dark immersive heroes → gold text on subpages for readability
  // All other subpages have lighter backgrounds → use dark text
  const isHomePage = pathname === '/';
  const isDarkHeroSubpage = !isHomePage && !pathname?.includes('/about-us') && !pathname?.includes('/testimonials') && !pathname?.includes('/contact') && !pathname?.includes('/faq');
  const isLightPage = !isHomePage && !isDarkHeroSubpage;

  // Scroll listener — transparent at top, glass on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown
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

  // ═══════ DYNAMIC CONTRAST ENGINE ═══════

  // Nav link text color — Gold Ultra Pro on dark-hero subpages, white on home
  const getTextClass = () => {
    if (isScrolled) return 'text-white/90 hover:text-[#C5A55A] active:text-[#A8883D]';
    if (isLightPage) return 'text-[#0F0F0F] hover:text-[#C5A55A] active:text-[#A8883D]';
    if (isDarkHeroSubpage) return 'text-[#E8C97A] hover:text-[#F5D6A8] active:text-[#C9A96E] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]';
    return 'text-white/90 hover:text-[#C5A55A] active:text-[#A8883D] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]';
  };

  // Icon/text muted color (language, separators)
  const getMutedClass = () => {
    if (isScrolled) return 'text-white/60';
    if (isLightPage) return 'text-[#0F0F0F]/70';
    if (isDarkHeroSubpage) return 'text-[#C9A96E]/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]';
    return 'text-white/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]';
  };

  // Separator color
  const getSeparatorClass = () => {
    if (isScrolled) return 'bg-white/20';
    if (isLightPage) return 'bg-black/20';
    if (isDarkHeroSubpage) return 'bg-[#C9A96E]/25';
    return 'bg-white/20';
  };

  // Book Now CTA
  const getBookClass = () => {
    if (isScrolled || !isLightPage) {
      return 'bg-[#C5A55A] hover:bg-[#A8883D] text-[#0F0F0F] shadow-xl shadow-black/20 hover:shadow-[#C5A55A]/20';
    }
    return 'bg-[#0F0F0F] hover:bg-[#C5A55A] text-[#C5A55A] hover:text-[#0F0F0F] border border-transparent';
  };

  // Logo treatment
  const getLogoClass = () => {
    if (isScrolled) return 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]';
    if (isLightPage) return 'brightness-0';
    return 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]';
  };

  // Mobile hamburger color
  const getHamburgerClass = () => {
    if (isScrolled) return 'text-white';
    if (isDarkHeroSubpage) return 'text-[#E8C97A]';
    if (isLightPage) return 'text-[#0F0F0F]';
    return 'text-white';
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-[9999] flex items-center transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#141414]/90 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-[60px] md:h-[65px] lg:h-[70px]">

            {/* Logo — brightness-0 on light pages for dark logo */}
            <Link href="/" className="flex items-center h-full shrink-0">
              <Image
                src="/logo.png"
                alt="PeruTravelExpertsB"
                width={280}
                height={85}
                className={`h-[40px] sm:h-[46px] md:h-[50px] lg:h-[56px] w-auto object-contain transition-all duration-300 hover:scale-[1.02] ${getLogoClass()}`}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Tours Dropdown */}
              <div className="relative" data-tours-dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button className={`flex items-center gap-1 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 ${getTextClass()}`}>
                  Tours
                  <svg className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
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
                      {dropdownDestinations.map((destination, idx) => (
                        <Link
                          key={idx}
                          href={destination.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium text-white/80 hover:text-[#C5A55A] hover:bg-white/[0.03] transition-all duration-150 capitalize"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C5A55A]/60 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                          {destination.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links */}
              {navLinks.filter(l => l.label !== 'Tours').map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className={`text-[13px] font-bold tracking-wider uppercase transition-all duration-300 ${getTextClass()}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Separator */}
              <div className={`w-px h-5 transition-colors duration-300 ${getSeparatorClass()}`} />

              {/* Search & Favorites */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`transition-all duration-300 p-1 ${getTextClass()}`}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <button
                onClick={() => setFavoritesOpen(true)}
                className={`transition-all duration-300 p-1 relative ${getTextClass()}`}
                aria-label="Favorites"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold text-[#0F0F0F] flex items-center justify-center" style={{ backgroundColor: '#C5A55A' }}>
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </button>

              {/* Separator */}
              <div className={`w-px h-5 transition-colors duration-300 ${getSeparatorClass()}`} />

              {/* Language Toggle */}
              <button
                onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                className={`text-[13px] uppercase font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:opacity-80 active:scale-95 ${getTextClass()}`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'ES' : 'EN'}
              </button>

              {/* Book Now CTA — inverts on light pages */}
              <button
                onClick={() => setBookingOpen(true)}
                className={`py-2 h-10 px-6 rounded-full text-[13px] font-bold tracking-wide transition-all duration-200 ${getBookClass()}`}
              >
                Book Now
              </button>
            </nav>

            {/* Mobile — hamburger + language */}
            <div className="flex items-center gap-2 lg:hidden">
              <span className={`text-[12px] uppercase font-bold transition-all duration-300 flex items-center gap-1 ${getMutedClass()}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                en
              </span>

              <button onClick={() => setIsMenuOpen(true)} className={`transition-all duration-300 p-1 ${getHamburgerClass()}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[10001] lg:hidden">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <div className="absolute top-0 right-0 h-full w-[280px] bg-[#141414] p-6 flex flex-col justify-between text-white border-l border-white/5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-[#C5A55A] uppercase tracking-widest">// Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-white/50 hover:text-white">&times;</button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-semibold uppercase tracking-wide text-white/80 hover:text-[#C5A55A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Destination links */}
              <div className="border-t border-white/10 pt-4 mt-2">
                <p className="text-[11px] text-[#C5A55A] uppercase tracking-wider mb-3">Destinations</p>
                <div className="flex flex-col gap-3">
                  {dropdownDestinations.filter(d => d.label !== 'Tour Packages').map((dest, idx) => (
                    <Link
                      key={idx}
                      href={dest.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-[#C5A55A] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C5A55A]/60 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                      {dest.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Search & Favorites */}
              <button
                onClick={() => { setIsMenuOpen(false); setSearchOpen(true); }}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-[#C5A55A] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                Search
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); setFavoritesOpen(true); }}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-[#C5A55A] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Favorites
                {favoritesCount > 0 && (
                  <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(197,165,90,0.2)', color: '#C5A55A' }}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            </nav>
            <button
              onClick={() => { setIsMenuOpen(false); setBookingOpen(true); }}
              className="w-full h-11 bg-[#C5A55A] text-[#0F0F0F] font-bold rounded-full text-xs uppercase transition-colors hover:bg-[#A8883D]"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Search Modal — desktop only (BottomTabModals handles mobile) */}
      <div className="hidden lg:block">
        <SearchModal
          open={searchOpen}
          onOpenChange={setSearchOpen}
        />
      </div>

      {/* Favorites Modal — desktop Dialog only, Sheet disabled (BottomTabModals handles mobile) */}
      <FavoritesModal
        open={favoritesOpen}
        onOpenChange={setFavoritesOpen}
        onTourSelect={openDetail}
        hideSheet
      />

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={detailTour}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        locale="en"
      />
    </>
  );
}
