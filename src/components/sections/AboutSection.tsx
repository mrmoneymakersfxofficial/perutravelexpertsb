'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { MapPin, Crown, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: MapPin,
    titleKey: 'highlight1Title' as const,
    descKey: 'highlight1Desc' as const,
  },
  {
    icon: Crown,
    titleKey: 'highlight2Title' as const,
    descKey: 'highlight2Desc' as const,
  },
  {
    icon: Award,
    titleKey: 'highlight3Title' as const,
    descKey: 'highlight3Desc' as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
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

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 md:py-28"
      style={{ backgroundColor: '#F8F6F2' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#1C1C1C' }}
          >
            {t.about.title}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-[#8B8680] text-lg max-w-2xl mx-auto mb-4">
            {t.about.subtitle}
          </p>
          <p className="text-[#1C1C1C]/70 text-base max-w-3xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E8D5B5]/30"
              >
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#0F0F0F]" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3" style={{ color: '#1C1C1C' }}>
                  {t.about[item.titleKey]}
                </h3>
                <p className="text-[#8B8680] leading-relaxed text-sm">
                  {t.about[item.descKey]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
