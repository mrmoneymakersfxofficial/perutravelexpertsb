// Comprehensive tour data for Intiquilla website
// Used by all tour-related pages as static data source

export interface ItineraryDay {
  day: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface TourData {
  id: string;
  slug: string;
  destination: string;
  image: string;
  gallery?: string[];
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  priceUSD: number;
  highSeasonPrice?: number;
  includesEs: string[];
  includesEn: string[];
  itineraryEs?: ItineraryDay[];
  itineraryEn?: ItineraryDay[];
  featured: boolean;
  active: boolean;
}

export interface DestinationData {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  image: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface CustomizedTourData {
  id: string;
  slug: string;
  image: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  priceUSD: number;
  destinations: string[];
  includesEs: string[];
  includesEn: string[];
  itineraryEs?: ItineraryDay[];
  itineraryEn?: ItineraryDay[];
}

export interface CommunityTourData {
  id: string;
  slug: string;
  image: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  priceUSD: number;
  includesEs: string[];
  includesEn: string[];
}

export interface ProjectData {
  id: string;
  slug: string;
  image: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
}

// ─── DESTINATIONS ────────────────────────────────────────────────

export const destinations: DestinationData[] = [
  {
    id: 'cusco',
    slug: 'cusco',
    nameEs: 'Cusco',
    nameEn: 'Cusco',
    image: '/tours/cusco-city.jpg',
    descriptionEs: 'La capital histórica del imperio Inca, con ruinas arqueológicas, arquitectura colonial y cultura viva.',
    descriptionEn: 'The historic capital of the Inca Empire, with archaeological ruins, colonial architecture, and living culture.',
  },
  {
    id: 'puno',
    slug: 'puno',
    nameEs: 'Puno',
    nameEn: 'Puno',
    image: '/tours/titikaka-lake.jpg',
    descriptionEs: 'Ciudad ribereña del Lago Titicaca, hogar de las islas flotantes de los Uros y comunidades ancestrales.',
    descriptionEn: 'Lakeside city of Lake Titicaca, home to the floating Uros islands and ancestral communities.',
  },
  {
    id: 'amazon',
    slug: 'amazon',
    nameEs: 'Amazonía',
    nameEn: 'Amazon',
    image: '/tours/amazon-jungle.jpg',
    descriptionEs: 'La selva amazónica peruana con biodiversidad única, ríos caudalosos y experiencias de inmersión cultural.',
    descriptionEn: 'The Peruvian Amazon rainforest with unique biodiversity, mighty rivers, and cultural immersion experiences.',
  },
  {
    id: 'arequipa',
    slug: 'arequipa',
    nameEs: 'Arequipa',
    nameEn: 'Arequipa',
    image: '/tours/arequipa-city.jpg',
    descriptionEs: 'La "Ciudad Blanca" con arquitectura sillar, el volcán Misti y el impresionante Cañón del Colca.',
    descriptionEn: 'The "White City" with sillar architecture, Misti volcano, and the impressive Colca Canyon.',
  },
  {
    id: 'lima-ica',
    slug: 'lima-ica',
    nameEs: 'Lima-Ica',
    nameEn: 'Lima-Ica',
    image: '/tours/lima-city.jpg',
    descriptionEs: 'Desde la capital costera hasta las dunas desérticas de Ica y la oasis de Huacachina.',
    descriptionEn: 'From the coastal capital to the desert dunes of Ica and the Huacachina oasis.',
  },
];

// ─── TOURS BY DESTINATION ─────────────────────────────────────────

export const tours: TourData[] = [
  // ── CUSCO (8 tours) ──
  {
    id: 'city-tour-cusco',
    slug: 'city-tour-cusco',
    destination: 'cusco',
    image: '/tours/cusco-city.jpg',
    gallery: ['/tours/cusco-city-2.jpg'],
    nameEs: 'City Tour Cusco Imperial',
    nameEn: 'Imperial Cusco City Tour',
    descriptionEs: 'Recorre los sitios arqueológicos más impresionantes del Cusco: Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay. Un recorrido completo por la historia inca y colonial de la ciudad imperial. Incluye entrada a todos los sitios y guía profesional bilingüe.',
    descriptionEn: 'Visit the most impressive archaeological sites of Cusco: Sacsayhuamán, Qenqo, Puka Pukara, and Tambomachay. A complete tour through the Inca and colonial history of the imperial city. Includes entrance to all sites and a professional bilingual guide.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 45,
    highSeasonPrice: 55,
    includesEs: ['Guía profesional bilingüe', 'Transporte turístico', 'Entradas a todos los sitios', 'Recogida de hotel'],
    includesEn: ['Professional bilingual guide', 'Tourist transport', 'Entrance to all sites', 'Hotel pickup'],
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Recorrido Arqueológico', titleEn: 'Archaeological Tour', descriptionEs: 'Inicio a las 13:30 con recogida de hotel. Visitamos la Catedral, Qoricancha, Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay.', descriptionEn: 'Start at 1:30 PM with hotel pickup. We visit the Cathedral, Qoricancha, Sacsayhuamán, Qenqo, Puka Pukara, and Tambomachay.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Archaeological Tour', titleEs: 'Recorrido Arqueológico', descriptionEn: 'Start at 1:30 PM with hotel pickup. We visit the Cathedral, Qoricancha, Sacsayhuamán, Qenqo, Puka Pukara, and Tambomachay.', descriptionEs: 'Inicio a las 13:30 con recogida de hotel. Visitamos la Catedral, Qoricancha, Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay.' },
    ],
  },
  {
    id: 'valle-sagrado',
    slug: 'valle-sagrado',
    destination: 'cusco',
    image: '/tours/sacred-valley.jpg',
    gallery: ['/tours/sacred-valley-2.jpg'],
    nameEs: 'Valle Sagrado Full Day',
    nameEn: 'Full Day Sacred Valley',
    descriptionEs: 'Un día completo explorando el hermoso Valle Sagrado de los Incas. Visita Pisac, Ollantaytambo, Chinchero y mercados artesanales con degustación de productos locales. Disfruta de un almuerzo turístico tradicional en el corazón del valle.',
    descriptionEn: 'A full day exploring the beautiful Sacred Valley of the Incas. Visit Pisac, Ollantaytambo, Chinchero, and artisan markets with local product tasting. Enjoy a traditional tourist lunch in the heart of the valley.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 65,
    highSeasonPrice: 75,
    includesEs: ['Guía bilingüe', 'Transporte privado', 'Almuerzo turístico', 'Entradas arqueológicas'],
    includesEn: ['Bilingual guide', 'Private transport', 'Tourist lunch', 'Archaeological entrances'],
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Valle Sagrado Completo', titleEn: 'Complete Sacred Valley', descriptionEs: 'Salida temprana hacia Pisac, mercado artesanal y ruinas. Luego Ollantaytambo para almorzar y visitar la fortaleza. Finalizamos en Chinchero.', descriptionEn: 'Early departure to Pisac, artisan market and ruins. Then Ollantaytambo for lunch and fortress visit. We finish in Chinchero.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Complete Sacred Valley', titleEs: 'Valle Sagrado Completo', descriptionEn: 'Early departure to Pisac, artisan market and ruins. Then Ollantaytambo for lunch and fortress visit. We finish in Chinchero.', descriptionEs: 'Salida temprana hacia Pisac, mercado artesanal y ruinas. Luego Ollantaytambo para almorzar y visitar la fortaleza. Finalizamos en Chinchero.' },
    ],
  },
  {
    id: 'machu-picchu',
    slug: 'machu-picchu',
    destination: 'cusco',
    image: '/tours/machu-picchu.jpg',
    gallery: ['/tours/machu-picchu-2.jpg'],
    nameEs: 'Machu Picchu VIP Experiencia',
    nameEn: 'Machu Picchu VIP Experience',
    descriptionEs: 'Vive la magia de Machu Picchu con un servicio exclusivo VIP. Incluye guía privado, tren de lujo Vistadome y entrada temprana para disfrutar de la ciudadela sin multitudes. Un tour de 2 días que incluye hospedaje en Aguas Calientes.',
    descriptionEn: 'Experience the magic of Machu Picchu with exclusive VIP service. Includes private guide, luxury Vistadome train, and early entry to enjoy the citadel without crowds. A 2-day tour that includes accommodation in Aguas Calientes.',
    duration: 2,
    difficulty: 'moderate',
    priceUSD: 350,
    highSeasonPrice: 420,
    includesEs: ['Guía privado bilingüe', 'Tren Vistadome ida y vuelta', 'Entrada a Machu Picchu', 'Bus de subida/bajada', 'Desayuno buffet', 'Noche de hospedaje'],
    includesEn: ['Private bilingual guide', 'Vistadome train round trip', 'Machu Picchu entrance', 'Bus up/down', 'Buffet breakfast', '1 night accommodation'],
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Viaje a Aguas Calientes', titleEn: 'Journey to Aguas Calientes', descriptionEs: 'Recogida temprana, tren Vistadome a Aguas Calientes. Tarde libre para explorar el pueblo y baños termales.', descriptionEn: 'Early pickup, Vistadome train to Aguas Calientes. Free afternoon to explore the town and hot springs.' },
      { day: 2, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Entrada temprana a Machu Picchu con guía privado de 3 horas. Tarde libre para explorar, luego tren de regreso a Cusco.', descriptionEn: 'Early entry to Machu Picchu with 3-hour private guide. Free afternoon to explore, then return train to Cusco.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Journey to Aguas Calientes', titleEs: 'Viaje a Aguas Calientes', descriptionEn: 'Early pickup, Vistadome train to Aguas Calientes. Free afternoon to explore the town and hot springs.', descriptionEs: 'Recogida temprana, tren Vistadome a Aguas Calientes. Tarde libre para explorar el pueblo y baños termales.' },
      { day: 2, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'Early entry to Machu Picchu with 3-hour private guide. Free afternoon to explore, then return train to Cusco.', descriptionEs: 'Entrada temprana a Machu Picchu con guía privado de 3 horas. Tarde libre para explorar, luego tren de regreso a Cusco.' },
    ],
  },
  {
    id: 'montana-colores',
    slug: 'montana-colores',
    destination: 'cusco',
    image: '/tours/rainbow-mountain.jpg',
    gallery: ['/tours/rainbow-mountain-2.jpg'],
    nameEs: 'Montaña de Colores',
    nameEn: 'Rainbow Mountain',
    descriptionEs: 'Descubre la espectacular Montaña de Colores (Vinicunca) a 5200 msnm. Un trekking único con vistas panorámicas de los colores naturales del nevado Ausangate. Ideal para aventureros que buscan una experiencia única en los Andes.',
    descriptionEn: 'Discover the spectacular Rainbow Mountain (Vinicunca) at 5200 masl. A unique trek with panoramic views of the natural colors of Mount Ausangate. Ideal for adventurers seeking a unique experience in the Andes.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 55,
    highSeasonPrice: 65,
    includesEs: ['Guía bilingüe', 'Desayuno', 'Almuerzo', 'Transporte ida/vuelta', 'Caballo de emergencia'],
    includesEn: ['Bilingual guide', 'Breakfast', 'Lunch', 'Round trip transport', 'Emergency horse'],
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Trekking a Vinicunca', titleEn: 'Trekking to Vinicunca', descriptionEs: 'Salida a las 4:00 AM. Llegada al punto de inicio del trek, caminata de 3 horas hasta la cima. Regreso por la tarde.', descriptionEn: 'Departure at 4:00 AM. Arrival at trek starting point, 3-hour hike to the summit. Return in the afternoon.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Trekking to Vinicunca', titleEs: 'Trekking a Vinicunca', descriptionEn: 'Departure at 4:00 AM. Arrival at trek starting point, 3-hour hike to the summit. Return in the afternoon.', descriptionEs: 'Salida a las 4:00 AM. Llegada al punto de inicio del trek, caminata de 3 horas hasta la cima. Regreso por la tarde.' },
    ],
  },
  {
    id: 'lake-humantay',
    slug: 'lake-humantay',
    destination: 'cusco',
    image: '/tours/humantay-lagoon.jpg',
    gallery: ['/tours/humantay-lagoon-2.jpg'],
    nameEs: 'Laguna de Humantay',
    nameEn: 'Humantay Lagoon Trek',
    descriptionEs: 'Una caminata moderada hasta la impresionante Laguna de Humantay, con aguas turquesa rodeada de nevados. Una experiencia espiritual en los Andes peruanos con desayuno y almuerzo incluidos.',
    descriptionEn: 'A moderate hike to the stunning Humantay Lagoon, with turquoise waters surrounded by snow-capped peaks. A spiritual experience in the Peruvian Andes with breakfast and lunch included.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 40,
    highSeasonPrice: 50,
    includesEs: ['Guía profesional', 'Desayuno', 'Almuerzo', 'Transporte', 'Caballo de apoyo'],
    includesEn: ['Professional guide', 'Breakfast', 'Lunch', 'Transport', 'Support horse'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Caminata a la Laguna', titleEn: 'Hike to the Lagoon', descriptionEs: 'Salida a las 4:30 AM hacia Soraypampa. Caminata de 1.5 horas hasta la laguna. Tiempo para fotografías y regreso.', descriptionEn: 'Departure at 4:30 AM to Soraypampa. 1.5-hour hike to the lagoon. Time for photos and return.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Hike to the Lagoon', titleEs: 'Caminata a la Laguna', descriptionEn: 'Departure at 4:30 AM to Soraypampa. 1.5-hour hike to the lagoon. Time for photos and return.', descriptionEs: 'Salida a las 4:30 AM hacia Soraypampa. Caminata de 1.5 horas hasta la laguna. Tiempo para fotografías y regreso.' },
    ],
  },
  {
    id: 'inka-trail-2d',
    slug: 'inka-trail-2d',
    destination: 'cusco',
    image: '/tours/inka-trail-2d.jpg',
    nameEs: 'Camino Inca 2 Días',
    nameEn: 'Inca Trail 2 Days',
    descriptionEs: 'El Camino Inca expresso. 2 días de trekking por el sendero inca clásico con campamento y llegada a Machu Picchu por la Puerta del Sol. Ideal para quienes buscan la experiencia del Camino Inca con poco tiempo disponible.',
    descriptionEn: 'The express Inca Trail. 2 days of trekking the classic Inca path with camping and arrival at Machu Picchu through the Sun Gate. Ideal for those seeking the Inca Trail experience with limited time.',
    duration: 2,
    difficulty: 'advanced',
    priceUSD: 450,
    highSeasonPrice: 520,
    includesEs: ['Guía experto', 'Porteador personal', 'Equipo de campamento', 'Comida completa', 'Entrada Machu Picchu', 'Tren de retorno'],
    includesEn: ['Expert guide', 'Personal porter', 'Camping equipment', 'Full meals', 'Machu Picchu entrance', 'Return train'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Km 82 a Wiñay Wayna', titleEn: 'Km 82 to Wiñay Wayna', descriptionEs: 'Inicio en Km 82, caminata por el valle del Urubamba visitando ruinas. Campamento en Wiñay Wayna.', descriptionEn: 'Start at Km 82, hike through the Urubamba valley visiting ruins. Camp at Wiñay Wayna.' },
      { day: 2, titleEs: 'Puerta del Sol y Machu Picchu', titleEn: 'Sun Gate and Machu Picchu', descriptionEs: 'Madrugada hacia Inti Punku para ver el amanecer sobre Machu Picchu. Tour guiado de 3 horas. Tren de retorno.', descriptionEn: 'Early morning to Inti Punku for sunrise over Machu Picchu. 3-hour guided tour. Return train.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Km 82 to Wiñay Wayna', titleEs: 'Km 82 a Wiñay Wayna', descriptionEn: 'Start at Km 82, hike through the Urubamba valley visiting ruins. Camp at Wiñay Wayna.', descriptionEs: 'Inicio en Km 82, caminata por el valle del Urubamba visitando ruinas. Campamento en Wiñay Wayna.' },
      { day: 2, titleEn: 'Sun Gate and Machu Picchu', titleEs: 'Puerta del Sol y Machu Picchu', descriptionEn: 'Early morning to Inti Punku for sunrise over Machu Picchu. 3-hour guided tour. Return train.', descriptionEs: 'Madrugada hacia Inti Punku para ver el amanecer sobre Machu Picchu. Tour guiado de 3 horas. Tren de retorno.' },
    ],
  },
  {
    id: 'inka-trail-4d',
    slug: 'inka-trail-4d',
    destination: 'cusco',
    image: '/tours/inca-trail.jpg',
    gallery: ['/tours/inca-trail-2.jpg'],
    nameEs: 'Camino Inca Clásico 4 Días',
    nameEn: 'Classic Inca Trail 4 Days',
    descriptionEs: 'La experiencia definitiva del Camino Inca. 4 días de trekking por el antiguo sendero inca cruzando pasos de montaña y ruinas ancestrales hasta llegar a Machu Picchu por la Puerta del Sol. Incluye porteadores, cocinero y equipo completo de campamento.',
    descriptionEn: 'The ultimate Inca Trail experience. 4 days of trekking along the ancient Inca path crossing mountain passes and ancestral ruins until reaching Machu Picchu through the Sun Gate. Includes porters, cook, and complete camping equipment.',
    duration: 4,
    difficulty: 'advanced',
    priceUSD: 850,
    highSeasonPrice: 980,
    includesEs: ['Guía experto', 'Porteadores y cocinero', 'Equipo de campamento', 'Comida completa 4 días', 'Entradas y permisos', 'Tren de retorno'],
    includesEn: ['Expert guide', 'Porters and cook', 'Camping equipment', 'Full meals 4 days', 'Entrances and permits', 'Return train'],
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Km 82 a Huayllabamba', titleEn: 'Km 82 to Huayllabamba', descriptionEs: 'Inicio del trek. Caminata suave por el valle del Urubamba hasta el campamento de Huayllabamba.', descriptionEn: 'Trek begins. Easy walk along the Urubamba valley to Huayllabamba camp.' },
      { day: 2, titleEs: 'Paso de la Mujer Muerta', titleEn: 'Dead Woman Pass', descriptionEs: 'El día más desafiante. Cruce del paso a 4215 msnm. Descenso al campamento de Pacaymayo.', descriptionEn: 'Most challenging day. Crossing the pass at 4215 masl. Descent to Pacaymayo camp.' },
      { day: 3, titleEs: 'Ruinas y Wiñay Wayna', titleEn: 'Ruins and Wiñay Wayna', descriptionEs: 'Visita a las ruinas de Sayacmarca, Phuyupatamarca y Wiñay Wayna. Último campamento cerca de Machu Picchu.', descriptionEn: 'Visit Sayacmarca, Phuyupatamarca, and Wiñay Wayna ruins. Last camp near Machu Picchu.' },
      { day: 4, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Amanecer en Inti Punku, llegada a Machu Picchu. Tour guiado completo y tiempo libre para explorar.', descriptionEn: 'Sunrise at Inti Punku, arrival at Machu Picchu. Complete guided tour and free time to explore.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Km 82 to Huayllabamba', titleEs: 'Km 82 a Huayllabamba', descriptionEn: 'Trek begins. Easy walk along the Urubamba valley to Huayllabamba camp.', descriptionEs: 'Inicio del trek. Caminata suave por el valle del Urubamba hasta el campamento de Huayllabamba.' },
      { day: 2, titleEn: 'Dead Woman Pass', titleEs: 'Paso de la Mujer Muerta', descriptionEn: 'Most challenging day. Crossing the pass at 4215 masl. Descent to Pacaymayo camp.', descriptionEs: 'El día más desafiante. Cruce del paso a 4215 msnm. Descenso al campamento de Pacaymayo.' },
      { day: 3, titleEn: 'Ruins and Wiñay Wayna', titleEs: 'Ruinas y Wiñay Wayna', descriptionEn: 'Visit Sayacmarca, Phuyupatamarca, and Wiñay Wayna ruins. Last camp near Machu Picchu.', descriptionEs: 'Visita a las ruinas de Sayacmarca, Phuyupatamarca y Wiñay Wayna. Último campamento cerca de Machu Picchu.' },
      { day: 4, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'Sunrise at Inti Punku, arrival at Machu Picchu. Complete guided tour and free time to explore.', descriptionEs: 'Amanecer en Inti Punku, llegada a Machu Picchu. Tour guiado completo y tiempo libre para explorar.' },
    ],
  },
  {
    id: 'inka-trail-5d',
    slug: 'inka-trail-5d',
    destination: 'cusco',
    image: '/tours/inka-trail-5d.jpg',
    nameEs: 'Camino Inca 5 Días',
    nameEn: 'Inca Trail 5 Days',
    descriptionEs: 'La versión extendida del Camino Inca. 5 días de trekking que incluye la visita al impresionante complejo de Choquequirao antes de unirse al Camino Inca clásico. Una aventura épica para viajeros experimentados.',
    descriptionEn: 'The extended version of the Inca Trail. 5 days of trekking that includes visiting the impressive Choquequirao complex before joining the classic Inca Trail. An epic adventure for experienced travelers.',
    duration: 5,
    difficulty: 'advanced',
    priceUSD: 1100,
    highSeasonPrice: 1250,
    includesEs: ['Guía experto', 'Porteadores y cocinero', 'Equipo de campamento premium', 'Comida completa 5 días', 'Entradas y permisos especiales', 'Tren de retorno'],
    includesEn: ['Expert guide', 'Porters and cook', 'Premium camping equipment', 'Full meals 5 days', 'Special entrances and permits', 'Return train'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Cusco a Cachora', titleEn: 'Cusco to Cachora', descriptionEs: 'Traslado a Cachora, inicio del descenso al cañón del Apurímac. Campamento en Santa Rosa.', descriptionEn: 'Transfer to Cachora, beginning descent into the Apurímac canyon. Camp at Santa Rosa.' },
      { day: 2, titleEs: 'Choquequirao', titleEn: 'Choquequirao', descriptionEs: 'Día completo explorando las ruinas de Choquequirao. Campamento en las afueras del sitio.', descriptionEn: 'Full day exploring Choquequirao ruins. Camp outside the site.' },
      { day: 3, titleEs: 'Hacia Yanama', titleEn: 'Towards Yanama', descriptionEs: 'Caminata hacia el paso de Yanama cruzando la cordillera. Vistas espectaculares del nevado Salkantay.', descriptionEn: 'Hike towards Yanama pass crossing the mountain range. Spectacular views of Salkantay peak.' },
      { day: 4, titleEs: 'Unión al Camino Inca', titleEn: 'Joining the Inca Trail', descriptionEs: 'Conexión con el Camino Inca clásico. Visita de ruinas y campamento en Wiñay Wayna.', descriptionEn: 'Connection with the classic Inca Trail. Ruin visits and camp at Wiñay Wayna.' },
      { day: 5, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Amanecer en la Puerta del Sol, tour completo de Machu Picchu. Tren de retorno a Cusco.', descriptionEn: 'Sunrise at the Sun Gate, complete Machu Picchu tour. Return train to Cusco.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Cusco to Cachora', titleEs: 'Cusco a Cachora', descriptionEn: 'Transfer to Cachora, beginning descent into the Apurímac canyon. Camp at Santa Rosa.', descriptionEs: 'Traslado a Cachora, inicio del descenso al cañón del Apurímac. Campamento en Santa Rosa.' },
      { day: 2, titleEn: 'Choquequirao', titleEs: 'Choquequirao', descriptionEn: 'Full day exploring Choquequirao ruins. Camp outside the site.', descriptionEs: 'Día completo explorando las ruinas de Choquequirao. Campamento en las afueras del sitio.' },
      { day: 3, titleEn: 'Towards Yanama', titleEs: 'Hacia Yanama', descriptionEn: 'Hike towards Yanama pass crossing the mountain range. Spectacular views of Salkantay peak.', descriptionEs: 'Caminata hacia el paso de Yanama cruzando la cordillera. Vistas espectaculares del nevado Salkantay.' },
      { day: 4, titleEn: 'Joining the Inca Trail', titleEs: 'Unión al Camino Inca', descriptionEn: 'Connection with the classic Inca Trail. Ruin visits and camp at Wiñay Wayna.', descriptionEs: 'Conexión con el Camino Inca clásico. Visita de ruinas y campamento en Wiñay Wayna.' },
      { day: 5, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'Sunrise at the Sun Gate, complete Machu Picchu tour. Return train to Cusco.', descriptionEs: 'Amanecer en la Puerta del Sol, tour completo de Machu Picchu. Tren de retorno a Cusco.' },
    ],
  },

  // ── PUNO (2 tours) ──
  {
    id: 'full-day-titikaka-lake',
    slug: 'full-day-titikaka-lake',
    destination: 'puno',
    image: '/tours/titikaka-lake.jpg',
    nameEs: 'Full Day Lago Titicaca',
    nameEn: 'Full Day Titicaca Lake',
    descriptionEs: 'Un día completo en las aguas sagradas del Lago Titicaca. Visita las famosas islas flotantes de los Uros hechas de totora, luego navega hacia la isla de Taquile para conocer su cultura textil ancestral.',
    descriptionEn: 'A full day on the sacred waters of Lake Titicaca. Visit the famous floating Uros islands made of reeds, then sail to Taquile Island to discover its ancestral textile culture.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 55,
    highSeasonPrice: 65,
    includesEs: ['Guía bilingüe', 'Transporte', 'Boleto de lancha', 'Almuerzo en Taquile'],
    includesEn: ['Bilingual guide', 'Transport', 'Boat ticket', 'Lunch on Taquile'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Islas Flotantes y Taquile', titleEn: 'Floating Islands and Taquile', descriptionEs: 'Salida a las 7:00 AM. Visita a las islas Uros, navegación a Taquile, almuerzo y regreso por la tarde.', descriptionEn: 'Departure at 7:00 AM. Visit Uros islands, sail to Taquile, lunch and return in the afternoon.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Floating Islands and Taquile', titleEs: 'Islas Flotantes y Taquile', descriptionEn: 'Departure at 7:00 AM. Visit Uros islands, sail to Taquile, lunch and return in the afternoon.', descriptionEs: 'Salida a las 7:00 AM. Visita a las islas Uros, navegación a Taquile, almuerzo y regreso por la tarde.' },
    ],
  },
  {
    id: 'home-stay-2d-1n',
    slug: 'home-stay-2d-1n',
    destination: 'puno',
    image: '/tours/titikaka-lake.jpg',
    nameEs: 'Home Stay 2D/1N',
    nameEn: 'Home Stay 2D/1N',
    descriptionEs: 'Una experiencia inmersiva viviendo con una familia local en la isla de Amantaní. Comparte sus costumbres, saborea su comida tradicional y contempla una de las puestas de sol más bellas del Lago Titicaca.',
    descriptionEn: 'An immersive experience living with a local family on Amantaní Island. Share their customs, taste their traditional food, and witness one of the most beautiful sunsets on Lake Titicaca.',
    duration: 2,
    difficulty: 'beginner',
    priceUSD: 85,
    highSeasonPrice: 95,
    includesEs: ['Guía bilingüe', 'Transporte', 'Alojamiento en familia', 'Comidas', 'Visita a Uros'],
    includesEn: ['Bilingual guide', 'Transport', 'Family homestay', 'Meals', 'Uros visit'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Uros y Amantaní', titleEn: 'Uros and Amantaní', descriptionEs: 'Visita a Uros por la mañana, navegación a Amantaní. Alojamiento con familia local y cena tradicional.', descriptionEn: 'Morning visit to Uros, sail to Amantaní. Homestay with local family and traditional dinner.' },
      { day: 2, titleEs: 'Taquile y Regreso', titleEn: 'Taquile and Return', descriptionEs: 'Desayuno con la familia, navegación a Taquile. Almuerzo y regreso a Puno por la tarde.', descriptionEn: 'Breakfast with the family, sail to Taquile. Lunch and return to Puno in the afternoon.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Uros and Amantaní', titleEs: 'Uros y Amantaní', descriptionEn: 'Morning visit to Uros, sail to Amantaní. Homestay with local family and traditional dinner.', descriptionEs: 'Visita a Uros por la mañana, navegación a Amantaní. Alojamiento con familia local y cena tradicional.' },
      { day: 2, titleEn: 'Taquile and Return', titleEs: 'Taquile y Regreso', descriptionEn: 'Breakfast with the family, sail to Taquile. Lunch and return to Puno in the afternoon.', descriptionEs: 'Desayuno con la familia, navegación a Taquile. Almuerzo y regreso a Puno por la tarde.' },
    ],
  },

  // ── AMAZON (2 tours) ──
  {
    id: 'amazon-3d-2n',
    slug: 'amazon-3d-2n',
    destination: 'amazon',
    image: '/tours/amazon-jungle.jpg',
    nameEs: 'Amazonía 3D/2N',
    nameEn: 'Amazon 3D/2N',
    descriptionEs: 'Adéntrate en la selva amazónica peruana con 3 días de aventura. Navega por ríos caudalosos, observa fauna silvestre, camina por senderos selváticos y vive la experiencia de dormir en un lodge en plena selva.',
    descriptionEn: 'Venture into the Peruvian Amazon with 3 days of adventure. Navigate mighty rivers, observe wildlife, walk jungle trails, and experience sleeping in a lodge deep in the rainforest.',
    duration: 3,
    difficulty: 'moderate',
    priceUSD: 380,
    highSeasonPrice: 420,
    includesEs: ['Guía naturalista', 'Alojamiento en lodge', 'Comidas completas', 'Transporte fluvial', 'Actividades guiadas'],
    includesEn: ['Naturalist guide', 'Lodge accommodation', 'Full meals', 'River transport', 'Guided activities'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Llegada a la Selva', titleEn: 'Arrival in the Jungle', descriptionEs: 'Recepción en Puerto Maldonado, navegación al lodge. Caminata nocturna para observar fauna.', descriptionEn: 'Reception in Puerto Maldonado, navigation to lodge. Night walk for wildlife observation.' },
      { day: 2, titleEs: 'Exploración Selvática', titleEn: 'Jungle Exploration', descriptionEs: 'Caminata matinal, visita al lago de cocodrilos, pesca piranha y excursion por canoé.', descriptionEn: 'Morning hike, visit to caiman lake, piranha fishing, and canoe excursion.' },
      { day: 3, titleEs: 'Regreso', titleEn: 'Return', descriptionEs: 'Amanecer en la selva, última caminata y regreso a Puerto Maldonado.', descriptionEn: 'Jungle sunrise, final hike and return to Puerto Maldonado.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Arrival in the Jungle', titleEs: 'Llegada a la Selva', descriptionEn: 'Reception in Puerto Maldonado, navigation to lodge. Night walk for wildlife observation.', descriptionEs: 'Recepción en Puerto Maldonado, navegación al lodge. Caminata nocturna para observar fauna.' },
      { day: 2, titleEn: 'Jungle Exploration', titleEs: 'Exploración Selvática', descriptionEn: 'Morning hike, visit to caiman lake, piranha fishing, and canoe excursion.', descriptionEs: 'Caminata matinal, visita al lago de cocodrilos, pesca piranha y excursion por canoé.' },
      { day: 3, titleEn: 'Return', titleEs: 'Regreso', descriptionEn: 'Jungle sunrise, final hike and return to Puerto Maldonado.', descriptionEs: 'Amanecer en la selva, última caminata y regreso a Puerto Maldonado.' },
    ],
  },
  {
    id: 'amazon-4d-3n',
    slug: 'amazon-4d-3n',
    destination: 'amazon',
    image: '/tours/amazon-homestay.jpg',
    nameEs: 'Amazonía 4D/3N',
    nameEn: 'Amazon 4D/3N',
    descriptionEs: 'La experiencia amazónica completa. 4 días de inmersión profunda en la selva con actividades de canopy, visita a comunidades indígenas, observación de aves exóticas y navegación por afluentes del Amazonas.',
    descriptionEn: 'The complete Amazon experience. 4 days of deep jungle immersion with canopy activities, indigenous community visits, exotic bird watching, and navigation through Amazon tributaries.',
    duration: 4,
    difficulty: 'moderate',
    priceUSD: 520,
    highSeasonPrice: 580,
    includesEs: ['Guía naturalista experto', 'Alojamiento premium', 'Comidas completas', 'Todas las excursiones', 'Visita a comunidad nativa'],
    includesEn: ['Expert naturalist guide', 'Premium accommodation', 'Full meals', 'All excursions', 'Native community visit'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Inmersión Amazónica', titleEn: 'Amazon Immersion', descriptionEs: 'Llegada, navegación profunda al lodge. Caminata nocturna y observación de estrellas.', descriptionEn: 'Arrival, deep navigation to lodge. Night walk and stargazing.' },
      { day: 2, titleEs: 'Fauna y Canopy', titleEn: 'Wildlife and Canopy', descriptionEs: 'Caminata al collpa de loros, canopy walk, pesca y kayak por el río.', descriptionEn: 'Hike to macaw clay lick, canopy walk, fishing and kayaking on the river.' },
      { day: 3, titleEs: 'Comunidad Nativa', titleEn: 'Native Community', descriptionEs: 'Visita a comunidad indígena, aprender sobre plantas medicinales y artesanías.', descriptionEn: 'Indigenous community visit, learn about medicinal plants and crafts.' },
      { day: 4, titleEs: 'Despedida de la Selva', titleEn: 'Jungle Farewell', descriptionEs: 'Última caminata al amanecer, regreso a Puerto Maldonado.', descriptionEn: 'Final sunrise hike, return to Puerto Maldonado.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Amazon Immersion', titleEs: 'Inmersión Amazónica', descriptionEn: 'Arrival, deep navigation to lodge. Night walk and stargazing.', descriptionEs: 'Llegada, navegación profunda al lodge. Caminata nocturna y observación de estrellas.' },
      { day: 2, titleEn: 'Wildlife and Canopy', titleEs: 'Fauna y Canopy', descriptionEn: 'Hike to macaw clay lick, canopy walk, fishing and kayaking on the river.', descriptionEs: 'Caminata al collpa de loros, canopy walk, pesca y kayak por el río.' },
      { day: 3, titleEn: 'Native Community', titleEs: 'Comunidad Nativa', descriptionEn: 'Indigenous community visit, learn about medicinal plants and crafts.', descriptionEs: 'Visita a comunidad indígena, aprender sobre plantas medicinales y artesanías.' },
      { day: 4, titleEn: 'Jungle Farewell', titleEs: 'Despedida de la Selva', descriptionEn: 'Final sunrise hike, return to Puerto Maldonado.', descriptionEs: 'Última caminata al amanecer, regreso a Puerto Maldonado.' },
    ],
  },

  // ── AREQUIPA (2 tours) ──
  {
    id: 'city-tour-arequipa',
    slug: 'city-tour-arequipa',
    destination: 'arequipa',
    image: '/tours/arequipa-city.jpg',
    nameEs: 'City Tour Arequipa',
    nameEn: 'City Tour Arequipa',
    descriptionEs: 'Descubre la "Ciudad Blanca" con su imponente arquitectura de sillar. Visita el Monasterio de Santa Catalina, la Plaza de Armas y el Mirador de Yanahuara con vistas al volcán Misti.',
    descriptionEn: 'Discover the "White City" with its imposing sillar architecture. Visit the Santa Catalina Monastery, the Plaza de Armas, and the Yanahuara viewpoint with views of the Misti volcano.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 35,
    highSeasonPrice: 45,
    includesEs: ['Guía profesional', 'Transporte', 'Entrada a Santa Catalina', 'Recogida de hotel'],
    includesEn: ['Professional guide', 'Transport', 'Santa Catalina entrance', 'Hotel pickup'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Recorrido Colonial', titleEn: 'Colonial Tour', descriptionEs: 'Visita al Monasterio de Santa Catalina, Plaza de Armas, mirador de Yanahuara y distrito tradicional.', descriptionEn: 'Visit Santa Catalina Monastery, Plaza de Armas, Yanahuara viewpoint, and traditional district.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Colonial Tour', titleEs: 'Recorrido Colonial', descriptionEn: 'Visit Santa Catalina Monastery, Plaza de Armas, Yanahuara viewpoint, and traditional district.', descriptionEs: 'Visita al Monasterio de Santa Catalina, Plaza de Armas, mirador de Yanahuara y distrito tradicional.' },
    ],
  },
  {
    id: 'colca-canyon-2d',
    slug: 'colca-canyon-2d',
    destination: 'arequipa',
    image: '/tours/colca-canyon.jpg',
    nameEs: 'Cañón del Colca 2D',
    nameEn: 'Colca Canyon 2D',
    descriptionEs: 'Explora el Cañón del Colca, más profundo que el Gran Cañón. Observa cóndores en vuelo en el Cruz del Cóndor, visita pueblos andinos tradicionales y relájate en termas naturales.',
    descriptionEn: 'Explore the Colca Canyon, deeper than the Grand Canyon. Watch condors in flight at Cruz del Cóndor, visit traditional Andean villages, and relax in natural hot springs.',
    duration: 2,
    difficulty: 'moderate',
    priceUSD: 95,
    highSeasonPrice: 110,
    includesEs: ['Guía bilingüe', 'Transporte', '1 noche de hospedaje', 'Desayuno', 'Entrada al cañón'],
    includesEn: ['Bilingual guide', 'Transport', '1 night accommodation', 'Breakfast', 'Canyon entrance'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Hacia el Colca', titleEn: 'Towards Colca', descriptionEs: 'Salida de Arequipa, paso por Pampas Cañahuas y vicuñas. Llegada a Chivay y baños termales.', descriptionEn: 'Departure from Arequipa, pass through Pampas Cañahuas and vicuñas. Arrive at Chivay and hot springs.' },
      { day: 2, titleEs: 'Cruz del Cóndor', titleEn: 'Cruz del Cóndor', descriptionEs: 'Observación de cóndores en la Cruz del Cóndor, visita a pueblos tradicionales, regreso a Arequipa.', descriptionEn: 'Condor watching at Cruz del Cóndor, visit traditional villages, return to Arequipa.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Towards Colca', titleEs: 'Hacia el Colca', descriptionEn: 'Departure from Arequipa, pass through Pampas Cañahuas and vicuñas. Arrive at Chivay and hot springs.', descriptionEs: 'Salida de Arequipa, paso por Pampas Cañahuas y vicuñas. Llegada a Chivay y baños termales.' },
      { day: 2, titleEn: 'Cruz del Cóndor', titleEs: 'Cruz del Cóndor', descriptionEn: 'Condor watching at Cruz del Cóndor, visit traditional villages, return to Arequipa.', descriptionEs: 'Observación de cóndores en la Cruz del Cóndor, visita a pueblos tradicionales, regreso a Arequipa.' },
    ],
  },

  // ── LIMA-ICA (2 tours) ──
  {
    id: 'ica-2d-1n',
    slug: 'ica-2d-1n',
    destination: 'lima-ica',
    image: '/tours/ica-desert.jpg',
    nameEs: 'ICA 2D/1N',
    nameEn: 'ICA 2D/1N',
    descriptionEs: 'Escápate a las dunas de Ica y la oasis de Huacachina. Disfruta de un paseo en buggy por las dunas, sandboard y una noche bajo las estrellas en el desierto costero peruano.',
    descriptionEn: 'Escape to the dunes of Ica and the Huacachina oasis. Enjoy a buggy ride through the dunes, sandboarding, and a night under the stars in the Peruvian coastal desert.',
    duration: 2,
    difficulty: 'beginner',
    priceUSD: 120,
    highSeasonPrice: 140,
    includesEs: ['Transporte Lima-Ica-Lima', 'Alojamiento 1 noche', 'Paseo en buggy', 'Sandboard', 'Visita bodegas'],
    includesEn: ['Transport Lima-Ica-Lima', '1 night accommodation', 'Buggy ride', 'Sandboard', 'Winery visit'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Lima a Ica', titleEn: 'Lima to Ica', descriptionEs: 'Salida de Lima, visita a bodegas de pisco. Tarde en Huacachina con buggy y sandboard.', descriptionEn: 'Departure from Lima, pisco winery visit. Afternoon in Huacachina with buggy and sandboard.' },
      { day: 2, titleEs: 'Desierto y Regreso', titleEn: 'Desert and Return', descriptionEs: 'Amanecer en el desierto, visita a las Líneas de Nazca (vuelo opcional), regreso a Lima.', descriptionEn: 'Desert sunrise, Nazca Lines visit (optional flight), return to Lima.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Lima to Ica', titleEs: 'Lima a Ica', descriptionEn: 'Departure from Lima, pisco winery visit. Afternoon in Huacachina with buggy and sandboard.', descriptionEs: 'Salida de Lima, visita a bodegas de pisco. Tarde en Huacachina con buggy y sandboard.' },
      { day: 2, titleEn: 'Desert and Return', titleEs: 'Desierto y Regreso', descriptionEn: 'Desert sunrise, Nazca Lines visit (optional flight), return to Lima.', descriptionEs: 'Amanecer en el desierto, visita a las Líneas de Nazca (vuelo opcional), regreso a Lima.' },
    ],
  },
  {
    id: 'ica-3d-2n',
    slug: 'ica-3d-2n',
    destination: 'lima-ica',
    image: '/tours/ica-desert.jpg',
    nameEs: 'ICA 3D/2N',
    nameEn: 'ICA 3D/2N',
    descriptionEs: 'La experiencia completa del sur costero. 3 días que incluyen la oasis de Huacachina, las misteriosas Líneas de Nazca, la Reserva de Paracas y las Islas Ballestas con su rica fauna marina.',
    descriptionEn: 'The complete southern coast experience. 3 days including the Huacachina oasis, mysterious Nazca Lines, Paracas Reserve, and the Ballestas Islands with their rich marine wildlife.',
    duration: 3,
    difficulty: 'beginner',
    priceUSD: 180,
    highSeasonPrice: 210,
    includesEs: ['Transporte completo', '2 noches de hospedaje', 'Buggy y sandboard', 'Vuelo sobre Nazca', 'Tour Islas Ballestas'],
    includesEn: ['Full transport', '2 nights accommodation', 'Buggy and sandboard', 'Nazca overflight', 'Ballestas Islands tour'],
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Paracas', titleEn: 'Paracas', descriptionEs: 'Llegada a Paracas, tour a las Islas Ballestas. Tarde en la Reserva Nacional de Paracas.', descriptionEn: 'Arrival in Paracas, tour to Ballestas Islands. Afternoon at Paracas National Reserve.' },
      { day: 2, titleEs: 'Nazca y Huacachina', titleEn: 'Nazca and Huacachina', descriptionEs: 'Vuelo sobre las Líneas de Nazca. Tarde en Huacachina con buggy y sandboard.', descriptionEn: 'Nazca Lines overflight. Afternoon in Huacachina with buggy and sandboard.' },
      { day: 3, titleEs: 'Bodegas y Regreso', titleEn: 'Winery and Return', descriptionEs: 'Visita a bodegas de pisco y vino. Regreso a Lima por la tarde.', descriptionEn: 'Pisco and wine winery visit. Return to Lima in the afternoon.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Paracas', titleEs: 'Paracas', descriptionEn: 'Arrival in Paracas, tour to Ballestas Islands. Afternoon at Paracas National Reserve.', descriptionEs: 'Llegada a Paracas, tour a las Islas Ballestas. Tarde en la Reserva Nacional de Paracas.' },
      { day: 2, titleEn: 'Nazca and Huacachina', titleEs: 'Nazca y Huacachina', descriptionEn: 'Nazca Lines overflight. Afternoon in Huacachina with buggy and sandboard.', descriptionEs: 'Vuelo sobre las Líneas de Nazca. Tarde en Huacachina con buggy y sandboard.' },
      { day: 3, titleEn: 'Winery and Return', titleEs: 'Bodegas y Regreso', descriptionEn: 'Pisco and wine winery visit. Return to Lima in the afternoon.', descriptionEs: 'Visita a bodegas de pisco y vino. Regreso a Lima por la tarde.' },
    ],
  },
];

