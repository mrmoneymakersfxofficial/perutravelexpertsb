'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Compass, Send, MapPin, Users, Calendar, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/whatsapp';

const destinationOptions = [
  { id: 'cusco', labelEn: 'Cusco & Machu Picchu', labelEs: 'Cusco y Machu Picchu', icon: '🏔️' },
  { id: 'sacred-valley', labelEn: 'Sacred Valley', labelEs: 'Valle Sagrado', icon: '🌾' },
  { id: 'rainbow-mountain', labelEn: 'Rainbow Mountain', labelEs: 'Montaña de Colores', icon: '🌈' },
  { id: 'lima', labelEn: 'Lima', labelEs: 'Lima', icon: '🏙️' },
  { id: 'puno', labelEn: 'Puno & Titicaca Lake', labelEs: 'Puno y Lago Titicaca', icon: '🌊' },
  { id: 'amazon', labelEn: 'Amazon Rainforest', labelEs: 'Selva Amazónica', icon: '🌿' },
  { id: 'arequipa', labelEn: 'Arequipa & Colca Canyon', labelEs: 'Arequipa y Cañón del Colca', icon: '🌋' },
  { id: 'inca-trail', labelEn: 'Inca Trail', labelEs: 'Camino Inca', icon: '🥾' },
];

const travelStyleOptions = [
  { id: 'luxury', labelEn: 'Luxury / VIP', labelEs: 'Lujo / VIP', icon: '💎' },
  { id: 'adventure', labelEn: 'Adventure', labelEs: 'Aventura', icon: '⚔️' },
  { id: 'cultural', labelEn: 'Cultural', labelEs: 'Cultural', icon: '🏛️' },
  { id: 'nature', labelEn: 'Nature & Wildlife', labelEs: 'Naturaleza y Vida Silvestre', icon: '🦙' },
  { id: 'gastronomic', labelEn: 'Gastronomic', labelEs: 'Gastronómico', icon: '🍽️' },
  { id: 'photography', labelEn: 'Photography', labelEs: 'Fotografía', icon: '📷' },
];

