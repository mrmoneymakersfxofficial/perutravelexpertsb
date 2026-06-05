'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <motion.a
      href="https://wa.me/51984000000?text=Hola%2C%20me%20interesa%20información%20sobre%20los%20tours%20de%20Intiquilla"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
      aria-label={t.whatsapp.tooltip}
      title={t.whatsapp.tooltip}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
}
