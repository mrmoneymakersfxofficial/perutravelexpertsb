'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import ImmersiveHero from '@/components/ImmersiveHero';
import { getWhatsAppLink } from '@/lib/whatsapp';
import {
  ChevronDown,
  MapPin,
  Calendar,
  Users,
  Star,
  Mountain,
  Waves,
  Sun,
  Utensils,
  Camera,
  Footprints,
  Sparkles,
  Send,
  Plus,
  Minus,
} from 'lucide-react';

/* ── Types ──────────────────────────────────────────────────── */
interface AccordionStep {
  id: string;
  icon: React.ReactNode;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
}

interface DestinationOption {
  id: string;
  nameEs: string;
  nameEn: string;
  region: string;
  icon: React.ReactNode;
}

/* ── Data ───────────────────────────────────────────────────── */
const STEPS: AccordionStep[] = [
  {
    id: 'destinations',
    icon: <MapPin className="w-5 h-5" />,
    titleEs: 'Destinos a Visitar',
    titleEn: 'Destinations to Visit',
    descEs: 'Selecciona los lugares que te gustaría explorar en Perú',
    descEn: 'Select the places you would like to explore in Peru',
  },
  {
    id: 'travel-style',
    icon: <Star className="w-5 h-5" />,
    titleEs: 'Estilo de Viaje',
    titleEn: 'Travel Style',
    descEs: 'Cuéntanos cómo imaginas tu experiencia ideal',
    descEn: 'Tell us how you imagine your ideal experience',
  },
  {
    id: 'preferences',
    icon: <Sparkles className="w-5 h-5" />,
    titleEs: 'Preferencias Especiales',
    titleEn: 'Special Preferences',
    descEs: 'Actividades, gastronomía, fotografía y más',
    descEn: 'Activities, gastronomy, photography and more',
  },
  {
    id: 'logistics',
    icon: <Calendar className="w-5 h-5" />,
    titleEs: 'Logística del Viaje',
    titleEn: 'Trip Logistics',
    descEs: 'Fechas, número de viajeros y presupuesto',
    descEn: 'Dates, number of travelers and budget',
  },
  {
    id: 'contact-info',
    icon: <Send className="w-5 h-5" />,
    titleEs: 'Tus Datos de Contacto',
    titleEn: 'Your Contact Information',
    descEs: 'Para que podamos enviar tu itinerario personalizado',
    descEn: 'So we can send your personalized itinerary',
  },
];

const DESTINATIONS: DestinationOption[] = [
  { id: 'cusco', nameEs: 'Cusco', nameEn: 'Cusco', region: 'Sierra', icon: <Mountain className="w-4 h-4" /> },
  { id: 'machu-picchu', nameEs: 'Machu Picchu', nameEn: 'Machu Picchu', region: 'Sierra', icon: <Mountain className="w-4 h-4" /> },
  { id: 'sacred-valley', nameEs: 'Valle Sagrado', nameEn: 'Sacred Valley', region: 'Sierra', icon: <Mountain className="w-4 h-4" /> },
  { id: 'rainbow-mountain', nameEs: 'Montaña de Colores', nameEn: 'Rainbow Mountain', region: 'Sierra', icon: <Sun className="w-4 h-4" /> },
  { id: 'humantay', nameEs: 'Laguna Humantay', nameEn: 'Humantay Lake', region: 'Sierra', icon: <Waves className="w-4 h-4" /> },
  { id: 'puno-titicaca', nameEs: 'Puno - Lago Titicaca', nameEn: 'Puno - Titicaca Lake', region: 'Sierra', icon: <Waves className="w-4 h-4" /> },
  { id: 'amazon', nameEs: 'Amazonía', nameEn: 'Amazon Rainforest', region: 'Selva', icon: <Waves className="w-4 h-4" /> },
  { id: 'arequipa', nameEs: 'Arequipa', nameEn: 'Arequipa', region: 'Sierra', icon: <Mountain className="w-4 h-4" /> },
  { id: 'lima', nameEs: 'Lima', nameEn: 'Lima', region: 'Costa', icon: <Sun className="w-4 h-4" /> },
  { id: 'ica-nazca', nameEs: 'Ica - Nazca', nameEn: 'Ica - Nazca', region: 'Costa', icon: <Sun className="w-4 h-4" /> },
];

