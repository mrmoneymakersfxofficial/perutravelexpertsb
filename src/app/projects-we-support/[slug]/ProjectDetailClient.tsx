'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/lib/tours-data';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ProjectDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, locale } = useLanguage();

  const sectionIds = ['project-content'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#1C1C1C' }}>
            {locale === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
          </h1>
          <Link href="/projects-we-support">
            <Button className="btn-gold rounded-full px-6 mt-4">{t.projects.title}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === 'es' ? project.nameEs : project.nameEn;
  const desc = locale === 'es' ? project.descriptionEs : project.descriptionEn;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      {/* Single Full-Bleed Immersive Hero — No More Duplicate Headers */}
      <ImmersiveHero
        title={name}
        bgImage={project.image}
        height="70vh"
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.projects.title, href: '/projects-we-support' },
          { label: name },
        ]}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C5A55A, #A8883D)' }}>
            <Heart className="w-4 h-4 text-[#0F0F0F]" />
          </div>
          <span className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {locale === 'es' ? 'Responsabilidad Social' : 'Social Responsibility'}
          </span>
        </div>
      </ImmersiveHero>

      <section id="project-content" className="py-12 md:py-16" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
              {locale === 'es' ? 'Sobre este Proyecto' : 'About this Project'}
            </h2>
            <div className="w-16 h-0.5 mb-6" style={{ background: 'linear-gradient(90deg, #C5A55A, #A8883D)' }} />
            <p className="text-[#8B8680] text-lg leading-relaxed mb-8">{desc}</p>
            <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(197,165,90,0.15)' }}>
              <h3 className="font-playfair text-xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
                {locale === 'es' ? '¿Cómo puedes ayudar?' : 'How can you help?'}
              </h3>
              <p className="text-[#8B8680] text-sm leading-relaxed mb-6">
                {locale === 'es'
                  ? 'Cada tour que reservas con PeruTravelExpertsB contribuye con un porcentaje directamente a estos proyectos. También puedes realizar donaciones voluntarias durante tu visita.'
                  : 'Every tour you book with PeruTravelExpertsB contributes a percentage directly to these projects. You can also make voluntary donations during your visit.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tour-packages">
                  <Button className="btn-gold rounded-full px-6">{locale === 'es' ? 'Reservar un Tour' : 'Book a Tour'}</Button>
                </Link>
                <a href={getWhatsAppLink('Hola, me interesa información sobre los tours de PeruTravelExpertsB')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold transition-colors text-sm shadow-lg" style={{ backgroundColor: '#25D366' }}>
                  <MessageCircle className="w-4 h-4" />
                  {locale === 'es' ? 'Saber Más' : 'Learn More'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
