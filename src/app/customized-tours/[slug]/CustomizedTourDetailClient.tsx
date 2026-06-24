'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#1C1C1C' }}>
            {locale === 'es' ? 'Paquete no encontrado' : 'Package not found'}
          </h1>
          <Link href="/customized-tours">
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      {/* Single Full-Bleed Immersive Hero — No More Duplicate Headers */}
      <ImmersiveHero
        title={name}
        bgImage={pkg.image}
        height="70vh"
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

      <section id="customized-content" className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
                  {locale === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <div className="w-16 h-0.5 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                <p className="text-[#8B8680] text-base leading-relaxed">{desc}</p>
              </div>
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{t.tourDetail.includes}</h2>
                <div className="w-16 h-0.5 mb-4" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(197,165,90,0.1)' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #C5A55A, #A8883D)' }}>
                        <Check className="w-3.5 h-3.5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-sm" style={{ color: '#1C1C1C' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {itinerary && itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-playfair text-2xl font-bold mb-6" style={{ color: '#1C1C1C' }}>{t.tourDetail.itinerary}</h2>
                  <div className="space-y-6">
                    {itinerary.map((day) => {
                      const dayTitle = locale === 'es' ? day.titleEs : day.titleEn;
                      const dayDesc = locale === 'es' ? day.descriptionEs : day.descriptionEn;
                      return (
                        <motion.div key={day.day} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F0F0F] font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C5A55A, #A8883D)' }}>{day.day}</div>
                            {day.day < itinerary.length && <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: '#DCC99A' }} />}
                          </div>
                          <div className="pb-6">
                            <h3 className="font-playfair text-lg font-bold mb-2" style={{ color: '#1C1C1C' }}>{t.tourDetail.day} {day.day}: {dayTitle}</h3>
                            <p className="text-[#8B8680] text-sm leading-relaxed">{dayDesc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(197,165,90,0.15)' }}>
                  <div className="text-center mb-6">
                    <p className="text-sm text-[#8B8680] mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>${Math.round(pkg.priceUSD)}</p>
                    <p className="text-xs text-[#8B8680]">{t.tours.perPerson}</p>
                  </div>
                  <a href={getWhatsAppLink(`Hola, me interesa información sobre "${name}" de PeruTravelExpertsB`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-semibold transition-colors text-sm shadow-lg" style={{ backgroundColor: '#25D366' }}>
                    <MessageCircle className="w-5 h-5" />
                    {locale === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
