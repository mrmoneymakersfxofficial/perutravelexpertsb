'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowRight, Compass, Mountain, MapPin, Sun, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/tours-data';

/* ── Inca geometric pattern (decorative) ── */
function IncaPattern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.03 }}>
      <rect x="10" y="10" width="180" height="180" stroke="#D4A843" strokeWidth="0.5" />
      <rect x="25" y="25" width="150" height="150" stroke="#D4A843" strokeWidth="0.5" />
      <rect x="40" y="40" width="120" height="120" stroke="#D4A843" strokeWidth="0.5" />
      <rect x="55" y="55" width="90" height="90" stroke="#D4A843" strokeWidth="0.5" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="#D4A843" strokeWidth="0.3" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="#D4A843" strokeWidth="0.3" />
      <line x1="10" y1="10" x2="190" y2="190" stroke="#D4A843" strokeWidth="0.3" />
      <line x1="190" y1="10" x2="10" y2="190" stroke="#D4A843" strokeWidth="0.3" />
      {/* Step cross (chakana) simplified */}
      <rect x="85" y="60" width="30" height="80" stroke="#D4A843" strokeWidth="0.8" />
      <rect x="60" y="85" width="80" height="30" stroke="#D4A843" strokeWidth="0.8" />
      <rect x="75" y="70" width="50" height="60" stroke="#D4A843" strokeWidth="0.5" rx="2" />
    </svg>
  );
}

/* ── Floating destination card ── */
function FloatingDestinationCard({ dest, locale, index }: { dest: typeof destinations[0]; locale: string; index: number }) {
  const name = locale === 'es' ? dest.nameEs : dest.nameEn;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.4 + index * 0.1, ease: 'easeOut' }}
    >
      <Link href={`/our-tours/${dest.slug}`} className="group block">
        <div
          className="relative rounded-xl overflow-hidden border transition-all duration-500"
          style={{
            borderColor: 'rgba(212,168,67,0.12)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="relative h-20 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${dest.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
            <span className="absolute bottom-2 left-3 font-playfair text-xs font-semibold text-white/90 group-hover:text-[#D4A843] transition-colors">
              {name}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function NotFound() {
  const { t, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouse);
    return () => el?.removeEventListener('mousemove', handleMouse);
  }, []);

  const title = locale === 'es' ? 'Página No Encontrada' : 'Page Not Found';
  const subtitle = locale === 'es'
    ? 'Este camino no lleva a ningún destino... pero nosotros sí conocemos los mejores.'
    : 'This path leads nowhere... but we know the best destinations.';
  const exploreLabel = locale === 'es' ? 'Explorar Destinos' : 'Explore Destinations';
  const orText = locale === 'es' ? 'o' : 'or';
  const backLabel = locale === 'es' ? 'Volver al Inicio' : 'Back to Home';
  const suggestedLabel = locale === 'es' ? 'Destinos Populares' : 'Popular Destinations';

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Inca pattern top-right */}
        <IncaPattern className="absolute -top-10 -right-10 w-[400px] h-[400px]" />
        <IncaPattern className="absolute -bottom-10 -left-10 w-[350px] h-[350px]" />

        {/* Ambient golden orbs with parallax */}
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            top: '15%',
            left: '30%',
            background: 'radial-gradient(circle, #D4A843 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.025]"
          style={{
            bottom: '10%',
            right: '20%',
            background: 'radial-gradient(circle, #E8C97A 0%, transparent 70%)',
          }}
        />

        {/* Top/bottom gold lines */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)' }} />

        {/* Side accent lines */}
        <div className="absolute top-1/4 left-0 w-px h-32" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,168,67,0.08), transparent)' }} />
        <div className="absolute bottom-1/4 right-0 w-px h-32" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,168,67,0.08), transparent)' }} />
      </div>

      {/* ── Floating icons ── */}
      <AnimatePresence>
        {mounted && (
          <>
            {[
              { Icon: Mountain, x: '8%', y: '15%', size: 20, delay: 0, rotate: -12 },
              { Icon: MapPin, x: '88%', y: '20%', size: 16, delay: 0.3, rotate: 8 },
              { Icon: Sun, x: '85%', y: '75%', size: 18, delay: 0.6, rotate: 0 },
              { Icon: Feather, x: '10%', y: '78%', size: 14, delay: 0.9, rotate: 20 },
              { Icon: Compass, x: '50%', y: '8%', size: 15, delay: 1.2, rotate: -5 },
            ].map(({ Icon, x, y, size, delay, rotate }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: rotate - 30 }}
                animate={{ opacity: 0.07, scale: 1, rotate }}
                transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
                className="absolute pointer-events-none"
                style={{ left: x, top: y }}
              >
                <Icon size={size} style={{ color: '#D4A843' }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto w-full">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-4"
        >
          <span
            className="block font-playfair text-[140px] sm:text-[180px] md:text-[220px] font-bold leading-none select-none"
            style={{
              background: 'linear-gradient(180deg, rgba(212,168,67,0.22) 0%, rgba(212,168,67,0.04) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            404
          </span>

          {/* Gold accent line under 404 */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-28 h-[1px] mx-auto origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }}
          />

          {/* Small diamond ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="w-2 h-2 mx-auto mt-3"
            style={{ background: '#D4A843', boxShadow: '0 0 12px rgba(212,168,67,0.4)' }}
          />
        </motion.div>

        {/* Compass icon */}
        <motion.div
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="w-16 h-16 rounded-full mx-auto mb-7 flex items-center justify-center relative"
          style={{
            border: '1px solid rgba(212,168,67,0.25)',
            background: 'linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(212,168,67,0.02) 100%)',
            boxShadow: '0 0 30px rgba(212,168,67,0.06)',
          }}
        >
          <Compass size={26} style={{ color: '#D4A843' }} />
          {/* Outer ring glow */}
          <div
            className="absolute inset-[-1px] rounded-full animate-pulse"
            style={{ border: '1px solid rgba(212,168,67,0.1)' }}
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          style={{ color: '#F8F6F2' }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="text-white/35 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link href="/our-tours">
            <Button className="btn-gold rounded-full px-8 py-3 text-sm tracking-wide flex items-center gap-2.5">
              <Compass size={15} />
              {exploreLabel}
              <ArrowRight size={15} />
            </Button>
          </Link>
          <div className="hidden sm:block text-white/20 text-xs tracking-widest uppercase">{orText}</div>
          <Link href="/">
            <Button
              className="rounded-full px-7 py-3 text-sm tracking-wide flex items-center gap-2 transition-all duration-300"
              style={{ border: '1px solid rgba(212,168,67,0.25)', color: 'rgba(212,168,67,0.8)', background: 'transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,67,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,67,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,67,0.25)'; }}
            >
              <Home size={15} />
              {backLabel}
            </Button>
          </Link>
        </motion.div>

        {/* Popular Destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(212,168,67,0.5)' }}>
            — {suggestedLabel} —
          </p>
          <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-md mx-auto">
            {destinations.slice(0, 5).map((dest, i) => (
              <FloatingDestinationCard key={dest.id} dest={dest} locale={locale} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom branding line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,168,67,0.25)' }}>
          PeruTravelExpertsB
        </p>
      </motion.div>
    </div>
  );
}