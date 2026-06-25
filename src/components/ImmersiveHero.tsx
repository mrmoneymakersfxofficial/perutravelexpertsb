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
  children?: React.ReactNode; // extra content below title (badges, price, etc.)
}

export default function ImmersiveHero({
  title,
  subtitle,
  bgImage,
  breadcrumbs,
  height = '70vh',
  overlay = 'dark',
  children,
}: ImmersiveHeroProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full overflow-hidden"
      style={{
        height,
        /* Section bg = page content bg. Gradient overlay creates seamless blend. */
        backgroundColor: '#0F0F0F',
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

      {/*
        ════════════════════════════════════════════════════════════
        CONTINUOUS GRADIENT SYSTEM — Zero visible boundary
        ════════════════════════════════════════════════════════════
        Single unified gradient:
        • Top: dark for header transparency + text readability
        • Middle: transparent to showcase the image
        • Bottom: smooth fade to exact #0F0F0F (page bg)
        Result: image → dark → page bg = invisible seam
      */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.6) 0%,
              rgba(0,0,0,0.12) 25%,
              transparent 40%,
              rgba(15,15,15,0.25) 65%,
              rgba(15,15,15,0.65) 82%,
              #0F0F0F 100%
            )
          `,
        }}
      />

      {/* Side vignettes for cinematic feel */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Content Layer — Mobile: top-aligned / Desktop: bottom-aligned */}
      <div className="relative z-[2] flex flex-col justify-start md:justify-end h-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-0 pb-8 sm:pb-10 md:pb-16 lg:pb-20">

          {/* Floating Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 mb-5 sm:mb-6 md:mb-6"
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

          {/* Giant Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-playfair text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5 md:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          >
            {title}
          </motion.h1>

          {/* Gold Underline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[3px] w-14 sm:w-20 md:w-24 mb-4 sm:mb-5 md:mb-5 origin-left"
            style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }}
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl lg:max-w-3xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Extra Content (badges, price, etc.) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 sm:mt-5 md:mt-6"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}