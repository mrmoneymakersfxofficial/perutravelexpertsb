'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { getCustomizedTourBySlug } from '@/lib/tours-data';
import { getWhatsAppLink } from '@/lib/whatsapp';

const DURATION_RANGES: Record<string, number[]> = {
  'cusco-lima': [7, 8, 9, 10, 11],
  'cusco-puno': [5, 6, 7, 8, 9],
  'cusco-arequipa': [6, 7, 8, 9, 10],
  'cusco-amazon': [6, 7, 8, 9, 10],
  'solo-cusco': [5, 6, 7, 8, 9],
};

export default function CustomizedTourDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, locale } = useLanguage();
  const isEs = locale === 'es';

  const pkg = getCustomizedTourBySlug(slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-center px-4">
          <h1 className="font-playfair text-3xl font-bold text-white">
            {isEs ? 'Paquete no encontrado' : 'Package not found'}
          </h1>
        </div>
      </div>
    );
  }

  const name = isEs ? pkg.nameEs : pkg.nameEn;
  const desc = isEs ? pkg.descriptionEs : pkg.descriptionEn;
  const durations = DURATION_RANGES[slug] || [pkg.duration, pkg.duration + 1, pkg.duration + 2, pkg.duration + 3, pkg.duration + 4];

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
      <ImmersiveHero
        title={name}
        bgImage={pkg.image}
        height="60vh"
        bottomColor="#0F0F0F"
        breadcrumbs={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: isEs ? 'Tour Packages' : 'Tour Packages', href: '/tour-packages' },
          { label: name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Clock className="w-3.5 h-3.5" />{durations[0]}-{durations[durations.length - 1]} {t.tours.days}
          </div>
          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <MapPin className="w-3.5 h-3.5" />
              {pkg.destinations.map(d => (t.destinations as Record<string, string>)[d] || d).join(' / ')}
            </div>
          )}
        </div>
      </ImmersiveHero>

      {/* Description */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
              {isEs ? 'Descripción' : 'Description'}
            </h2>
            <div className="h-[2px] w-16 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl">{desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Duration Variants */}
      <section className="pb-16 sm:pb-20 md:pb-24 bg-[#0F0F0F]" style={{ borderTop: '1px solid rgba(197,165,90,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-10 sm:mb-14">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {isEs ? 'Elige tu Duración' : 'Choose Your Duration'}
            </h2>
            <div className="w-16 sm:w-20 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
            <p className="text-white/50 text-sm mt-4 max-w-xl mx-auto">
              {isEs
                ? `Selecciona la cantidad de días que deseas para tu experiencia ${name}`
                : `Select the number of days for your ${name} experience`}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {durations.map((days, index) => (
              <motion.div
                key={days}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="rounded-2xl overflow-hidden transition-all duration-300 border border-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="p-5 sm:p-6">
                  {/* Duration header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-[#0F0F0F] shrink-0"
                      style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}
                    >
                      {days}
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-white">
                        {name}
                      </h3>
                      <p className="text-white/50 text-xs mt-0.5">
                        {days} {days === 1 ? (isEs ? 'día' : 'day') : (isEs ? 'días' : 'days')}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-5">
                    {pkg.itineraryEs && pkg.itineraryEs.slice(0, Math.min(days, 4)).map((day, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#D4A843' }} />
                        <span className="text-white/60">{isEs ? day.titleEs : day.titleEn}</span>
                      </div>
                    ))}
                    {days > 4 && pkg.itineraryEs && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(212,168,67,0.3)' }} />
                        <span className="text-white/35">+{days - 4} {isEs ? 'días más' : 'more days'}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2.5">
                    <a
                      href={getWhatsAppLink(`${isEs ? 'Hola, me interesa' : 'Hi, I\'m interested in'} "${name} ${days} ${isEs ? 'días' : 'days'}" de PeruTravelExpertsB`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 active:scale-95"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`#${days}`}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #C9A96E, #D4A843)', color: '#0F0F0F' }}
                    >
                      {isEs ? 'Ver Detalles' : 'View Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}