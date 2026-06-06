'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { useModal } from '@/components/ModalContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  Menu, Globe, ChevronDown, X, ChevronRight,
  MapPin, Search, Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '@/components/SearchModal';
import FavoritesModal from '@/components/FavoritesModal';
import TourDetailModal from '@/components/TourDetailModal';

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string; icon?: React.ElementType }[];
}

// 4 main navigation items
const navItems: NavItem[] = [
  {
    key: 'tours',
    href: '/tour-packages',
    children: [
      { key: 'allDestinations', href: '/tour-packages', icon: MapPin },
      { key: 'cusco', href: '/tour-packages/cusco', icon: MapPin },
      { key: 'puno', href: '/tour-packages/puno', icon: MapPin },
      { key: 'amazon', href: '/tour-packages/amazon', icon: MapPin },
      { key: 'arequipa', href: '/tour-packages/arequipa', icon: MapPin },
      { key: 'lima-ica', href: '/tour-packages/lima-ica', icon: MapPin },
    ],
  },
  { key: 'about', href: '/about-us' },
  { key: 'testimonials', href: '/testimonials' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { favoritesCount } = useFavorites();
  const { searchOpen, setSearchOpen, favoritesOpen, setFavoritesOpen, detailTour, detailOpen, setDetailOpen, openDetail } = useModal();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langOpen && !(e.target as HTMLElement).closest('[data-lang-dropdown]')) {
        setLangOpen(false);
      }
      if (dropdownOpen && !(e.target as HTMLElement).closest('[data-tours-dropdown]')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen, dropdownOpen]);

  const getNavLink = (key: string) => {
    const nav = t.nav as Record<string, string>;
    return nav[key] || key;
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setDropdownOpen(false), 200);
    setDropdownTimeout(timeout);
  };

  const toursItem = navItems.find(item => item.key === 'tours');
  const otherNavItems = navItems.filter(item => item.key !== 'tours');

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-[9999]"
      >
        {/* Desktop: 70px | Tablet: 65px | Mobile: 60px */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[65px] lg:h-[70px]">

            {/* Logo — panoramic 3.3:1, fills header height */}
            <Link href="/" className="flex items-center h-full py-1 shrink-0">
              <Image
                src="/logo.png"
                alt="PeruTravelExpertsB"
                width={1107}
                height={334}
                sizes="400px"
                className="h-full w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-[1.02]"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Tours Dropdown */}
              <div className="relative" data-tours-dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button className="flex items-center gap-1 text-[13px] font-medium text-white/80 hover:text-[#D6B37F] transition-colors duration-200 tracking-wider uppercase">
                  {getNavLink('tours')}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl overflow-hidden shadow-2xl shadow-black/40 py-1"
                      style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(214,179,127,0.12)' }}
                    >
                      {toursItem?.children?.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-white/70 hover:text-[#D6B37F] hover:bg-white/[0.04] transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#D6B37F]/50" />
                          {getNavLink(child.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other 3 nav items */}
              {otherNavItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-[13px] font-medium text-white/80 hover:text-[#D6B37F] transition-colors duration-200 tracking-wider uppercase"
                >
                  {getNavLink(item.key)}
                </Link>
              ))}

              {/* Separator */}
              <div className="w-px h-5 bg-white/10" />

              {/* Search & Favorites icons */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white/70 hover:text-[#D6B37F] transition-colors duration-200 p-1"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setFavoritesOpen(true)}
                className="text-white/70 hover:text-[#D6B37F] transition-colors duration-200 p-1 relative"
                aria-label={t.tours.favorites}
              >
                <Heart className="w-[18px] h-[18px]" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold text-[#0F0F0F] flex items-center justify-center" style={{ backgroundColor: '#D6B37F' }}>
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </button>

              {/* Separator */}
              <div className="w-px h-5 bg-white/10" />

              {/* Language Selector */}
              <div className="relative" data-lang-dropdown>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 text-[13px] text-white/60 hover:text-[#D6B37F] transition-colors duration-200"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase font-medium">{locale}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 rounded-lg overflow-hidden shadow-2xl shadow-black/40"
                      style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(214,179,127,0.12)' }}
                    >
                      {(['es', 'en'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLocale(l); setLangOpen(false); }}
                          className={`block px-4 py-2 text-[13px] transition-colors w-full text-left ${
                            locale === l ? 'text-[#D6B37F] bg-white/[0.06]' : 'text-white/70 hover:text-[#D6B37F] hover:bg-white/[0.03]'
                          }`}
                        >
                          {l === 'es' ? 'Español' : 'English'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book CTA */}
              <Link href="/contact">
                <Button className="h-10 px-6 rounded-full text-[13px] font-semibold tracking-wide bg-[#D6B37F] hover:bg-[#B8945E] text-[#0F0F0F] transition-all duration-200 shadow-lg shadow-[#D6B37F]/20 hover:shadow-[#D6B37F]/30">
                  {t.nav.book}
                </Button>
              </Link>
            </nav>

            {/* Mobile — logo + spacer + lang + hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1 text-[12px] text-white/60 hover:text-[#D6B37F] font-medium transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{locale}</span>
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="text-white/70 hover:text-[#D6B37F] transition-colors p-1">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-[#0F0F0F] border-white/[0.06] p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-end px-5 py-3 border-b border-white/[0.06]">
                      <button onClick={() => setMobileOpen(false)} className="text-white/50 hover:text-[#D6B37F] transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-0.5">
                      {navItems.map((item) => (
                        <React.Fragment key={item.key}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between text-left text-[15px] font-medium text-white/70 hover:text-[#D6B37F] transition-colors py-3 border-b border-white/[0.04] tracking-wide"
                          >
                            {getNavLink(item.key)}
                            <ChevronRight className="w-4 h-4 text-[#D6B37F]/30" />
                          </Link>
                        </React.Fragment>
                      ))}

                      {/* Mobile Search & Favorites */}
                      <button
                        onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                        className="flex items-center justify-between text-left text-[15px] font-medium text-white/70 hover:text-[#D6B37F] transition-colors py-3 border-b border-white/[0.04] tracking-wide w-full"
                      >
                        <span className="flex items-center gap-3">
                          <Search className="w-4 h-4" />
                          {locale === 'es' ? 'Buscar' : 'Search'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#D6B37F]/30" />
                      </button>
                      <button
                        onClick={() => { setFavoritesOpen(true); setMobileOpen(false); }}
                        className="flex items-center justify-between text-left text-[15px] font-medium text-white/70 hover:text-[#D6B37F] transition-colors py-3 border-b border-white/[0.04] tracking-wide w-full"
                      >
                        <span className="flex items-center gap-3">
                          <Heart className="w-4 h-4" />
                          {t.tours.favorites}
                          {favoritesCount > 0 && (
                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(214,179,127,0.2)', color: '#D6B37F' }}>
                              {favoritesCount}
                            </span>
                          )}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#D6B37F]/30" />
                      </button>
                    </nav>
                    <div className="px-5 py-5 border-t border-white/[0.06]">
                      <Link href="/contact" onClick={() => setMobileOpen(false)}>
                        <Button className="h-11 rounded-full w-full text-[14px] font-semibold tracking-wide bg-[#D6B37F] hover:bg-[#B8945E] text-[#0F0F0F] transition-all duration-200">
                          {t.nav.book}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onTourSelect={openDetail}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        open={favoritesOpen}
        onOpenChange={setFavoritesOpen}
        onTourSelect={openDetail}
      />

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={detailTour}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
