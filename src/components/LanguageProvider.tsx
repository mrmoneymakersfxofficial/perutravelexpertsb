'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations } from '@/lib/i18n/translations';
import type { Locale, Translations } from '@/lib/types';

const LANGUAGE_KEY = 'pte-lang';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY) as Locale | null;
      if (saved === 'en' || saved === 'es') setLocaleState(saved);
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
      try { localStorage.setItem(LANGUAGE_KEY, locale); } catch {}
    }
  }, [locale, mounted]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}