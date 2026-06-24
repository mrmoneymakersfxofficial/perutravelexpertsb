'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { tours } from '@/lib/tours-data';
import { useLanguage } from '@/components/LanguageProvider';
import type { TourData } from '@/lib/tours-data';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTourSelect?: (tour: TourData) => void;
}

const popularSearchesEs = ['Machu Picchu', 'Cusco', 'Valle Sagrado', 'Humantay', 'Vinicunca', 'Salkantay', 'Camino Inca', 'Lago Titicaca'];
const popularSearchesEn = ['Machu Picchu', 'Cusco', 'Sacred Valley', 'Humantay', 'Vinicunca', 'Salkantay', 'Inca Trail', 'Titicaca Lake'];

export default function SearchModal({ open, onOpenChange, onTourSelect }: SearchModalProps) {
  const { locale, t } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), 200);
  }, []);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase().trim();
    return tours.filter(tour => {
      if (!tour.active) return false;
      return (
        tour.nameEs.toLowerCase().includes(q) || tour.nameEn.toLowerCase().includes(q) ||
        tour.descriptionEs.toLowerCase().includes(q) || tour.descriptionEn.toLowerCase().includes(q) ||
        tour.destination.toLowerCase().includes(q)
      );
    });
  }, [debouncedQuery]);

  const getDestinationName = (d: string) => (t.nav as Record<string, string>)[d] || d;

  const handleSelect = (tour: TourData) => {
    onTourSelect?.(tour);
    onOpenChange(false);
  };

  const handlePopularClick = (term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-[10002] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.12 } }}
            className="fixed inset-x-0 top-0 z-[10003] mx-auto max-w-2xl px-3 pt-2 sm:px-6 sm:pt-3"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'rgba(255,255,255,0.98)', border: '1px solid rgba(197,165,90,0.2)' }}>
              <div className="flex items-center gap-2.5 px-3.5 h-11">
                <Search className="w-[18px] h-[18px] text-[#8B8680] shrink-0" />
                <input
                  ref={inputRef} type="text" value={query}
                  onChange={e => handleInputChange(e.target.value)}
                  placeholder={locale === 'es' ? 'Buscar tours, destinos...' : 'Search tours, destinations...'}
                  className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[#8B8680]/60 leading-none"
                  style={{ color: '#1C1C1C' }}
                />
                {query && (
                  <button onClick={() => { setQuery(''); setDebouncedQuery(''); inputRef.current?.focus(); }} className="p-0.5 rounded-full hover:bg-black/5 transition-colors">
                    <X className="w-3.5 h-3.5 text-[#8B8680]" />
                  </button>
                )}
              </div>
              <div className="h-px bg-[#DCC99A]/20" />
              <div className="max-h-[70vh] overflow-y-auto">
                {debouncedQuery.trim() && results.length === 0 && (
                  <div className="px-4 py-6 text-center">
                    <p className="text-[#8B8680] text-sm">{locale === 'es' ? 'No se encontraron resultados' : 'No results found'}</p>
                  </div>
                )}
                {!query.trim() && (
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-2.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#C5A55A]" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B8680]">
                        {locale === 'es' ? 'Búsquedas populares' : 'Popular searches'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(locale === 'es' ? popularSearchesEs : popularSearchesEn).map((term) => (
                        <button key={term} onClick={() => handlePopularClick(term)} className="text-[13px] px-3 py-1.5 rounded-full transition-colors" style={{ backgroundColor: '#F8F6F2', color: '#1C1C1C', border: '1px solid rgba(197,165,90,0.15)' }}>
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {results.map((tour, index) => (
                  <motion.button key={tour.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }} onClick={() => handleSelect(tour)} className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[#F8F6F2]/80 transition-colors text-left">
                    <div className="relative w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0">
                      <Image src={tour.image} alt={locale === 'es' ? tour.nameEs : tour.nameEn} fill sizes="52px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-playfair font-semibold text-[13px] truncate leading-tight" style={{ color: '#1C1C1C' }}>{locale === 'es' ? tour.nameEs : tour.nameEn}</p>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className="flex items-center gap-1 text-[11px] text-[#8B8680]"><MapPin className="w-3 h-3" />{getDestinationName(tour.destination)}</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#8B8680]"><Clock className="w-3 h-3" />{tour.duration} {t.tours.days}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-[13px] leading-tight" style={{ color: '#C5A55A' }}>${tour.priceUSD}</p>
                      <p className="text-[10px] text-[#8B8680]">{t.tours.perPerson}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="h-4" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
