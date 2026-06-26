'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { projects } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function ProjectsWeSupportClient() {
  const { t, locale } = useLanguage();

  const sectionIds = ['projects-grid'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Full-Bleed Immersive Hero */}
      <ImmersiveHero
        title={t.projects.title}
        subtitle={locale === 'es'
          ? 'En PeruTravelExpertsB creemos que el turismo debe ser una fuerza positiva. Apoyamos activamente proyectos comunitarios que preservan la cultura andina y mejoran la calidad de vida de las familias locales.'
          : 'At PeruTravelExpertsB we believe tourism should be a positive force. We actively support community projects that preserve Andean culture and improve the quality of life for local families.'}
        bgImage="/tours/andean-community.jpg"
        height="65vh"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.projects.title },
        ]}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4A843, #B89020)' }}>
            <Heart className="w-4 h-4 text-[#0F0F0F]" />
          </div>
          <span className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {locale === 'es' ? 'Responsabilidad Social' : 'Social Responsibility'}
          </span>
        </div>
      </ImmersiveHero>

      {/* Projects Grid */}
      <section id="projects-grid" className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => {
              const name = locale === 'es' ? project.nameEs : project.nameEn;
              const desc = locale === 'es' ? project.descriptionEs : project.descriptionEn;

              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                  <Link href={`/projects-we-support/${project.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden transition-all duration-300 border border-white/[0.06]">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={project.image} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="font-playfair text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
                        </div>
                      </div>
                      <div className="p-6 bg-[#141414]">
                        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-4">{desc}</p>
                        <div className="flex items-center justify-end pt-4 border-t border-white/[0.06]">
                          <span className="flex items-center gap-1 text-sm font-medium text-[#D4A843] group-hover:gap-2 transition-all">{t.tours.viewDetails}<ArrowRight className="w-4 h-4" /></span>
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
