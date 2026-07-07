'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, MapPin } from 'lucide-react';
import { customizedTours } from '@/lib/tours-data';

// Only show the 4 packages the client wants
const showPackages = ['cusco-lima', 'cusco-amazon', 'cusco-puno', 'only-cusco'];

export default function ContinueExploringSection() {
  const { t, locale } = useLanguage();

  const packages = customizedTours.filter(p => showPackages.includes(p.id));

  return (
    <section
      id="continue-exploring"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A55A]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {locale === 'es' ? 'Sigue Explorando' : 'Continue Exploring'}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {locale === 'es'
              ? 'Nuestros paquetes multi-destino más populares. Combina lo mejor del Perú en una sola experiencia.'
              : 'Our most popular multi-destination packages. Combine the best of Peru in one experience.'}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {packages.map((pkg, index) => {
            const name = locale === 'es' ? pkg.nameEs : pkg.nameEn;
            const desc = locale === 'es' ? pkg.descriptionEs : pkg.descriptionEn;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <Link href={`/customized-tours/${pkg.slug}`} className="group block h-full">
                  <div className="rounded-2xl overflow-hidden h-full transition-all duration-300 flex flex-col" style={{ border: '1px solid rgba(197,165,90,0.08)' }}>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold"
                        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <Clock className="w-3 h-3" />
                        {pkg.duration} {t.tours.days}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 bg-[#141414] flex flex-col flex-1">
                      {/* Destinations */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.destinations.map((dest) => (
                          <span key={dest} className="text-[10px] px-2 py-0.5 rounded-full text-[#C5A55A] flex items-center gap-1" style={{ border: '1px solid rgba(197,165,90,0.2)', background: 'rgba(197,165,90,0.05)' }}>
                            <MapPin className="w-2.5 h-2.5" />
                            {(t.destinations as Record<string, string>)[dest] || dest}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-[#C5A55A] transition-colors duration-300">
                        {name}
                      </h3>

                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                        {desc}
                      </p>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div>
                          <span className="text-xl font-bold font-playfair text-[#C5A55A]">
                            ${Math.round(pkg.priceUSD)}
                          </span>
                          <span className="text-[10px] text-white/30 ml-1">{t.tours.perPerson}</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#C5A55A] group-hover:gap-2 transition-all">
                          {t.customized.viewPackage}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}