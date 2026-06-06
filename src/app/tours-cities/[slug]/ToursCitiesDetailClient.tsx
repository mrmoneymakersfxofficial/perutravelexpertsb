'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Check, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { getCommunityTourBySlug } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function ToursCitiesDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, locale } = useLanguage();

  const sectionIds = ['community-hero', 'community-content'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const tour = getCommunityTourBySlug(slug);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#1C1C1C' }}>
            {locale === 'es' ? 'Tour no encontrado' : 'Tour not found'}
          </h1>
          <Link href="/tours-cities">
            <Button className="btn-gold rounded-full px-6 mt-4">{t.communityTours.title}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const desc = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.communityTours.title, href: '/tours-cities' },
          { label: name },
        ]}
      />

      <section id="community-hero" className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={tour.image} alt={name} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />{tour.duration} {t.tours.days}
              </div>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">{name}</h1>
          </div>
        </div>
      </section>

      <section id="community-content" className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <p className="text-[#8B8680] text-base leading-relaxed">{desc}</p>
              </div>
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-[#E8D5B5]/[0.04]">
                      <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-sm text-[#1C1C1C]/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-[#E8D5B5]/[0.04]">
                  <div className="text-center mb-6">
                    <p className="text-sm text-[#8B8680] mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(tour.priceUSD)}</p>
                    <p className="text-xs text-[#8B8680]">{t.tours.perPerson}</p>
                  </div>
                  <a href="https://wa.me/51984000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm">
                    <MessageCircle className="w-5 h-5" />
                    {locale === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
