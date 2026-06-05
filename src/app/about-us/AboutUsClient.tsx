'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { MapPin, Crown, Award, Users, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';

const highlights = [
  { icon: MapPin, titleKey: 'highlight1Title' as const, descKey: 'highlight1Desc' as const },
  { icon: Crown, titleKey: 'highlight2Title' as const, descKey: 'highlight2Desc' as const },
  { icon: Award, titleKey: 'highlight3Title' as const, descKey: 'highlight3Desc' as const },
];

const teamMembers = [
  { nameEs: 'Guías Expertos', nameEn: 'Expert Guides', descEs: 'Nacidos en Cusco con conocimiento profundo de la cultura andina y años de experiencia guiando viajeros.', descEn: 'Born in Cusco with deep knowledge of Andean culture and years of experience guiding travelers.' },
  { nameEs: 'Equipo de Operaciones', nameEn: 'Operations Team', descEs: 'Coordinadores que aseguran que cada detalle de tu viaje sea perfecto.', descEn: 'Coordinators who ensure every detail of your trip is perfect.' },
  { nameEs: 'Servicio al Cliente', nameEn: 'Customer Service', descEs: 'Atención personalizada 24/7 antes, durante y después de tu viaje.', descEn: 'Personalized 24/7 attention before, during, and after your trip.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

export default function AboutUsClient() {
  const { t, locale } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader title={t.pageHeaders.aboutUs} subtitle={t.about.subtitle} breadcrumbs={[{ label: locale === 'es' ? 'Inicio' : 'Home', href: '/' }, { label: t.pageHeaders.aboutUs }]} />

      <section className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <p className="text-[#1C1C1C]/80 text-lg leading-relaxed">{t.about.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="py-16 md:py-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E8D5B5]/30">
                  <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><Icon className="w-7 h-7 text-[#0F0F0F]" /></div>
                  <h3 className="font-playfair text-xl font-bold mb-3" style={{ color: '#1C1C1C' }}>{t.about[item.titleKey]}</h3>
                  <p className="text-[#8B8680] leading-relaxed text-sm">{t.about[item.descKey]}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4"><Heart className="w-6 h-6 text-[#D6B37F]" /><h3 className="font-playfair text-2xl font-bold text-white">{locale === 'es' ? 'Nuestra Misión' : 'Our Mission'}</h3></div>
              <p className="text-white/70 leading-relaxed">{t.about.mission}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4"><Globe className="w-6 h-6 text-[#D6B37F]" /><h3 className="font-playfair text-2xl font-bold text-white">{locale === 'es' ? 'Nuestra Visión' : 'Our Vision'}</h3></div>
              <p className="text-white/70 leading-relaxed">{t.about.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Nuestro Equipo' : 'Our Team'}</h2>
            <div className="w-20 h-0.5 mx-auto gold-gradient" />
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8D5B5]/30">
                <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mb-4 mx-auto"><Users className="w-8 h-8 text-[#0F0F0F]" /></div>
                <h3 className="font-playfair text-lg font-bold text-center mb-2" style={{ color: '#1C1C1C' }}>{locale === 'es' ? member.nameEs : member.nameEn}</h3>
                <p className="text-[#8B8680] text-sm leading-relaxed text-center">{locale === 'es' ? member.descEs : member.descEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
