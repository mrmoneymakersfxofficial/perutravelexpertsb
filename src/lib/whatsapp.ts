// Centralized WhatsApp utility
// All CTA WhatsApp links MUST use this function

export const WHATSAPP_PHONE = '51984215157';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_PHONE}`;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(getWhatsAppLink(message), '_blank');
}

// Default CTA message based on locale — use this for generic WhatsApp buttons
export function getDefaultWhatsAppMessage(locale: string): string {
  return locale === 'es'
    ? 'Hola, me interesa información sobre los tours de PeruTravelExpertsB'
    : 'Hi, I\'m interested in information about PeruTravelExpertsB tours';
}
