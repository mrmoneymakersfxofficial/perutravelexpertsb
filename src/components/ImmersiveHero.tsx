'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ImmersiveHeroProps {
  title: string;
  subtitle?: string;
  bgImage: string;
  breadcrumbs: BreadcrumbItem[];
  height?: string; // e.g. '60vh', '75vh', '500px'
  overlay?: 'dark' | 'light'; // dark for tour detail, light for destination
  bottomColor?: string; // color to blend into at bottom (default #0F0F0F)
  children?: React.ReactNode; // extra content below title (badges, price, etc.)
}

export default function ImmersiveHero({
  title,
  subtitle,
  bgImage,
  breadcrumbs,
  height = '70vh',
  overlay = 'dark',
  bottomColor = '#0F0F0F',
  children,
}: ImmersiveHeroProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full overflow-hidden"
      style={{ height }}
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
      {/* Bottom gradient to blend into page background */}
      <div className="absolute inset-0 z-[1]" style={{
        background: `linear-gradient(to top, ${bottomColor} 0%, ${bottomColor}40 40%, transparent 100%)`,
      }} />
      {/* Side vignettes for cinematic feel */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%)',
      }} />
      {/* Top darkening for below-header blending */}
      <div className="absolute top-0 left-0 right-0 h-24 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.6), transparent)' }} />

      {/* Content Layer */}
      <div className="relative z-[2] flex flex-col justify-end h-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-16 lg:pb-20">

          {/* Floating Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 mb-4 sm:mb-5 md:mb-6">
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
                  <span className="text-white/70">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-white/25 mx-0.5">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Giant Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-3 sm:mb-4 md:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            {title}
          </h1>

          {/* Gold Underline */}
          <div className="h-[3px] w-16 sm:w-20 md:w-24 mb-3 sm:mb-4 md:mb-5" style={{ background: 'linear-gradient(90deg, #D4A843, #B89020)' }} />

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl lg:max-w-3xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              {subtitle}
            </p>
          )}

          {/* Extra Content (badges, price, etc.) */}
          {children && (
            <div className="mt-4 sm:mt-5 md:mt-6">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
