'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

const testimonials = [
  {
    textEs: 'Una experiencia increíble. El tour a Machu Picchu superó todas mis expectativas. El guía fue excepcional y la atención VIP fue de primera.',
    textEn: "An incredible experience. The Machu Picchu tour exceeded all my expectations. The guide was exceptional and the VIP attention was first-class.",
    author: 'María García',
    country: 'España',
    flag: '🇪🇸',
    rating: 5,
    tour: 'Machu Picchu VIP',
  },
  {
    textEs: 'Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.',
    textEn: 'Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.',
    author: 'James Wilson',
    country: 'USA',
    flag: '🇺🇸',
    rating: 5,
    tour: 'Full Day Sacred Valley',
  },
  {
    textEs: 'Servicio de primera clase desde el momento de la reserva. El equipo de PeruTravelExpertsB hizo que cada momento fuera especial. Recomiendo 100%.',
    textEn: 'First-class service from the moment of booking. The PeruTravelExpertsB team made every moment special. I recommend 100%.',
    author: 'Carlos Mendoza',
    country: 'México',
    flag: '🇲🇽',
    rating: 5,
    tour: 'Camino Inca 4 Días',
  },
  {
    textEs: 'El City Tour de Cusco fue una maravilla. Nuestro guía tenía un conocimiento profundo de la historia inca y colonial. Las explicaciones fueron fascinantes.',
    textEn: 'The Cusco City Tour was wonderful. Our guide had deep knowledge of Inca and colonial history. The explanations were fascinating.',
    author: 'Sophie Laurent',
    country: 'Francia',
    flag: '🇫🇷',
    rating: 5,
    tour: 'City Tour Cusco Imperial',
  },
  {
    textEs: 'La Montaña de Colores es algo que debes ver al menos una vez en la vida. El trekking fue duro pero vale cada paso. Los guías nos motivaron constantemente.',
    textEn: 'Rainbow Mountain is something you must see at least once in your life. The trek was tough but worth every step. The guides motivated us constantly.',
    author: 'Luca Rossi',
    country: 'Italia',
    flag: '🇮🇹',
    rating: 5,
    tour: 'Rainbow Mountain',
  },
  {
    textEs: 'El Home Stay en el Lago Titicaca fue una experiencia transformadora. Vivir con una familia local te cambia la perspectiva del viaje. Simplemente mágico.',
    textEn: 'The Home Stay on Lake Titicaca was a transformative experience. Living with a local family changes your perspective on travel. Simply magical.',
    author: 'Anna Müller',
    country: 'Alemania',
    flag: '🇩🇪',
    rating: 5,
    tour: 'Home Stay 2D/1N',
  },
  {
    textEs: 'Increíble servicio desde la reserva por WhatsApp hasta el último día del tour. La logística del Camino Inca 2 días fue perfecta. ¡Volveré!',
    textEn: "Incredible service from the WhatsApp booking to the last day of the tour. The logistics of the 2-day Inca Trail were perfect. I'll be back!",
    author: 'Takeshi Yamamoto',
    country: 'Japón',
    flag: '🇯🇵',
    rating: 5,
    tour: 'Inca Trail 2 Days',
  },
  {
    textEs: 'La experiencia en la Amazonía fue única. Ver delfines rosados, pescar pirañas y dormir en el lodge fue inolvidable. Los guías naturalistas son increíbles.',
    textEn: 'The Amazon experience was unique. Seeing pink dolphins, fishing piranhas, and sleeping in the lodge was unforgettable. The naturalist guides are incredible.',
    author: 'Emma Thompson',
    country: 'Reino Unido',
    flag: '🇬🇧',
    rating: 5,
    tour: 'Amazon 4D/3N',
  },
  {
    textEs: 'La Laguna de Humantay es una belleza indescriptible. El camino fue moderado y las vistas valen totalmente el esfuerzo. Excelente organización del tour.',
    textEn: 'Humantay Lagoon is an indescribable beauty. The hike was moderate and the views are totally worth the effort. Excellent tour organization.',
    author: 'Pedro Silva',
    country: 'Brasil',
    flag: '🇧🇷',
    rating: 5,
    tour: 'Humantay Lagoon Trek',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function TestimonialsClient() {
  const { t, locale } = useLanguage();

  const sectionIds = ['testimonials-grid', 'testimonials-cta'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader
        title={t.pageHeaders.testimonials}
        subtitle={t.testimonials.subtitle}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.testimonials },
        ]}
      />

      {/* Testimonials Grid */}
      <section id="testimonials-grid" className="py-12 md:py-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="rounded-2xl p-6 md:p-8 transition-all duration-300 relative bg-white/[0.02] border border-[#E8CC6A]/[0.04]"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[#D4A843]/30 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A843] text-[#D4A843] star-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#1C1C1C]/80 text-sm leading-relaxed mb-6">
                  &ldquo;{locale === 'es' ? testimonial.textEs : testimonial.textEn}&rdquo;
                </p>

                {/* Tour tag */}
                <div className="mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#F8F6F2] text-[#D4A843] border border-[#E8CC6A]/30 font-medium">
                    {testimonial.tour}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E8CC6A]/[0.06]">
                  <div className="text-2xl">{testimonial.flag}</div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1C1C1C' }}>{testimonial.author}</p>
                    <p className="text-[#8B8680] text-xs">{testimonial.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="testimonials-cta" className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
              {locale === 'es' ? '¿Listo para crear tu propia historia?' : 'Ready to create your own story?'}
            </h3>
            <p className="text-[#8B8680] mb-6 max-w-xl mx-auto">
              {locale === 'es'
                ? 'Únete a cientos de viajeros que ya han vivido experiencias inolvidables con PeruTravelExpertsB.'
                : 'Join hundreds of travelers who have already experienced unforgettable moments with PeruTravelExpertsB.'}
            </p>
            <a
              href={getWhatsAppLink('Hola, me interesa información sobre los tours de PeruTravelExpertsB')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full gold-gradient text-[#0F0F0F] font-semibold hover:shadow-[0_0_30px_rgba(184,144,32,0.4)] transition-all text-sm"
            >
              {t.nav.book}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
