'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, ChevronDown, MessageCircle, Minus, Plus, ArrowRight } from 'lucide-react';
import { tours } from '@/lib/tours-data';
import { getWhatsAppLink } from '@/lib/whatsapp';
import type { TourView } from '@/lib/types';
import type { TourData } from '@/lib/tours-data';

interface BookingModalProps {
  tour?: TourView | null;
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIME_SLOTS = [
  { es: 'Mañana (04:00 - 08:00 AM)', en: 'Morning (04:00 - 08:00 AM)' },
  { es: 'Día Completo (08:00 AM)', en: 'Full Day (08:00 AM)' },
  { es: 'Tarde (01:00 PM)', en: 'Afternoon (01:00 PM)' },
  { es: 'Noche (06:00 PM)', en: 'Evening (06:00 PM)' },
];

export default function BookingModal({ tour, locale, open, onOpenChange }: BookingModalProps) {
  const { t } = useLanguage();

  const preselectedTour = tour ? (locale === 'es' ? tour.nameEs : tour.nameEn) : '';

  const [selectedTour, setSelectedTour] = useState(preselectedTour);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [pax, setPax] = useState(2);
  const [name, setName] = useState('');
  const [step, setStep] = useState(tour ? 1 : 0);

  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  // Find selected tour data for pricing
  const selectedTourData = tours.find(tr => tr.nameEs === selectedTour || tr.nameEn === selectedTour);
  const pricePerPerson = selectedTourData?.priceUSD ? Math.round(selectedTourData.priceUSD) : null;

  const handleSubmit = () => {
    const tourLabel = selectedTour || (locale === 'es' ? 'No especificado' : 'Not specified');
    const paxLabel = `${pax} ${pax === 1 ? (locale === 'es' ? 'persona' : 'person') : (locale === 'es' ? 'personas' : 'persons')}`;
    const totalPrice = pricePerPerson ? `$${pricePerPerson * pax} USD` : '';

    const message =
      `✨ *NUEVA SOLICITUD DE RESERVA* ✨\n\n` +
      `🗺️ *Tour:* ${tourLabel}\n` +
      `📅 *Fecha:* ${date || (locale === 'es' ? 'No especificada' : 'Not specified')}\n` +
      `⏰ *Horario:* ${timeSlot || (locale === 'es' ? 'No especificado' : 'Not specified')}\n` +
      `👥 *Pasajeros:* ${paxLabel}\n` +
      (totalPrice ? `💰 *Total estimado:* ${totalPrice}\n` : '') +
      (name ? `\n👤 *Nombre:* ${name}\n` : '') +
      `\n📌 _Por favor, confíremenme disponibilidad y métodos de pago._\n` +
      `_Enviado desde PeruTravelExpertsB.com_`;

    window.open(getWhatsAppLink(message), '_blank');
    onOpenChange(false);
  };

  const canSubmit = selectedTour && date && timeSlot && pax >= 1;

  const stepLabels = [
    locale === 'es' ? 'Selecciona tu tour' : 'Choose your tour',
    locale === 'es' ? 'Configura tu reserva' : 'Configure your booking',
  ];

  /* ── Step 0: Tour Selector ── */
  const TourSelector = (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8B8680' }}>
        {locale === 'es' ? 'Elige un destino...' : 'Choose a destination...'}
      </p>
      <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-hide">
        {tours.map((tourItem) => {
          const trName = locale === 'es' ? tourItem.nameEs : tourItem.nameEn;
          const destName = tourItem.destination;
          const isSelected = selectedTour === trName;
          return (
            <button
              key={tourItem.id}
              onClick={() => { setSelectedTour(trName); setStep(1); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: isSelected ? 'rgba(212,168,67,0.12)' : 'rgba(255,255,255,0.4)',
                border: isSelected ? '1px solid rgba(212,168,67,0.3)' : '1px solid rgba(232,213,181,0.08)',
              }}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img src={tourItem.image} alt={trName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate" style={{ color: '#1C1C1C' }}>{trName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: '#8B8680' }}>
                    <MapPin className="w-2.5 h-2.5" />{destName}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: '#8B8680' }}>
                    <Clock className="w-2.5 h-2.5" />{tourItem.duration} {t.tours.days}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold" style={{ color: '#D4A843' }}>${Math.round(tourItem.priceUSD)}</p>
                <p className="text-[9px]" style={{ color: '#8B8680' }}>/ {t.tours.perPerson}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Step 1: Date, Time, Pax ── */
  const BookingConfig = (
    <div className="space-y-5">
      {/* Selected tour summary */}
      {selectedTourData && (
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.15)' }}>
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <img src={selectedTourData.image} alt={selectedTour} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate" style={{ color: '#1C1C1C' }}>{selectedTour}</p>
            <p className="text-[11px]" style={{ color: '#D4A843' }}>${Math.round(selectedTourData.priceUSD)} / {t.tours.perPerson}</p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8B8680' }}>
          {locale === 'es' ? 'Tu nombre' : 'Your name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={locale === 'es' ? 'Opcional...' : 'Optional...'}
          className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.2)', color: '#1C1C1C' }}
        />
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8B8680' }}>
            <Calendar className="w-3 h-3 inline mr-1" />
            {locale === 'es' ? 'Fecha' : 'Date'}
          </label>
          <input
            type="date"
            required
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-11 rounded-xl px-3 text-sm outline-none transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.2)', color: '#1C1C1C' }}
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8B8680' }}>
            <Clock className="w-3 h-3 inline mr-1" />
            {locale === 'es' ? 'Horario' : 'Time'}
          </label>
          <select
            required
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full h-11 rounded-xl px-3 text-sm outline-none transition-colors appearance-none"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.2)', color: '#1C1C1C' }}
          >
            <option value="" disabled>{locale === 'es' ? 'Horario...' : 'Time...'}</option>
            {TIME_SLOTS.map((slot, i) => (
              <option key={i} value={slot[locale === 'es' ? 'es' : 'en']}>{slot[locale === 'es' ? 'es' : 'en']}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pax selector */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#8B8680' }}>
          <Users className="w-3 h-3 inline mr-1" />
          {locale === 'es' ? 'Cantidad de personas' : 'Number of travelers'}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPax(Math.max(1, pax - 1))}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.2)' }}
          >
            <Minus className="w-4 h-4" style={{ color: '#1C1C1C' }} />
          </button>
          <div className="flex-1 text-center">
            <span className="text-2xl font-bold font-playfair" style={{ color: '#1C1C1C' }}>{pax}</span>
            <span className="block text-[10px] uppercase tracking-wider" style={{ color: '#8B8680' }}>
              {locale === 'es' ? 'Personas' : 'Travelers'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPax(Math.min(30, pax + 1))}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(232,213,181,0.2)' }}
          >
            <Plus className="w-4 h-4" style={{ color: '#1C1C1C' }} />
          </button>
        </div>
      </div>

      {/* Price estimate */}
      {pricePerPerson && (
        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)' }}>
          <span className="text-xs" style={{ color: '#8B8680' }}>
            {locale === 'es' ? 'Total estimado' : 'Estimated total'}
          </span>
          <span className="text-xl font-bold font-playfair" style={{ color: '#D4A843' }}>${pricePerPerson * pax}</span>
        </div>
      )}
    </div>
  );

  /* ── Header ── */
  const ModalHeader = (
    <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-3">
      <div>
        <h2 className="font-playfair text-lg sm:text-xl font-bold" style={{ color: '#1C1C1C' }}>
          {locale === 'es' ? 'Reserva Tu Experiencia' : 'Book Your Experience'}
        </h2>
        <p className="text-[11px] mt-0.5" style={{ color: '#8B8680' }}>
          {stepLabels[step]}
        </p>
      </div>
      {/* Step dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1].map(s => (
          <div key={s} className="w-6 h-1.5 rounded-full transition-colors duration-300" style={{ backgroundColor: s <= step ? '#D4A843' : 'rgba(212,168,67,0.2)' }} />
        ))}
      </div>
    </div>
  );

  /* ── Footer ── */
  const ModalFooter = (
    <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-3">
      {step === 0 && (
        <Button
          disabled={!selectedTour}
          onClick={() => selectedTour && setStep(1)}
          className="w-full h-12 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
          style={{ backgroundColor: '#D4A843', color: '#0F0F0F' }}
        >
          {locale === 'es' ? 'Continuar' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
      {step === 1 && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setStep(0)}
            variant="outline"
            className="h-12 rounded-xl text-sm font-semibold px-4 shrink-0"
            style={{ borderColor: 'rgba(212,168,67,0.3)', color: '#8B8680' }}
          >
            {locale === 'es' ? 'Atrás' : 'Back'}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 h-12 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-40 transition-all shadow-lg"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <MessageCircle className="w-4 h-4" />
            {locale === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop Dialog ── */}
      <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setStep(tour ? 1 : 0); } }}>
        <DialogContent className="hidden md:block max-w-[480px] p-0 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F8F6F2' }}>
          <DialogHeader className="sr-only"><DialogTitle>{locale === 'es' ? 'Reservar' : 'Book'}</DialogTitle></DialogHeader>
          {ModalHeader}
          <div className="px-5 sm:px-6 pb-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {step === 0 ? TourSelector : BookingConfig}
          </div>
          {ModalFooter}
        </DialogContent>
      </Dialog>

      {/* ── Mobile Sheet ── */}
      <Sheet open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setStep(tour ? 1 : 0); } }}>
        <SheetContent
          side="bottom"
          className="md:hidden rounded-t-[28px] overflow-hidden p-0"
          style={{ backgroundColor: '#F8F6F2', maxHeight: '85vh' }}
        >
          <div className="flex justify-center pt-3 pb-0">
            <div className="w-9 h-[3px] rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
          </div>
          <SheetHeader className="sr-only"><SheetTitle>{locale === 'es' ? 'Reservar' : 'Book'}</SheetTitle></SheetHeader>
          {ModalHeader}
          <div className="px-4 sm:px-5 pb-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(85vh - 160px)' }}>
            {step === 0 ? TourSelector : BookingConfig}
          </div>
          {ModalFooter}
        </SheetContent>
      </Sheet>
    </>
  );
}
