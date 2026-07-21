'use client';

import { toast } from 'sonner';
import { useLanguage } from '@/components/LanguageProvider';

type ToastType = 'addedFavorite' | 'removedFavorite' | 'linkCopied' | 'shared' | 'bookingStarted';

const messages = {
  es: { addedFavorite: 'Agregado a favoritos', removedFavorite: 'Eliminado de favoritos', linkCopied: 'Enlace copiado al portapapeles', shared: '¡Compartido exitosamente!', bookingStarted: '¡Reservación iniciada!' },
  en: { addedFavorite: 'Added to favorites', removedFavorite: 'Removed from favorites', linkCopied: 'Link copied to clipboard', shared: 'Shared successfully!', bookingStarted: 'Booking started!' },
} as const;

export function showToast(type: ToastType, customMessage?: string) {
  const locale = typeof window !== 'undefined' ? document.documentElement.lang || 'es' : 'es';
  const lang = locale === 'en' ? 'en' : 'es';
  const message = customMessage || messages[lang][type];
  switch (type) {
    case 'addedFavorite': toast.success(message, { duration: 3000 }); break;
    case 'removedFavorite': toast.info(message, { duration: 3000 }); break;
    case 'linkCopied': toast.success(message, { duration: 3000 }); break;
    case 'shared': toast.success(message, { duration: 3000 }); break;
    case 'bookingStarted': toast.success(message, { duration: 3000 }); break;
    default: toast(message, { duration: 3000 });
  }
}

export function useToastNotification() {
  const { locale } = useLanguage();
  const lang = locale === 'en' ? 'en' : 'es';
  const msgs = messages[lang];
  return {
    showAddedFavorite: () => toast.success(msgs.addedFavorite, { duration: 3000 }),
    showRemovedFavorite: () => toast.info(msgs.removedFavorite, { duration: 3000 }),
    showLinkCopied: () => toast.success(msgs.linkCopied, { duration: 3000 }),
    showShared: () => toast.success(msgs.shared, { duration: 3000 }),
    showBookingStarted: () => toast.success(msgs.bookingStarted, { duration: 3000 }),
    showToast: (type: ToastType) => showToast(type),
  };
}
