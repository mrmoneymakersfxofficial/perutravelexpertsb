'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Check, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { getCustomizedTourBySlug } from '@/lib/tours-data';

export default function CustomizedTourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <CustomizedTourDetailContent slug={slug} />;
}

function CustomizedTourDetailContent({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const pkg = getCustomizedTourBySlug(slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#2C1810' }}>
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.customized.title, href: '/customized-tours' },
          { label: name },
        ]}
      />

      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src={pkg.image}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C14]/80 via-[#0C0C14]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />
                {pkg.duration} {t.tours.days}
              </div>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <p className="text-[#8B8680] text-base leading-relaxed">{desc}</p>
              </div>

              {/* Includes */}
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#2C1810' }}>
                  {t.tourDetail.includes}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E8D5B5]/20">
                      <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#0C0C14]" />
                      </div>
                      <span className="text-sm text-[#2C1810]/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              {itinerary && itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-playfair text-2xl font-bold mb-6" style={{ color: '#2C1810' }}>
                    {t.tourDetail.itinerary}
                  </h2>
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
                            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#0C0C14] font-bold text-sm flex-shrink-0">
                              {day.day}
                            </div>
                            {day.day < itinerary.length && (
                              <div className="w-0.5 flex-1 bg-[#E8D5B5] mt-2" />
                            )}
                          </div>
                          <div className="pb-6">
                            <h3 className="font-playfair text-lg font-bold mb-2" style={{ color: '#2C1810' }}>
                              {t.tourDetail.day} {day.day}: {dayTitle}
                            </h3>
                            <p className="text-[#8B8680] text-sm leading-relaxed">{dayDesc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8D5B5]/20">
                  <div className="text-center mb-6">
                    <p className="text-sm text-[#8B8680] mb-1">{t.tours.price}</p>
                    <p className="text-4xl font-bold font-playfair" style={{ color: '#2C1810' }}>
                      ${Math.round(pkg.priceUSD)}
                    </p>
                    <p className="text-xs text-[#8B8680]">{t.tours.perPerson}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8B8680]">{t.tours.duration}</span>
                      <span className="font-medium" style={{ color: '#2C1810' }}>{pkg.duration} {t.tours.days}</span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/51984000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm"
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
    </div>
  );
}
