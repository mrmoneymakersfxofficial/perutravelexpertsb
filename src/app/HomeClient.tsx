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
      <WhyChooseUsSection />
      <div className="section-divider" />
      <FeaturedToursSection />
      <TestimonialsSection />
      <StatsSection />
      <RecentlyViewedCarousel onTourClick={openDetail} />
      <CTASection />
    </>
  );
}
