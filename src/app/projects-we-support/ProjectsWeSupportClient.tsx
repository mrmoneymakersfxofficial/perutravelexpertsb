'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { projects } from '@/lib/tours-data';

export default function ProjectsWeSupportClient() {
  const { t, locale } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} breadcrumbs={[{ label: locale === 'es' ? 'Inicio' : 'Home', href: '/' }, { label: t.projects.title }]} />

      <section className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#8B8680] text-lg leading-relaxed mb-6">
            {locale === 'es'
              ? 'En PeruTravelExpertsB creemos que el turismo debe ser una fuerza positiva. Apoyamos activamente proyectos comunitarios que preservan la cultura andina y mejoran la calidad de vida de las familias locales.'
              : 'At PeruTravelExpertsB we believe tourism should be a positive force. We actively support community projects that preserve Andean culture and improve the quality of life for local families.'}
          </p>
          <div className="w-20 h-0.5 mx-auto gold-gradient" />
        </div>
      </section>

      <section className="pb-16 md:pb-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => {
              const name = locale === 'es' ? project.nameEs : project.nameEn;
              const desc = locale === 'es' ? project.descriptionEs : project.descriptionEn;

              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                  <Link href={`/projects-we-support/${project.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden transition-all duration-300">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={project.image} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="tour-image-overlay absolute inset-0" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="font-playfair text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-[#8B8680] text-sm leading-relaxed mb-4 line-clamp-4">{desc}</p>
                        <div className="flex items-center justify-end pt-4 border-t border-[#E8D5B5]/20">
                          <span className="flex items-center gap-1 text-sm font-medium text-[#D6B37F] group-hover:gap-2 transition-all">{t.tours.viewDetails}<ArrowRight className="w-4 h-4" /></span>
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
    </div>
  );
}
