'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6B37F]/10 rounded-full blur-3xl" />
        {/* Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D6B37F 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Sparkle icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-card mb-8">
            <Sparkles className="w-8 h-8 text-[#D6B37F]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-[#8B8680] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          <Link href="/tour-packages">
            <Button
              className="btn-gold rounded-full px-10 py-4 text-lg tracking-wide flex items-center gap-2"
            >
              {t.cta.bookNow}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
