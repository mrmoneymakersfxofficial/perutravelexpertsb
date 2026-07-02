'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Check, MessageCircle, MapPin } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { Button } from '@/components/ui/button';
import { getCustomizedTourBySlug } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function CustomizedTourDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, locale } = useLanguage();

  const sectionIds = ['customized-content'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const pkg = getCustomizedTourBySlug(slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-center px-4">
          <h1 className="font-playfair text-3xl font-bold text-white">
            {locale === 'es' ? 'Paquete no encontrado' : 'Package not found'}
          </h1>
          <Link href="/tour-packages">
            <Button className="btn-gold rounded-full px-6 mt-4">{t.customized.title}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === 'es' ? pkg.nameEs : pkg.nameEn;
  const desc = locale === 'es' ? pkg.descriptionEs : pkg.descriptionEn;
  const includes = locale === 'es' ? pkg.includesEs : pkg.includesEn;
  const itinerary = locale === 'es' ? pkg.itineraryEs : pkg.itineraryEn;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
      {/* Immersive Hero */}
      <ImmersiveHero
        title={name}
        bgImage={pkg.image}
        height="70vh"
        bottomColor="#0F0F0F"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.customized.title, href: '/customized-tours' },
          { label: name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Clock className="w-3.5 h-3.5" />{pkg.duration} {t.tours.days}
          </div>
          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <MapPin className="w-3.5 h-3.5" />
              {locale === 'es' ? 'Multi-destino' : 'Multi-destination'}
            </div>
          )}
        </div>
      </ImmersiveHero>

      {/* Main Content — Dark Immersive */}
      <section id="customized-content" className="py-10 sm:py-14 md:py-16 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10 sm:space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
                  {locale === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <div className="h-[2px] w-16 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{desc}</p>
              </motion.div>

              {/* Includes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">{t.tourDetail.includes}</h2>
                <div className="h-[2px] w-16 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}
                      >
                        <Check className="w-3.5 h-3.5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerary */}
              {itinerary && itinerary.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <h2 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">{t.tourDetail.itinerary}</h2>
                  <div className="h-[2px] w-16 mb-6" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                  <div className="space-y-6">
                    {itinerary.map((day) => {
                      const dayTitle = locale === 'es' ? day.titleEs : day.titleEn;
                      const dayDesc = locale === 'es' ? day.descriptionEs : day.descriptionEn;
                      return (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F0F0F] font-bold text-sm flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}
                            >
                              {day.day}
                            </div>
                            {day.day < itinerary.length && (
                              <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: 'rgba(212,168,67,0.25)' }} />
                            )}
                          </div>
                          <div className="pb-6">
                            <h3 className="font-playfair text-base sm:text-lg font-bold mb-2 text-white">
                              {t.tourDetail.day} {day.day}: {dayTitle}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">{dayDesc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column — Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: '#141414',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="text-center mb-6">
                    <p className="text-sm text-white/50 mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair text-[#C5A55A]">${Math.round(pkg.priceUSD)}</p>
                    <p className="text-xs text-white/40">{t.tours.perPerson}</p>
                  </div>
                  <a
                    href={getWhatsAppLink(`Hola, me interesa información sobre "${name}" de PeruTravelExpertsB`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-semibold transition-colors text-sm shadow-lg"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {locale === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Info Panel */}
      <section
        className="lg:hidden py-6 sm:py-8 bg-[#0A0A0A]"
        style={{ borderTop: '1px solid rgba(197,165,90,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl p-4 sm:p-6"
            style={{
              backgroundColor: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-xs sm:text-sm text-white/50 mb-0.5">{t.tours.price}</p>
                <p className="text-2xl sm:text-3xl font-bold font-playfair text-[#C5A55A]">${Math.round(pkg.priceUSD)}</p>
                <p className="text-[10px] sm:text-xs text-white/40">{t.tours.perPerson}</p>
              </div>
              <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs text-[#C5A55A] bg-white/[0.04]">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {pkg.duration} {t.tours.days}
              </div>
            </div>
            <a
              href={getWhatsAppLink(`Hola, me interesa información sobre "${name}" de PeruTravelExpertsB`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-semibold transition-colors text-sm shadow-lg"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              {locale === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}