export default function CustomizedToursSection() {
  const { t, locale } = useLanguage();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('ct-name') as string;
    const email = formData.get('ct-email') as string;
    const travelers = formData.get('ct-travelers') as string;
    const dates = formData.get('ct-dates') as string;
    const notes = formData.get('ct-notes') as string;

    const destLabels = selectedDestinations.map(id => {
      const opt = destinationOptions.find(d => d.id === id);
      return opt ? (locale === 'es' ? opt.labelEs : opt.labelEn) : id;
    });

    const styleLabels = selectedStyles.map(id => {
      const opt = travelStyleOptions.find(s => s.id === id);
      return opt ? (locale === 'es' ? opt.labelEs : opt.labelEn) : id;
    });

    const text =
      `🎯 *${locale === 'es' ? 'Tour Personalizado' : 'Customized Tour'} - PeruTravelExpertsB*\n\n` +
      `👤 ${name}\n` +
      `📧 ${email}\n` +
      `👥 ${locale === 'es' ? 'Viajeros' : 'Travelers'}: ${travelers}\n` +
      `📅 ${locale === 'es' ? 'Fechas' : 'Dates'}: ${dates || (locale === 'es' ? 'Por definir' : 'TBD')}\n\n` +
      `📍 ${locale === 'es' ? 'Destinos deseados' : 'Desired destinations'}:\n${destLabels.map(d => `  ✅ ${d}`).join('\n')}\n\n` +
      `🎨 ${locale === 'es' ? 'Estilo de viaje' : 'Travel style'}:\n${styleLabels.map(s => `  • ${s}`).join('\n')}\n` +
      (notes ? `\n💬 ${notes}\n` : '') +
      `\n_${locale === 'es' ? 'Enviado desde PeruTravelExpertsB.com' : 'Sent from PeruTravelExpertsB.com'}_`;

    const whatsappUrl = getWhatsAppLink(text);
    window.open(whatsappUrl, '_blank');
    form.reset();
    setSelectedDestinations([]);
    setSelectedStyles([]);
  };

  return (
    <section
      id="customized-tours"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C5A55A 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6" style={{ background: 'rgba(197,165,90,0.1)', border: '1px solid rgba(197,165,90,0.2)' }}>
            <Compass className="w-7 h-7 text-[#C5A55A]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {locale === 'es' ? 'Tours Personalizados' : 'Customized Tours'}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-[#8B8680] text-lg max-w-2xl mx-auto">
            {locale === 'es'
              ? 'Diseña tu aventura perfecta. Cuéntanos qué lugares quieres visitar y crearemos un tour a tu medida.'
              : 'Design your perfect adventure. Tell us which places you want to visit and we\'ll create a tailor-made tour for you.'}
          </p>
        </motion.div>

        {/* Questionnaire Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-6 sm:p-8 md:p-10 space-y-8"
          style={{ background: '#141414', border: '1px solid rgba(197,165,90,0.1)' }}
        >
          {/* Destinations Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#C5A55A]" />
              <Label className="text-white text-sm font-semibold tracking-wide uppercase">
                {locale === 'es' ? '¿Qué destinos te gustaría visitar?' : 'Which destinations would you like to visit?'}
              </Label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {destinationOptions.map((dest) => {
                const isSelected = selectedDestinations.includes(dest.id);
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => toggleDestination(dest.id)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                    style={{
                      background: isSelected ? 'rgba(197,165,90,0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid rgba(197,165,90,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      color: isSelected ? '#C5A55A' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <span className="text-lg">{dest.icon}</span>
                    <span className="truncate">{locale === 'es' ? dest.labelEs : dest.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#C5A55A]" />
              <Label className="text-white text-sm font-semibold tracking-wide uppercase">
                {locale === 'es' ? '¿Qué estilo de viaje prefieres?' : 'What travel style do you prefer?'}
              </Label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {travelStyleOptions.map((style) => {
                const isSelected = selectedStyles.includes(style.id);
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleStyle(style.id)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                    style={{
                      background: isSelected ? 'rgba(197,165,90,0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid rgba(197,165,90,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      color: isSelected ? '#C5A55A' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <span className="text-lg">{style.icon}</span>
                    <span className="truncate">{locale === 'es' ? style.labelEs : style.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.2), transparent)' }} />

          {/* Contact Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#C5A55A]" />
                <Label htmlFor="ct-name" className="text-white/80 text-sm">
                  {locale === 'es' ? 'Tu Nombre' : 'Your Name'} *
                </Label>
              </div>
              <Input
                id="ct-name"
                name="ct-name"
                required
                className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:ring-0"
                placeholder={locale === 'es' ? 'Ej: María García' : 'e.g. John Smith'}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#C5A55A]" />
                <Label htmlFor="ct-email" className="text-white/80 text-sm">
                  Email *
                </Label>
              </div>
              <Input
                id="ct-email"
                name="ct-email"
                type="email"
                required
                className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:ring-0"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#C5A55A]" />
                <Label htmlFor="ct-travelers" className="text-white/80 text-sm">
                  {locale === 'es' ? 'Número de viajeros' : 'Number of travelers'} *
                </Label>
              </div>
              <Input
                id="ct-travelers"
                name="ct-travelers"
                type="number"
                min="1"
                required
                className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:ring-0"
                placeholder={locale === 'es' ? 'Ej: 2' : 'e.g. 2'}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#C5A55A]" />
                <Label htmlFor="ct-dates" className="text-white/80 text-sm">
                  {locale === 'es' ? 'Fechas preferidas' : 'Preferred dates'}
                </Label>
              </div>
              <Input
                id="ct-dates"
                name="ct-dates"
                className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:ring-0"
                placeholder={locale === 'es' ? 'Ej: Julio 2025' : 'e.g. July 2025'}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="ct-notes" className="text-white/80 text-sm mb-2 block">
              {locale === 'es' ? 'Notas adicionales (opcional)' : 'Additional notes (optional)'}
            </Label>
            <Textarea
              id="ct-notes"
              name="ct-notes"
              rows={3}
              className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#C5A55A] resize-none"
              placeholder={locale === 'es'
                ? 'Cuéntanos más sobre lo que buscas...'
                : 'Tell us more about what you\'re looking for...'}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="btn-gold rounded-full w-full sm:w-auto px-10 py-4 text-base tracking-wide flex items-center justify-center gap-2 mx-auto"
          >
            <Send className="w-5 h-5" />
            {locale === 'es' ? 'Enviar Solicitud por WhatsApp' : 'Send Request via WhatsApp'}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}