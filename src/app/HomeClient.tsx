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

export default function HomeClient() {
  const { openDetail } = useModal();
  const sectionIds = ['about', 'tours', 'testimonials', 'stats', 'cta'];

  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <>
      <HeroSection />
      {/* Dark → Light immersive transition */}
      <div className="section-transition-dark-light" />
      <WhyChooseUsSection />
      {/* Light → Dark immersive transition (replaces 1px divider) */}
      <div className="section-transition-light-dark" />
      <FeaturedToursSection />
      <TestimonialsSection />
      {/* Dark → Gold immersive transition */}
      <div className="section-transition-dark-gold" />
      <StatsSection />
      {/* Gold → Dark immersive transition */}
      <div className="section-transition-gold-dark" />
      <RecentlyViewedCarousel onTourClick={openDetail} />
      <CTASection />
    </>
  );
}