// ─── CUSTOMIZED TOURS ─────────────────────────────────────────────

export const customizedTours: CustomizedTourData[] = [
  {
    id: 'cusco-lima',
    slug: 'cusco-lima',
    image: '/tours/cusco-lima-package.jpg',
    nameEs: 'Paquete Cusco a Lima',
    nameEn: 'Cusco to Lima Package',
    descriptionEs: 'La combinación perfecta: desde las alturas andinas del Cusco y Machu Picchu hasta las costas vibrantes de Lima. Incluye los principales atractivos de ambas ciudades con transporte y hospedaje incluidos.',
    descriptionEn: 'The perfect combination: from the Andean heights of Cusco and Machu Picchu to the vibrant coasts of Lima. Includes the main attractions of both cities with transport and accommodation.',
    duration: 7,
    priceUSD: 1200,
    destinations: ['cusco', 'lima-ica'],
    includesEs: ['Transporte interno completo', '6 noches de hospedaje', 'Tours guiados', 'Entradas a atracciones', 'Almuerzos turísticos'],
    includesEn: ['Full internal transport', '6 nights accommodation', 'Guided tours', 'Attraction entrances', 'Tourist lunches'],
    itineraryEs: [
      { day: 1, titleEs: 'Llegada a Cusco', titleEn: 'Arrival in Cusco', descriptionEs: 'Recepción en aeropuerto, city tour por la tarde.', descriptionEn: 'Airport reception, afternoon city tour.' },
      { day: 2, titleEs: 'Valle Sagrado', titleEn: 'Sacred Valley', descriptionEs: 'Full day tour por el Valle Sagrado de los Incas.', descriptionEn: 'Full day Sacred Valley of the Incas tour.' },
      { day: 3, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Viaje en tren a Machu Picchu, tour guiado, regreso a Cusco.', descriptionEn: 'Train journey to Machu Picchu, guided tour, return to Cusco.' },
      { day: 4, titleEs: 'Montaña de Colores', titleEn: 'Rainbow Mountain', descriptionEs: 'Excursión a la Montaña de Colores.', descriptionEn: 'Rainbow Mountain excursion.' },
      { day: 5, titleEs: 'Vuelo a Lima', titleEn: 'Flight to Lima', descriptionEs: 'Vuelo a Lima, city tour por la tarde.', descriptionEn: 'Flight to Lima, afternoon city tour.' },
      { day: 6, titleEs: 'Lima Gastronómica', titleEn: 'Gastronomic Lima', descriptionEs: 'Tour gastronómico, Miraflores y Barranco.', descriptionEn: 'Gastronomic tour, Miraflores and Barranco.' },
      { day: 7, titleEs: 'Regreso', titleEn: 'Return', descriptionEs: 'Día libre para compras y traslado al aeropuerto.', descriptionEn: 'Free day for shopping and airport transfer.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Arrival in Cusco', titleEs: 'Llegada a Cusco', descriptionEn: 'Airport reception, afternoon city tour.', descriptionEs: 'Recepción en aeropuerto, city tour por la tarde.' },
      { day: 2, titleEn: 'Sacred Valley', titleEs: 'Valle Sagrado', descriptionEn: 'Full day Sacred Valley of the Incas tour.', descriptionEs: 'Full day tour por el Valle Sagrado de los Incas.' },
      { day: 3, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'Train journey to Machu Picchu, guided tour, return to Cusco.', descriptionEs: 'Viaje en tren a Machu Picchu, tour guiado, regreso a Cusco.' },
      { day: 4, titleEn: 'Rainbow Mountain', titleEs: 'Montaña de Colores', descriptionEn: 'Rainbow Mountain excursion.', descriptionEs: 'Excursión a la Montaña de Colores.' },
      { day: 5, titleEn: 'Flight to Lima', titleEs: 'Vuelo a Lima', descriptionEn: 'Flight to Lima, afternoon city tour.', descriptionEs: 'Vuelo a Lima, city tour por la tarde.' },
      { day: 6, titleEn: 'Gastronomic Lima', titleEs: 'Lima Gastronómica', descriptionEn: 'Gastronomic tour, Miraflores and Barranco.', descriptionEs: 'Tour gastronómico, Miraflores y Barranco.' },
      { day: 7, titleEn: 'Return', titleEs: 'Regreso', descriptionEn: 'Free day for shopping and airport transfer.', descriptionEs: 'Día libre para compras y traslado al aeropuerto.' },
    ],
  },
  {
    id: 'cusco-puno',
    slug: 'cusco-puno',
    image: '/tours/titikaka-lake.jpg',
    nameEs: 'Paquete Cusco a Puno',
    nameEn: 'Cusco to Puno Package',
    descriptionEs: 'Conecta las dos joyas del altiplano: Cusco y Puno. Viaje por la ruta del Sol con paradas en Andahuaylillas, Raqchi y Pukara, culminando en las aguas místicas del Lago Titicaca.',
    descriptionEn: 'Connect the two jewels of the altiplano: Cusco and Puno. Travel the Sun Route with stops in Andahuaylillas, Raqchi, and Pukara, culminating in the mystical waters of Lake Titicaca.',
    duration: 5,
    priceUSD: 650,
    destinations: ['cusco', 'puno'],
    includesEs: ['Transporte turístico', '4 noches de hospedaje', 'Tours guiados', 'Entradas', 'Almuerzos'],
    includesEn: ['Tourist transport', '4 nights accommodation', 'Guided tours', 'Entrances', 'Lunches'],
    itineraryEs: [
      { day: 1, titleEs: 'Cusco', titleEn: 'Cusco', descriptionEs: 'City tour por Cusco y sitios arqueológicos.', descriptionEn: 'Cusco city tour and archaeological sites.' },
      { day: 2, titleEs: 'Valle Sagrado', titleEn: 'Sacred Valley', descriptionEs: 'Full day por el Valle Sagrado.', descriptionEn: 'Full day Sacred Valley.' },
      { day: 3, titleEs: 'Ruta del Sol', titleEn: 'Sun Route', descriptionEs: 'Viaje Cusco-Puno por la ruta del Sol con paradas en Andahuaylillas y Raqchi.', descriptionEn: 'Cusco-Puno journey via Sun Route with stops at Andahuaylillas and Raqchi.' },
      { day: 4, titleEs: 'Lago Titicaca', titleEn: 'Lake Titicaca', descriptionEs: 'Full Day en el Lago Titicaca, islas Uros y Taquile.', descriptionEn: 'Full Day on Lake Titicaca, Uros and Taquile islands.' },
      { day: 5, titleEs: 'Regreso', titleEn: 'Return', descriptionEs: 'Traslado al aeropuerto o terminal de bus.', descriptionEn: 'Transfer to airport or bus terminal.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Cusco', titleEs: 'Cusco', descriptionEn: 'Cusco city tour and archaeological sites.', descriptionEs: 'City tour por Cusco y sitios arqueológicos.' },
      { day: 2, titleEn: 'Sacred Valley', titleEs: 'Valle Sagrado', descriptionEn: 'Full day Sacred Valley.', descriptionEs: 'Full day por el Valle Sagrado.' },
      { day: 3, titleEn: 'Sun Route', titleEs: 'Ruta del Sol', descriptionEn: 'Cusco-Puno journey via Sun Route with stops at Andahuaylillas and Raqchi.', descriptionEs: 'Viaje Cusco-Puno por la ruta del Sol con paradas en Andahuaylillas y Raqchi.' },
      { day: 4, titleEn: 'Lake Titicaca', titleEs: 'Lago Titicaca', descriptionEn: 'Full Day on Lake Titicaca, Uros and Taquile islands.', descriptionEs: 'Full Day en el Lago Titicaca, islas Uros y Taquile.' },
      { day: 5, titleEn: 'Return', titleEs: 'Regreso', descriptionEn: 'Transfer to airport or bus terminal.', descriptionEs: 'Traslado al aeropuerto o terminal de bus.' },
    ],
  },
  {
    id: 'cusco-arequipa',
    slug: 'cusco-arequipa',
    image: '/tours/arequipa-city.jpg',
    nameEs: 'Paquete Cusco a Arequipa',
    nameEn: 'Cusco to Arequipa Package',
    descriptionEs: 'Desde el corazón inca hasta la Ciudad Blanca. Incluye los mejores tours de Cusco, el impresionante viaje por los Andes, y la magia del Cañón del Colca en Arequipa.',
    descriptionEn: 'From the Inca heartland to the White City. Includes the best tours of Cusco, the stunning journey through the Andes, and the magic of the Colca Canyon in Arequipa.',
    duration: 6,
    priceUSD: 800,
    destinations: ['cusco', 'arequipa'],
    includesEs: ['Transporte terrestre/aéreo', '5 noches de hospedaje', 'Guías bilingües', 'Entradas', 'Alimentación parcial'],
    includesEn: ['Land/air transport', '5 nights accommodation', 'Bilingual guides', 'Entrances', 'Partial meals'],
    itineraryEs: [
      { day: 1, titleEs: 'Cusco Imperial', titleEn: 'Imperial Cusco', descriptionEs: 'City tour y sitios arqueológicos de Cusco.', descriptionEn: 'Cusco city tour and archaeological sites.' },
      { day: 2, titleEs: 'Valle Sagrado', titleEn: 'Sacred Valley', descriptionEs: 'Full day en el Valle Sagrado.', descriptionEn: 'Full day in the Sacred Valley.' },
      { day: 3, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Viaje a Machu Picchu en tren VIP.', descriptionEn: 'VIP train journey to Machu Picchu.' },
      { day: 4, titleEs: 'Travesía Andina', titleEn: 'Andean Crossing', descriptionEs: 'Viaje Cusco a Arequipa con vistas panorámicas.', descriptionEn: 'Cusco to Arequipa journey with panoramic views.' },
      { day: 5, titleEs: 'Cañón del Colca', titleEn: 'Colca Canyon', descriptionEs: 'Full day al Cañón del Colca, Cruz del Cóndor.', descriptionEn: 'Full day to Colca Canyon, Cruz del Cóndor.' },
      { day: 6, titleEs: 'Arequipa y Despedida', titleEn: 'Arequipa and Farewell', descriptionEs: 'City tour de Arequipa y traslado al aeropuerto.', descriptionEn: 'Arequipa city tour and airport transfer.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Imperial Cusco', titleEs: 'Cusco Imperial', descriptionEn: 'Cusco city tour and archaeological sites.', descriptionEs: 'City tour y sitios arqueológicos de Cusco.' },
      { day: 2, titleEn: 'Sacred Valley', titleEs: 'Valle Sagrado', descriptionEn: 'Full day in the Sacred Valley.', descriptionEs: 'Full day en el Valle Sagrado.' },
      { day: 3, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'VIP train journey to Machu Picchu.', descriptionEs: 'Viaje a Machu Picchu en tren VIP.' },
      { day: 4, titleEn: 'Andean Crossing', titleEs: 'Travesía Andina', descriptionEn: 'Cusco to Arequipa journey with panoramic views.', descriptionEs: 'Viaje Cusco a Arequipa con vistas panorámicas.' },
      { day: 5, titleEn: 'Colca Canyon', titleEs: 'Cañón del Colca', descriptionEn: 'Full day to Colca Canyon, Cruz del Cóndor.', descriptionEs: 'Full day al Cañón del Colca, Cruz del Cóndor.' },
      { day: 6, titleEn: 'Arequipa and Farewell', titleEs: 'Arequipa y Despedida', descriptionEn: 'Arequipa city tour and airport transfer.', descriptionEs: 'City tour de Arequipa y traslado al aeropuerto.' },
    ],
  },
  {
    id: 'cusco-amazon',
    slug: 'cusco-amazon',
    image: '/tours/amazon-jungle.jpg',
    nameEs: 'Paquete Cusco a Amazonía',
    nameEn: 'Cusco to Amazon Package',
    descriptionEs: 'Lo mejor de dos mundos: los Andes y la selva. Comienza con los tours imperiales del Cusco y culmina con una inmersión profunda en la selva amazónica peruana. Aventura y biodiversidad en un solo paquete.',
    descriptionEn: 'The best of two worlds: the Andes and the jungle. Begin with imperial Cusco tours and culminate with deep immersion in the Peruvian Amazon. Adventure and biodiversity in one package.',
    duration: 6,
    priceUSD: 900,
    destinations: ['cusco', 'amazon'],
    includesEs: ['Transporte completo', '5 noches de hospedaje', 'Guías especializados', 'Entradas', 'Alimentación completa en selva'],
    includesEn: ['Full transport', '5 nights accommodation', 'Specialized guides', 'Entrances', 'Full meals in jungle'],
    itineraryEs: [
      { day: 1, titleEs: 'Cusco', titleEn: 'Cusco', descriptionEs: 'City tour imperial de Cusco.', descriptionEn: 'Imperial Cusco city tour.' },
      { day: 2, titleEs: 'Valle Sagrado', titleEn: 'Sacred Valley', descriptionEs: 'Full day en el Valle Sagrado de los Incas.', descriptionEn: 'Full day in the Sacred Valley of the Incas.' },
      { day: 3, titleEs: 'Machu Picchu', titleEn: 'Machu Picchu', descriptionEs: 'Experiencia VIP en Machu Picchu.', descriptionEn: 'VIP Machu Picchu experience.' },
      { day: 4, titleEs: 'Vuelo a la Amazonía', titleEn: 'Flight to the Amazon', descriptionEs: 'Vuelo Cusco-Puerto Maldonado, navegación al lodge.', descriptionEn: 'Cusco-Puerto Maldonado flight, navigation to lodge.' },
      { day: 5, titleEs: 'Inmersión Selvática', titleEn: 'Jungle Immersion', descriptionEs: 'Actividades completas en la selva: canopy, pesca, caminatas.', descriptionEn: 'Full jungle activities: canopy, fishing, hikes.' },
      { day: 6, titleEs: 'Regreso', titleEn: 'Return', descriptionEs: 'Última caminata y vuelo de regreso.', descriptionEn: 'Final hike and return flight.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Cusco', titleEs: 'Cusco', descriptionEn: 'Imperial Cusco city tour.', descriptionEs: 'City tour imperial de Cusco.' },
      { day: 2, titleEn: 'Sacred Valley', titleEs: 'Valle Sagrado', descriptionEn: 'Full day in the Sacred Valley of the Incas.', descriptionEs: 'Full day en el Valle Sagrado de los Incas.' },
      { day: 3, titleEn: 'Machu Picchu', titleEs: 'Machu Picchu', descriptionEn: 'VIP Machu Picchu experience.', descriptionEs: 'Experiencia VIP en Machu Picchu.' },
      { day: 4, titleEn: 'Flight to the Amazon', titleEs: 'Vuelo a la Amazonía', descriptionEn: 'Cusco-Puerto Maldonado flight, navigation to lodge.', descriptionEs: 'Vuelo Cusco-Puerto Maldonado, navegación al lodge.' },
      { day: 5, titleEn: 'Jungle Immersion', titleEs: 'Inmersión Selvática', descriptionEn: 'Full jungle activities: canopy, fishing, hikes.', descriptionEs: 'Actividades completas en la selva: canopy, pesca, caminatas.' },
      { day: 6, titleEn: 'Return', titleEs: 'Regreso', descriptionEn: 'Final hike and return flight.', descriptionEs: 'Última caminata y vuelo de regreso.' },
    ],
  },
];

// ─── COMMUNITY TOURS ──────────────────────────────────────────────

export const communityTours: CommunityTourData[] = [
  {
    id: 'ama',
    slug: 'ama',
    image: '/tours/andean-community.jpg',
    nameEs: 'Tour Comunitario AMA',
    nameEn: 'AMA Community Tour',
    descriptionEs: 'Experiencia auténtica en la comunidad de AMA. Aprende técnicas ancestrales de tejido, participa en ceremonias tradicionales y comparte una comida con familias quechuas. Un turismo responsable que beneficia directamente a la comunidad.',
    descriptionEn: 'Authentic experience in the AMA community. Learn ancestral weaving techniques, participate in traditional ceremonies, and share a meal with Quechua families. Responsible tourism that directly benefits the community.',
    duration: 1,
    priceUSD: 50,
    includesEs: ['Guía comunitario', 'Taller de tejido', 'Almuerzo tradicional', 'Ceremonia de bienvenida', 'Transporte'],
    includesEn: ['Community guide', 'Weaving workshop', 'Traditional lunch', 'Welcome ceremony', 'Transport'],
  },
  {
    id: 'ocutuan-community',
    slug: 'ocutuan-community',
    image: '/tours/andean-community.jpg',
    nameEs: 'Tour Comunitario Ocutuan',
    nameEn: 'Ocutuan Community Tour',
    descriptionEs: 'Descubre la comunidad de Ocutuan en los altos Andes. Camina por senderos ancestrales, visita terrazas agrícolas incaicas y participa en la siembra o cosecha según la temporada. Una conexión directa con la tierra y sus guardianes.',
    descriptionEn: 'Discover the Ocutuan community in the high Andes. Walk ancestral trails, visit Inca agricultural terraces, and participate in sowing or harvesting according to the season. A direct connection with the land and its guardians.',
    duration: 1,
    priceUSD: 45,
    includesEs: ['Guía comunitario', 'Caminata ancestral', 'Experiencia agrícola', 'Almuerzo andino', 'Transporte'],
    includesEn: ['Community guide', 'Ancestral hike', 'Agricultural experience', 'Andean lunch', 'Transport'],
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────

export const projects: ProjectData[] = [
  {
    id: 'ama',
    slug: 'ama',
    image: '/tours/andean-community.jpg',
    nameEs: 'Proyecto AMA - Tejedores Andinos',
    nameEn: 'AMA Project - Andean Weavers',
    descriptionEs: 'El proyecto AMA busca preservar las técnicas ancestrales de tejido de la comunidad andina. Cada tour realizado aporta directamente a la educación de los niños y al mantenimiento de las escuelas locales. Apoyamos la economía circular de la comunidad mediante la venta de textiles artesanales.',
    descriptionEn: 'The AMA project seeks to preserve ancestral weaving techniques of the Andean community. Each tour conducted contributes directly to children\'s education and maintenance of local schools. We support the community\'s circular economy through the sale of artisanal textiles.',
  },
  {
    id: 'ocutuan-community',
    slug: 'ocutuan-community',
    image: '/tours/andean-community.jpg',
    nameEs: 'Proyecto Ocutuan - Guardianes de la Tierra',
    nameEn: 'Ocutuan Project - Guardians of the Land',
    descriptionEs: 'Ocutuan es una comunidad dedicada a la agricultura sostenible y la preservación de las terrazas incaicas. El proyecto financia programas de reforestación, capacitación agrícola y la construcción de infraestructura de riego para las familias locales.',
    descriptionEn: 'Ocutuan is a community dedicated to sustainable agriculture and the preservation of Inca terraces. The project funds reforestation programs, agricultural training, and the construction of irrigation infrastructure for local families.',
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────

export function getToursByDestination(destination: string): TourData[] {
  return tours.filter(t => t.destination === destination && t.active);
}

export function getTourBySlug(slug: string): TourData | undefined {
  return tours.find(t => t.slug === slug && t.active);
}

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getCustomizedTourBySlug(slug: string): CustomizedTourData | undefined {
  return customizedTours.find(ct => ct.slug === slug);
}

export function getCommunityTourBySlug(slug: string): CommunityTourData | undefined {
  return communityTours.find(ct => ct.slug === slug);
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug);
}

export function getFeaturedTours(): TourData[] {
  return tours.filter(t => t.featured && t.active);
}

export function getRelatedTours(tourId: string, destination: string, limit = 3): TourData[] {
  return tours.filter(t => t.destination === destination && t.id !== tourId && t.active).slice(0, limit);
}

// Convert TourData to TourView for compatibility with existing TourCard/BookingModal
export function tourToView(tour: TourData): import('@/lib/types').TourView {
  return {
    id: tour.id,
    slug: tour.slug,
    image: tour.image,
    gallery: tour.gallery || [],
    nameEs: tour.nameEs,
    nameEn: tour.nameEn,
    descriptionEs: tour.descriptionEs,
    descriptionEn: tour.descriptionEn,
    duration: tour.duration,
    difficulty: tour.difficulty,
    priceUSD: tour.priceUSD,
    highSeasonPrice: tour.highSeasonPrice || null,
    includesEs: tour.includesEs,
    includesEn: tour.includesEn,
    active: tour.active,
    featured: tour.featured,
    sortOrder: 0,
  };
}
