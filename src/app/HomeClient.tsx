'use client';

import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <div className="section-divider" />
      <FeaturedToursSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
