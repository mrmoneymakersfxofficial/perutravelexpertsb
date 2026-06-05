'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Star, MessageCircle } from 'lucide-react';
import type { TourView } from '@/lib/types';

interface BookingModalProps {
  tour: TourView;
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({ tour, locale, open, onOpenChange }: BookingModalProps) {
  const { t } = useLanguage();

  const name = locale === 'es' ? tour.nameEs : tour.nameEn;
  const description = locale === 'es' ? tour.descriptionEs : tour.descriptionEn;
  const includes = locale === 'es' ? tour.includesEs : tour.includesEn;
  const diffLabels = { beginner: locale === 'es' ? 'Principiante' : 'Beginner', moderate: locale === 'es' ? 'Moderado' : 'Moderate', advanced: locale === 'es' ? 'Avanzado' : 'Advanced' };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userName = formData.get('name') as string;
    const userEmail = formData.get('email') as string;
    const travelers = formData.get('travelers') as string;
    const date = formData.get('date') as string;
    const message = formData.get('message') as string;

    const includesText = includes.join(', ');
    const text =
      `✈️ *${t.booking.title} - ${name}*\n\n` +
      `📋 *${t.booking.tourDetails}:*\n` +
      `🗓️ ${t.tours.duration}: ${tour.duration} ${t.tours.days}\n` +
      `📊 ${t.tours.difficulty}: ${diffLabels[tour.difficulty]}\n` +
      `💰 ${t.tours.price}: $${Math.round(tour.priceUSD)} ${t.tours.perPerson}\n` +
      `📦 ${locale === 'es' ? 'Incluye' : 'Includes'}: ${includesText}\n\n` +
      `👤 *${t.booking.summary}:*\n` +
      `🔑 ${t.booking.name}: ${userName}\n` +
      `📧 ${t.booking.email}: ${userEmail}\n` +
      `👥 ${t.booking.travelers}: ${travelers}\n` +
      `📅 ${t.booking.date}: ${date}\n` +
      `💬 ${t.booking.message}: ${message || locale === 'es' ? 'N/A' : 'N/A'}\n\n` +
      `_${locale === 'es' ? 'Enviado desde PeruTravelExpertsB.com' : 'Sent from PeruTravelExpertsB.com'}_`;

    const whatsappUrl = `https://wa.me/51984000000?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 bg-white rounded-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-playfair text-2xl font-bold" style={{ color: '#1C1C1C' }}>
            {t.booking.title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Tour Summary */}
          <div className="bg-[#F8F6F2] rounded-xl p-4 mb-6 border border-[#E8D5B5]/30">
            <h4 className="font-playfair text-lg font-bold mb-3" style={{ color: '#1C1C1C' }}>
              {name}
            </h4>
            <div className="flex flex-wrap gap-4 text-sm text-[#8B8680]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D6B37F]" />
                <span>{tour.duration} {t.tours.days}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#D6B37F]" />
                <span>{diffLabels[tour.difficulty]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#1C1C1C]">${Math.round(tour.priceUSD)}</span>
                <span>{t.tours.perPerson}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                {t.booking.name} *
              </Label>
              <Input
                id="name"
                name="name"
                required
                className="mt-1.5 border-[#E8D5B5]/40 focus:border-[#D6B37F]"
                placeholder={t.booking.name}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                {t.booking.email} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 border-[#E8D5B5]/40 focus:border-[#D6B37F]"
                placeholder={t.booking.email}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="travelers" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                  {t.booking.travelers} *
                </Label>
                <Input
                  id="travelers"
                  name="travelers"
                  type="number"
                  min="1"
                  max="20"
                  required
                  defaultValue="2"
                  className="mt-1.5 border-[#E8D5B5]/40 focus:border-[#D6B37F]"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                  {t.booking.date} *
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="mt-1.5 border-[#E8D5B5]/40 focus:border-[#D6B37F]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="text-sm font-medium" style={{ color: '#1C1C1C' }}>
                {t.booking.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={3}
                className="mt-1.5 border-[#E8D5B5]/40 focus:border-[#D6B37F] resize-none"
                placeholder={locale === 'es' ? '¿Tienes alguna solicitud especial?' : 'Any special requests?'}
              />
            </div>
            <Button
              type="submit"
              className="btn-gold rounded-full w-full py-3 text-base flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t.booking.send}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
