'use client';

import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';
import RecentlyViewedCarousel from '@/components/RecentlyViewedCarousel';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';
import { useModal } from '@/components/ModalContext';
import type { TourData } from '@/lib/tours-data';

interface HomeClientProps {
  settings?: Record<string, any> | null;
  featuredTours?: TourData[] | null;
  testimonials?: any[] | null;
  stats?: any[] | null;
}

export default function HomeClient({ featuredTours, testimonials, stats, settings }: HomeClientProps) {
  const { openDetail } = useModal();
  const sectionIds = ['about', 'tours', 'testimonials', 'stats', 'cta'];

  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <>
      <HeroSection />
      <div className="section-transition-dark-light" />
      <WhyChooseUsSection />
      <div className="section-transition-light-dark" />
      <FeaturedToursSection sanityTours={featuredTours} />
      <TestimonialsSection sanityTestimonials={testimonials} />
      <div className="section-transition-dark-gold" />
      <StatsSection sanityStats={stats} />
      <div className="section-transition-gold-dark" />
      <RecentlyViewedCarousel onTourClick={openDetail} />
      <CTASection />
    </>
  );
}
