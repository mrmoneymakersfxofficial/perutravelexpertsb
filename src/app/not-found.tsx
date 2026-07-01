'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const { t, locale } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#F8F6F2' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="font-playfair text-8xl md:text-9xl font-bold gold-text">
              404
            </h1>
          </div>

          {/* Compass Icon */}
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-8"
          >
            <Compass className="w-10 h-10 text-[#0F0F0F]" />
          </motion.div>

          {/* Title */}
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
            {t.notFound.title}
          </h2>

          {/* Description */}
          <p className="text-[#8B8680] text-base leading-relaxed mb-8">
            {t.notFound.description}
          </p>

          {/* Divider */}
          <div className="w-16 h-0.5 mx-auto mb-8 gold-gradient" />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="btn-gold rounded-full px-8 py-3 text-base flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t.notFound.backHome}
              </Button>
            </Link>
            <Link href="/our-tours">
              <Button className="btn-gold-outline rounded-full px-8 py-3 text-base">
                {t.pageHeaders.tourPackages}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
