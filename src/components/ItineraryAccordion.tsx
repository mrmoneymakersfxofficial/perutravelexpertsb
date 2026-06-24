'use client';

import React, { useState } from 'react';

interface ItineraryStep {
  dayOrHour: string;
  title: string;
  description: string;
}

interface ItineraryAccordionProps {
  data: ItineraryStep[];
}

export default function ItineraryAccordion({ data }: ItineraryAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#141414] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl">
      <h3 className="text-lg sm:text-xl font-bold text-[#C5A55A] tracking-wide uppercase mb-5 sm:mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Itinerario de la Experiencia
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {data.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                isOpen ? 'border-[#C5A55A] bg-white/[0.02]' : 'border-white/5 bg-transparent'
              }`}
            >
              {/* Accordion Header (Button) */}
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-3 sm:p-4 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-colors whitespace-nowrap ${
                      isOpen ? 'bg-[#C5A55A] text-[#0F0F0F]' : 'bg-white/5 text-[#C5A55A]'
                    }`}
                  >
                    {item.dayOrHour}
                  </span>
                  <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wide line-clamp-1">
                    {item.title}
                  </h4>
                </div>

                {/* Animated Chevron */}
                <svg
                  className={`w-4 h-4 text-white/50 transition-transform duration-300 flex-shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-[#C5A55A]' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expandable Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed pl-4 sm:pl-[76px]">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
