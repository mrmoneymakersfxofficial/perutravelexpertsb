import type { Metadata } from 'next';
import { tours, destinations } from '@/lib/tours-data';
import ToursClient from './ToursClient';

export const metadata: Metadata = {
  title: 'Tours | PeruTravelExpertsB - Luxury Experiences in Peru',
  description: 'Explore our exclusive collection of luxury tours across Peru. Machu Picchu, Sacred Valley, Amazon, Lake Titicaca and more.',
};

export default function ToursPage() {
  return <ToursClient tours={tours} destinations={destinations} />;
}
