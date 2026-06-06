'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Separate component to avoid hydration mismatch from Math.random()
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: ((i * 37 + 13) % 100), // deterministic spread
        top: ((i * 53 + 7) % 100),
        delay: ((i * 0.37) % 6).toFixed(1),
        duration: (4 + (i * 0.53) % 4).toFixed(1),
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute w-1 h-1 rounded-full bg-[#D6B37F]/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}

export default function HeroSection() {
  const { t, locale } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')> | null = null;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule.gsap || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 80, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2 },
            0.3
          );
        }

        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.8
          );
        }

        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            1.1
          );
        }

        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.4
          );
        }

        // Parallax on hero background
        if (heroRef.current) {
          gsap.to(heroRef.current.querySelector('.hero-bg'), {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    };

    initGSAP();

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-[60px] md:-mt-[65px] lg:-mt-[70px] pt-[60px] md:pt-[65px] lg:pt-[70px]"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <div className="hero-bg absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Cusco Panorama"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            onError={(e) => {
              // Hide the image if it fails to load - gradient fallback will show
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-[#0F0F0F]/40 to-[#0F0F0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/50 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Particles />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#D6B37F]" />
          <span className="text-sm text-[#D6B37F] font-medium tracking-wider uppercase">
            {locale === 'es' ? 'Viajeros VIP' : 'VIP Travelers'}
          </span>
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 opacity-0"
        >
          <span className="gold-text">{t.hero.title.split(' ').slice(0, -1).join(' ')}</span>
          <br />
          <span className="text-white">{t.hero.title.split(' ').slice(-1)[0]}</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-playfair text-xl sm:text-2xl md:text-3xl text-[#E8D5B5] mb-6 opacity-0"
        >
          {t.hero.subtitle}
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-[#8B8680] text-base sm:text-lg max-w-2xl mx-auto mb-10 opacity-0"
        >
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <Link href="/tour-packages">
            <Button
              className="btn-gold rounded-full px-8 py-3 text-base tracking-wide"
            >
              {t.hero.cta}
            </Button>
          </Link>
          <Link href="/customized-tours">
            <Button
              variant="outline"
              className="btn-gold-outline rounded-full px-8 py-3 text-base tracking-wide"
            >
              {t.hero.ctaSecondary}
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-[#D6B37F]/60 hover:text-[#D6B37F] transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
