'use client';

import React, { useState } from 'react';
import { Check, X, AlertTriangle, Star, Backpack } from 'lucide-react';
import ItineraryAccordion from '@/components/ItineraryAccordion';
import { useLanguage } from '@/components/LanguageProvider';

interface ItineraryStep {
  dayOrHour: string;
  title: string;
  description: string;
}

interface TourInfoTabsProps {
  includes?: string[];
  excludes?: string[];
  highlights?: string[];
  whatToBring?: string;
  pricingNote?: string;
  policies?: string[];
  itinerarySteps?: ItineraryStep[];
}

export default function TourInfoTabs({
  includes = [],
  excludes = [],
  highlights = [],
  whatToBring,
  pricingNote,
  policies = [],
  itinerarySteps,
}: TourInfoTabsProps) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'includes' | 'policies'>('itinerary');

  const tabs = [
    { key: 'itinerary' as const, label: locale === 'es' ? 'Itinerario' : 'Itinerary' },
    { key: 'includes' as const, label: locale === 'es' ? '\u00bfQu\u00e9 Incluye?' : "What's Included?" },
    { key: 'policies' as const, label: locale === 'es' ? 'Pol\u00edticas' : 'Policies' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tab Navigation Bar */}
      <div className="flex border-b border-white/10 mb-6 sm:mb-8 overflow-x-auto scrollbar-none shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 text-center py-3.5 sm:py-4 px-2 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-[#D4A843] text-[#D4A843]'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* ITINERARY TAB */}
      {activeTab === 'itinerary' && (
        <div>
          {itinerarySteps && itinerarySteps.length > 0 ? (
            <ItineraryAccordion data={itinerarySteps} />
          ) : (
            <p className="text-white/40 text-sm text-center py-8">
              {locale === 'es'
                ? 'Itinerario no disponible para este tour.'
                : 'Itinerary not available for this tour.'}
            </p>
          )}
        </div>
      )}

      {/* INCLUDES/EXCLUDES TAB */}
      {activeTab === 'includes' && (
        <div className="space-y-6">
          {/* Highlights Section */}
          {highlights.length > 0 && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D4A843] mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                {locale === 'es' ? 'Destacados del Tour:' : 'Tour Highlights:'}
              </h4>
              <ul className="space-y-2.5">
                {highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-white/80 font-light leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[#D4A843] shrink-0 mt-0.5">&#10022;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Includes / Excludes Grid */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What's Included */}
              {includes.length > 0 && (
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {locale === 'es' ? 'El Servicio Incluye:' : 'Included:'}
                  </h4>
                  <ul className="space-y-2.5">
                    {includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-white/70 font-light leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-emerald-400 shrink-0 mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What's NOT Included */}
              {excludes.length > 0 && (
                <div className={includes.length > 0 ? 'border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-6' : ''}>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-rose-400/80 mb-4 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {locale === 'es' ? 'No Incluye:' : 'Not Included:'}
                  </h4>
                  <ul className="space-y-2.5">
                    {excludes.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-white/50 font-light leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-rose-400/60 shrink-0 mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* What to Bring */}
          {whatToBring && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 mb-3 flex items-center gap-2">
                <Backpack className="w-4 h-4" />
                {locale === 'es' ? 'Qu\u00e9 Llevar:' : 'What to Bring:'}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">{whatToBring}</p>
            </div>
          )}
        </div>
      )}

      {/* POLICIES TAB */}
      {activeTab === 'policies' && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
          {policies.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D4A843] mb-3">
                {locale === 'es' ? 'T\u00e9rminos de Cancelaci\u00f3n' : 'Cancellation Terms'}
              </h4>
              <ul className="space-y-3">
                {policies.map((policy, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-white/70 font-light leading-relaxed flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pricingNote && (
            <>
              <div className="h-px bg-white/10 w-full" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/70 mb-2">
                  {locale === 'es' ? 'Precio' : 'Pricing'}
                </h4>
                <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                  {pricingNote}
                </p>
              </div>
            </>
          )}

          <div className="h-px bg-white/10 w-full" />

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/70 mb-2">
              {locale === 'es' ? 'Informaci\u00f3n sobre Tarifas' : 'Rate Information'}
            </h4>
            <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
              {locale === 'es'
                ? 'Los precios mostrados est\u00e1n expresados en d\u00f3lares americanos (USD) e incluyen todos los impuestos de ley aplicables al turismo receptivo. Las reservas se confirman tras la validaci\u00f3n de espacios con nuestros operadores locales.'
                : 'Prices shown are in US Dollars (USD) and include all applicable taxes for inbound tourism. Reservations are confirmed after space validation with our local operators.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}