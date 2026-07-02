// Comprehensive tour data for PeruTravelExpertsB website
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
  subtitleEs?: string;
  subtitleEn?: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  priceUSD: number;
  highSeasonPrice?: number;
  includesEs: string[];
  includesEn: string[];
  excludesEs?: string[];
  excludesEn?: string[];
  highlightsEs?: string[];
  highlightsEn?: string[];
  whatToBringEs?: string;
  whatToBringEn?: string;
  itineraryEs?: ItineraryDay[];
  itineraryEn?: ItineraryDay[];
  pricingNoteEs?: string;
  pricingNoteEn?: string;
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
    gallery: ['/tours/cusco-city-2.jpg', '/tours/cusco-city-3.jpg', '/tours/cusco-city-4.jpg', '/tours/cusco-city-5.jpg'],
    nameEs: 'City Tour Cusco',
    nameEn: 'City Tour Cusco',
    subtitleEs: 'Descubre el Corazón del Imperio Inca',
    subtitleEn: 'Discover the Heart of the Inca Empire',
    descriptionEs: 'Experimenta la fascinante historia, cultura y tradiciones vivas de Cusco, la antigua capital del Imperio Inca y uno de los destinos más cautivadores de Sudamérica. Este tour guiado de medio día te lleva más allá del centro de la ciudad para explorar algunos de los sitios arqueológicos inca más notables mientras te sumerges en la rica cultura andina que sigue vigente hoy en día. Tu aventura comienza con una recogida conveniente desde tu hotel en Cusco. Nuestra primera parada es Puka Pukara, conocida como la \"Fortaleza Roja,\" un importante punto de control militar y administrativo inca que una vez custodió la entrada a la ciudad sagrada de Qosqo. Luego, visitamos un Centro Textil Andino tradicional, donde tendrás la oportunidad de conocer y alimentar llamas y alpacas mientras aprendes sobre las antiguas técnicas de tejido que se han transmitido por generaciones. También verás la elegante vicuña, uno de los animales más preciados y protegidos del mundo. Continuamos hacia Qenqo, un misterioso santuario ceremonial tallado en formaciones naturales de piedra caliza. Este sitio sagrado fue utilizado por los incas para rituales religiosos, ceremonias y prácticas de momificación, ofreciendo una visión fascinante de su mundo espiritual. El punto culminante del tour es la impresionante fortaleza de Sacsayhuamán, uno de los mayores logros arquitectónicos de la civilización inca. Maravíllate con los enormes muros de piedra, algunos que pesan más de 100 toneladas, perfectamente ensamblados sin mortero. Al caminar por sus terrazas y miradores, disfrutarás de vistas panorámicas impresionantes de Cusco y comprenderás mejor la ingeniosidad del pueblo inca.',
    descriptionEn: 'Experience the fascinating history, culture, and living traditions of Cusco, the ancient capital of the Inca Empire and one of South America\'s most captivating destinations. This half-day guided tour takes you beyond the city center to explore some of the most remarkable Inca archaeological sites while immersing yourself in the rich Andean culture that continues to thrive today. Your adventure begins with a convenient pickup from your hotel in Cusco. Our first stop is Puka Pukara, known as the "Red Fortress," an important Inca military and administrative checkpoint that once guarded the entrance to the sacred city of Qosqo. Next, we visit a traditional Andean Textile Center, where you will have the opportunity to meet and feed llamas and alpacas while learning about the ancient weaving techniques that have been passed down through generations. You will also see the elegant vicuña, one of the world\'s most prized and protected animals. We then continue to Qenqo, a mysterious ceremonial sanctuary carved into natural limestone formations. This sacred site was used by the Incas for religious rituals, ceremonies, and mummification practices, offering a fascinating glimpse into their spiritual world. The highlight of the tour is the impressive fortress of Sacsayhuamán, one of the greatest architectural achievements of the Inca civilization. Marvel at the enormous stone walls, some weighing more than 100 tons, perfectly fitted together without mortar. As you walk through its terraces and viewpoints, you will enjoy breathtaking panoramic views of Cusco and gain a deeper understanding of the ingenuity of the Inca people.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 69,
    includesEs: ['Recogida y dejada en su hotel en Cusco', 'Tour Privado', 'Guía profesional de habla inglesa', 'Entrada a los lugares indicados en el itinerario'],
    includesEn: ['Pick-up and drop-off at your hotel in Cusco', 'Private Tour', 'English-speaking professional Tour Guide', 'Entrance fee to places indicated on the itinerary'],
    excludesEs: ['Hotel en Cusco', 'Gastos personales y cualquier cosa fuera del programa', 'Comidas: Desayuno, Almuerzo y Cena', 'Propinas para el Guía y el Conductor'],
    excludesEn: ['Hotel in Cusco', 'Personal expenses and anything other than what is on the program', 'Meals: Breakfast, Lunch and Dinner', 'Gratuities for the Tour Guide and Driver'],
    highlightsEs: ['Explore sitios arqueológicos inca icónicos con un guía local experto', 'Aprenda sobre la cultura y tradiciones andinas auténticas', 'Conozca llamas, alpacas y vicuñas de cerca', 'Disfrute de vistas espectaculares sobre Cusco', 'Introducción perfecta a la historia del Imperio Inca antes de visitar Machu Picchu'],
    highlightsEn: ['Explore iconic Inca archaeological sites with an expert local guide', 'Learn about authentic Andean culture and traditions', 'Meet llamas, alpacas, and vicuñas up close', 'Enjoy spectacular views over Cusco', 'Perfect introduction to the history of the Inca Empire before visiting Machu Picchu'],
    whatToBringEs: 'Zapatos cómodos para caminar, protección solar o ponchos de lluvia dependiendo de la temporada, sombrero, snacks y mucha curiosidad.',
    whatToBringEn: 'Comfortable walking shoes, sun protection or rain ponchos depending on the season, hat, snacks, and a lot of curiosity.',
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Puka Pukara y Centro Textil Andino', titleEn: 'Puka Pukara and Andean Textile Center', descriptionEs: 'Recogida de su hotel a las 8:00 AM. Primera parada en Puka Pukara, la "Fortaleza Roja", un importante punto de control militar y administrativo inca. Luego visitamos un Centro Textil Andino tradicional donde podrá alimentar llamas y alpacas y aprender sobre las antiguas técnicas de tejido transmitidas por generaciones. También verá la elegante vicuña, uno de los animales más preciados y protegidos del mundo.', descriptionEn: 'Pickup from your hotel at 8:00 AM. First stop at Puka Pukara, the "Red Fortress," an important Inca military and administrative checkpoint. Then visit a traditional Andean Textile Center where you can feed llamas and alpacas and learn about ancient weaving techniques passed down through generations. You will also see the elegant vicuña, one of the world\'s most prized and protected animals.' },
      { day: 1, titleEs: 'Qenqo y Sacsayhuamán', titleEn: 'Qenqo and Sacsayhuamán', descriptionEs: 'Continuamos hacia Qenqo, un misterioso santuario ceremonial tallado en formaciones naturales de piedra caliza, utilizado por los incas para rituales religiosos y prácticas de momificación. El punto culminante es la impresionante fortaleza de Sacsayhuamán, con enormes muros de piedra que pesan más de 100 toneladas perfectamente ensamblados sin mortero. Disfrute de vistas panorámicas de Cusco antes de regresar a la ciudad.', descriptionEn: 'We continue to Qenqo, a mysterious ceremonial sanctuary carved into natural limestone formations, used by the Incas for religious rituals and mummification practices. The highlight is the impressive fortress of Sacsayhuamán, with enormous stone walls weighing more than 100 tons perfectly fitted together without mortar. Enjoy panoramic views of Cusco before returning to the city.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Puka Pukara and Andean Textile Center', titleEs: 'Puka Pukara y Centro Textil Andino', descriptionEn: 'Pickup from your hotel at 8:00 AM. First stop at Puka Pukara, the "Red Fortress," an important Inca military and administrative checkpoint. Then visit a traditional Andean Textile Center where you can feed llamas and alpacas and learn about ancient weaving techniques passed down through generations. You will also see the elegant vicuña, one of the world\'s most prized and protected animals.', descriptionEs: 'Recogida de su hotel a las 8:00 AM. Primera parada en Puka Pukara, la "Fortaleza Roja", un importante punto de control militar y administrativo inca. Luego visitamos un Centro Textil Andino tradicional donde podrá alimentar llamas y alpacas y aprender sobre las antiguas técnicas de tejido transmitidas por generaciones. También verá la elegante vicuña, uno de los animales más preciados y protegidos del mundo.' },
      { day: 1, titleEn: 'Qenqo and Sacsayhuamán', titleEs: 'Qenqo y Sacsayhuamán', descriptionEn: 'We continue to Qenqo, a mysterious ceremonial sanctuary carved into natural limestone formations, used by the Incas for religious rituals and mummification practices. The highlight is the impressive fortress of Sacsayhuamán, with enormous stone walls weighing more than 100 tons perfectly fitted together without mortar. Enjoy panoramic views of Cusco before returning to the city.', descriptionEs: 'Continuamos hacia Qenqo, un misterioso santuario ceremonial tallado en formaciones naturales de piedra caliza, utilizado por los incas para rituales religiosos y prácticas de momificación. El punto culminante es la impresionante fortaleza de Sacsayhuamán, con enormes muros de piedra que pesan más de 100 toneladas perfectamente ensamblados sin mortero. Disfrute de vistas panorámicas de Cusco antes de regresar a la ciudad.' },
    ],
    pricingNoteEs: 'Los precios son por persona y varían según la cantidad de viajeros en el grupo.',
    pricingNoteEn: 'Prices are per person and vary according to the number of travelers in the group.',
  },
  
  {
    id: 'valle-sagrado',
    slug: 'valle-sagrado',
    destination: 'cusco',
    image: '/tours/sacred-valley.jpg',
    gallery: ['/tours/sacred-valley-2.png', '/tours/sacred-valley-3.jpg', '/tours/sacred-valley-4.jpg', '/tours/sacred-valley-5.jpg'],
    nameEs: 'Maras \u2013 Moray \u2013 Ollantaytambo',
    nameEn: 'Maras \u2013 Moray \u2013 Ollantaytambo',
    subtitleEs: 'Descubre el Coraz\u00f3n del Valle Sagrado',
    subtitleEn: 'Discover the Heart of the Sacred Valley',
    descriptionEs: 'Tu jornada comienza a las 8:00 AM explorando algunos de los tesoros culturales y naturales m\u00e1s fascinantes del Valle Sagrado de Per\u00fa. Tu primera parada es el pintoresco pueblo andino de Chinchero, donde familias tejedoras locales compartir\u00e1n tradiciones textiles centenarias. Aprende c\u00f3mo los tintes naturales extra\u00eddos de plantas nativas, flores y minerales crean los colores vibrantes de los textiles andinos tradicionales. Luego viaja al remarkable sitio arqueol\u00f3gico de Moray, el laboratorio agr\u00edcola de los Incas, donde descubrir\u00e1s c\u00f3mo experimentaban con diferentes microclimas para cultivar cosechas a varias elevaciones. Contin\u00faa a las impresionantes Salineras de Maras, un paisaje espectacular de m\u00e1s de 3,000 pozas de sal cascando por la ladera de la monta\u00f1a. Al mediod\u00eda, disfruta de un delicioso almuerzo en un restaurante local seleccionado en Urubamba. Por la tarde, explora el pueblo inca vivo de Ollantaytambo, uno de los asentamientos mejor conservados de Sudam\u00e9rica.',
    descriptionEn: 'Your journey begins at 8:00 AM exploring some of the most fascinating cultural and natural treasures of Peru\'s Sacred Valley. Your first stop is the charming Andean village of Chinchero, where local weaving families will share centuries-old textile traditions. Learn how natural dyes extracted from native plants, flowers, and minerals are used to create the vibrant colors found in traditional Andean textiles. Next, travel to the remarkable archaeological site of Moray, the Incas\' agricultural laboratory, where you\'ll discover how the Incas experimented with different microclimates to cultivate crops at various elevations. Continue to the breathtaking Salt Mines of Maras, a spectacular landscape of more than 3,000 salt pools cascading down the mountainside. At midday, enjoy a delicious lunch at a carefully selected local restaurant in Urubamba. In the afternoon, explore the living Inca town of Ollantaytambo, one of the best-preserved settlements in South America.',
    duration: 1,
    difficulty: 'beginner',
    priceUSD: 209,
    highSeasonPrice: 209,
    includesEs: ['Recogida en su hotel en Cusco', 'Gu\u00eda profesional de habla inglesa', 'Tour privado', 'Boletos de entrada para Moray, Salineras de Maras y Ollantaytambo', 'Comida: Almuerzo en Urubamba'],
    includesEn: ['Pick-up at your hotel in Cusco', 'English speaking professional Tour Guide', 'Private Tour', 'Entrance tickets for Moray, Salt Mine (Maras) and Ollantaytambo', 'Meal: Lunch in Urubamba'],
    excludesEs: ['Hotel en Cusco', 'Gastos personales y cualquier cosa fuera del programa', 'Comidas: Desayuno y Cena', 'Propinas'],
    excludesEn: ['Hotel in Cusco', 'Personal expenses and anything other than what are on the program', 'Meals: Breakfast and Dinner', 'Gratuities'],
    highlightsEs: ['Encuentros culturales aut\u00e9nticos con comunidades locales', 'Demostraci\u00f3n textil andina tradicional en Chinchero', 'Terrazas agr\u00edcolas de Moray', 'Salineras de Maras con m\u00e1s de 3,000 pozas de sal', 'Almuerzo con ingredientes frescos regionales en Urubamba', 'Pueblo inca vivo de Ollantaytambo', 'Transporte privado y servicio personalizado'],
    highlightsEn: ['Authentic cultural encounters with local communities', 'Traditional Andean textile demonstration in Chinchero', 'Agricultural terraces of Moray', 'Salt Mines of Maras with over 3,000 salt pools', 'Lunch with fresh regional ingredients in Urubamba', 'Living Inca town of Ollantaytambo', 'Private transportation and personalized service'],
    whatToBringEs: 'Zapatos c\u00f3modos para caminar, protecci\u00f3n solar o poncho de lluvia seg\u00fan la temporada, sombrero, snacks y mucha curiosidad.',
    whatToBringEn: 'Comfortable walking shoes, sun protection or rain ponchos depending on the season, hat, snacks, and a lot of curiosity.',
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Chinchero \u2013 Moray \u2013 Maras \u2013 Urubamba \u2013 Ollantaytambo', titleEn: 'Chinchero \u2013 Moray \u2013 Maras \u2013 Urubamba \u2013 Ollantaytambo', descriptionEs: 'Tu jornada comienza a las 8:00 AM con recogida en tu hotel en Cusco. Primera parada en Chinchero para una demostraci\u00f3n textil andina tradicional. Luego viaja al sitio arqueol\u00f3gico de Moray, el laboratorio agr\u00edcola de los Incas. Contin\u00faa a las impresionantes Salineras de Maras con m\u00e1s de 3,000 pozas de sal. Al mediod\u00eda, almuerzo en un restaurante local en Urubamba con ingredientes frescos regionales. Por la tarde, explora Ollantaytambo, uno de los asentamientos incas mejor conservados de Sudam\u00e9rica. Puedes continuar tu aventura tomando el tren a Aguas Calientes, puerta de entrada a Machu Picchu, o regresar c\u00f3modamente a Cusco en tu veh\u00edculo privado. Inicio de servicios: 08:00 AM. Lugar de fin: tu hotel en Cusco o estaci\u00f3n de tren en Ollantaytambo.', descriptionEn: 'Your journey begins at 8:00 AM with pickup at your hotel in Cusco. First stop in Chinchero for a traditional Andean textile demonstration. Then travel to the archaeological site of Moray, the Incas\' agricultural laboratory. Continue to the breathtaking Salt Mines of Maras with over 3,000 salt pools. At midday, lunch at a local restaurant in Urubamba with fresh regional ingredients. In the afternoon, explore Ollantaytambo, one of the best-preserved Inca settlements in South America. You may continue your adventure by boarding the train to Aguas Calientes, gateway to Machu Picchu, or return comfortably to Cusco in your private vehicle. Services start: 08:00 AM. End location: your hotel in Cusco or train station in Ollantaytambo.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Chinchero \u2013 Moray \u2013 Maras \u2013 Urubamba \u2013 Ollantaytambo', titleEs: 'Chinchero \u2013 Moray \u2013 Maras \u2013 Urubamba \u2013 Ollantaytambo', descriptionEn: 'Your journey begins at 8:00 AM with pickup at your hotel in Cusco. First stop in Chinchero for a traditional Andean textile demonstration. Then travel to the archaeological site of Moray, the Incas\' agricultural laboratory. Continue to the breathtaking Salt Mines of Maras with over 3,000 salt pools. At midday, lunch at a local restaurant in Urubamba with fresh regional ingredients. In the afternoon, explore Ollantaytambo, one of the best-preserved Inca settlements in South America. You may continue your adventure by boarding the train to Aguas Calientes, gateway to Machu Picchu, or return comfortably to Cusco in your private vehicle. Services start: 08:00 AM. End location: your hotel in Cusco or train station in Ollantaytambo.', descriptionEs: 'Tu jornada comienza a las 8:00 AM con recogida en tu hotel en Cusco. Primera parada en Chinchero para una demostraci\u00f3n textil andina tradicional. Luego viaja al sitio arqueol\u00f3gico de Moray, el laboratorio agr\u00edcola de los Incas. Contin\u00faa a las impresionantes Salineras de Maras con m\u00e1s de 3,000 pozas de sal. Al mediod\u00eda, almuerzo en un restaurante local en Urubamba con ingredientes frescos regionales. Por la tarde, explora Ollantaytambo, uno de los asentamientos incas mejor conservados de Sudam\u00e9rica. Puedes continuar tu aventura tomando el tren a Aguas Calientes, puerta de entrada a Machu Picchu, o regresar c\u00f3modamente a Cusco en tu veh\u00edculo privado. Inicio de servicios: 08:00 AM. Lugar de fin: tu hotel en Cusco o estaci\u00f3n de tren en Ollantaytambo.' },
    ],
    pricingNoteEs: 'Precio por persona: 1-2 personas $209 | 3 personas $169 | 4 personas $149 | 5 personas $139 | 6 personas $129 | 7 personas $119 | 8+ personas $109. Viaja con confianza: cada experiencia est\u00e1 dise\u00f1ada para combinar comodidad, autenticidad, seguridad y conexiones significativas con la cultura de Per\u00fa.',
    pricingNoteEn: 'Price per person: 1-2 people $209 | 3 people $169 | 4 people $149 | 5 people $139 | 6 people $129 | 7 people $119 | 8+ people $109. Travel with confidence: every experience is carefully designed to combine comfort, authenticity, safety, and meaningful connections with Peru\'s culture.',
  },
  {
    id: 'machu-picchu',
    slug: 'machu-picchu',
    destination: 'cusco',
    image: '/tours/machu-picchu.jpg',
    gallery: ['/tours/machu-picchu-2.jpg', '/tours/machu-picchu-3.jpg', '/tours/machu-picchu-4.jpg', '/tours/machu-picchu-5.jpg', '/tours/machu-picchu-6.jpg'],
    nameEs: 'Machu Picchu Signature Experience',
    nameEn: 'Machu Picchu Signature Experience',
    subtitleEs: 'Descubre Machu Picchu en un Día Inolvidable',
    subtitleEn: 'Discover Machu Picchu in One Unforgettable Day',
    descriptionEs: 'Experimente la maravilla de Machu Picchu en un viaje de día completo cuidadosamente planificado desde Cusco, diseñado para viajeros que desean aprovechar al máximo su tiempo en Perú sin comprometer la comodidad ni la calidad. Su aventura comienza temprano en Cusco y lo lleva a través del espectacular Valle Sagrado hasta Ollantaytambo, donde abordará el panorámico tren Vistadome Observatory. Mientras viaja junto al río Urubamba, disfrute de vistas impresionantes de los Andes, pueblos tradicionales y paisajes montañosos exuberantes. Al llegar a Aguas Calientes, disfrutará de un almuerzo en un restaurante local antes de continuar con el punto culminante de su viaje: Machu Picchu, una de las Nuevas Siete Maravillas del Mundo. Acompañado por un guía experto, explore los templos más importantes, terrazas, áreas ceremoniales y miradores mientras descubre la fascinante historia, ingeniería y misterios de la civilización inca. Con más de 500 años de historia, Machu Picchu sigue siendo uno de los sitios arqueológicos más extraordinarios de la Tierra. Después de su visita guiada, regrese cómodamente en tren y transporte privado a Cusco, llegando a su hotel la misma tarde.',
    descriptionEn: 'Experience the wonder of Machu Picchu on a carefully planned full-day journey from Cusco, designed for travelers who want to make the most of their time in Peru without compromising comfort or quality. Your adventure begins early in Cusco and takes you through the spectacular Sacred Valley to Ollantaytambo, where you will board the panoramic Vistadome Observatory train. As you travel alongside the Urubamba River, enjoy breathtaking views of the Andes, traditional villages, and lush mountain landscapes. Upon arriving in Aguas Calientes, you will enjoy lunch at a local restaurant before continuing to the highlight of your journey: Machu Picchu, one of the New Seven Wonders of the World. Accompanied by an expert guide, explore the most important temples, terraces, ceremonial areas, and viewpoints while discovering the fascinating history, engineering, and mysteries of the Inca civilization. With over 500 years of history, Machu Picchu remains one of the most extraordinary archaeological sites on Earth. After your guided visit, return comfortably by train and private transportation to Cusco, arriving at your hotel the same evening.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 499,
    includesEs: ['Recogida y dejada en su hotel en Cusco', 'Guía profesional de habla inglesa', 'Tour guiado privado', 'Boletos de tren Ollantaytambo a Aguas Calientes - VISTADOME OBSERVATORY 10:32 am', 'Boletos de tren Aguas Calientes a Ollantaytambo - EXPEDITION 18:20 pm', 'Boletos de bus ida y vuelta Aguas Calientes a Machu Picchu', 'Entrada a Machu Picchu', 'Almuerzo en Aguas Calientes'],
    includesEn: ['Pick-up and drop-off at your hotel in Cusco', 'English speaking professional Tour Guide', 'Private Guiding Tour', 'Train Tickets from Ollantaytambo to Aguas Calientes Town. VISTADOME OBSERVATORY. 10:32 am', 'Train Tickets from Aguas Calientes Town to Ollantaytambo. EXPEDITION. 18:20 pm', 'Bus Tickets round trip from Aguas Calientes Town to Machu Picchu', 'Entrance fee to Machu Picchu', 'Meal: Lunch in Aguas Calientes Town'],
    excludesEs: ['Hotel en la ciudad de Cusco', 'Gastos personales y cualquier cosa fuera del programa', 'Comidas: Desayuno y Cena', 'Propinas para el Guía y el Conductor'],
    excludesEn: ['Hotel in Cusco City', 'Personal expenses and anything other than what is on the program', 'Meals: Breakfast and Dinner', 'Gratuities for Tour Guide and Driver'],
    highlightsEs: ['Visita una de las Nuevas Siete Maravillas del Mundo', 'Panorámico viaje en tren Vistadome Observatory a través del Valle Sagrado', 'Tour guiado experto de Machu Picchu', 'Almuerzo en un restaurante local en Aguas Calientes', 'Transporte ida y vuelta desde Cusco', 'Regreso a su hotel en Cusco el mismo día', 'Logística sin complicaciones y servicio personalizado'],
    highlightsEn: ['Visit one of the New Seven Wonders of the World', 'Scenic Vistadome Observatory train journey through the Sacred Valley', 'Expert guided tour of Machu Picchu', 'Lunch at a local restaurant in Aguas Calientes', 'Round-trip transportation from Cusco', 'Return to your hotel in Cusco the same day', 'Hassle-free logistics and personalized service'],
    whatToBringEs: 'Zapatos cómodos para caminar, protección solar o ponchos de lluvia dependiendo de la temporada, sombrero, snacks y mucha curiosidad.',
    whatToBringEn: 'Comfortable walking shoes, sun protection or rain ponchos depending on the season, hat, snacks, and a lot of curiosity.',
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Recogida y viaje a Ollantaytambo - 8:00 AM', titleEn: 'Pickup and journey to Ollantaytambo - 8:00 AM', descriptionEs: 'Lo recogemos de su hotel y nos dirigimos a la estación de Ollantaytambo. Esta parte del viaje tomará aproximadamente 2 horas a través del espectacular Valle Sagrado.', descriptionEn: 'We will pick you up from your hotel and head to the Ollantaytambo station. This part of the trip will take approximately 2 hours through the spectacular Sacred Valley.' },
      { day: 1, titleEs: 'Tren Vistadome Observatory - 10:30 AM', titleEn: 'Vistadome Observatory Train - 10:30 AM', descriptionEs: 'Su tren será el VISTADOME OBSERVATORY. El viaje en tren tomará aproximadamente 1 hora y 45 minutos para llegar a la estación del tren en el pueblo de Aguas Calientes. Disfrute de vistas impresionantes de los Andes junto al río Urubamba.', descriptionEn: 'Your train will be the VISTADOME OBSERVATORY. The train ride will take approximately 1 hour and 45 minutes to reach the train station in the town of Aguas Calientes. Enjoy breathtaking views of the Andes alongside the Urubamba River.' },
      { day: 1, titleEs: 'Llegada a Aguas Calientes y Almuerzo - 12:15 PM', titleEn: 'Arrival in Aguas Calientes and Lunch - 12:15 PM', descriptionEs: 'Una vez que llegue al pueblo de Aguas Calientes, su guía lo llevará a un restaurante para su almuerzo. Luego, su guía lo llevará a la estación de bus, donde tomará el bus de 25 minutos hasta la ciudadela inca de Machu Picchu.', descriptionEn: 'Once you arrive in the town of Aguas Calientes, your guide will take you to a restaurant for your lunch. Then your tour guide will lead you to the bus station for the 25-minute bus ride to the Inca citadel of Machu Picchu.' },
      { day: 1, titleEs: 'Tour guiado de Machu Picchu - 2:00 PM', titleEn: 'Guided Tour of Machu Picchu - 2:00 PM', descriptionEs: 'Su tour comienza a las 2 PM. Su guía lo llevará a través de los lugares más importantes de esta hermosa ciudad inca, visitando los templos y edificios más importantes. Este tour durará aproximadamente 2 horas y 30 minutos, descubriendo la fascinante historia, ingeniería y misterios de la civilización inca.', descriptionEn: 'Your tour begins at 2 PM. Your guide will take you through the most important places of this beautiful Inca city, visiting the most important temples and buildings. This tour will last approximately 2 hours and 30 minutes, discovering the fascinating history, engineering, and mysteries of the Inca civilization.' },
      { day: 1, titleEs: 'Fin del tour y regreso a Cusco - 4:30 PM', titleEn: 'End of tour and return to Cusco - 4:30 PM', descriptionEs: 'Después de su visita a Machu Picchu, tomará el bus de regreso al pueblo de Aguas Calientes donde tendrá tiempo libre para cenar antes de tomar el tren EXPEDITION de regreso a Ollantaytambo a las 6:20 PM. El viaje de Aguas Calientes a Ollantaytambo tomará 1 hora y 45 minutos. En Ollantaytambo, un auto privado lo esperará para llevarlo de regreso a la ciudad de Cusco, llegando a su hotel.', descriptionEn: 'After your visit to Machu Picchu, you will take the bus back to Aguas Calientes where you will have some free time for dinner before taking the EXPEDITION train back to Ollantaytambo at 6:20 PM. The trip from Aguas Calientes to Ollantaytambo will take 1 hour and 45 minutes. In Ollantaytambo, a private car will be waiting for you and will take you back to Cusco City, arriving at your hotel.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Pickup and journey to Ollantaytambo - 8:00 AM', titleEs: 'Recogida y viaje a Ollantaytambo - 8:00 AM', descriptionEn: 'We will pick you up from your hotel and head to the Ollantaytambo station. This part of the trip will take approximately 2 hours through the spectacular Sacred Valley.', descriptionEs: 'Lo recogemos de su hotel y nos dirigimos a la estación de Ollantaytambo. Esta parte del viaje tomará aproximadamente 2 horas a través del espectacular Valle Sagrado.' },
      { day: 1, titleEn: 'Vistadome Observatory Train - 10:30 AM', titleEs: 'Tren Vistadome Observatory - 10:30 AM', descriptionEn: 'Your train will be the VISTADOME OBSERVATORY. The train ride will take approximately 1 hour and 45 minutes to reach the train station in the town of Aguas Calientes. Enjoy breathtaking views of the Andes alongside the Urubamba River.', descriptionEs: 'Su tren será el VISTADOME OBSERVATORY. El viaje en tren tomará aproximadamente 1 hora y 45 minutos para llegar a la estación del tren en el pueblo de Aguas Calientes. Disfrute de vistas impresionantes de los Andes junto al río Urubamba.' },
      { day: 1, titleEn: 'Arrival in Aguas Calientes and Lunch - 12:15 PM', titleEs: 'Llegada a Aguas Calientes y Almuerzo - 12:15 PM', descriptionEn: 'Once you arrive in the town of Aguas Calientes, your guide will take you to a restaurant for your lunch. Then your tour guide will lead you to the bus station for the 25-minute bus ride to the Inca citadel of Machu Picchu.', descriptionEs: 'Una vez que llegue al pueblo de Aguas Calientes, su guía lo llevará a un restaurante para su almuerzo. Luego, su guía lo llevará a la estación de bus, donde tomará el bus de 25 minutos hasta la ciudadela inca de Machu Picchu.' },
      { day: 1, titleEn: 'Guided Tour of Machu Picchu - 2:00 PM', titleEs: 'Tour guiado de Machu Picchu - 2:00 PM', descriptionEn: 'Your tour begins at 2 PM. Your guide will take you through the most important places of this beautiful Inca city, visiting the most important temples and buildings. This tour will last approximately 2 hours and 30 minutes, discovering the fascinating history, engineering, and mysteries of the Inca civilization.', descriptionEs: 'Su tour comienza a las 2 PM. Su guía lo llevará a través de los lugares más importantes de esta hermosa ciudad inca, visitando los templos y edificios más importantes. Este tour durará aproximadamente 2 horas y 30 minutos, descubriendo la fascinante historia, ingeniería y misterios de la civilización inca.' },
      { day: 1, titleEn: 'End of tour and return to Cusco - 4:30 PM', titleEs: 'Fin del tour y regreso a Cusco - 4:30 PM', descriptionEn: 'After your visit to Machu Picchu, you will take the bus back to Aguas Calientes where you will have some free time for dinner before taking the EXPEDITION train back to Ollantaytambo at 6:20 PM. The trip from Aguas Calientes to Ollantaytambo will take 1 hour and 45 minutes. In Ollantaytambo, a private car will be waiting for you and will take you back to Cusco City, arriving at your hotel.', descriptionEs: 'Después de su visita a Machu Picchu, tomará el bus de regreso al pueblo de Aguas Calientes donde tendrá tiempo libre para cenar antes de tomar el tren EXPEDITION de regreso a Ollantaytambo a las 6:20 PM. El viaje de Aguas Calientes a Ollantaytambo tomará 1 hora y 45 minutos. En Ollantaytambo, un auto privado lo esperará para llevarlo de regreso a la ciudad de Cusco, llegando a su hotel.' },
    ],
    pricingNoteEs: 'Los precios son por persona y varían según la cantidad de viajeros en el grupo.',
    pricingNoteEn: 'Prices are per person and vary according to the number of travelers in the group.',
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
    gallery: ['/tours/humantay-lagoon-2.jpg', '/tours/humantay-lagoon-3.jpg', '/tours/humantay-lagoon-4.jpg', '/tours/humantay-lagoon-5.jpg', '/tours/humantay-lagoon-6.jpg'],
    nameEs: 'Laguna de Humantay \u2013 Aventura Full Day desde Cusco',
    nameEn: 'Humantay Lake \u2013 Full Day Adventure from Cusco',
    subtitleEs: 'Descubre una de las Maravillas Naturales M\u00e1s Espectaculares de Per\u00fa',
    subtitleEn: 'Discover One of Peru\u2019s Most Spectacular Natural Wonders',
    descriptionEs: 'Escapa de la ciudad e sum\u00e9rgete en la belleza impresionante de la Laguna de Humantay, una de las lagunas turquesa m\u00e1s impresionantes de los Andes peruanos. Anidada bajo las nevadas cumbres de las majestuosas monta\u00f1as Humantay y Salkantay, esta jornada inolvidable combina paisajes espectaculares, cultura andina aut\u00e9ntica y una recompensante caminata de monta\u00f1a. Durante siglos, la Laguna de Humantay ha tenido una profunda significancia espiritual para las comunidades andinas locales, que la consideran un lugar sagrado conectado con la naturaleza y los poderosos esp\u00edritus monta\u00f1osos conocidos como "Apus". Tu aventura comienza temprano con recogida en tu hotel, viaje a trav\u00e9s de valles andinos y aldeas tradicionales, desayuno en Mollepata, caminata desde Soraypampa hasta la laguna a 4,200 m, y regreso con almuerzo en Mollepata.',
    descriptionEn: 'Escape the city and immerse yourself in the breathtaking beauty of Humantay Lake, one of the most stunning turquoise lakes in the Peruvian Andes. Nestled beneath the snow-capped peaks of the majestic Humantay and Salkantay Mountains, this unforgettable journey combines spectacular landscapes, authentic Andean culture, and a rewarding mountain hike. For centuries, Humantay Lake has held deep spiritual significance for local Andean communities, who regard it as a sacred place connected to nature and the powerful mountain spirits known as "Apus." Your adventure begins early with hotel pickup, travel through picturesque Andean valleys and traditional villages, breakfast in Mollepata, hike from Soraypampa to the lake at 4,200 m, and return with lunch in Mollepata.',
    duration: 1,
    difficulty: 'moderate',
    priceUSD: 219,
    highSeasonPrice: 219,
    includesEs: ['Recogida y dejada en su hotel en Cusco', 'Gu\u00eda profesional de habla inglesa', 'Tour privado', 'Entrada a los lugares indicados en el itinerario', '01 botella de agua por viajero', 'Comidas: Desayuno y Almuerzo'],
    includesEn: ['Pick-up and drop off at your hotel in Cusco', 'English speaking professional Tour Guide', 'Private Tour', 'Entrance fee to places indicated on itinerary', '01 water bottle per traveler', 'Meals: Breakfast and Lunch'],
    excludesEs: ['Gastos personales y cualquier cosa fuera del programa', 'Hotel en Cusco', 'Comidas: Cena', 'Propinas'],
    excludesEn: ['Personal expenses and anything other than what is on the program', 'Hotel in Cusco', 'Meals: Dinner', 'Gratuities'],
    highlightsEs: ['Laguna turquesa a 4,200 m rodeada de glaciares', 'Caminata moderada de 1.5 a 2 horas', 'Desayuno y almuerzo incluidos', 'Tour privado con gu\u00eda profesional', 'Recogida y dejada en el hotel', 'Vistas espectaculares de las monta\u00f1as Humantay y Salkantay'],
    highlightsEn: ['Turquoise lake at 4,200 m surrounded by glaciers', 'Moderate hike of 1.5 to 2 hours', 'Breakfast and lunch included', 'Private tour with professional guide', 'Hotel pickup and drop-off', 'Spectacular views of Humantay and Salkantay mountains'],
    whatToBringEs: 'Zapatos de trekking c\u00f3modos con buen agarre, capas de ropa abrigadora, chaqueta impermeable o poncho de lluvia, sombrero, gafas de sol y protector solar, botella de agua reutilizable, snacks como barras energ\u00e9ticas, nueces o frutas, c\u00e1mara o tel\u00e9fono, mochila peque\u00f1a, efectivo en soles. Se recomienda pasar al menos 1-2 d\u00edas en Cusco antes para aclimataci\u00f3n.',
    whatToBringEn: 'Comfortable hiking shoes or trekking boots with good grip, warm layers of clothing, waterproof jacket or rain poncho, sun hat, sunglasses, and sunscreen, reusable water bottle, snacks such as energy bars, nuts, or fruit, camera or smartphone, small backpack, cash in Peruvian Soles. We recommend spending at least 1\u20132 days in Cusco before for altitude acclimatization.',
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Cusco \u2013 Mollepata \u2013 Soraypampa \u2013 Laguna de Humantay \u2013 Cusco', titleEn: 'Cusco \u2013 Mollepata \u2013 Soraypampa \u2013 Humantay Lake \u2013 Cusco', descriptionEs: 'Tu aventura comienza a las 04:00 AM con recogida en tu hotel en Cusco. Viajamos a trav\u00e9s de valles andinos y aldeas tradicionales hasta Mollepata, donde disfrutar\u00e1s de un desayuno reci\u00e9n preparado en un restaurante local. Despu\u00e9s del desayuno, continuamos a Soraypampa (3,900 m / 12,795 ft), punto de inicio de la caminata. Mientras asciendes por el paisaje monta\u00f1oso, tu gu\u00eda compartir\u00e1 informaci\u00f3n sobre la regi\u00f3n y los glaciares circundantes. Al llegar a la Laguna de Humantay (4,200 m / 13,779 ft), ser\u00e1s recompensado con uno de los paisajes m\u00e1s espectaculares de Per\u00fa. Las aguas turquesas v\u00edvidas, enmarcadas por glaciares imponentes y picos monta\u00f1osos dram\u00e1ticos, crean una escena casi irreal. Tiempo para relajarte, capturar fotos inolvidables y disfrutar la tranquilidad. Descendemos a un ritmo c\u00f3modo de regreso a Soraypampa, regresamos a Mollepata para un delicioso almuerzo y volvemos a Cusco por la tarde. Inicio de servicios: 04:00 AM.', descriptionEn: 'Your adventure begins at 04:00 AM with pickup from your hotel in Cusco. We travel through picturesque Andean valleys and traditional villages to Mollepata, where you will enjoy a freshly prepared breakfast at a local restaurant. After breakfast, we continue to Soraypampa (3,900 m / 12,795 ft), the starting point of our hike. As you ascend through breathtaking mountain scenery, your guide will share insights about the region and surrounding glaciers. Upon reaching Humantay Lake (4,200 m / 13,779 ft), you will be rewarded with one of the most spectacular landscapes in Peru. The vivid turquoise waters, framed by towering glaciers and dramatic mountain peaks, create a scene that feels almost unreal. Time to relax, capture unforgettable photos, and enjoy the tranquility. We descend at a comfortable pace back to Soraypampa, return to Mollepata for a delicious lunch, and journey back to Cusco in the afternoon. Services start: 04:00 AM.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Cusco \u2013 Mollepata \u2013 Soraypampa \u2013 Humantay Lake \u2013 Cusco', titleEs: 'Cusco \u2013 Mollepata \u2013 Soraypampa \u2013 Laguna de Humantay \u2013 Cusco', descriptionEn: 'Your adventure begins at 04:00 AM with pickup from your hotel in Cusco. We travel through picturesque Andean valleys and traditional villages to Mollepata, where you will enjoy a freshly prepared breakfast at a local restaurant. After breakfast, we continue to Soraypampa (3,900 m / 12,795 ft), the starting point of our hike. As you ascend through breathtaking mountain scenery, your guide will share insights about the region and surrounding glaciers. Upon reaching Humantay Lake (4,200 m / 13,779 ft), you will be rewarded with one of the most spectacular landscapes in Peru. The vivid turquoise waters, framed by towering glaciers and dramatic mountain peaks, create a scene that feels almost unreal. Time to relax, capture unforgettable photos, and enjoy the tranquility. We descend at a comfortable pace back to Soraypampa, return to Mollepata for a delicious lunch, and journey back to Cusco in the afternoon. Services start: 04:00 AM.', descriptionEs: 'Tu aventura comienza a las 04:00 AM con recogida en tu hotel en Cusco. Viajamos a trav\u00e9s de valles andinos y aldeas tradicionales hasta Mollepata, donde disfrutar\u00e1s de un desayuno reci\u00e9n preparado en un restaurante local. Despu\u00e9s del desayuno, continuamos a Soraypampa (3,900 m / 12,795 ft), punto de inicio de la caminata. Mientras asciendes por el paisaje monta\u00f1oso, tu gu\u00eda compartir\u00e1 informaci\u00f3n sobre la regi\u00f3n y los glaciares circundantes. Al llegar a la Laguna de Humantay (4,200 m / 13,779 ft), ser\u00e1s recompensado con uno de los paisajes m\u00e1s espectaculares de Per\u00fa. Las aguas turquesas v\u00edvidas, enmarcadas por glaciares imponentes y picos monta\u00f1osos dram\u00e1ticos, crean una escena casi irreal. Tiempo para relajarte, capturar fotos inolvidables y disfrutar la tranquilidad. Descendemos a un ritmo c\u00f3modo de regreso a Soraypampa, regresamos a Mollepata para un delicioso almuerzo y volvemos a Cusco por la tarde. Inicio de servicios: 04:00 AM.' },
    ],
    pricingNoteEs: 'Precio por persona: 1-2 personas $219 | 3 personas $159 | 4 personas $129 | 5 personas $119 | 6 personas $109 | 7 personas $99 | 8+ personas $89. Caminata moderada de 1.5 a 2 horas. Se recomienda aclimataci\u00f3n de 1-2 d\u00edas en Cusco antes.',
    pricingNoteEn: 'Price per person: 1-2 people $219 | 3 people $159 | 4 people $129 | 5 people $119 | 6 people $109 | 7 people $99 | 8+ people $89. Moderate hike of 1.5 to 2 hours. We recommend 1-2 days of acclimatization in Cusco before.',
  },

  
  {
    id: 'inka-trail-2d',
    slug: 'inka-trail-2d',
    destination: 'cusco',
    image: '/tours/inka-trail-2d.jpg',
    gallery: ['/tours/inka-trail-2d-2.jpg', '/tours/inka-trail-2d-3.jpg', '/tours/inka-trail-2d-4.jpg', '/tours/inka-trail-2d-5.jpg', '/tours/inka-trail-2d-6.jpg', '/tours/inka-trail-2d-7.jpg', '/tours/inka-trail-2d-8.jpg'],
    nameEs: 'Royal Inka Trail 2 D\u00edas',
    nameEn: 'Royal Inka Trail 2 Days',
    subtitleEs: 'Servicio Privado \u2013 El Camino Inca Expresso',
    subtitleEn: 'Private Service \u2013 The Express Inca Trail',
    descriptionEs: 'El Camino Inca expresso por excelencia. 2 d\u00edas de trekking por el sendero inca cl\u00e1sico desde el Km 104, con llegada a Machu Picchu por la Puerta del Sol (Inti Punku). El primer d\u00eda caminamos aproximadamente 4 horas hasta el sitio inca de Wi\u00f1ay Wayna, exploramos las ruinas y continuamos 1 hora m\u00e1s hasta Inti Punku para la primera vista panor\u00e1mica de Machu Picchu. El segundo d\u00eda, tour completo de la ciudadela de Machu Picchu con guía profesional. Ideal para quienes buscan la experiencia del Camino Inca con poco tiempo disponible.',
    descriptionEn: 'The ultimate express Inca Trail. 2 days of trekking the classic Inca path from Km 104, arriving at Machu Picchu through the Sun Gate (Inti Punku). On day one, we hike approximately 4 hours to the Inca site of Wi\u00f1ay Wayna, explore the ruins and continue 1 more hour to Inti Punku for the first panoramic view of Machu Picchu. On day two, a complete tour of Machu Picchu citadel with a professional guide. Ideal for those seeking the Inca Trail experience with limited time.',
    duration: 2,
    difficulty: 'advanced',
    priceUSD: 999,
    highSeasonPrice: 999,
    includesEs: ['Recogida en su hotel', 'Transporte privado a la estaci\u00f3n de tren de Ollantaytambo', 'Boletos de tren de Ollantaytambo al Km 104 (inicio del trek)', 'Boletos de entrada al Camino Inca y a Machu Picchu', 'Boletos de bus de Machu Picchu a Aguas Calientes', 'Gu\u00eda profesional de habla inglesa', 'Comidas: Almuerzo box para el trek'],
    includesEn: ['Pick-up at your hotel', 'Private transportation to the Ollantaytambo train station', 'Train Tickets from Ollantaytambo to Km 104 (start of the trek)', 'Entrance tickets to the Inca Trail and entrance tickets to Machu Picchu', 'Bus Tickets from Machu Picchu to Aguas Calientes Town', 'English-speaking professional Tour Guide', 'Meals: Box Lunch for the trek'],
    excludesEs: ['Hotel en Aguas Calientes', 'Gastos personales y cualquier cosa fuera del programa', 'Comidas: Desayuno y Cena', 'Propinas'],
    excludesEn: ['Hotel in Aguas Calientes Town', 'Personal expenses and anything other than what are on the program', 'Meals: Breakfast and Dinner', 'Gratuities'],
    highlightsEs: ['Servicio privado exclusivo', 'Trek desde Km 104 hasta Wi\u00f1ay Wayna', 'Primera vista panor\u00e1mica de Machu Picchu desde Inti Punku (Puerta del Sol)', 'Tour guiado completo de Machu Picchu al d\u00eda siguiente', 'Boletos de tren y bus incluidos'],
    highlightsEn: ['Exclusive private service', 'Trek from Km 104 to Wi\u00f1ay Wayna', 'First panoramic view of Machu Picchu from Inti Punku (Sun Gate)', 'Complete guided tour of Machu Picchu the following day', 'Train and bus tickets included'],
    whatToBringEs: 'Mochila de d\u00eda (34L recomendada), zapatos c\u00f3modos para caminar, repelente de mosquitos, protecci\u00f3n solar o poncho de lluvia seg\u00fan la temporada, sombrero, snacks y mucha curiosidad. No se usan porteadores en este trek.',
    whatToBringEn: 'One-day backpack (34L recommended), comfortable walking shoes, mosquito repellent, sun protection or rain ponchos depending on the season, hat, snacks, and a lot of curiosity. No porters are used on this trek.',
    featured: false,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Ollantaytambo \u2013 Km 104 \u2013 Machu Picchu', titleEn: 'Ollantaytambo \u2013 Km 104 \u2013 Machu Picchu', descriptionEs: 'Recogida a las 06:30 AM (04:00 AM desde Cusco, 06:00 AM desde Ollantaytambo/Urubamba). Caminata a la estaci\u00f3n de tren de Ollantaytambo. Viaje en tren de 1h30m al Km 104 (2,050 m / 6,725 ft), inicio del sendero. Tras mostrar pasaportes originales y cruzar el control, caminamos aproximadamente 4 horas al sitio inca de Wi\u00f1ay Wayna (2,650 m / 8,694 ft) con muchos descansos para disfrutar las vistas espectaculares. Despu\u00e9s de explorar el sitio, tiempo para el almuerzo box. Continuamos 1 hora m\u00e1s hasta Inti Punku / Puerta del Sol (2,720 m / 8,923 ft) para la primera vista panor\u00e1mica de Machu Picchu (2,400 m / 7,874 ft). Bajamos a Machu Picchu y tomamos el bus a Aguas Calientes para cenar y pernoctar. Opci\u00f3n de visitar las aguas termales. Distancia de trek: 14 km / 8.69 miles. Aguas Calientes: 2,040 m / 6,692 ft.', descriptionEn: 'Pickup at 06:30 AM (04:00 AM from Cusco, 06:00 AM from Ollantaytambo/Urubamba). Walk to the Ollantaytambo train station. 1h30m train ride to Km 104 (2,050 m / 6,725 ft), start of the trail. After showing original passports and crossing the checkpoint, we hike approximately 4 hours to the Inca site Wi\u00f1ay Wayna (2,650 m / 8,694 ft) with many breaks to enjoy spectacular views. After exploring the site, time for box lunch. Continue 1 more hour to Inti Punku / Sun Gate (2,720 m / 8,923 ft) for the first panoramic view of Machu Picchu (2,400 m / 7,874 ft). Walk down to Machu Picchu and take the bus to Aguas Calientes for dinner and overnight. Option to visit the thermal springs. Trekking distance: 14 km / 8.69 miles. Aguas Calientes: 2,040 m / 6,692 ft.' },
      { day: 2, titleEs: 'Aguas Calientes \u2013 Machu Picchu', titleEn: 'Aguas Calientes \u2013 Machu Picchu', descriptionEs: 'Despertar temprano, desayuno en el hotel y tomar uno de los primeros buses a Machu Picchu. Vale la pena llegar temprano porque la ciudad inca est\u00e1 m\u00e1s tranquila por la ma\u00f1ana, con tiempo para tomar fotos y disfrutar el amanecer. Tu gu\u00eda te llevar\u00e1 al punto cl\u00e1sico de fotos con una vista terrific de todo el complejo. Luego tendr\u00e1s un tour guiado de Machu Picchu, aprendiendo sobre su historia y viendo los edificios y templos m\u00e1s importantes. Al finalizar, bus de regreso a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a tu hotel en Cusco. Distancia total en bus: 6 km / 3.37 miles. Altitud de Machu Picchu: 2,400 m / 7,874 ft.', descriptionEn: 'Wake up early, breakfast at the hotel and take one of the first buses to Machu Picchu. It is well worth arriving early because the Inca City is quietest in the early morning, with time for photos and sunrise. Your guide will take you to the classic photo spot with a terrific view of the whole complex. Then a guided tour of Machu Picchu, learning about its history and seeing the most important buildings and temples. Afterwards, bus back to Aguas Calientes for lunch, train to Ollantaytambo, and private car to your hotel in Cusco. Total distance by bus: 6 km / 3.37 miles. Machu Picchu altitude: 2,400 m / 7,874 ft.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Ollantaytambo \u2013 Km 104 \u2013 Machu Picchu', titleEs: 'Ollantaytambo \u2013 Km 104 \u2013 Machu Picchu', descriptionEn: 'Pickup at 06:30 AM (04:00 AM from Cusco, 06:00 AM from Ollantaytambo/Urubamba). Walk to the Ollantaytambo train station. 1h30m train ride to Km 104 (2,050 m / 6,725 ft), start of the trail. After showing original passports and crossing the checkpoint, we hike approximately 4 hours to the Inca site Wi\u00f1ay Wayna (2,650 m / 8,694 ft) with many breaks to enjoy spectacular views. After exploring the site, time for box lunch. Continue 1 more hour to Inti Punku / Sun Gate (2,720 m / 8,923 ft) for the first panoramic view of Machu Picchu (2,400 m / 7,874 ft). Walk down to Machu Picchu and take the bus to Aguas Calientes for dinner and overnight. Option to visit the thermal springs. Trekking distance: 14 km / 8.69 miles. Aguas Calientes: 2,040 m / 6,692 ft.', descriptionEs: 'Recogida a las 06:30 AM (04:00 AM desde Cusco, 06:00 AM desde Ollantaytambo/Urubamba). Caminata a la estaci\u00f3n de tren de Ollantaytambo. Viaje en tren de 1h30m al Km 104 (2,050 m / 6,725 ft), inicio del sendero. Tras mostrar pasaportes originales y cruzar el control, caminamos aproximadamente 4 horas al sitio inca de Wi\u00f1ay Wayna (2,650 m / 8,694 ft) con muchos descansos para disfrutar las vistas espectaculares. Despu\u00e9s de explorar el sitio, tiempo para el almuerzo box. Continuamos 1 hora m\u00e1s hasta Inti Punku / Puerta del Sol (2,720 m / 8,923 ft) para la primera vista panor\u00e1mica de Machu Picchu (2,400 m / 7,874 ft). Bajamos a Machu Picchu y tomamos el bus a Aguas Calientes para cenar y pernoctar. Opci\u00f3n de visitar las aguas termales. Distancia de trek: 14 km / 8.69 miles. Aguas Calientes: 2,040 m / 6,692 ft.' },
      { day: 2, titleEn: 'Aguas Calientes \u2013 Machu Picchu', titleEs: 'Aguas Calientes \u2013 Machu Picchu', descriptionEn: 'Wake up early, breakfast at the hotel and take one of the first buses to Machu Picchu. It is well worth arriving early because the Inca City is quietest in the early morning, with time for photos and sunrise. Your guide will take you to the classic photo spot with a terrific view of the whole complex. Then a guided tour of Machu Picchu, learning about its history and seeing the most important buildings and temples. Afterwards, bus back to Aguas Calientes for lunch, train to Ollantaytambo, and private car to your hotel in Cusco. Total distance by bus: 6 km / 3.37 miles. Machu Picchu altitude: 2,400 m / 7,874 ft.', descriptionEs: 'Despertar temprano, desayuno en el hotel y tomar uno de los primeros buses a Machu Picchu. Vale la pena llegar temprano porque la ciudad inca est\u00e1 m\u00e1s tranquila por la ma\u00f1ana, con tiempo para tomar fotos y disfrutar el amanecer. Tu gu\u00eda te llevar\u00e1 al punto cl\u00e1sico de fotos con una vista terrific de todo el complejo. Luego tendr\u00e1s un tour guiado de Machu Picchu, aprendiendo sobre su historia y viendo los edificios y templos m\u00e1s importantes. Al finalizar, bus de regreso a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a tu hotel en Cusco. Distancia total en bus: 6 km / 3.37 miles. Altitud de Machu Picchu: 2,400 m / 7,874 ft.' },
    ],
    pricingNoteEs: 'Precio por persona (sin hoteles): 2-3 personas $999 | 4-5 personas $879 | 6-7 personas $849 | 8+ personas $819. Servicio privado. No reembolsable, el cliente puede solicitar cambio de fecha hasta 30 d\u00edas antes. Ticket para Wayna Picchu y Machu Picchu Mountain: costo adicional de USD $75 (reservar al momento de la reserva).',
    pricingNoteEn: 'Price per person (no hotels): 2-3 people $999 | 4-5 people $879 | 6-7 people $849 | 8+ people $819. Private service. Non-refundable, date change up to 30 days in advance. Ticket for Wayna Picchu and Machu Picchu Mountain: additional cost of USD $75 (book at time of reservation).',
  },

  {
    id: 'inka-trail-4d',
    slug: 'inka-trail-4d',
    destination: 'cusco',
    image: '/tours/inca-trail.jpg',
    gallery: ['/tours/inca-trail-2.jpg', '/tours/inca-trail-3.jpg', '/tours/inca-trail-4.jpg', '/tours/inca-trail-5.jpg', '/tours/inca-trail-6.jpg', '/tours/inca-trail-7.jpg', '/tours/inca-trail-8.jpg', '/tours/inca-trail-9.jpg', '/tours/inca-trail-10.jpg'],
    nameEs: 'Inca Trail to Machu Picchu 4 Days / 3 Nights \u2013 Private Service',
    nameEn: 'Inca Trail to Machu Picchu 4 Days / 3 Nights \u2013 Private Service',
    subtitleEs: 'Servicio Privado \u2013 La Experiencia Definitiva del Camino Inca',
    subtitleEn: 'Private Service \u2013 The Ultimate Inca Trail Experience',
    descriptionEs: 'La experiencia definitiva del Camino Inca: 4 días de trekking por el antiguo sendero inca, cruzando pasos de monta\u00f1a y ruinas ancestrales hasta llegar a Machu Picchu por la Puerta del Sol. Este servicio privado incluye porteadores ind\u00edgenas, chef personal, equipo de campamento completo y comidas excepcionales. Un d\u00eda antes del trek, tendr\u00e1 una sesi\u00f3n informativa detallada con su gu\u00eda en su hotel, donde podr\u00e1 hacer preguntas y preparaciones finales. Recomendamos reservar con al menos 6 meses de anticipaci\u00f3n.',
    descriptionEn: 'The ultimate Inca Trail experience: 4 days of trekking along the ancient Inca path, crossing mountain passes and ancestral ruins until reaching Machu Picchu through the Sun Gate. This private service includes indigenous porters, personal chef, complete camping equipment, and excellent meals. One day before your trek, you will have an in-depth briefing with your guide at your hotel, where you can ask questions and make final preparations. We recommend booking at least 6 months in advance.',
    duration: 4,
    difficulty: 'advanced',
    priceUSD: 1489,
    includesEs: ['Charla informativa del trek con su gu\u00eda', 'Gu\u00eda profesional de trek', 'Segundo gu\u00eda para grupos de 9+', 'Transporte privado y conductor profesional al inicio del trek (km 82)', 'Todos los boletos de entrada y permisos para el Camino Inca y Parque Machu Picchu', 'Porteadores ind\u00edgenas para equipo de campamento: carpas de clientes, carpas de comedor y cocina, mesa, taburetes, equipo de cocci\u00f3n, estufa, gas, cubiertos, platos, comida y vegetales frescos', 'Boleto de bus de Machu Picchu a Aguas Calientes', 'Tour guiado de Machu Picchu (2 hrs)', '1 boleto de tren de Machu Picchu Pueblo a Ollantaytambo (Tren Tur\u00edstico Expedition)', 'Transporte de Ollantaytambo a la ciudad de Cusco', '3 noches de campamento "Inca Trail Trek" carpas amplias/colchoneta', 'Agua hervida desde el primer d\u00eda hasta el final del trek', 'Un chef y cocinero asistente', 'Comidas excelentes: 2 desayunos, 1 desayuno box, 3 almuerzos, 3 cenas (pancakes, omelettes, sopas, frutas frescas, aguacate, pasta, pollo, pescado, carne y arroz)', 'Dietas vegetarianas, veganas o especiales bajo solicitud', 'Hora del t\u00e9 antes de la cena (t\u00e9, caf\u00e9, galletas y palomitas)', 'Despertar con t\u00e9 de coca en su carpa', 'Agua caliente para lavarse en su carpa cada d\u00eda', 'Jab\u00f3n biodegradable y gel limpiador de manos', 'Tanque de ox\u00edgeno y botiqu\u00edn de primeros auxilios', 'Todos los impuestos locales'],
    includesEn: ['Trek briefing with your guide', 'Professional trek Guide', 'Second tour guide for groups of 9+', 'Private transport and professional driver (to the starting point of hike \u2013 km 82)', 'All entrance tickets and permits for Inca Trail and Machu Picchu Park', 'Indigenous porters to carry camping equipment: client tents, dining and cooking tents, table, stools, cooking gear, stove, gas container, cutlery, plates, food and fresh vegetables', 'Bus ticket from Machu Picchu to Aguas Calientes Village', 'Machu Picchu guided tour (2 hrs)', '1 train ticket from Machu Picchu Pueblo to Ollantaytambo village (Expedition Tourist Train)', 'Transport from Ollantaytambo Village to Cusco City', '3 nights camping \u201cInca Trail Trek\u201d Spacious tents/Sleeping mat', 'Boiled water provided from the first day to the end of the trek (for drinking during the hike)', 'One chef and assistant cook', 'Excellent Meals: 2 Breakfasts, 1 Box breakfast, 3 Lunches, 3 Dinners (pancakes, omelets, soups, fresh fruit, avocado, pasta, chicken, fish, meat, and rice)', 'Vegetarian, vegan or special diet meals upon request', 'Tea time before dinner (tea, coffee, biscuits and popcorn)', 'Wake up to coca tea in your tent', 'Buckets of hot water for washing in your tent every day', 'Biodegradable soap and hand cleansing gel', 'Oxygen Tank & First aid kit', 'All local taxes'],
    excludesEs: ['Saco de dormir (se puede alquilar con nosotros)', 'Desayuno en el D\u00eda 1, almuerzo y cena en el D\u00eda 4', 'Entrada a la monta\u00f1a Huayna Picchu $75.00', 'Snacks energ\u00e9ticos (barras de chocolate, frutas secas recomendadas)', 'Propinas para el equipo (porteros, chef y gu\u00eda)'],
    excludesEn: ['Sleeping Bag (Can be hired from us)', 'Breakfast on Day 1, lunch and dinner on Day 4', 'Entrance to Huayna Picchu Mountain $75.00', 'Energy snacks (chocolate bars and dried fruits recommended)', 'Tips for the crew (porters, chef and guide)'],
    highlightsEs: ['Servicio privado exclusivo con gu\u00eda personal y chef', '4 d\u00edas de trekking por el aut\u00e9ntico Camino Inca', 'Cruce del paso Dead Woman\u2019s a 4,215 msnm', 'Ruinas inca a lo largo del camino: Llactapata, Runcuraccay, Sayacmarca, Phuyupatamarca, Wi\u00f1ay Wayna', 'Llegada a Machu Picchu por Inti Punku (Puerta del Sol)', 'Comidas excepcionales preparadas por chef personal', 'Recomendamos reservar con al menos 6 meses de anticipaci\u00f3n'],
    highlightsEn: ['Exclusive private service with personal guide and chef', '4 days trekking the authentic Inca Trail', 'Cross Dead Woman\u2019s Pass at 4,215 masl', 'Inca ruins along the trail: Llactapata, Runcuraccay, Sayacmarca, Phuyupatamarca, Wi\u00f1ay Wayna', 'Arrive at Machu Picchu through Inti Punku (Sun Gate)', 'Excellent meals prepared by personal chef', 'We recommend booking at least 6 months in advance'],
    whatToBringEs: 'Mochila de d\u00eda, pasaporte original, seguro de viaje, botas de trekking ligeras, 3 pantalones de trekking (no jeans), capas para temperaturas variables, chaqueta de lluvia, chaqueta de invierno, 5 pares de ropa interior, 6 pares de calcetines, 5 camisas (3 manga larga), forro de saco de dormir, pa\u00f1uelos y toallitas h\u00famedas, pastillas de hierro para el mal de altura, protecci\u00f3n solar SPF 45+, repelente de insectos con 30% DEET, botella de agua reutilizable, c\u00e1mara, l\u00e1mpara frontal, vendas o moleskin, sandalias, art\u00edculos de aseo, medicamentos (Imodium, Ibuprofeno), bolsas de pl\u00e1stico, dinero extra (S/ 400-500)',
    whatToBringEn: 'A good day pack, original passport, travel insurance, lighter trekking boots (with good ankle support), 3 pairs of trekking pants (not jeans), layers for variable temperatures, 1 rain jacket, 1 warm/winter jacket, 5 pairs of underwear, 6 pairs of socks, 5 shirts (3 long sleeve), sleeping bag liner, travel-size tissues and wet wipes, iron tablets and pills for altitude sickness, sun protection cream SPF 45+, bug spray with 30% DEET, re-usable water container, camera, headlamp with spare batteries, bandages or moleskin, flip flops, toiletries, medication (Imodium AD, Ibuprofen/Acetaminophen), plastic bags for dirty/wet clothes, extra money (400-500 soles / USD$160)',
    featured: true,
    active: true,
    itineraryEs: [
      { day: 1, titleEs: 'Cusco \u2013 Inicio del trek en Km 82 \u2013 Wayllabamba', titleEn: 'Cusco \u2013 Trailhead at Km 82 \u2013 Wayllabamba', descriptionEs: 'Charla informativa 1-2 d\u00edas antes. Recogida a las 5:20 AM. Conducci\u00f3n de 1h45m a Ollantaytambo para desayuno y \u00faltimas compras, luego 40 minutos m\u00e1s al Km 82. El trek comienza con 2\u00bd horas de terreno relativamente plano hasta el pueblo de Miskay. Subida al sitio inca de Wilkaraqay con vistas del sitio arqueol\u00f3gico de Llactapata (2,750 m). Continuaci\u00f3n de 1 hora hasta Tarayoq (2,598 m) para el almuerzo. Despu\u00e9s del almuerzo, 2\u00bd horas m\u00e1s hasta el campamento en Wayllabamba. Comidas: Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,000 m. Distancia: 10 km. Tiempo: 6 horas. Dificultad: Moderada.', descriptionEn: 'Briefing 1-2 days before. Pickup at 5:20 AM. 1h45m drive to Ollantaytambo for breakfast and last-minute supplies, then 40 more minutes to Km 82. The hike begins with 2\u00bd hours of relatively flat terrain to Miskay Village. Uphill trek to Wilkaraqay Inca site with views of Llactapata (2,750 m). Continue 1 hour to Tarayoq (2,598 m) for lunch. After lunch, 2\u00bd hours more to camp at Wayllabamba. Meals: Lunch/Dinner. Accommodation: Camping. Max altitude: 3,000 m. Distance: 10 km. Time: 6 hours. Difficulty: Moderate.' },
      { day: 2, titleEs: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', titleEn: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', descriptionEs: 'Despu\u00e9s de un delicioso desayuno, comienzo de la caminata hacia el famoso Dead Woman\u2019s Pass. 15 minutos despu\u00e9s de salir, cruce del punto de control. Luego 1h20m cuesta arriba hasta Ayapata. Continuaci\u00f3n de 2 horas hasta Llulluchapampa (3,800 m) para el almuerzo. El tramo hacia Dead Woman\u2019s Pass en Warmiwa\u00f1usca (4,215 m / 13,825 ft) dura 2 horas a trav\u00e9s de monta\u00f1as hermosas y pastizales de los altos Andes. Pausa en la cima para admirar el punto m\u00e1s alto del Camino Inca. Descenso de 2 horas al campamento de Pacaymayu. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 4,215 m. Distancia: 10 km. Tiempo: 7-8 horas. Dificultad: Desafiante.', descriptionEn: 'After a delicious breakfast, begin your hike to the famous Dead Woman\u2019s Pass. 15 minutes after leaving campsite, cross the checkpoint. Then 1h20m uphill to Ayapata. Continue 2 hours to Llulluchapampa (3,800 m) for lunch. The trail leading to Dead Woman\u2019s Pass at Warmiwa\u00f1usca (4,215 m / 13,825 ft) lasts 2 hours through beautiful mountains and high Andes grasslands. Pause at the top to admire the highest point of the Inca Trail. Descend 2 hours to Pacaymayu camp. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 4,215 m. Distance: 10 km. Time: 7-8 hours. Difficulty: Challenging.' },
      { day: 3, titleEs: 'Pacaymayu \u2013 Phuyupatamarca \u2013 Wi\u00f1ay Wayna', titleEn: 'Pacaymayu \u2013 Phuyupatamarca \u2013 Wi\u00f1ay Wayna', descriptionEs: 'Despu\u00e9s de otro fant\u00e1stico desayuno, ascenso de 45 minutos al sitio inca de Runcuraccay. Explicaci\u00f3n del sitio y continuaci\u00f3n cuesta arriba por 1 hora adicional hasta el segundo punto alto, el paso Runcuraccay (3,950 m). Descenso de 90 minutos al sitio inca de Sayacmarca (3,657 m). 25 minutos a Chaquicocha (3,600 m) para un descanso. Caminata de 2 horas hasta el sitio de almuerzo y campamento m\u00e1s hermoso: Phuyupatamarca (3,680 m). Visita al sitio inca de Phuyupatamarca. Luego entrada a la selva nublada, descenso de 2\u00bd horas visitando Inti Pata, donde se toman las fotos m\u00e1s bellas del Camino Inca. 30 minutos m\u00e1s hasta Wi\u00f1ay Wayna (2,680 m), \u00faltimo campamento. Despedida de los porteadores despu\u00e9s de la cena. Comidas: Desayuno/Almuerzo/Cena. Altitud m\u00e1xima: 3,650 m. Distancia: 16 km. Tiempo: 10 horas. Dificultad: F\u00e1cil-Moderada.', descriptionEn: 'After another fantastic breakfast, ascend 45 minutes to Runcuraccay Inca site. Explanation and continue uphill 1 more hour to Runcuraccay pass (3,950 m). 90-minute descent to Sayacmarca Inca site (3,657 m). 25 minutes to Chaquicocha (3,600 m) for a break. 2-hour hike to lunch spot and most beautiful campsite: Phuyupatamarca (3,680 m). Visit Phuyupatamarca Inca site. Then head into the rain forest, 2\u00bd hour downhill visiting Inti Pata, where the most beautiful pictures of the Inca Trail can be taken. 30 more minutes to Wi\u00f1ay Wayna (2,680 m), last camp. Say goodbye to porters after dinner. Meals: Breakfast/Lunch/Dinner. Max altitude: 3,650 m. Distance: 16 km. Time: 10 hours. Difficulty: Easy-Moderate.' },
      { day: 4, titleEs: 'Wi\u00f1ay Wayna \u2013 Machu Picchu \u2013 Aguas Calientes', titleEn: 'Wi\u00f1ay Wayna \u2013 Machu Picchu \u2013 Aguas Calientes', descriptionEs: 'Despertar a las 3:30 AM. Los porteadores le traer\u00e1n t\u00e9 de coca en su carpa con desayuno box. 30 minutos para empacar y caminar al \u00faltimo punto de control. Los controles abren a las 5:30 AM. Tramo final del Camino Inca hasta Inti Punku (Puerta del Sol), la entrada principal de la ciudadela de Machu Picchu. El trayecto es f\u00e1cil y dura aproximadamente 1 hora. Desde Inti Punku, 45 minutos m\u00e1s de descenso hasta la ciudadela. Tiempo para usar ba\u00f1os y cafeter\u00eda. Presentaci\u00f3n de pasaporte original en el control. Caminata de 15 minutos al punto cl\u00e1sico de fotos. Tour guiado de aproximadamente 2 horas por los lugares m\u00e1s importantes de la ciudad inca. Despu\u00e9s de la visita, bus a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a Cusco. Comidas: Desayuno y Almuerzo. Altitud m\u00e1xima: 3,600 m. Distancia: 13 km. Tiempo: 5 horas.', descriptionEn: 'Wake up at 3:30 AM. Porters bring coca tea in your tent with box breakfast. 30 minutes to pack and walk to the last checkpoint. Checkpoints open at 5:30 AM. Final stretch of the Inca Trail to Inti Punku (Sun Gate), the principal entrance to Machu Picchu. The trail is fairly easy, about 1 hour. From Inti Punku, 45 more minutes downhill to the citadel. Time for toilets and cafeteria. Show original passport at the checkpoint. 15-minute walk to the classic photo spot. Guided tour of approximately 2 hours through the most important places of the Inca city. After your visit, bus to Aguas Calientes for lunch, train to Ollantaytambo, and private car to Cusco. Meals: Breakfast and Lunch. Max altitude: 3,600 m. Distance: 13 km. Time: 5 hours.' },
    ],
    itineraryEn: [
      { day: 1, titleEn: 'Cusco \u2013 Trailhead at Km 82 \u2013 Wayllabamba', titleEs: 'Cusco \u2013 Inicio del trek en Km 82 \u2013 Wayllabamba', descriptionEn: 'Briefing 1-2 days before. Pickup at 5:20 AM. 1h45m drive to Ollantaytambo for breakfast and last-minute supplies, then 40 more minutes to Km 82. The hike begins with 2\u00bd hours of relatively flat terrain to Miskay Village. Uphill trek to Wilkaraqay Inca site with views of Llactapata (2,750 m). Continue 1 hour to Tarayoq (2,598 m) for lunch. After lunch, 2\u00bd hours more to camp at Wayllabamba. Meals: Lunch/Dinner. Accommodation: Camping. Max altitude: 3,000 m. Distance: 10 km. Time: 6 hours. Difficulty: Moderate.', descriptionEs: 'Charla informativa 1-2 d\u00edas antes. Recogida a las 5:20 AM. Conducci\u00f3n de 1h45m a Ollantaytambo para desayuno y \u00faltimas compras, luego 40 minutos m\u00e1s al Km 82. El trek comienza con 2\u00bd horas de terreno relativamente plano hasta el pueblo de Miskay. Subida al sitio inca de Wilkaraqay con vistas del sitio arqueol\u00f3gico de Llactapata (2,750 m). Continuaci\u00f3n de 1 hora hasta Tarayoq (2,598 m) para el almuerzo. Despu\u00e9s del almuerzo, 2\u00bd horas m\u00e1s hasta el campamento en Wayllabamba. Comidas: Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,000 m. Distancia: 10 km. Tiempo: 6 horas. Dificultad: Moderada.' },
      { day: 2, titleEn: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', titleEs: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', descriptionEn: 'After a delicious breakfast, begin your hike to the famous Dead Woman\u2019s Pass. 15 minutes after leaving campsite, cross the checkpoint. Then 1h20m uphill to Ayapata. Continue 2 hours to Llulluchapampa (3,800 m) for lunch. The trail leading to Dead Woman\u2019s Pass at Warmiwa\u00f1usca (4,215 m / 13,825 ft) lasts 2 hours through beautiful mountains and high Andes grasslands. Pause at the top to admire the highest point of the Inca Trail. Descend 2 hours to Pacaymayu camp. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 4,215 m. Distance: 10 km. Time: 7-8 hours. Difficulty: Challenging.', descriptionEs: 'Despu\u00e9s de un delicioso desayuno, comienzo de la caminata hacia el famoso Dead Woman\u2019s Pass. 15 minutos despu\u00e9s de salir, cruce del punto de control. Luego 1h20m cuesta arriba hasta Ayapata. Continuaci\u00f3n de 2 horas hasta Llulluchapampa (3,800 m) para el almuerzo. El tramo hacia Dead Woman\u2019s Pass en Warmiwa\u00f1usca (4,215 m / 13,825 ft) dura 2 horas a trav\u00e9s de monta\u00f1as hermosas y pastizales de los altos Andes. Pausa en la cima para admirar el punto m\u00e1s alto del Camino Inca. Descenso de 2 horas al campamento de Pacaymayu. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 4,215 m. Distancia: 10 km. Tiempo: 7-8 horas. Dificultad: Desafiante.' },
      { day: 3, titleEn: 'Pacaymayu \u2013 Phuyupatamarca \u2013 Wi\u00f1ay Wayna', titleEs: 'Pacaymayu \u2013 Phuyupatamarca \u2013 Wi\u00f1ay Wayna', descriptionEn: 'After another fantastic breakfast, ascend 45 minutes to Runcuraccay Inca site. Explanation and continue uphill 1 more hour to Runcuraccay pass (3,950 m). 90-minute descent to Sayacmarca Inca site (3,657 m). 25 minutes to Chaquicocha (3,600 m) for a break. 2-hour hike to lunch spot and most beautiful campsite: Phuyupatamarca (3,680 m). Visit Phuyupatamarca Inca site. Then head into the rain forest, 2\u00bd hour downhill visiting Inti Pata, where the most beautiful pictures of the Inca Trail can be taken. 30 more minutes to Wi\u00f1ay Wayna (2,680 m), last camp. Say goodbye to porters after dinner. Meals: Breakfast/Lunch/Dinner. Max altitude: 3,650 m. Distance: 16 km. Time: 10 hours. Difficulty: Easy-Moderate.', descriptionEs: 'Despu\u00e9s de otro fant\u00e1stico desayuno, ascenso de 45 minutos al sitio inca de Runcuraccay. Explicaci\u00f3n del sitio y continuaci\u00f3n cuesta arriba por 1 hora adicional hasta el segundo punto alto, el paso Runcuraccay (3,950 m). Descenso de 90 minutos al sitio inca de Sayacmarca (3,657 m). 25 minutos a Chaquicocha (3,600 m) para un descanso. Caminata de 2 horas hasta el sitio de almuerzo y campamento m\u00e1s hermoso: Phuyupatamarca (3,680 m). Visita al sitio inca de Phuyupatamarca. Luego entrada a la selva nublada, descenso de 2\u00bd horas visitando Inti Pata, donde se toman las fotos m\u00e1s bellas del Camino Inca. 30 minutos m\u00e1s hasta Wi\u00f1ay Wayna (2,680 m), \u00faltimo campamento. Despedida de los porteadores despu\u00e9s de la cena. Comidas: Desayuno/Almuerzo/Cena. Altitud m\u00e1xima: 3,650 m. Distancia: 16 km. Tiempo: 10 horas. Dificultad: F\u00e1cil-Moderada.' },
      { day: 4, titleEn: 'Wi\u00f1ay Wayna \u2013 Machu Picchu \u2013 Aguas Calientes', titleEs: 'Wi\u00f1ay Wayna \u2013 Machu Picchu \u2013 Aguas Calientes', descriptionEn: 'Wake up at 3:30 AM. Porters bring coca tea in your tent with box breakfast. 30 minutes to pack and walk to the last checkpoint. Checkpoints open at 5:30 AM. Final stretch of the Inca Trail to Inti Punku (Sun Gate), the principal entrance to Machu Picchu. The trail is fairly easy, about 1 hour. From Inti Punku, 45 more minutes downhill to the citadel. Time for toilets and cafeteria. Show original passport at the checkpoint. 15-minute walk to the classic photo spot. Guided tour of approximately 2 hours through the most important places of the Inca city. After your visit, bus to Aguas Calientes for lunch, train to Ollantaytambo, and private car to Cusco. Meals: Breakfast and Lunch. Max altitude: 3,600 m. Distance: 13 km. Time: 5 hours.', descriptionEs: 'Despertar a las 3:30 AM. Los porteadores le traer\u00e1n t\u00e9 de coca en su carpa con desayuno box. 30 minutos para empacar y caminar al \u00faltimo punto de control. Los controles abren a las 5:30 AM. Tramo final del Camino Inca hasta Inti Punku (Puerta del Sol), la entrada principal de la ciudadela de Machu Picchu. El trayecto es f\u00e1cil y dura aproximadamente 1 hora. Desde Inti Punku, 45 minutos m\u00e1s de descenso hasta la ciudadela. Tiempo para usar ba\u00f1os y cafeter\u00eda. Presentaci\u00f3n de pasaporte original en el control. Caminata de 15 minutos al punto cl\u00e1sico de fotos. Tour guiado de aproximadamente 2 horas por los lugares m\u00e1s importantes de la ciudad inca. Despu\u00e9s de la visita, bus a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a Cusco. Comidas: Desayuno y Almuerzo. Altitud m\u00e1xima: 3,600 m. Distancia: 13 km. Tiempo: 5 horas.' },
    ],
    pricingNoteEs: 'Recomendamos reservar el Camino Inca con al menos 6 meses de anticipaci\u00f3n.',
    pricingNoteEn: 'We recommend booking the Inca Trail at least 6 months in advance.',
  },
  
  {
    id: 'inka-trail-5d',
    slug: 'inka-trail-5d',
    destination: 'cusco',
    image: '/tours/inka-trail-5d.jpg',
    gallery: ['/tours/inka-trail-5d-2.jpg', '/tours/inka-trail-5d-10.jpg', '/tours/inka-trail-5d-12.jpg', '/tours/inka-trail-5d-13.jpg', '/tours/inka-trail-5d-14.jpg', '/tours/inka-trail-5d-15.jpg', '/tours/inka-trail-5d-16.jpg', '/tours/inka-trail-5d-17.jpg'],
    nameEs: 'Camino Inca a Machu Picchu 5 D\u00edas / 4 Noches \u2013 Servicio Privado',
    nameEn: 'Inca Trail to Machu Picchu 5 Days / 4 Nights \u2013 Private Service',
    subtitleEs: 'Servicio Privado \u2013 La Experiencia Extendida del Camino Inca',
    subtitleEn: 'Private Service \u2013 The Extended Inca Trail Experience',
    descriptionEs: 'La experiencia definitiva extendida del Camino Inca: 5 d\u00edas y 4 noches de trekking por el antiguo sendero inca, cruzando pasos de monta\u00f1a y ruinas ancestrales hasta llegar a Machu Picchu por la Puerta del Sol. Este servicio privado incluye porteadores ind\u00edgenas, chef personal, equipo de campamento completo y comidas excepcionales. Incluye una noche de hotel en Aguas Calientes y un d\u00eda completo dedicado a recorrer Machu Picchu. Un d\u00eda antes del trek, tendr\u00e1 una sesi\u00f3n informativa detallada con su gu\u00eda en su hotel. Recomendamos reservar con al menos 6 meses de anticipaci\u00f3n.',
    descriptionEn: 'The ultimate extended Inca Trail experience: 5 days and 4 nights trekking along the ancient Inca path, crossing mountain passes and ancestral ruins until reaching Machu Picchu through the Sun Gate. This private service includes indigenous porters, personal chef, complete camping equipment, and excellent meals. Includes one night hotel in Aguas Calientes and a full day dedicated to exploring Machu Picchu. One day before your trek, you will have an in-depth briefing with your guide at your hotel. We recommend booking at least 6 months in advance.',
    duration: 5,
    difficulty: 'advanced',
    priceUSD: 2529,
    highSeasonPrice: 2529,
    includesEs: ['Charla informativa del trek con su gu\u00eda', 'Gu\u00eda profesional de trek', 'Segundo gu\u00eda para grupos de 9+', 'Transporte privado y conductor profesional al inicio del trek (km 82)', 'Todos los boletos de entrada y permisos para el Camino Inca y Parque Machu Picchu', 'Porteadores ind\u00edgenas para equipo de campamento: carpas de clientes, carpas de comedor y cocina, mesa, taburetes, equipo de cocci\u00f3n, estufa, gas, cubiertos, platos, comida y vegetales frescos', 'Boleto de bus de Machu Picchu a Aguas Calientes', 'Tour guiado de Machu Picchu (2 hrs)', '1 boleto de tren de Machu Picchu Pueblo a Ollantaytambo (Tren Tur\u00edstico Expedition)', 'Transporte de Ollantaytambo a la ciudad de Cusco', '3 noches de campamento "Inca Trail Trek" carpas amplias/colchoneta', '1 noche de hotel en Aguas Calientes', 'Agua hervida desde el tercer d\u00eda (para beber durante la caminata)', 'Un chef y cocinero asistente', 'Comidas excelentes: 3 desayunos, 4 almuerzos, 3 cenas (pancakes, omelettes, sopas, frutas frescas, aguacate, pasta, pollo, pescado, carne y arroz)', 'Dietas vegetarianas, veganas o especiales bajo solicitud', 'Hora del t\u00e9 antes de la cena (t\u00e9, caf\u00e9, galletas y palomitas)', 'Despertar con t\u00e9 de coca en su carpa', 'Agua caliente para lavarse en su carpa cada d\u00eda', 'Jab\u00f3n biodegradable y gel limpiador de manos', 'Tanque de ox\u00edgeno y botiqu\u00edn de primeros auxilios', 'Todos los impuestos locales'],
    includesEn: ['Trek briefing with your guide', 'Professional trek guide', 'Second tour guide for groups of 9+', 'Private transport and professional driver (to the starting point of hike \u2013 km 82)', 'All entrance tickets and permits for Inca Trail and Machu Picchu Park', 'Indigenous porters to carry camping equipment: client tents, dining and cooking tents, table, stools, cooking gear, stove, gas container, cutlery, plates, food and fresh vegetables', 'Bus ticket from Machu Picchu to Aguas Calientes Village', 'Machu Picchu guided tour (2 hrs)', '1 train ticket from Machu Picchu Pueblo to Ollantaytambo village (Expedition Tourist Train)', 'Transport from Ollantaytambo village to Cusco City', '3 nights camping "Inca Trail Trek" Spacious tents/Sleeping mat', '1 Night in a Hotel', 'Boiled water provided from 3rd day on (for drinking during the hike)', 'One chef and assistant cook', 'Excellent Meals: 3 Breakfasts, 4 Lunches, 3 Dinners (pancakes, omelettes, soups, fresh fruit, avocado, pasta, chicken, fish, meat, and rice)', 'Vegetarian, vegan or special diet meals upon request', 'Tea time before dinner (tea, coffee, biscuits and popcorn)', 'Wake up to coca tea in your tent', 'Buckets of hot water for washing in your tent every day', 'Biodegradable soap and hand cleansing gel', 'Oxygen Tank & First aid kit', 'All local taxes'],
    excludesEs: ['Saco de dormir (se puede alquilar con nosotros)', 'Desayuno en el D\u00eda 1, cena en el D\u00eda 4, almuerzo y cena en el D\u00eda 5', 'Entrada a la monta\u00f1a Huayna Picchu $70.00', 'Snacks energ\u00e9ticos (barras de chocolate y frutas secas recomendadas)', 'Propinas para el equipo (porteros, chef y gu\u00eda)'],
    excludesEn: ['Sleeping Bag (Can be hired from us)', 'Breakfast on Day 1, dinner on Day 4 and Lunch and Dinner Day 5', 'Entrance to Huayna Picchu Mountain $70.00', 'Energy snacks (chocolate bars and dried fruits recommended)', 'Tips for the crew (porters, chef and guide)'],
    highlightsEs: ['Servicio privado exclusivo con gu\u00eda personal y chef', '5 d\u00edas de trekking por el aut\u00e9ntico Camino Inca', 'Cruce del paso Dead Woman\u2019s a 4,215 msnm', 'Ruinas inca: Llactapata, Runcuraccay, Sayacmarca, Phuyupatamarca, Wi\u00f1ay Wayna', 'Llegada a Machu Picchu por Inti Punku (Puerta del Sol)', '1 noche de hotel en Aguas Calientes', 'D\u00eda 5 dedicado al tour completo de Machu Picchu', 'Comidas excepcionales preparadas por chef personal', 'Recomendamos reservar con al menos 6 meses de anticipaci\u00f3n'],
    highlightsEn: ['Exclusive private service with personal guide and chef', '5 days trekking the authentic Inca Trail', 'Cross Dead Woman\u2019s Pass at 4,215 masl', 'Inca ruins: Llactapata, Runcuraccay, Sayacmarca, Phuyupatamarca, Wi\u00f1ay Wayna', 'Arrive at Machu Picchu through Inti Punku (Sun Gate)', '1 night hotel in Aguas Calientes', 'Day 5 dedicated to a full Machu Picchu tour', 'Excellent meals prepared by personal chef', 'We recommend booking at least 6 months in advance'],
    whatToBringEs: 'Mochila de d\u00eda, pasaporte original, seguro de viaje, botas de trekking ligeras, 3 pantalones de trekking (no jeans), capas para temperaturas variables, chaqueta de lluvia, chaqueta de invierno, 5 pares de ropa interior, 6 pares de calcetines, 5 camisas (3 manga larga), forro de saco de dormir, pa\u00f1uelos y toallitas h\u00famedas, pastillas de hierro para el mal de altura, protecci\u00f3n solar SPF 45+, repelente de insectos con 30% DEET, botella de agua reutilizable, c\u00e1mara, l\u00e1mpara frontal con bater\u00edas extra, vendas o moleskin, sandalias, art\u00edculos de aseo, medicamentos (Imodium, Ibuprofeno), bolsas de pl\u00e1stico, dinero extra (S/ 500-600 / USD$200)',
    whatToBringEn: 'A good day pack, original passport, travel insurance, lighter trekking boots (with good ankle support), 3 pairs of trekking pants (not jeans), layers for variable temperatures, 1 rain jacket, 1 warm/winter jacket, 5 pairs of underwear, 6 pairs of socks, 5 shirts (3 long sleeve), sleeping bag liner, travel-size tissues and wet wipes, iron tablets and pills for altitude sickness, sun protection cream SPF 45+, bug spray with 30% DEET, re-usable water container or hydration pack, camera, headlamp with spare batteries, bandages or moleskin, flip flops, toiletries, medication (Imodium AD, Ibuprofen/Acetaminophen), plastic bags for dirty/wet clothes, extra money (500-600 soles / USD$200)',
    featured: false,
    active: true,
    itineraryEs: [
      { day: 0, titleEs: 'Charla Pre-trek', titleEn: 'Pre-trek Briefing', descriptionEs: 'Tendr\u00e1s una charla detallada con tu gu\u00eda 1 o 2 d\u00edas antes del trek. Tu gu\u00eda te visitar\u00e1 en tu hotel donde podr\u00e1s hacer preguntas y preparaciones finales.', descriptionEn: 'You will have an in-depth briefing with your guide 1 or 2 days before your trek. Your guide will meet you at your hotel and you can take this opportunity to ask questions and make any final preparations.' },
      { day: 1, titleEs: 'Cusco \u2013 Inicio del Trek en Km 82 \u2013 Wayllabamba', titleEn: 'Cusco \u2013 Trailhead at Km 82 \u2013 Wayllabamba', descriptionEs: 'Recogida a las 5:20 AM en tu hotel. Conducci\u00f3n de 1h45m a Ollantaytambo para desayuno y \u00faltimas compras, luego 45 minutos m\u00e1s al Km 82. El trek comienza con 2\u00bd horas de terreno relativamente plano hasta Miskay. Subida al sitio inca de Wilkaraqay con vistas de Llactapata (2,750 m). Continuaci\u00f3n de 1 hora hasta Tarayoq (2,598 m) para el almuerzo. Despu\u00e9s del almuerzo, 2\u00bd horas m\u00e1s hasta el campamento en Wayllabamba. Comidas: Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,000 m / 9,842 ft. M\u00ednima: 2,750 m. Distancia: 10 km. Tiempo: 6 horas. Dificultad: Moderada.', descriptionEn: 'Pickup at 5:20 AM at your hotel. 1h45m drive to Ollantaytambo for breakfast and last-minute supplies, then 40 more minutes to Km 82. The hike begins with 2\u00bd hours of relatively flat terrain to Miskay. Uphill trek to Wilkaraqay Inca site with views of Llactapata (2,750 m). Continue 1 hour to Tarayoq (2,598 m) for lunch. After lunch, 2\u00bd hours more to camp at Wayllabamba. Meals: Lunch/Dinner. Accommodation: Camping. Max altitude: 3,000 m / 9,842 ft. Min: 2,750 m. Distance: 10 km. Time: 6 hours. Difficulty: Moderate.' },
      { day: 2, titleEs: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', titleEn: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', descriptionEs: 'Despu\u00e9s de un delicioso desayuno, caminata hacia el famoso Dead Woman\u2019s Pass. 10 minutos despu\u00e9s cruzamos el punto de control. Luego 1h15m cuesta arriba hasta Ayapata. Pasamos por varias biozonas incluyendo la sierra baja y la alta puna. Llegamos a Llulluchapampa (3,800 m) para el almuerzo. El tramo hacia Dead Woman\u2019s Pass en Warmiwa\u00f1usca (4,215 m / 13,825 ft) dura 2 horas a trav\u00e9s de monta\u00f1as hermosas y pastizales de los altos Andes. Pausa en la cima para admirar el punto m\u00e1s alto del Camino Inca. Descenso de 2 horas al campamento de Pacaymayu. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 4,215 m. Distancia: 10 km. Tiempo: 7-8 horas. Dificultad: Desafiante.', descriptionEn: 'After a delicious breakfast, hike to the famous Dead Woman\u2019s Pass. 10 minutes after leaving we cross the checkpoint. Then 1h15m uphill to Ayapata. We pass through various biozones including the low sierra and high puna. Reach Llulluchapampa (3,800 m) for lunch. The trail to Dead Woman\u2019s Pass at Warmiwa\u00f1usca (4,215 m / 13,825 ft) lasts 2 hours through beautiful mountains and high Andes grasslands. Pause at the top to admire the highest point of the Inca Trail. Descend 2 hours to Pacaymayu camp. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 4,215 m. Distance: 10 km. Time: 7-8 hours. Difficulty: Challenging.' },
      { day: 3, titleEs: 'Pacaymayu \u2013 Phuyupatamarca', titleEn: 'Pacaymayu \u2013 Phuyupatamarca', descriptionEs: 'Ascenso de 45 minutos al sitio inca de Runcuraccay. Continuaci\u00f3n cuesta arriba 1 hora adicional hasta el paso Runcuraccay (3,950 m). Descenso de 90 minutos a Sayacmarca (3,657 m). 25 minutos a Chaquicocha (3,600 m) para el almuerzo. Caminata de 2 horas hasta Phuyupatamarca (3,680 m), el campamento m\u00e1s hermoso con vistas del atardecer, Aguas Calientes, Machu Picchu Mountain y Huayna Picchu Mountain. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,900 m. M\u00ednima: 3,600 m. Distancia: 9 km. Tiempo: 6 horas. Dificultad: Moderada.', descriptionEn: 'Ascend 45 minutes to Runcuraccay Inca site. Continue uphill 1 more hour to Runcuraccay pass (3,950 m). 90-minute descent to Sayacmarca (3,657 m). 25 minutes to Chaquicocha (3,600 m) for lunch. 2-hour hike to Phuyupatamarca (3,680 m), the most beautiful campsite with sunset views, Aguas Calientes, Machu Picchu Mountain and Huayna Picchu Mountain. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 3,900 m. Min: 3,600 m. Distance: 9 km. Time: 6 hours. Difficulty: Moderate.' },
      { day: 4, titleEs: 'Phuyupatamarca \u2013 Machu Picchu \u2013 Aguas Calientes', titleEn: 'Phuyupatamarca \u2013 Machu Picchu \u2013 Aguas Calientes', descriptionEs: 'Opci\u00f3n de despertar temprano para ver el amanecer. Nos despedimos de la mayor\u00eda de nuestros porteadores. Descenso visitando el sitio inca de Phuyupatamarca. Entramos en la selva nublada, 2\u00bd horas cuesta abajo visitando Inti Pata, donde se toman las fotos m\u00e1s bellas del Camino Inca. 30 minutos m\u00e1s hasta Wi\u00f1ay Wayna (2,680 m) para almorzar. Visita opcional al sitio arqueol\u00f3gico de Wi\u00f1ay Wayna. Tramo final hasta Inti Punku (Puerta del Sol), la entrada principal de Machu Picchu. Llegada por la tarde, bus a Aguas Calientes donde tendremos hotel y cena. Comidas: Desayuno y Almuerzo. Altitud m\u00e1xima: 3,600 m. M\u00ednima: 2,000 m. Distancia: 13 km. Tiempo: 5 horas.', descriptionEn: 'Option to wake up early to see the sunrise. Say goodbye to most of our porters. Descent visiting Phuyupatamarca Inca site. Head into the rain forest, 2\u00bd hours downhill visiting Inti Pata, where the most beautiful pictures of the Inca Trail can be taken. 30 more minutes to Wi\u00f1ay Wayna (2,680 m) for lunch. Optional visit to Wi\u00f1ay Wayna archaeological site. Final stretch to Inti Punku (Sun Gate), the principal entrance to Machu Picchu. Late afternoon arrival, bus to Aguas Calientes for hotel and dinner. Meals: Breakfast and Lunch. Max altitude: 3,600 m. Min: 2,000 m. Distance: 13 km. Time: 5 hours.' },
      { day: 5, titleEs: 'Aguas Calientes \u2013 Tour de Machu Picchu', titleEn: 'Aguas Calientes \u2013 Machu Picchu Tour', descriptionEs: 'Hoy visitaremos la enigm\u00e1tica ciudadela de Machu Picchu. Tomaremos un bus por 25 minutos hasta las entradas del sitio inca, luego subiremos para tener una gran vista de la ciudad. Nuestro tour durar\u00e1 aproximadamente 2 horas. Despu\u00e9s, bus de regreso a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a Cusco.', descriptionEn: 'Today we visit the enigmatic citadel of Machu Picchu. We take a bus for 25 minutes to the entrances of the Inca site, then go up to the top for a great view of the city. Our tour lasts about 2 hours. After our visit, bus back to Aguas Calientes for lunch, train to Ollantaytambo, and private car back to Cusco.' },
    ],
    itineraryEn: [
      { day: 0, titleEn: 'Pre-trek Briefing', titleEs: 'Charla Pre-trek', descriptionEn: 'You will have an in-depth briefing with your guide 1 or 2 days before your trek. Your guide will meet you at your hotel and you can take this opportunity to ask questions and make any final preparations.', descriptionEs: 'Tendr\u00e1s una charla detallada con tu gu\u00eda 1 o 2 d\u00edas antes del trek. Tu gu\u00eda te visitar\u00e1 en tu hotel donde podr\u00e1s hacer preguntas y preparaciones finales.' },
      { day: 1, titleEn: 'Cusco \u2013 Trailhead at Km 82 \u2013 Wayllabamba', titleEs: 'Cusco \u2013 Inicio del Trek en Km 82 \u2013 Wayllabamba', descriptionEn: 'Pickup at 5:20 AM at your hotel. 1h45m drive to Ollantaytambo for breakfast and last-minute supplies, then 40 more minutes to Km 82. The hike begins with 2\u00bd hours of relatively flat terrain to Miskay. Uphill trek to Wilkaraqay Inca site with views of Llactapata (2,750 m). Continue 1 hour to Tarayoq (2,598 m) for lunch. After lunch, 2\u00bd hours more to camp at Wayllabamba. Meals: Lunch/Dinner. Accommodation: Camping. Max altitude: 3,000 m / 9,842 ft. Min: 2,750 m. Distance: 10 km. Time: 6 hours. Difficulty: Moderate.', descriptionEs: 'Recogida a las 5:20 AM en tu hotel. Conducci\u00f3n de 1h45m a Ollantaytambo para desayuno y \u00faltimas compras, luego 45 minutos m\u00e1s al Km 82. El trek comienza con 2\u00bd horas de terreno relativamente plano hasta Miskay. Subida al sitio inca de Wilkaraqay con vistas de Llactapata (2,750 m). Continuaci\u00f3n de 1 hora hasta Tarayoq (2,598 m) para el almuerzo. Despu\u00e9s del almuerzo, 2\u00bd horas m\u00e1s hasta el campamento en Wayllabamba. Comidas: Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,000 m / 9,842 ft. M\u00ednima: 2,750 m. Distancia: 10 km. Tiempo: 6 horas. Dificultad: Moderada.' },
      { day: 2, titleEn: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', titleEs: 'Wayllabamba \u2013 Dead Woman\u2019s Pass \u2013 Pacaymayu', descriptionEn: 'After a delicious breakfast, hike to the famous Dead Woman\u2019s Pass. 10 minutes after leaving we cross the checkpoint. Then 1h15m uphill to Ayapata. We pass through various biozones including the low sierra and high puna. Reach Llulluchapampa (3,800 m) for lunch. The trail to Dead Woman\u2019s Pass at Warmiwa\u00f1usca (4,215 m / 13,825 ft) lasts 2 hours through beautiful mountains and high Andes grasslands. Pause at the top to admire the highest point of the Inca Trail. Descend 2 hours to Pacaymayu camp. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 4,215 m. Distance: 10 km. Time: 7-8 hours. Difficulty: Challenging.', descriptionEs: 'Despu\u00e9s de un delicioso desayuno, caminata hacia el famoso Dead Woman\u2019s Pass. 10 minutos despu\u00e9s cruzamos el punto de control. Luego 1h15m cuesta arriba hasta Ayapata. Pasamos por varias biozonas incluyendo la sierra baja y la alta puna. Llegamos a Llulluchapampa (3,800 m) para el almuerzo. El tramo hacia Dead Woman\u2019s Pass en Warmiwa\u00f1usca (4,215 m / 13,825 ft) dura 2 horas a trav\u00e9s de monta\u00f1as hermosas y pastizales de los altos Andes. Pausa en la cima para admirar el punto m\u00e1s alto del Camino Inca. Descenso de 2 horas al campamento de Pacaymayu. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 4,215 m. Distancia: 10 km. Tiempo: 7-8 horas. Dificultad: Desafiante.' },
      { day: 3, titleEn: 'Pacaymayu \u2013 Phuyupatamarca', titleEs: 'Pacaymayu \u2013 Phuyupatamarca', descriptionEn: 'Ascend 45 minutes to Runcuraccay Inca site. Continue uphill 1 more hour to Runcuraccay pass (3,950 m). 90-minute descent to Sayacmarca (3,657 m). 25 minutes to Chaquicocha (3,600 m) for lunch. 2-hour hike to Phuyupatamarca (3,680 m), the most beautiful campsite with sunset views, Aguas Calientes, Machu Picchu Mountain and Huayna Picchu Mountain. Meals: Breakfast/Lunch/Dinner. Accommodation: Camping. Max altitude: 3,900 m. Min: 3,600 m. Distance: 9 km. Time: 6 hours. Difficulty: Moderate.', descriptionEs: 'Ascenso de 45 minutos al sitio inca de Runcuraccay. Continuaci\u00f3n cuesta arriba 1 hora adicional hasta el paso Runcuraccay (3,950 m). Descenso de 90 minutos a Sayacmarca (3,657 m). 25 minutos a Chaquicocha (3,600 m) para el almuerzo. Caminata de 2 horas hasta Phuyupatamarca (3,680 m), el campamento m\u00e1s hermoso con vistas del atardecer, Aguas Calientes, Machu Picchu Mountain y Huayna Picchu Mountain. Comidas: Desayuno/Almuerzo/Cena. Alojamiento: Campamento. Altitud m\u00e1xima: 3,900 m. M\u00ednima: 3,600 m. Distancia: 9 km. Tiempo: 6 horas. Dificultad: Moderada.' },
      { day: 4, titleEn: 'Phuyupatamarca \u2013 Machu Picchu \u2013 Aguas Calientes', titleEs: 'Phuyupatamarca \u2013 Machu Picchu \u2013 Aguas Calientes', descriptionEn: 'Option to wake up early to see the sunrise. Say goodbye to most of our porters. Descent visiting Phuyupatamarca Inca site. Head into the rain forest, 2\u00bd hours downhill visiting Inti Pata, where the most beautiful pictures of the Inca Trail can be taken. 30 more minutes to Wi\u00f1ay Wayna (2,680 m) for lunch. Optional visit to Wi\u00f1ay Wayna archaeological site. Final stretch to Inti Punku (Sun Gate), the principal entrance to Machu Picchu. Late afternoon arrival, bus to Aguas Calientes for hotel and dinner. Meals: Breakfast and Lunch. Max altitude: 3,600 m. Min: 2,000 m. Distance: 13 km. Time: 5 hours.', descriptionEs: 'Opci\u00f3n de despertar temprano para ver el amanecer. Nos despedimos de la mayor\u00eda de nuestros porteadores. Descenso visitando el sitio inca de Phuyupatamarca. Entramos en la selva nublada, 2\u00bd horas cuesta abajo visitando Inti Pata, donde se toman las fotos m\u00e1s bellas del Camino Inca. 30 minutos m\u00e1s hasta Wi\u00f1ay Wayna (2,680 m) para almorzar. Visita opcional al sitio arqueol\u00f3gico de Wi\u00f1ay Wayna. Tramo final hasta Inti Punku (Puerta del Sol), la entrada principal de Machu Picchu. Llegada por la tarde, bus a Aguas Calientes donde tendremos hotel y cena. Comidas: Desayuno y Almuerzo. Altitud m\u00e1xima: 3,600 m. M\u00ednima: 2,000 m. Distancia: 13 km. Tiempo: 5 horas.' },
      { day: 5, titleEn: 'Aguas Calientes \u2013 Machu Picchu Tour', titleEs: 'Aguas Calientes \u2013 Tour de Machu Picchu', descriptionEn: 'Today we visit the enigmatic citadel of Machu Picchu. We take a bus for 25 minutes to the entrances of the Inca site, then go up to the top for a great view of the city. Our tour lasts about 2 hours. After our visit, bus back to Aguas Calientes for lunch, train to Ollantaytambo, and private car back to Cusco.', descriptionEs: 'Hoy visitaremos la enigm\u00e1tica ciudadela de Machu Picchu. Tomaremos un bus por 25 minutos hasta las entradas del sitio inca, luego subiremos para tener una gran vista de la ciudad. Nuestro tour durar\u00e1 aproximadamente 2 horas. Despu\u00e9s, bus de regreso a Aguas Calientes para almorzar, tren a Ollantaytambo y auto privado a Cusco.' },
    ],
    pricingNoteEs: 'Precios por persona: 1-2 personas $2,529 | 3 personas $2,339 | 4 personas $2,159 | 5 personas $1,929 | 6 personas $1,869 | 7 personas $1,819 | 8+ personas $1,779. No incluye hoteles. Recomendamos reservar con al menos 6 meses de anticipaci\u00f3n. Alquileres: Bastones $20 | Saco de dormir $25 | Carpa privada $30. Machu Picchu Mountain: $75 | Huayna Picchu: $75 (reservar con anticipaci\u00f3n).',
    pricingNoteEn: 'Prices per person: 1-2 people $2,529 | 3 people $2,339 | 4 people $2,159 | 5 people $1,929 | 6 people $1,869 | 7 people $1,819 | 8+ people $1,779. Hotels not included. We recommend booking at least 6 months in advance. Rentals: Hiking poles $20 | Sleeping bag $25 | Private Tent $30. Machu Picchu Mountain: $75 | Huayna Picchu: $75 (book in advance).',
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
