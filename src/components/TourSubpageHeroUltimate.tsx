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
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh', minHeight: '100vh' }}>
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
      {/* Top: Blends with glass header above */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent z-[1]" />
      {/* Bottom: Blends into page content below */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/30 to-transparent z-[1]" />
      {/* Side vignettes */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-[2] flex flex-col justify-center h-full pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 mb-6 sm:mb-8 md:mb-10">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#D4A843] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70 max-w-[140px] sm:max-w-none truncate">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-white/25 mx-0.5">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Giant Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] mb-5 sm:mb-6 md:mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] uppercase max-w-4xl">
            {title}
          </h1>

          {/* Gold Accent Bar */}
          <div
            className="h-[3px] w-16 sm:w-20 md:w-24 mb-6 sm:mb-8 md:mb-10"
            style={{ background: 'linear-gradient(90deg, #D4A843, #B89020)' }}
          />

          {/* Info Badges */}
          {(level || duration || destination) && (
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
              {level && (
                <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[#0F0F0F]"
                  style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}
                >
                  // {level}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4A843]" />
                  {duration}
                </span>
              )}
              {destination && (
                <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4A843]" />
                  {destination}
                </span>
              )}
            </div>
          )}

          {/* Price Block */}
          {price !== undefined && (
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-medium">
                From
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-[#D4A843] leading-none">
                ${Math.round(price)}
              </span>
              <span className="text-[10px] sm:text-xs text-white/40">USD / PAX</span>
              {highSeasonPrice && (
                <span className="text-[10px] sm:text-xs text-white/30 font-light italic ml-1">
                  ({typeof window !== 'undefined'
                    ? document.documentElement.lang === 'en'
                      ? 'High season'
                      : 'Temporada alta'
                    : 'Temporada alta'}: ${Math.round(highSeasonPrice)})
                </span>
              )}
            </div>
          )}

          {/* Extra Content (custom children slot) */}
          {children}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2] hidden md:flex flex-col items-center gap-1.5 scroll-indicator">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-[#D4A843]/60"
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
