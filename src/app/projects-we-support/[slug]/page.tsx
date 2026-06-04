'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/lib/tours-data';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ProjectDetailContent slug={slug} />;
}

function ProjectDetailContent({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: '#2C1810' }}>
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.projects.title, href: '/projects-we-support' },
          { label: name },
        ]}
      />

      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src={project.image}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C14]/80 via-[#0C0C14]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#0C0C14]" />
              </div>
              <span className="text-sm text-[#C8A97E] font-medium uppercase tracking-wider">
                {locale === 'es' ? 'Responsabilidad Social' : 'Social Responsibility'}
              </span>
            </div>

            <p className="text-[#2C1810]/80 text-lg leading-relaxed mb-8">
              {desc}
            </p>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8D5B5]/20">
              <h3 className="font-playfair text-xl font-bold mb-4" style={{ color: '#2C1810' }}>
                {locale === 'es' ? '¿Cómo puedes ayudar?' : 'How can you help?'}
              </h3>
              <p className="text-[#8B8680] text-sm leading-relaxed mb-6">
                {locale === 'es'
                  ? 'Cada tour que reservas con Intiquilla contribuye con un porcentaje directamente a estos proyectos. También puedes realizar donaciones voluntarias durante tu visita.'
                  : 'Every tour you book with Intiquilla contributes a percentage directly to these projects. You can also make voluntary donations during your visit.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tour-packages">
                  <Button className="btn-gold rounded-full px-6">
                    {locale === 'es' ? 'Reservar un Tour' : 'Book a Tour'}
                  </Button>
                </Link>
                <a
                  href="https://wa.me/51984000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm"
                >
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
