'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultTestimonials = [
  {
    textEs: 'Una experiencia increíble. El tour a Machu Picchu superó todas mis expectativas. El guía fue excepcional y la atención VIP fue de primera.',
    textEn: "An incredible experience. The Machu Picchu tour exceeded all my expectations. The guide was exceptional and the VIP attention was first-class.",
    author: 'María García',
    country: 'España', flag: '🇪🇸', rating: 5,
  },
  {
    textEs: 'Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.',
    textEn: 'Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.',
    author: 'James Wilson', country: 'USA', flag: '🇺🇸', rating: 5,
  },
  {
    textEs: 'Servicio de primera clase desde el momento de la reserva. El equipo de PeruTravelExpertsB hizo que cada momento fuera especial. Recomiendo 100%.',
    textEn: 'First-class service from the moment of booking. The PeruTravelExpertsB team made every moment special. I recommend 100%.',
    author: 'Carlos Mendoza', country: 'México', flag: '🇲🇽', rating: 5,
  },
];

interface TestimonialData {
  authorName?: string;
  company?: string;
  flag?: string;
  textEs?: string;
  textEn?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  sanityTestimonials?: TestimonialData[] | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TestimonialsSection({ sanityTestimonials }: TestimonialsSectionProps) {
  const { t, locale } = useLanguage();

  const items = (sanityTestimonials && sanityTestimonials.length > 0)
    ? sanityTestimonials.slice(0, 3).map(t => ({
        textEs: t.textEs || '',
        textEn: t.textEn || '',
        author: t.authorName || '',
        country: t.company || '',
        flag: t.flag || '',
        rating: t.rating || 5,
      }))
    : defaultTestimonials;

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A843]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4A843]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.testimonials.title}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-[#8B8680] text-lg">{t.testimonials.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="rounded-2xl p-8 relative border border-white/[0.04]"
            >
              <Quote className="w-10 h-10 text-[#D4A843]/30 mb-4" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A843] text-[#D4A843] star-gold" />
                ))}
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-6">
                &ldquo;{locale === 'es' ? testimonial.textEs : testimonial.textEn}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="text-2xl">{testimonial.flag || '🌍'}</div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.author}</p>
                  <p className="text-[#8B8680] text-xs">{testimonial.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
