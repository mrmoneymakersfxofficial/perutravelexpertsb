'use client';

import React, { use, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ArrowRight, MessageCircle, ChevronDown, Check, X, Image as ImageIcon } from 'lucide-react';
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
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

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
  const itinerary = isEs ? pkg.itineraryEs : pkg.itineraryEn;
  const includes = isEs ? pkg.includesEs : pkg.includesEn;
  const gallery = pkg.gallery || [];

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const toggleExpand = (days: number) => {
    setExpandedDay(expandedDay === days ? null : days);
    if (expandedDay !== days) {
      setTimeout(() => {
        const el = document.getElementById(`detail-${days}`);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 300);
    }
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

      {/* Image Gallery */}
      {gallery.length > 0 && (
        <section className="pb-12 sm:pb-16 bg-[#0F0F0F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
              <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
                {isEs ? 'Galería' : 'Gallery'}
              </h2>
              <div className="h-[2px] w-16 mb-6" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`relative rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2 h-48 md:h-full min-h-[200px]' : 'h-40 sm:h-48'}`}
                  >
                    <img
                      src={img}
                      alt={`${name} - ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
            {durations.map((days, index) => {
              const isExpanded = expandedDay === days;
              const visibleItinerary = itinerary ? itinerary.slice(0, Math.min(days, itinerary.length)) : [];
              const extraDays = days - visibleItinerary.length;

              return (
                <motion.div
                  key={days}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="space-y-0"
                >
                  {/* Card */}
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 border"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: isExpanded ? 'rgba(197,165,90,0.3)' : 'rgba(255,255,255,0.06)',
                      borderBottomLeftRadius: isExpanded ? 0 : undefined,
                      borderBottomRightRadius: isExpanded ? 0 : undefined,
                    }}
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
                        {visibleItinerary.slice(0, 4).map((day, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#D4A843' }} />
                            <span className="text-white/60">{isEs ? day.titleEs : day.titleEn}</span>
                          </div>
                        ))}
                        {(days > 4 || extraDays > 0) && (
                          <div className="flex items-center gap-2.5 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(212,168,67,0.3)' }} />
                            <span className="text-white/35">+{Math.max(days - 4, extraDays, 0)} {isEs ? 'días más' : 'more days'}</span>
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
                        <button
                          onClick={() => toggleExpand(days)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95"
                          style={{
                            background: isExpanded ? 'rgba(197,165,90,0.15)' : 'linear-gradient(135deg, #C9A96E, #D4A843)',
                            color: isExpanded ? '#E8C97A' : '#0F0F0F',
                            border: isExpanded ? '1px solid rgba(197,165,90,0.3)' : 'none',
                          }}
                        >
                          {isEs ? 'Ver Detalles' : 'View Details'}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </motion.div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`detail-${days}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="overflow-hidden border border-t-0 rounded-b-2xl"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          borderColor: 'rgba(197,165,90,0.15)',
                        }}
                      >
                        <div className="p-5 sm:p-6 space-y-6">

                          {/* Detail Images */}
                          {gallery.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <ImageIcon className="w-4 h-4" style={{ color: '#D4A843' }} />
                                <h4 className="text-sm font-bold text-white">{isEs ? 'Imágenes del Paquete' : 'Package Images'}</h4>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                {gallery.slice(0, 3).map((img, i) => (
                                  <div key={i} className="relative rounded-lg overflow-hidden h-24 sm:h-28">
                                    <img src={img} alt={`${name} image ${i + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Full Itinerary */}
                          {itinerary && itinerary.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-4 h-4" style={{ color: '#D4A843' }} />
                                <h4 className="text-sm font-bold text-white">
                                  {isEs ? `Itinerario - ${days} Días` : `Itinerary - ${days} Days`}
                                </h4>
                              </div>
                              <div className="space-y-3">
                                {itinerary.slice(0, days).map((day, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.06 }}
                                    className="rounded-xl p-3.5 sm:p-4"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#0F0F0F] shrink-0 mt-0.5"
                                        style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}
                                      >
                                        {day.day}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-white text-sm mb-1">
                                          {isEs ? day.titleEs : day.titleEn}
                                        </h5>
                                        <p className="text-white/50 text-xs leading-relaxed">
                                          {isEs ? day.descriptionEs : day.descriptionEn}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                                {days > itinerary.length && (
                                  <div className="rounded-xl p-3.5 text-center" style={{ background: 'rgba(212,168,67,0.06)', border: '1px dashed rgba(212,168,67,0.2)' }}>
                                    <p className="text-xs text-[#D4A843]/70">
                                      +{days - itinerary.length} {isEs ? 'días adicionales con actividades exclusivas' : 'additional days with exclusive activities'}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Includes */}
                          {includes && includes.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Check className="w-4 h-4" style={{ color: '#25D366' }} />
                                <h4 className="text-sm font-bold text-white">{isEs ? 'Qué Incluye' : 'What\'s Included'}</h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {includes.map((item, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs">
                                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#25D366' }} />
                                    <span className="text-white/60">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA at bottom */}
                          <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <a
                              href={getWhatsAppLink(`${isEs ? 'Hola, me interesa' : 'Hi, I\'m interested in'} "${name} ${days} ${isEs ? 'días' : 'days'}" de PeruTravelExpertsB`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 active:scale-95"
                              style={{ backgroundColor: '#25D366' }}
                            >
                              <MessageCircle className="w-4 h-4" />
                              {isEs ? 'Consultar por WhatsApp' : 'Consult via WhatsApp'}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}