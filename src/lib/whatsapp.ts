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
