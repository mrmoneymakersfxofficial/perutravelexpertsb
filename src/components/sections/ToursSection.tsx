'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import TourCard from '@/components/TourCard';
import type { TourView } from '@/lib/types';
import { Heart, LayoutGrid } from 'lucide-react';

// Sample tour data embedded in component
const sampleTours: TourView[] = [
  {
    id: 'machu-picchu-vip',
    slug: 'machu-picchu-vip',
    image: '/tours/machu-picchu.jpg',
    gallery: ['/tours/machu-picchu-2.jpg'],
    nameEs: 'Machu Picchu VIP Experiencia',
    nameEn: 'Machu Picchu VIP Experience',
    descriptionEs: 'Vive la magia de Machu Picchu con un servicio exclusivo VIP. Incluye guía privado, tren de lujo Vistadome y entrada temprana para disfrutar de la ciudadela sin multitudes.',
    descriptionEn: 'Experience the magic of Machu Picchu with exclusive VIP service. Includes private guide, luxury Vistadome train, and early entry to enjoy the citadel without crowds.',
    duration: 2,
    difficulty: 'moderate',
    priceUSD: 350,
    highSeasonPrice: 420,
    includesEs: ['Guía privado bilingüe', 'Tren Vistadome ida y vuelta', 'Entrada a Machu Picchu', 'Bus de subida/bajada', 'Desayuno buffet'],
    includesEn: ['Private bilingual guide', 'Vistadome train round trip', 'Machu Picchu entrance', 'Bus up/down', 'Buffet breakfast'],
    active: true,
    featured: true,
    sortOrder: 0,
  },
  {
    id: 'city-tour-cusco',
    slug: 'city-tour-cusco',
    image: '/tours/cusco-city.jpg',
    gallery: ['/tours/cusco-city-2.jpg'],
    nameEs: 'City Tour Cusco Imperial',
    nameEn: 'Imperial Cusco City Tour',
    descriptionEs: 'Recorre los sitios arqueológicos más impresionantes del Cusco: Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay. Incluye entrada a todos los sitios.',
    descriptionEn: 'Visit the most impressive archaeological sites of Cusco: Sacsayhuamán, Qenqo, Puka Pukara, and Tambomachay. Includes entrance to all sites.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 45,
    highSeasonPrice: 55,
    includesEs: ['Guía profesional', 'Transporte turístico', 'Entradas a todos los sitios', 'Recogida de hotel'],
    includesEn: ['Professional guide', 'Tourist transport', 'Entrance to all sites', 'Hotel pickup'],
    active: true,
    featured: false,
    sortOrder: 1,
  },
  {
    id: 'valle-sagrado-full',
    slug: 'valle-sagrado-full',
    image: '/tours/sacred-valley.jpg',
    gallery: ['/tours/sacred-valley-2.jpg'],
    nameEs: 'Valle Sagrado Full Day',
    nameEn: 'Full Day Sacred Valley',
    descriptionEs: 'Un día completo explorando el hermoso Valle Sagrado de los Incas. Visita Pisac, Ollantaytambo, Chinchero y mercados artesanales con degustación de productos locales.',
    descriptionEn: 'A full day exploring the beautiful Sacred Valley of the Incas. Visit Pisac, Ollantaytambo, Chinchero, and artisan markets with local product tasting.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 65,
    highSeasonPrice: 75,
    includesEs: ['Guía bilingüe', 'Transporte privado', 'Almuerzo turístico', 'Entradas arqueológicas'],
    includesEn: ['Bilingual guide', 'Private transport', 'Tourist lunch', 'Archaeological entrances'],
    active: true,
    featured: true,
    sortOrder: 2,
  },
  {
    id: 'inca-trail-classic',
    slug: 'inca-trail-classic',
    image: '/tours/inca-trail.jpg',
    gallery: ['/tours/inca-trail-2.jpg'],
    nameEs: 'Camino Inca Clásico 4 Días',
    nameEn: 'Classic Inca Trail 4 Days',
    descriptionEs: 'La experiencia definitiva del Camino Inca. 4 días de trekking por el antiguo sendero inca cruzando pasos de montaña y ruinas ancestrales hasta llegar a Machu Picchu por la Puerta del Sol.',
    descriptionEn: 'The ultimate Inca Trail experience. 4 days of trekking along the ancient Inca path crossing mountain passes and ancestral ruins until reaching Machu Picchu through the Sun Gate.',
    duration: 4,
    difficulty: 'advanced',
    priceUSD: 850,
    highSeasonPrice: 980,
    includesEs: ['Guía experto', 'Porteadores y cocinero', 'Equipo de campamento', 'Comida completa 4 días', 'Entradas y permisos', 'Tren de retorno'],
    includesEn: ['Expert guide', 'Porters and cook', 'Camping equipment', 'Full meals 4 days', 'Entrances and permits', 'Return train'],
    active: true,
    featured: true,
    sortOrder: 3,
  },
  {
    id: 'rainbow-mountain',
    slug: 'rainbow-mountain',
    image: '/tours/rainbow-mountain.jpg',
    gallery: ['/tours/rainbow-mountain-2.jpg'],
    nameEs: 'Montaña de Colores',
    nameEn: 'Rainbow Mountain',
    descriptionEs: 'Descubre la espectacular Montaña de Colores (Vinicunca) a 5200 msnm. Un trekking único con vistas panorámicas de los colores naturales del Nevado Ausangate.',
    descriptionEn: 'Discover the spectacular Rainbow Mountain (Vinicunca) at 5200 masl. A unique trek with panoramic views of the natural colors of Mount Ausangate.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 55,
    highSeasonPrice: 65,
    includesEs: ['Guía bilingüe', 'Desayuno', 'Almuerzo', 'Transporte ida/vuelta', 'Caballo de emergencia'],
    includesEn: ['Bilingual guide', 'Breakfast', 'Lunch', 'Round trip transport', 'Emergency horse'],
    active: true,
    featured: false,
    sortOrder: 4,
  },
  {
    id: 'humantay-lagoon',
    slug: 'humantay-lagoon',
    image: '/tours/humantay-lagoon.jpg',
    gallery: ['/tours/humantay-lagoon-2.jpg'],
    nameEs: 'Laguna de Humantay',
    nameEn: 'Humantay Lagoon Trek',
    descriptionEs: 'Una caminata moderada hasta la impresionante Laguna de Humantay, con aguas turquesa rodeada de nevados. Una experiencia espiritual en los Andes peruanos.',
    descriptionEn: 'A moderate hike to the stunning Humantay Lagoon, with turquoise waters surrounded by snow-capped peaks. A spiritual experience in the Peruvian Andes.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 40,
    highSeasonPrice: 50,
    includesEs: ['Guía profesional', 'Desayuno', 'Almuerzo', 'Transporte', 'Caballo de apoyo'],
    includesEn: ['Professional guide', 'Breakfast', 'Lunch', 'Transport', 'Support horse'],
    active: true,
    featured: false,
    sortOrder: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function ToursSection() {
  const { t, locale } = useLanguage();
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  const displayedTours = showFavorites
    ? sampleTours.filter((tour) => favorites.has(tour.id))
    : sampleTours;

  return (
    <section id="tours" className="py-20 md:py-28" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#2C1810' }}
          >
            {t.tours.title}
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6 gold-gradient" />
          <p className="text-[#8B8680] text-lg">{t.tours.subtitle}</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Button
            onClick={() => setShowFavorites(false)}
            variant={showFavorites ? 'outline' : 'default'}
            className={`rounded-full px-6 flex items-center gap-2 transition-all ${
              !showFavorites
                ? 'btn-gold'
                : 'border-[#C8A97E]/30 text-[#8B8680] hover:text-[#C8A97E] hover:border-[#C8A97E]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {t.tours.allTours}
          </Button>
          <Button
            onClick={() => setShowFavorites(true)}
            variant={showFavorites ? 'default' : 'outline'}
            className={`rounded-full px-6 flex items-center gap-2 transition-all ${
              showFavorites
                ? 'btn-gold'
                : 'border-[#C8A97E]/30 text-[#8B8680] hover:text-[#C8A97E] hover:border-[#C8A97E]'
            }`}
          >
            <Heart className="w-4 h-4" />
            {t.tours.favorites}
            {favorites.size > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#0C0C14] text-white text-xs flex items-center justify-center">
                {favorites.size}
              </span>
            )}
          </Button>
        </div>

        {/* Tours Grid */}
        {displayedTours.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-[#E8D5B5] mx-auto mb-4" />
            <p className="text-[#8B8680] text-lg">
              {locale === 'es'
                ? 'Aún no tienes tours favoritos. Haz clic en el corazón para guardar tus tours preferidos.'
                : "You don't have favorite tours yet. Click the heart to save your preferred tours."}
            </p>
            <Button
              onClick={() => setShowFavorites(false)}
              className="btn-gold rounded-full px-6 mt-4"
            >
              {t.tours.allTours}
            </Button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {displayedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} locale={locale} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
