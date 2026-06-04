'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TourCard from '@/components/TourCard';
import { getFeaturedTours, tourToView } from '@/lib/tours-data';

export default function FeaturedToursSection() {
  const { t, locale } = useLanguage();
  const featuredTours = getFeaturedTours().slice(0, 4);

  return (
    <section id="tours" className="py-20 md:py-28" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#2C1810' }}
          >
            {t.home.featuredTours}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-[#8B8680] text-lg">{t.tours.subtitle}</p>
        </motion.div>

        {/* Featured Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tourToView(tour)} locale={locale} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/tour-packages">
            <Button className="btn-gold rounded-full px-8 py-3 text-base tracking-wide flex items-center gap-2">
              {t.home.viewAllPackages}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
