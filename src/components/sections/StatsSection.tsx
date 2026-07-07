'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Users, Map, Clock, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultStats = [
  { key: 'travelers', value: 1000, suffix: '+', icon: Users },
  { key: 'tours', value: 500, suffix: '+', icon: Map },
  { key: 'years', value: 8, suffix: '+', icon: Clock },
  { key: 'satisfaction', value: 99, suffix: '%', icon: ThumbsUp },
];

const iconMap = { Users, Map, Clock, ThumbsUp };

interface StatsSectionProps {
  /** Datos de estadísticas desde Sanity (opcional) */
  sanityStats?: Array<{
    label?: string;
    labelEn?: string;
    value?: number;
    suffix?: string;
    prefix?: string;
  }> | null;
}

export default function StatsSection({ sanityStats }: StatsSectionProps) {
  const { t, locale } = useLanguage();
  const countersRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  // Usar datos de Sanity si están disponibles, si no usar defaults
  const statsData = (sanityStats && sanityStats.length > 0)
    ? sanityStats.map((s, i) => ({
        key: s.label || `stat-${i}`,
        value: s.value || 0,
        suffix: s.suffix || '',
        prefix: s.prefix || '',
        // Los labels vienen de Sanity con stega encoding cuando hay draft mode
        label: locale === 'es' ? s.label : (s.labelEn || s.label),
        icon: [Users, Map, Clock, ThumbsUp][i % 4],
      }))
    : defaultStats;

  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule.gsap || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      if (!gsap || !ScrollTrigger || !countersRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: countersRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (counted.current) return;
          counted.current = true;

          const counterElements = countersRef.current?.querySelectorAll('[data-count]');
          counterElements?.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count') || '0', 10);
            const obj = { value: 0 };
            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(obj.value).toString();
              },
            });
          });
        },
      });
    };

    initGSAP();
  }, []);

  return (
    <section id="stats" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gold-gradient opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/20 via-transparent to-[#0F0F0F]/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={countersRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            // Usar label de Sanity con stega, o fallback a traducciones
            const label = sanityStats
              ? (stat.label || stat.key)
              : ((t.stats as Record<string, string>)[stat.key] || stat.key);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#0F0F0F]/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#0F0F0F]" />
                </div>
                <div className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0F0F] mb-1">
                  <span data-count={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-[#0F0F0F]/70 text-sm font-medium">{label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
