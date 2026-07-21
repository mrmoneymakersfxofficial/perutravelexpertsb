'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const scaleX = useSpring(0, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        setProgress(p);
        scaleX.set(p);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scaleX]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none"
      style={{ height: '3px' }}
    >
      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          scaleX,
          transformOrigin: '0% 50%',
          background: 'linear-gradient(90deg, #C9A96E, #E8C97A, #F5D6A8)',
          boxShadow: '0 0 12px rgba(212,168,67,0.6), 0 0 30px rgba(212,168,67,0.3), 0 0 60px rgba(212,168,67,0.15)',
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* Sharp progress line */}
      <motion.div
        className="absolute inset-0"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #C9A96E 0%, #D4A843 30%, #E8C97A 60%, #F5D6A8 100%)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}