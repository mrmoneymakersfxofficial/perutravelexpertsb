'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PremiumScrollIndicator
 * ─────────────────────
 * Animated "Show More" indicator that appears after 2s delay.
 * Gold chevron with pulse ring, floating animation, and glow effect.
 * Used on all tour detail / tour package heroes.
 * Auto-hides when user scrolls past the hero.
 */
export default function PremiumScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* Show after 2s delay */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* Hide once user scrolls past 60px */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) setHidden(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const hero = document.querySelector('section');
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: heroBottom - 40, behavior: 'smooth' });
    }
  };

  if (!visible || hidden) return null;

  return (
    <AnimatePresence>
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.9 }}
        transition={{
          opacity: { duration: 0.6, ease: 'easeOut' },
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 cursor-pointer group"
        aria-label="Show more"
      >
        {/* Text label */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.18em' }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.18em] text-white/40 group-hover:text-white/70 transition-colors duration-300"
        >
          Show More
        </motion.span>

        {/* Animated chevron container */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10"
        >
          {/* Glow ring — pulse */}
          <motion.span
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border border-[#C5A55A]/30"
          />

          {/* Second glow ring — offset phase */}
          <motion.span
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1,
            }}
            className="absolute inset-0 rounded-full border border-[#C5A55A]/15"
          />

          {/* Gold circle background */}
          <motion.span
            className="absolute inset-[3px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(197,165,90,0.15), rgba(168,136,61,0.08))',
              border: '1px solid rgba(197,165,90,0.25)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            whileHover={{
              background: 'linear-gradient(135deg, rgba(197,165,90,0.25), rgba(168,136,61,0.15))',
              borderColor: 'rgba(197,165,90,0.5)',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Chevron icon */}
          <svg
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#C5A55A] relative z-10 drop-shadow-[0_0_6px_rgba(197,165,90,0.4)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}