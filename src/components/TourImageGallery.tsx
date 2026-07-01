'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TourImageGalleryProps {
  images?: string[];
  title?: string;
}

export default function TourImageGallery({ images = [], title = '' }: TourImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-[#D4A843] tracking-wide uppercase mb-5 sm:mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {title || 'Galería'}
      </h3>

      {/* Thumbnail Grid — Asymmetric layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className={`group relative bg-black rounded-xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-300 hover:border-[#D4A843]/20 hover:shadow-lg ${
              idx === 0 ? 'sm:col-span-2 sm:row-span-2 h-40 sm:h-auto' : 'h-36 sm:h-40'
            }`}
          >
            <Image
              src={img}
              alt={`${title} ${idx + 1}`}
              fill
              sizes={idx === 0 ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 50vw, 33vw'}
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center" style={{ height: '60vh' }}>
              {/* Prev arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-[#D4A843] text-white hover:text-[#0F0F0F] border border-white/10 hover:border-transparent transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full mx-12 sm:mx-16 rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`${title} ${currentIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-[#D4A843] text-white hover:text-[#0F0F0F] border border-white/10 hover:border-transparent transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Counter */}
            <div className="mt-4 text-xs font-mono tracking-widest text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
