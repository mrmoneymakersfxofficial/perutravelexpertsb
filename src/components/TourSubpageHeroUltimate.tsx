'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TourSubpageHeroUltimateProps {
  title: string;
  destination?: string;
  duration?: string;
  level?: string;
  price?: number;
  highSeasonPrice?: number;
  bgImage: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function TourSubpageHeroUltimate({
  title,
  destination,
  duration,
  level,
  price,
  highSeasonPrice,
  bgImage,
  breadcrumbs,
  children,
}: TourSubpageHeroUltimateProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{
        /* Mobile: ~80vh so content + bottom nav fits; Desktop: full viewport */
        height: '80vh',
        minHeight: '520px',
      }}
    >
      {/* Full-Bleed Background Image */}
      {!imgError ? (
        <Image
          src={bgImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
      )}

      {/* Cinematic Gradient Layers */}
      {/* Mobile: top-heavy gradient for text readability from top */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/30 to-black/60 md:bg-gradient-to-b md:from-black/80 md:via-black/10 md:to-transparent" />
      {/* Desktop: bottom fade for content below */}
      <div className="absolute inset-0 z-[1] hidden md:block bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/30 to-transparent" />
      {/* Side vignettes */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {/* Content Layer — Mobile: top-aligned / Desktop: bottom-aligned */}
      <div className="relative z-[2] flex flex-col justify-start md:justify-end h-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-0 pb-10 sm:pb-14 md:pb-20 lg:pb-24">

          {/* ── Breadcrumbs ── */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 mb-5 sm:mb-6 md:mb-5"
          >
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#C5A55A] transition-colors duration-200 whitespace-nowrap"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70 line-clamp-1">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-white/25 mx-0.5 shrink-0">/</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>

          {/* ── Title ── */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-playfair text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5 md:mb-5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] uppercase max-w-4xl"
          >
            {title}
          </motion.h1>

          {/* ── Gold Accent Bar ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="h-[3px] w-14 sm:w-20 md:w-24 mb-5 sm:mb-6 md:mb-6 origin-left"
            style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }}
          />

          {/* ── Info Badges ── */}
          {(level || duration || destination) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-5"
            >
              {level && (
                <span
                  className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[#0F0F0F]"
                  style={{ background: 'linear-gradient(135deg, #C5A55A, #A8883D)' }}
                >
                  {level}
                </span>
              )}
              {duration && (
                <span
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-white"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A55A]" />
                  {duration}
                </span>
              )}
              {destination && (
                <span
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-white"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A55A]" />
                  {destination}
                </span>
              )}
            </motion.div>
          )}

          {/* ── Price Block ── */}
          {price !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-baseline gap-1.5 sm:gap-2"
            >
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-medium">
                From
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-[#C5A55A] leading-none">
                ${Math.round(price)}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40">USD / PAX</span>
              {highSeasonPrice && (
                <span className="text-[10px] sm:text-xs text-white/30 font-light italic ml-1">
                  ({typeof window !== 'undefined'
                    ? document.documentElement.lang === 'en'
                      ? 'High season'
                      : 'Temporada alta'
                    : 'Temporada alta'}
                  : ${Math.round(highSeasonPrice)})
                </span>
              )}
            </motion.div>
          )}

          {/* Extra Content (custom children slot) */}
          {children}
        </div>
      </div>

      {/* Scroll Down Indicator — Desktop only */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2] hidden md:flex flex-col items-center gap-1.5 scroll-indicator">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-[#C5A55A]/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7-7-7m0-6l7 7 7-7"
          />
        </svg>
      </div>
    </section>
  );
}