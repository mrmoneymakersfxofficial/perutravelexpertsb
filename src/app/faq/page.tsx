import type { Metadata } from 'next';
import FAQClient from './FAQClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'FAQ - Preguntas Frecuentes | Intiquilla Tours Cusco',
  description:
    'Frequently asked questions about traveling to Cusco, Machu Picchu, Inca Trail permits, altitude sickness, what to pack, and more. Get all the info you need.',
  openGraph: {
    title: 'FAQ - Preguntas Frecuentes | Intiquilla',
    description:
      'Everything you need to know before your trip to Cusco and Machu Picchu. Answers to the most common travel questions.',
    url: `${BASE_URL}/faq`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
