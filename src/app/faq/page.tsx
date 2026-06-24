import type { Metadata } from 'next';
import FAQClient from './FAQClient';
import { FAQSchema } from '@/components/SchemaOrg';
import { translations } from '@/lib/i18n/translations';

const BASE_URL = 'https://perutravelexpertsb.vercel.app';

export const metadata: Metadata = {
  title: 'FAQ - Preguntas Frecuentes | PeruTravelExpertsB Tours Cusco',
  description:
    'Frequently asked questions about traveling to Cusco, Machu Picchu, Inca Trail permits, altitude sickness, what to pack, and more. Get all the info you need.',
  openGraph: {
    title: 'FAQ - Preguntas Frecuentes | PeruTravelExpertsB',
    description:
      'Everything you need to know before your trip to Cusco and Machu Picchu. Answers to the most common travel questions.',
    url: `${BASE_URL}/faq`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={translations.en.faq.questions} />
      <FAQClient />
    </>
  );
}
