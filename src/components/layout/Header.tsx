'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  Menu, Globe, ChevronDown, X, ChevronRight,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '@/lib/tours-data';

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string; icon?: React.ElementType }[];
}

// Only 4 main navigation items — clean, elegant
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
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-header shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-[140px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-20 md:w-56 md:h-[130px] shrink-0">
              <Image src="/logo.png" alt="PeruTravelExpertsB" fill className="object-contain" priority sizes="224px" />
            </div>
          </Link>

          {/* Desktop Nav — 4 items only */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Tours Dropdown */}
            <div className="relative" data-tours-dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center gap-1.5 text-sm font-medium text-warm-gray hover:text-gold transition-colors duration-300 tracking-wide uppercase px-3 py-2">
                {getNavLink('tours')}
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 glass-card rounded-xl overflow-hidden shadow-xl py-2"
                  >
                    {toursItem?.children?.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-warm-gray hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-gold/60" />
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
                className="text-sm font-medium text-warm-gray hover:text-gold transition-colors duration-300 tracking-wide uppercase px-3 py-2"
              >
                {getNavLink(item.key)}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative ml-2" data-lang-dropdown>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-warm-gray hover:text-gold transition-colors duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-medium">{locale}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 glass-card rounded-lg overflow-hidden"
                  >
                    {(['es', 'en'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l); setLangOpen(false); }}
                        className={`block px-4 py-2 text-sm transition-colors w-full text-left ${
                          locale === l ? 'text-gold bg-white/10' : 'text-warm-gray hover:text-gold hover:bg-white/5'
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
            <Link href="/contact" className="ml-2">
              <Button className="btn-gold rounded-full px-6 py-2 text-sm tracking-wide">{t.nav.book}</Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 text-sm text-gold font-medium"
            >
              <Globe className="w-4 h-4" />{locale.toUpperCase()}
            </button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold hover:bg-white/10">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-dark-bg border-gold/20 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gold/10">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                      <div className="relative w-44 h-[110px] shrink-0">
                        <Image src="/logo.png" alt="PeruTravelExpertsB" fill className="object-contain" sizes="176px" />
                      </div>
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="text-warm-gray hover:text-gold transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                    {navItems.map((item) => (
                      <React.Fragment key={item.key}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between text-left text-base font-medium text-warm-gray hover:text-gold transition-colors py-3 border-b border-white/5 tracking-wide"
                        >
                          {getNavLink(item.key)}
                          <ChevronRight className="w-4 h-4 text-gold/40" />
                        </Link>
                      </React.Fragment>
                    ))}
                  </nav>
                  <div className="p-6 border-t border-gold/10">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      <Button className="btn-gold rounded-full w-full py-3 text-base tracking-wide">{t.nav.book}</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