const TRAVEL_STYLES = [
  { id: 'luxury', es: 'Lujo Premium', en: 'Premium Luxury' },
  { id: 'adventure', es: 'Aventura', en: 'Adventure' },
  { id: 'cultural', es: 'Cultural e Histórico', en: 'Cultural & Historical' },
  { id: 'romantic', es: 'Romántico / Honeymoon', en: 'Romantic / Honeymoon' },
  { id: 'family', es: 'Familiar', en: 'Family Friendly' },
  { id: 'photography', es: 'Fotografía', en: 'Photography' },
];

const PREFERENCES = [
  { id: 'gastronomy', es: 'Gastronomía Peruana', en: 'Peruvian Gastronomy', icon: <Utensils className="w-4 h-4" /> },
  { id: 'photography-tours', es: 'Tours Fotográficos', en: 'Photography Tours', icon: <Camera className="w-4 h-4" /> },
  { id: 'trekking', es: 'Trekking', en: 'Trekking', icon: <Footprints className="w-4 h-4" /> },
  { id: 'wellness', es: 'Bienestar / Spa', en: 'Wellness / Spa', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'nightlife', es: 'Vida Nocturna', en: 'Nightlife', icon: <Star className="w-4 h-4" /> },
  { id: 'markets', es: 'Mercados Artesanales', en: 'Artisan Markets', icon: <MapPin className="w-4 h-4" /> },
  { id: 'festivals', es: 'Fiestas y Festivales', en: 'Festivals & Celebrations', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'wildlife', es: 'Vida Silvestre', en: 'Wildlife', icon: <Mountain className="w-4 h-4" /> },
];

const BUDGET_RANGES = [
  { id: 'budget', es: 'Económico ($500 - $1,000)', en: 'Budget ($500 - $1,000)' },
  { id: 'mid', es: 'Moderado ($1,000 - $2,500)', en: 'Moderate ($1,000 - $2,500)' },
  { id: 'premium', es: 'Premium ($2,500 - $4,000)', en: 'Premium ($2,500 - $4,000)' },
];

const GROUP_SIZES = [
  { id: 'solo', es: 'Viajero Solo', en: 'Solo Traveler' },
  { id: 'couple', es: 'Pareja (2 personas)', en: 'Couple (2 people)' },
  { id: 'small', es: 'Grupo Pequeño (3-5)', en: 'Small Group (3-5)' },
  { id: 'medium', es: 'Grupo Mediano (6-10)', en: 'Medium Group (6-10)' },
  { id: 'large', es: 'Grupo Grande (11+)', en: 'Large Group (11+)' },
];

