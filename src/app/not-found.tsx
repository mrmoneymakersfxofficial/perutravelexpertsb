'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Home, ArrowRight, Mountain, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const floatingIcons = [
  { Icon: Mountain, x: '12%', y: '18%', size: 22, delay: 0 },
  { Icon: MapPin, x: '82%', y: '22%', size: 18, delay: 0.5 },
  { Icon: Globe, x: '75%', y: '72%', size: 20, delay: 1 },
  { Icon: Compass, x: '18%', y: '68%', size: 16, delay: 1.5 },
];

export default function NotFound() {
  const { t, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Ambient golden glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #D4A843 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.1), transparent)' }} />
      </div>

      {/* Floating travel icons */}
      <AnimatePresence>
        {mounted && floatingIcons.map(({ Icon, x, y, size, delay }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className="absolute pointer-events-none"
            style={{ left: x, top: y }}
          >
            <Icon size={size} style={{ color: '#D4A843' }} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* 404 Number — ultra refined */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 relative"
          >
            <span
              className="font-playfair text-[120px] sm:text-[150px] md:text-[180px] font-bold leading-none select-none"
              style={{
                background: 'linear-gradient(180deg, rgba(212,168,67,0.25) 0%, rgba(212,168,67,0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </span>
            {/* Thin gold underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-24 h-[1px] mx-auto mt-2 gold-gradient origin-center"
            />
          </motion.div>

          {/* Compass Icon */}
          <motion.div
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{
              border: '1px solid rgba(212,168,67,0.3)',
              background: 'rgba(212,168,67,0.06)',
            }}
          >
            <Compass size={28} style={{ color: '#D4A843' }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-playfair text-2xl md:text-3xl font-bold mb-4"
            style={{ color: '#F8F6F2' }}
          >
            {t.notFound.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-white/40 text-base leading-relaxed mb-10 max-w-md mx-auto"
          >
            {t.notFound.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button className="btn-gold rounded-full px-8 py-3 text-sm tracking-wide flex items-center gap-2">
                <Home size={16} />
                {t.notFound.backHome}
              </Button>
            </Link>
            <Link href="/our-tours">
              <Button className="rounded-full px-8 py-3 text-sm tracking-wide flex items-center gap-2 transition-all duration-300" style={{ border: '1px solid rgba(212,168,67,0.3)', color: '#D4A843', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,67,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                {locale === 'es' ? 'Explorar Tours' : 'Explore Tours'}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}