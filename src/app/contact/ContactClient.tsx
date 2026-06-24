'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/whatsapp';
import PageHeader from '@/components/layout/PageHeader';
import { useSectionObserver, useHandleHashScroll } from '@/hooks/use-scroll-spy';

export default function ContactClient() {
  const { t, locale } = useLanguage();

  const sectionIds = ['contact-form'];
  useSectionObserver({ sectionIds });
  useHandleHashScroll();

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('contact-name') as string;
    const email = formData.get('contact-email') as string;
    const subject = formData.get('contact-subject') as string;
    const message = formData.get('contact-message') as string;

    const text =
      `✈️ *${t.contact.title} - PeruTravelExpertsB*\n\n` +
      `👤 ${name}\n📧 ${email}\n📋 ${subject || 'N/A'}\n💬 ${message}\n\n` +
      `_${locale === 'es' ? 'Enviado desde PeruTravelExpertsB.com' : 'Sent from PeruTravelExpertsB.com'}_`;

    const whatsappUrl = getWhatsAppLink(text);
    window.open(whatsappUrl, '_blank');
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F6F2' }}>
      <PageHeader title={t.pageHeaders.contact} subtitle={t.contact.subtitle} breadcrumbs={[{ label: locale === 'es' ? 'Inicio' : 'Home', href: '/' }, { label: t.pageHeaders.contact }]} />

      <section id="contact-form" className="pb-16 md:pb-20" style={{ backgroundColor: '#F8F6F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0"><MessageCircle className="w-6 h-6 text-[#0F0F0F]" /></div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1" style={{ color: '#1C1C1C' }}>{t.contact.whatsapp}</h4>
                    <a href={getWhatsAppLink('Hola, me interesa información sobre los tours de PeruTravelExpertsB')} target="_blank" rel="noopener noreferrer" className="text-[#8B8680] hover:text-[#C5A55A] transition-colors">+51 984 215 157</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-[#0F0F0F]" /></div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1" style={{ color: '#1C1C1C' }}>{t.contact.email}</h4>
                    <a href="mailto:info@perutravelexpertsb.com" className="text-[#8B8680] hover:text-[#C5A55A] transition-colors">info@perutravelexpertsb.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-[#0F0F0F]" /></div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1" style={{ color: '#1C1C1C' }}>{t.contact.location}</h4>
                    <p className="text-[#8B8680]">Cusco, Perú</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-[#0F0F0F]" /></div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1" style={{ color: '#1C1C1C' }}>Teléfono</h4>
                    <p className="text-[#8B8680]">+51 084 000 000</p>
                  </div>
                </div>
              </div>
              <a href={getWhatsAppLink('Hola, me interesa información sobre los tours de PeruTravelExpertsB')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm">
                <MessageCircle className="w-5 h-5" />{t.contact.sendWhatsApp}
              </a>
              <div className="mt-8 rounded-2xl overflow-hidden border border-[#DCC99A]/[0.06]">
                <div className="w-full h-64 bg-[#DCC99A]/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-[#C5A55A] mx-auto mb-2" />
                    <p className="text-[#8B8680] text-sm">{locale === 'es' ? 'Cusco, Perú' : 'Cusco, Peru'}</p>
                    <p className="text-[#8B8680]/60 text-xs mt-1">-13.5319, -71.9675</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <form onSubmit={handleWhatsAppSubmit} className="bg-white/[0.02] rounded-2xl p-6 md:p-8 border border-[#DCC99A]/[0.04] space-y-5">
                <div>
                  <Label htmlFor="contact-name" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>{t.booking.name} *</Label>
                  <Input id="contact-name" name="contact-name" required className="mt-1.5 border-[#DCC99A]/40 focus:border-[#C5A55A]" placeholder={t.booking.name} />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>{t.booking.email} *</Label>
                  <Input id="contact-email" name="contact-email" type="email" required className="mt-1.5 border-[#DCC99A]/40 focus:border-[#C5A55A]" placeholder={t.booking.email} />
                </div>
                <div>
                  <Label htmlFor="contact-subject" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>{locale === 'es' ? 'Asunto' : 'Subject'}</Label>
                  <Input id="contact-subject" name="contact-subject" className="mt-1.5 border-[#DCC99A]/40 focus:border-[#C5A55A]" placeholder={locale === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help you?'} />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>{t.booking.message} *</Label>
                  <Textarea id="contact-message" name="contact-message" required rows={5} className="mt-1.5 border-[#DCC99A]/40 focus:border-[#C5A55A] resize-none" placeholder={locale === 'es' ? 'Cuéntanos más sobre tu viaje ideal...' : 'Tell us more about your ideal trip...'} />
                </div>
                <Button type="submit" className="btn-gold rounded-full w-full py-3 text-base flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />{t.contact.sendWhatsApp}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