/* ── Accordion Item Component ───────────────────────────────── */
function AccordionItem({
  step,
  isOpen,
  onToggle,
  completed,
  children,
  stepIndex,
  isFirst,
  isLast,
  onNext,
  onPrev,
}: {
  step: AccordionStep;
  isOpen: boolean;
  onToggle: () => void;
  completed: boolean;
  children: React.ReactNode;
  stepIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onNext: (stepId: string) => void;
  onPrev: (stepId: string) => void;
}) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const title = isEs ? step.titleEs : step.titleEn;
  const desc = isEs ? step.descEs : step.descEn;

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      animate={{
        background: isOpen ? 'rgba(212,168,67,0.04)' : 'rgba(255,255,255,0.02)',
        boxShadow: isOpen
          ? '0 0 40px rgba(212,168,67,0.08), 0 0 80px rgba(212,168,67,0.03)'
          : '0 0 0px rgba(212,168,67,0)',
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        border: `1px solid ${isOpen ? 'rgba(212,168,67,0.25)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.5s ease',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left transition-colors duration-300 group cursor-pointer"
      >
        {/* Step number + icon */}
        <motion.div
          layout
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
          animate={{
            background: completed
              ? 'linear-gradient(135deg, #C9A96E, #E8C97A)'
              : isOpen
                ? 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(232,201,122,0.1))'
                : 'rgba(255,255,255,0.06)',
            borderColor: completed
              ? 'rgba(201,169,110,0.4)'
              : isOpen
                ? 'rgba(201,169,110,0.25)'
                : 'rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            border: '1px solid',
            color: completed ? '#0F0F0F' : '#D4A843',
          }}
        >
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.svg
                key="check"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </motion.svg>
            ) : (
              <motion.div
                key="icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {step.icon}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Title + desc */}
        <div className="flex-1 min-w-0">
          <motion.h3
            layout
            className="font-playfair text-base sm:text-lg font-bold"
            animate={{ color: completed ? '#E8C97A' : isOpen ? '#F5D6A8' : '#fff' }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {desc}
          </p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="w-5 h-5 shrink-0" style={{ color: '#D4A843' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
              className="px-5 sm:px-7 pb-6 sm:pb-8 pt-2"
            >
              {/* Step indicator badges */}
              <div className="flex items-center gap-2 mb-5">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(212,168,67,0.1)', color: '#E8C97A', border: '1px solid rgba(212,168,67,0.15)' }}
                >
                  {isEs ? 'Paso' : 'Step'} {stepIndex + 1} {isEs ? 'de' : 'of'} {5}
                </motion.span>
              </div>
              {children}
              {/* Navigation buttons */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  {!isFirst && (
                    <button
                      type="button"
                      onClick={() => onPrev(step.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                    >
                      <ChevronDown className="w-4 h-4" style={{ transform: 'rotate(90deg)' }} />
                      {isEs ? 'Anterior' : 'Previous'}
                    </button>
                  )}
                  {!isFirst && <div />}
                  <motion.button
                    type="button"
                    onClick={() => onNext(step.id)}
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(212,168,67,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #D4A843)', color: '#0F0F0F' }}
                  >
                    {isEs ? 'Siguiente' : 'Next'}
                    <ChevronDown className="w-4 h-4" style={{ transform: 'rotate(-90deg)' }} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Selection Chip ─────────────────────────────────────────── */
function Chip({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95"
      style={{
        background: selected
          ? 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(232,201,122,0.15))'
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${selected ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
        color: selected ? '#E8C97A' : 'rgba(255,255,255,0.6)',
        boxShadow: selected ? '0 0 20px rgba(212,168,67,0.1)' : 'none',
      }}
    >
      {icon && <span style={{ color: selected ? '#E8C97A' : 'rgba(255,255,255,0.3)' }}>{icon}</span>}
      {label}
    </button>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function CustomizedToursClient() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const formRef = useRef<HTMLFormElement>(null);

  const [openStep, setOpenStep] = useState('destinations');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Form state
  const [selectedDestinations, setSelectedDestinations] = useState<Set<string>>(new Set());
  const [customDestination, setCustomDestination] = useState('');
  const [travelStyles, setTravelStyles] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState<Set<string>>(new Set());
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleSet = (set: Set<string>, setter: React.Dispatch<React.SetStateAction<Set<string>>>, val: string) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  const markComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleStepToggle = (stepId: string) => {
    // Accordion: close current, open clicked (if different). Don't allow closing the active step by clicking its header.
    if (openStep === stepId) return; // keep it open when re-clicking header
    setOpenStep(stepId);
    // Auto-scroll to the newly opened step after a short delay for animation to start
    setTimeout(() => {
      const el = document.getElementById(`step-${stepId}`);
      if (el) {
        const offset = 80; // progress bar height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleNext = (currentStepId: string) => {
    markComplete(currentStepId);
    const currentIdx = STEPS.findIndex(s => s.id === currentStepId);
    const nextIdx = currentIdx + 1;
    if (nextIdx < STEPS.length) {
      const nextStepId = STEPS[nextIdx].id;
      setOpenStep(nextStepId);
      // Auto-scroll to the next step
      setTimeout(() => {
        const el = document.getElementById(`step-${nextStepId}`);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 200);
    }
  };

  const handlePrev = (currentStepId: string) => {
    const currentIdx = STEPS.findIndex(s => s.id === currentStepId);
    const prevIdx = currentIdx - 1;
    if (prevIdx >= 0) {
      const prevStepId = STEPS[prevIdx].id;
      setOpenStep(prevStepId);
      setTimeout(() => {
        const el = document.getElementById(`step-${prevStepId}`);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 200);
    }
  };

  const buildWhatsAppMessage = () => {
    const destNames = [...selectedDestinations].map(id => {
      const d = DESTINATIONS.find(x => x.id === id);
      return d ? (isEs ? d.nameEs : d.nameEn) : id;
    });
    if (customDestination.trim()) destNames.push(customDestination.trim());

    const styleNames = [...travelStyles].map(id => {
      const s = TRAVEL_STYLES.find(x => x.id === id);
      return s ? (isEs ? s.es : s.en) : id;
    });

    const prefNames = [...preferences].map(id => {
      const p = PREFERENCES.find(x => x.id === id);
      return p ? (isEs ? p.es : p.en) : id;
    });

    const budgetLabel = BUDGET_RANGES.find(b => b.id === budget);
    const groupLabel = GROUP_SIZES.find(g => g.id === groupSize);

    const form = formRef.current;
    const name = form?.['ct-name']?.value || '';
    const email = form?.['ct-email']?.value || '';
    const phone = form?.['ct-phone']?.value || '';

    let msg =
      `✈️ *Customized Tour Request - PeruTravelExpertsB*\n\n` +
      `📍 *Destinations:*\n${destNames.length ? destNames.map(d => `  • ${d}`).join('\n') : '  (Not specified)'}\n\n` +
      `🎯 *Travel Style:*\n${styleNames.length ? styleNames.map(s => `  • ${s}`).join('\n') : '  (Not specified)'}\n\n` +
      `✨ *Preferences:*\n${prefNames.length ? prefNames.map(p => `  • ${p}`).join('\n') : '  (Not specified)'}\n\n` +
      `👥 *Group:* ${groupLabel ? (isEs ? groupLabel.es : groupLabel.en) : 'N/A'}\n` +
      `💰 *Budget:* ${budgetLabel ? (isEs ? budgetLabel.es : budgetLabel.en) : 'N/A'}\n` +
      `📅 *Dates:* ${travelDates || 'N/A'}\n` +
      `⏱️ *Duration:* ${tripDuration || 'N/A'}\n\n` +
      `👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone}\n\n`;

    if (additionalNotes.trim()) {
      msg += `📝 *Additional Notes:*\n${additionalNotes.trim()}\n\n`;
    }

    msg += `_${isEs ? 'Enviado desde PeruTravelExpertsB.com - Customized Tour Builder' : 'Sent from PeruTravelExpertsB.com - Customized Tour Builder'}_`;
    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage();
    window.open(getWhatsAppLink(msg), '_blank');
  };

  const label = (es: string, en: string) => (isEs ? es : en);

  const progress = (completedSteps.size / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0F0F0F' }}>
      <ImmersiveHero
        title={isEs ? 'Tours Personalizados' : 'Customized Tours'}
        subtitle={isEs
          ? 'Diseña tu viaje soñado a Perú. Cuéntanos lo que buscas y nosotros creamos un itinerario exclusivo para ti.'
          : 'Design your dream trip to Peru. Tell us what you are looking for and we will create an exclusive itinerary just for you.'}
        bgImage="/tours/machu-picchu.jpg"
        height="55vh"
        breadcrumbs={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: isEs ? 'Tours Personalizados' : 'Customized Tours' },
        ]}
      />

      {/* Progress Bar */}
      <div className="sticky top-0 z-30" style={{ background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(212,168,67,0.08)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest shrink-0" style={{ color: '#C9A96E' }}>
            {completedSteps.size}/{STEPS.length}
          </span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #C9A96E, #E8C97A, #F5D6A8)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] font-medium shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Questionnaire */}
      <section className="py-10 sm:py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              id={`step-${step.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AccordionItem
                step={step}
                isOpen={openStep === step.id}
                onToggle={() => handleStepToggle(step.id)}
                completed={completedSteps.has(step.id)}
                stepIndex={idx}
                isFirst={idx === 0}
                isLast={idx === STEPS.length - 1}
                onNext={handleNext}
                onPrev={handlePrev}
              >
                {/* ── Step 1: Destinations ── */}
                {step.id === 'destinations' && (
                  <div className="space-y-5">
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {label('Selecciona uno o más destinos que te interesen:', 'Select one or more destinations you are interested in:')}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {DESTINATIONS.map((dest, i) => (
                        <motion.div
                          key={dest.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.08 * i }}
                        >
                          <Chip
                            label={isEs ? dest.nameEs : dest.nameEn}
                            selected={selectedDestinations.has(dest.id)}
                            onClick={() => toggleSet(selectedDestinations, setSelectedDestinations, dest.id)}
                            icon={dest.icon}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {label('¿Otro destino en mente? Escríbelo aquí:', 'Another destination in mind? Write it here:')}
                      </label>
                      <input
                        type="text"
                        value={customDestination}
                        onChange={e => setCustomDestination(e.target.value)}
                        placeholder={label('Ej: Huacachina, Paracas, Colca Canyon...', 'E.g. Huacachina, Paracas, Colca Canyon...')}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Step 2: Travel Style ── */}
                {step.id === 'travel-style' && (
                  <div className="space-y-5">
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {label('Puedes elegir más de un estilo:', 'You can choose more than one style:')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TRAVEL_STYLES.map((style, i) => (
                        <motion.div
                          key={style.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.08 * i }}
                        >
                          <Chip
                            label={isEs ? style.es : style.en}
                            selected={travelStyles.has(style.id)}
                            onClick={() => toggleSet(travelStyles, setTravelStyles, style.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Preferences ── */}
                {step.id === 'preferences' && (
                  <div className="space-y-5">
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {label('Selecciona las experiencias que te interesen:', 'Select the experiences you are interested in:')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {PREFERENCES.map((pref, i) => (
                        <motion.div
                          key={pref.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.06 * i }}
                        >
                          <Chip
                            label={isEs ? pref.es : pref.en}
                            selected={preferences.has(pref.id)}
                            onClick={() => toggleSet(preferences, setPreferences, pref.id)}
                            icon={pref.icon}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 4: Logistics ── */}
                {step.id === 'logistics' && (
                  <div className="space-y-5">
                    {/* Group Size */}
                    <div>
                      <label className="block text-sm font-medium mb-2.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <Users className="w-4 h-4 inline mr-1.5" style={{ color: '#D4A843' }} />
                        {label('Tamaño del Grupo', 'Group Size')}
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {GROUP_SIZES.map((g, i) => (
                          <motion.div
                            key={g.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: 0.08 * i }}
                          >
                            <Chip
                              label={isEs ? g.es : g.en}
                              selected={groupSize === g.id}
                              onClick={() => setGroupSize(groupSize === g.id ? '' : g.id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium mb-2.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <Star className="w-4 h-4 inline mr-1.5" style={{ color: '#D4A843' }} />
                        {label('Presupuesto Estimado (por persona)', 'Estimated Budget (per person)')}
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {BUDGET_RANGES.map((b, i) => (
                          <motion.div
                            key={b.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: 0.08 * i }}
                          >
                            <Chip
                              label={isEs ? b.es : b.en}
                              selected={budget === b.id}
                              onClick={() => setBudget(budget === b.id ? '' : b.id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Travel Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          <Calendar className="w-4 h-4 inline mr-1.5" style={{ color: '#D4A843' }} />
                          {label('Fechas de Viaje', 'Travel Dates')}
                        </label>
                        <input
                          type="text"
                          value={travelDates}
                          onChange={e => setTravelDates(e.target.value)}
                          placeholder={label('Ej: 15 - 25 Julio 2025', 'E.g. July 15 - 25, 2025')}
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          <Calendar className="w-4 h-4 inline mr-1.5" style={{ color: '#D4A843' }} />
                          {label('Duración del Viaje', 'Trip Duration')}
                        </label>
                        <input
                          type="text"
                          value={tripDuration}
                          onChange={e => setTripDuration(e.target.value)}
                          placeholder={label('Ej: 7 días / 10 noches', 'E.g. 7 days / 10 nights')}
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {label('Notas Adicionales', 'Additional Notes')}
                      </label>
                      <textarea
                        value={additionalNotes}
                        onChange={e => setAdditionalNotes(e.target.value)}
                        rows={3}
                        placeholder={label(
                          'Cuéntanos cualquier detalle especial: alergias, celebraciones, requerimientos de accesibilidad...',
                          'Tell us about any special details: allergies, celebrations, accessibility requirements...'
                        )}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Step 5: Contact Info + Submit ── */}
                {step.id === 'contact-info' && (
                  <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {label('Nombre Completo *', 'Full Name *')}
                        </label>
                        <input
                          name="ct-name"
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                          placeholder={label('Tu nombre', 'Your name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          Email *
                        </label>
                        <input
                          name="ct-email"
                          type="email"
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {label('Teléfono / WhatsApp *', 'Phone / WhatsApp *')}
                      </label>
                      <input
                        name="ct-phone"
                        type="tel"
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4A843]/30"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                        placeholder="+51 984 000 000"
                      />
                    </div>

                    {/* Summary preview */}
                    <div
                      className="rounded-xl p-4 mt-2"
                      style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)' }}
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#C9A96E' }}>
                        {label('Resumen de tu Viaje', 'Your Trip Summary')}
                      </p>
                      <div className="space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <p><span style={{ color: '#C9A96E' }}>{label('Destinos:', 'Destinations:')}</span> {
                          [...selectedDestinations].map(id => DESTINATIONS.find(d => d.id === id))
                            .filter(Boolean)
                            .map(d => isEs ? d!.nameEs : d!.nameEn)
                            .join(', ') || (customDestination || label('No seleccionados', 'None selected'))
                        }{customDestination ? `, ${customDestination}` : ''}</p>
                        <p><span style={{ color: '#C9A96E' }}>{label('Estilo:', 'Style:')}</span> {
                          [...travelStyles].map(id => TRAVEL_STYLES.find(s => s.id === id))
                            .filter(Boolean)
                            .map(s => isEs ? s!.es : s!.en)
                            .join(', ') || label('No seleccionado', 'None selected')
                        }</p>
                        <p><span style={{ color: '#C9A96E' }}>{label('Preferencias:', 'Preferences:')}</span> {
                          [...preferences].map(id => PREFERENCES.find(p => p.id === id))
                            .filter(Boolean)
                            .map(p => isEs ? p!.es : p!.en)
                            .join(', ') || label('Ninguna', 'None')
                        }</p>
                        {groupSize && <p><span style={{ color: '#C9A96E' }}>{label('Grupo:', 'Group:')}</span> {GROUP_SIZES.find(g => g.id === groupSize)?.[isEs ? 'es' : 'en']}</p>}
                        {budget && <p><span style={{ color: '#C9A96E' }}>{label('Presupuesto:', 'Budget:')}</span> {BUDGET_RANGES.find(b => b.id === budget)?.[isEs ? 'es' : 'en']}</p>}
                        {travelDates && <p><span style={{ color: '#C9A96E' }}>{label('Fechas:', 'Dates:')}</span> {travelDates}</p>}
                        {tripDuration && <p><span style={{ color: '#C9A96E' }}>{label('Duración:', 'Duration:')}</span> {tripDuration}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-bold tracking-wide transition-all duration-300 active:scale-[0.98] mt-4"
                      style={{
                        background: 'linear-gradient(135deg, #C9A96E 0%, #D4A843 30%, #E8C97A 50%, #D4A843 70%, #C9A96E 100%)',
                        backgroundSize: '200% 100%',
                        color: '#0F0F0F',
                        boxShadow: '0 4px 30px rgba(212,168,67,0.3)',
                      }}
                    >
                      <Send className="w-5 h-5" />
                      {label('Enviar por WhatsApp', 'Send via WhatsApp')}
                    </button>
                  </form>
                )}
              </AccordionItem>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}