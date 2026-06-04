'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Globe, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { key: 'tours', href: '#tours' },
  { key: 'about', href: '#about' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNavLink = (key: string) => {
    const nav = t.nav as Record<string, string>;
    return nav[key] || key;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-header shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden gold-glow">
              <Image
                src="/logo.svg"
                alt="Intiquilla"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-playfair text-xl md:text-2xl font-bold gold-text tracking-wider">
              INTIQUILLA
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-warm-gray hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {getNavLink(item.key)}
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative">
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
                        onClick={() => {
                          setLocale(l);
                          setLangOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm transition-colors w-full text-left ${
                          locale === l
                            ? 'text-gold bg-white/10'
                            : 'text-warm-gray hover:text-gold hover:bg-white/5'
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
            <Button
              onClick={() => handleNavClick('#contact')}
              className="btn-gold rounded-full px-6 py-2 text-sm tracking-wide"
            >
              {t.nav.book}
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 text-sm text-gold font-medium"
            >
              <Globe className="w-4 h-4" />
              {locale.toUpperCase()}
            </button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold hover:bg-white/10">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-dark-bg border-gold/20 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gold/10">
                    <span className="font-playfair text-lg font-bold gold-text">INTIQUILLA</span>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="text-warm-gray hover:text-gold transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="flex-1 flex flex-col p-6 gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleNavClick(item.href)}
                        className="text-left text-lg font-medium text-warm-gray hover:text-gold transition-colors py-3 border-b border-white/5 tracking-wide"
                      >
                        {getNavLink(item.key)}
                      </button>
                    ))}
                  </nav>
                  <div className="p-6 border-t border-gold/10">
                    <Button
                      onClick={() => handleNavClick('#contact')}
                      className="btn-gold rounded-full w-full py-3 text-base tracking-wide"
                    >
                      {t.nav.book}
                    </Button>
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
