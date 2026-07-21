import type { Metadata } from 'next';
import { tours as localTours, destinations as localDestinations } from '@/lib/tours-data';
import { getAllTours, getDestinations } from '@/lib/sanity-adapter';
import ToursClient from './ToursClient';

export const metadata: Metadata = {
  title: 'Tours | PeruTravelExpertsB - Luxury Experiences in Peru',
  description: 'Explore our exclusive collection of luxury tours across Peru. Machu Picchu, Sacred Valley, Amazon, Lake Titicaca and more.',
};

export default async function ToursPage() {
  const [sanityTours, sanityDests] = await Promise.all([
    getAllTours(),
    getDestinations(),
  ]);
  // Usar datos de Sanity si están disponibles, si no datos locales
  const toursData = (sanityTours && sanityTours.length > 0) ? sanityTours : localTours;
  const destsData = (sanityDests && sanityDests.length > 0) ? sanityDests : localDestinations;
  return <ToursClient tours={toursData} destinations={destsData} />;
}
