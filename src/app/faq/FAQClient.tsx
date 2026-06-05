'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function FAQClient() {
  const { t, locale } = useLanguage();
  const questions = t.faq.questions;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader
        title={t.pageHeaders.faq}
        subtitle={t.faq.subtitle}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t.pageHeaders.faq },
        ]}
      />

      {/* FAQ Section */}
      <section className="pb-16 md:pb-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-4"
          >
            <Accordion type="single" collapsible className="w-full">
              {questions.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-[#E8D5B5]/20 px-6 data-[state=open]:shadow-md data-[state=open]:border-[#D6B37F]/30 transition-all"
                  >
                    <AccordionTrigger className="text-left font-playfair text-base font-semibold py-5 hover:no-underline" style={{ color: '#1C1C1C' }}>
                      <div className="flex items-start gap-3 pr-4">
                        <HelpCircle className="w-5 h-5 text-[#D6B37F] flex-shrink-0 mt-0.5" />
                        <span>{faq.q}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-8">
                      <p className="text-[#8B8680] text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8D5B5]/20 text-center"
          >
            <h3 className="font-playfair text-xl md:text-2xl font-bold mb-3" style={{ color: '#1C1C1C' }}>
              {locale === 'es' ? '¿Aún tienes preguntas?' : 'Still have questions?'}
            </h3>
            <p className="text-[#8B8680] text-sm mb-6 max-w-lg mx-auto">
              {locale === 'es'
                ? 'Nuestro equipo está listo para ayudarte a planificar el viaje perfecto. Escríbenos por WhatsApp y te responderemos en minutos.'
                : 'Our team is ready to help you plan the perfect trip. Write us on WhatsApp and we\'ll respond within minutes.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/51984000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5C] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <Link href="/contact">
                <Button className="btn-gold rounded-full px-6">
                  {t.pageHeaders.contact}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
