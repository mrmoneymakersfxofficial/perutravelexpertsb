'use client';

import React, { useMemo } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import type { TourData, DestinationData } from '@/lib/tours-data';

interface ToursClientProps {
  tours: TourData[];
  destinations: DestinationData[];
}

/* ── Difficulty badge config ──────────────────────────────────────── */
const difficultyConfig = {
  beginner: {
    es: 'Principiante',
    en: 'Beginner',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  moderate: {
    es: 'Moderado',
    en: 'Moderate',
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  advanced: {
    es: 'Avanzado',
    en: 'Advanced',
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
} as const;

/* ── Framer Motion variants ───────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerLine = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 } },
};

export default function ToursClient({ tours, destinations }: ToursClientProps) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  /* ── Group tours by destination, respecting destination order ───── */
  const grouped = useMemo(() => {
    return destinations
      .map((dest) => ({
        ...dest,
        tours: tours.filter((t) => t.destination === dest.slug && t.active),
      }))
      .filter((group) => group.tours.length > 0);
  }, [destinations, tours]);

  /* ── Localised labels ────────────────────────────────────────────── */
  const labels = {
    heroTitle: isEs ? 'Nuestros Tours' : 'Our Tours',
    heroSubtitle: isEs
      ? 'Descubre las experiencias más exclusivas de Perú. Desde las ruinas milenarias de Machu Picchu hasta las profundidades de la selva amazónica.'
      : 'Discover the most exclusive experiences in Peru. From the ancient ruins of Machu Picchu to the depths of the Amazon rainforest.',
    heroSubline: isEs
      ? 'Cada tour está diseñado para ofrecerte una experiencia de lujo e inolvidable.'
      : 'Every tour is designed to offer you a luxurious and unforgettable experience.',
    toursCount: isEs ? 'tours' : 'tours',
    days: isEs ? 'días' : 'days',
    viewDetails: isEs ? 'Ver Detalles' : 'View Details',
    from: isEs ? 'Desde' : 'From',
    perPerson: isEs ? '/ persona' : '/ person',
    allToursLabel: isEs ? 'Todos los Tours' : 'All Tours',
    exploreLabel: isEs ? 'Explora' : 'Explore',
    whatsappMsg: isEs
      ? '¡Hola! Me interesa conocer más sobre sus tours de lujo en Perú.'
      : 'Hello! I\'m interested in learning more about your luxury tours in Peru.',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0F0F0F' }}>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/tours/machu-picchu.jpg"
            alt="Peru Luxury Tours"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0F0F0F]" />
        </div>

        {/* Decorative gold shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C5A55A, transparent)' }} />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Label chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(197,165,90,0.15)', border: '1px solid rgba(197,165,90,0.25)' }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: '#C5A55A' }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#C5A55A' }}>
                {destinations.length} {isEs ? 'destinos' : 'destinations'} &middot; {tours.filter((t) => t.active).length} {labels.toursCount}
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
              {labels.heroTitle}
            </h1>

            {/* Gold underline */}
            <motion.div
              variants={headerLine}
              initial="hidden"
              animate="visible"
              className="w-24 h-0.5 mx-auto mb-6"
              style={{ backgroundColor: '#C5A55A' }}
            />

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {labels.heroSubtitle}
            </p>

            {/* Subline */}
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {labels.heroSubline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TOURS BY DESTINATION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {grouped.map((group, groupIdx) => (
            <div key={group.id} className={groupIdx > 0 ? 'mt-20 sm:mt-24 md:mt-28' : ''}>
              {/* ── Destination header ─────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#C5A55A' }} />
                  <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {isEs ? group.nameEs : group.nameEn}
                  </h2>
                  <span
                    className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{ color: '#C5A55A', background: 'rgba(197,165,90,0.12)', border: '1px solid rgba(197,165,90,0.2)' }}
                  >
                    {group.tours.length} {labels.toursCount}
                  </span>
                </div>

                {/* Destination description */}
                <p className="text-sm leading-relaxed ml-8 mb-3 max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {isEs ? group.descriptionEs : group.descriptionEn}
                </p>

                {/* Gold underline */}
                <div className="ml-8 w-16 h-0.5" style={{ backgroundColor: '#C5A55A' }} />
              </motion.div>

              {/* ── Tours grid ──────────────────────────────────────── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7"
              >
                {group.tours.map((tour) => {
                  const name = isEs ? tour.nameEs : tour.nameEn;
                  const diff = difficultyConfig[tour.difficulty];
                  const diffLabel = isEs ? diff.es : diff.en;
                  const price = tour.highSeasonPrice
                    ? `$${Math.round(tour.priceUSD)} – $${Math.round(tour.highSeasonPrice)}`
                    : `$${Math.round(tour.priceUSD)}`;

                  return (
                    <motion.div key={tour.id} variants={fadeInUp}>
                      <Link href={`/tours/${tour.slug}`} className="group block">
                        {/* Card */}
                        <div
                          className="relative h-[320px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden"
                          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          {/* Background image */}
                          <Image
                            src={tour.image}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                          />

                          {/* Cinematic gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                          {/* ── Top badges ──────────────────────────── */}
                          <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-3 sm:p-4">
                            {/* Duration badge */}
                            <div
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{
                                backgroundColor: 'rgba(197,165,90,0.9)',
                                boxShadow: '0 2px 12px rgba(197,165,90,0.3)',
                              }}
                            >
                              <Clock className="w-3.5 h-3.5" style={{ color: '#0F0F0F' }} />
                              <span className="text-[11px] sm:text-xs font-bold tracking-wide" style={{ color: '#0F0F0F' }}>
                                {tour.duration} {labels.days}
                              </span>
                            </div>

                            {/* Difficulty badge */}
                            <span
                              className={`inline-flex items-center text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 ${diff.bg} ${diff.text} ${diff.border}`}
                            >
                              {diffLabel}
                            </span>
                          </div>

                          {/* ── Bottom content ──────────────────────── */}
                          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 pt-12 sm:pt-16">
                            {/* Tour name */}
                            <h3 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#C5A55A] transition-colors duration-300">
                              {name}
                            </h3>

                            {/* Divider */}
                            <div
                              className="w-full h-px mb-3 group-hover:bg-[#C5A55A]/30 transition-colors duration-300"
                              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                            />

                            {/* Price + CTA row */}
                            <div className="flex items-end justify-between">
                              <div>
                                <span className="block text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                  {labels.from}
                                </span>
                                <span className="text-xl sm:text-2xl font-black font-playfair" style={{ color: '#C5A55A' }}>
                                  {price}
                                </span>
                                <span className="text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                  {labels.perPerson}
                                </span>
                              </div>

                              <span
                                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide group-hover:gap-2.5 transition-all duration-300"
                                style={{ color: '#C5A55A' }}
                              >
                                {labels.viewDetails}
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>

                          {/* Hover glow overlay */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 60px rgba(197,165,90,0.06)' }}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-playfair text-lg italic mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              &ldquo;
            </p>
            <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-white leading-relaxed mb-3">
              {isEs
                ? '¿No encuentras lo que buscas?'
                : "Can't find what you're looking for?"}
            </p>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {isEs
                ? 'Creamos experiencias personalizadas según tus intereses, presupuesto y tiempo disponible.'
                : 'We create personalized experiences based on your interests, budget, and available time.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/our-tours"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#C5A55A',
                  color: '#0F0F0F',
                  boxShadow: '0 4px 24px rgba(197,165,90,0.25)',
                }}
              >
                {isEs ? 'Tours Personalizados' : 'Customized Tours'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <a
                href={getWhatsAppLink(labels.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FLOATING WHATSAPP BUTTON
          ═══════════════════════════════════════════════════════════════ */}
      <a
        href={getWhatsAppLink(labels.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        }}
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
