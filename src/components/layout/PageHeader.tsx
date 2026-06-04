'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Breadcrumbs from './Breadcrumbs';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Breadcrumbs items={breadcrumbs} />
          <h1
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#2C1810' }}
          >
            {title}
          </h1>
          <div className="w-20 h-0.5 gold-gradient mb-6" />
          {subtitle && (
            <p className="text-[#8B8680] text-lg max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
