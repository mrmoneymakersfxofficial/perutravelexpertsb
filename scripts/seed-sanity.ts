/**
 * Script de migración: Pobla Sanity CMS con los datos locales existentes.
 * 
 * Uso: 
 *   1. Crea un token de API con permisos de escritura en manage.sanity.io
 *   2. Ejecuta: SANITY_WRITE_TOKEN=xxx npx tsx scripts/seed-sanity.ts
 * 
 * Este script crea todos los documentos en Sanity para que el Visual Editing
 * overlay funcione correctamente en todas las páginas.
 */
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e1mckeul";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Se necesita un SANITY_WRITE_TOKEN");
  console.error("   Crea uno en: https://manage.sanity.io/projects/e1mckeul/api");
  console.error("   Luego ejecuta: SANITY_WRITE_TOKEN=xxx npx tsx scripts/seed-sanity.ts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ─── Tipos ────────────────────────────────────────

interface DocInput {
  _type: string;
  _id?: string;
  [key: string]: any;
}

// ─── Helpers ───────────────────────────────────────

let totalCreated = 0;
let totalSkipped = 0;

async function createIfNotExists(doc: DocInput) {
  const id = doc._id || `${doc._type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  try {
    const existing = await client.getDocument(id);
    if (existing) {
      console.log(`  ⏭️  Ya existe: ${doc._type} — ${doc.title || doc.name || doc.nameEs || doc.authorName || id}`);
      totalSkipped++;
      return existing;
    }
    const result = await client.createIfNotExists({ ...doc, _id: id });
    console.log(`  ✅ Creado: ${doc._type} — ${doc.title || doc.name || doc.nameEs || doc.authorName || id}`);
    totalCreated++;
    return result;
  } catch (err: any) {
    console.error(`  ❌ Error creando ${doc._type}: ${err.message}`);
    return null;
  }
}

function slugId(type: string, slug: string): string {
  return `${type}-${slug}`;
}

function blockText(text: string) {
  return [
    {
      _type: "block",
      _key: `key_${Math.random().toString(36).slice(2, 8)}`,
      style: "normal",
      children: [
        { _type: "span", _key: `span_${Math.random().toString(36).slice(2, 8)}`, text, marks: [] },
      ],
      markDefs: [],
    },
  ];
}

// ─── Datos locales ─────────────────────────────────

const destinations = [
  { id: "cusco", slug: "cusco", nameEs: "Cusco", nameEn: "Cusco", descriptionEs: "La capital histórica del Perú, puerta de entrada a Machu Picchu.", descriptionEn: "The historical capital of Peru, gateway to Machu Picchu." },
  { id: "puno", slug: "puno", nameEs: "Puno", nameEn: "Puno", descriptionEs: "La capital folclórica del Perú, a orillas del Lago Titicaca.", descriptionEn: "The folkloric capital of Peru, on the shores of Lake Titicaca." },
  { id: "amazon", slug: "amazon", nameEs: "Amazonía", nameEn: "Amazon", descriptionEs: "La selva amazónica peruana, hogar de una biodiversidad increíble.", descriptionEn: "The Peruvian Amazon rainforest, home to incredible biodiversity." },
  { id: "arequipa", slug: "arequipa", nameEs: "Arequipa", nameEn: "Arequipa", descriptionEs: "La Ciudad Blanca, rodeada de volcanes y cañones.", descriptionEn: "The White City, surrounded by volcanoes and canyons." },
  { id: "lima-ica", slug: "lima-ica", nameEs: "Lima-Ica", nameEn: "Lima-Ica", descriptionEs: "La costa peruana: historia, cultura y naturaleza.", descriptionEn: "The Peruvian coast: history, culture, and nature." },
];

const tourData: Record<string, any> = {
  "city-tour-cusco": {
    title: "City Tour Cusco Imperial", titleEn: "Cusco Imperial City Tour",
    excerpt: "Descubre la ciudad imperial de Cusco en un recorrido por sus principales sitios arqueológicos.", excerptEn: "Discover the imperial city of Cusco on a tour of its main archaeological sites.",
    duration: 1, difficulty: "easy", priceUSD: 69,
    includes: ["Guía profesional bilingüe", "Transporte turístico", "Entrada a sitios arqueológicos", "Asistencia permanente"],
    includesEn: ["Professional bilingual guide", "Tourist transport", "Entry to archaeological sites", "Permanent assistance"],
    notIncludes: ["Alimentación", "Gastos personales"],
    notIncludesEn: ["Meals", "Personal expenses"],
    highlightsEs: ["Templo del Sol Qoricancha", "Plaza de Armas", "Catedral del Cusco", "Sacsayhuamán", "Qenqo"],
    highlightsEn: ["Qoricancha Sun Temple", "Main Square", "Cusco Cathedral", "Sacsayhuamán", "Qenqo"],
    itinerary: [
      { dayNumber: 1, title: "City Tour Cusco", titleEn: "Cusco City Tour", description: "Recorrido por: Qoricancha, Plaza de Armas, Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay.", descriptionEn: "Tour through: Qoricancha, Main Square, Sacsayhuamán, Qenqo, Puka Pukara and Tambomachay." },
    ],
    destinationSlug: "cusco", featured: true, active: true,
  },
  "valle-sagrado": {
    title: "Valle Sagrado de los Incas", titleEn: "Sacred Valley of the Incas",
    excerpt: "Explora el corazón del imperio inca en un día lleno de historia y paisajes impresionantes.", excerptEn: "Explore the heart of the Inca empire in a day full of history and stunning landscapes.",
    duration: 1, difficulty: "easy", priceUSD: 209,
    includes: ["Guía bilingüe", "Transporte", "Desayuno buffet", "Almuerzo buffet", "Entradas a sitios"],
    includesEn: ["Bilingual guide", "Transport", "Buffet breakfast", "Buffet lunch", "Site tickets"],
    notIncludes: ["Gastos personales", "Propinas"],
    notIncludesEn: ["Personal expenses", "Tips"],
    highlightsEs: ["Chinchero", "Moray", "Maras", "Urubamba", "Ollantaytambo", "Pisac", "Mercado artesanal"],
    highlightsEn: ["Chinchero", "Moray", "Maras", "Urubamba", "Ollantaytambo", "Pisac", "Craft market"],
    pricingNoteEs: "Precios especiales para grupos de 4+ personas: $179 USD por persona",
    pricingNoteEn: "Special prices for groups of 4+: $179 USD per person",
    itinerary: [
      { dayNumber: 1, title: "Valle Sagrado", titleEn: "Sacred Valley", description: "Chinchero → Moray → Maras → Urubamba (almuerzo) → Ollantaytambo → Pisac", descriptionEn: "Chinchero → Moray → Maras → Urubamba (lunch) → Ollantaytambo → Pisac" },
    ],
    destinationSlug: "cusco", featured: true, active: true,
  },
  "machu-picchu": {
    title: "Machu Picchu Full Day", titleEn: "Machu Picchu Full Day",
    excerpt: "La experiencia definitiva: visita la maravilla del mundo Machu Picchu en un día.", excerptEn: "The ultimate experience: visit the wonder of the world Machu Picchu in one day.",
    duration: 1, difficulty: "moderate", priceUSD: 499,
    includes: ["Transporte ida y vuelta", "Ticket de ingreso a Machu Picchu", "Guía profesional bilingüe", "Tour en Vistadome", "Asistencia personalizada", "Agua y snack", "Coordinación 24/7", "Seguro básico"],
    includesEn: ["Round trip transport", "Machu Picchu entry ticket", "Professional bilingual guide", "Vistadome train tour", "Personalized assistance", "Water and snack", "24/7 coordination", "Basic insurance"],
    notIncludes: ["Alimentación en Aguas Calientes", "Gastos personales"],
    notIncludesEn: ["Meals in Aguas Calientes", "Personal expenses"],
    highlightsEs: ["Machu Picchu", "Inti Punku (Puerta del Sol)", "Aguas Calientes", "Tren Vistadome", "Valle Sagrado", "Mirador", "Fotos profesionales"],
    highlightsEn: ["Machu Picchu", "Inti Punku (Sun Gate)", "Aguas Calientes", "Vistadome train", "Sacred Valley", "Viewpoint", "Professional photos"],
    itinerary: [
      { dayNumber: 1, title: "Machu Picchu", titleEn: "Machu Picchu", description: "8:00 AM recojo en hotel → Tren Vistadome → Aguas Calientes → 2:00 PM guiado en MP → Retorno", descriptionEn: "8:00 AM pickup at hotel → Vistadome train → Aguas Calientes → 2:00 PM guided tour in MP → Return" },
    ],
    destinationSlug: "cusco", featured: true, active: true,
  },
  "montana-colores": {
    title: "Montaña de Colores / Vinicunca", titleEn: "Rainbow Mountain / Vinicunca",
    excerpt: "Una de las caminatas más espectaculares de los Andes peruanos.", excerptEn: "One of the most spectacular hikes in the Peruvian Andes.",
    duration: 1, difficulty: "moderate", priceUSD: 55,
    includes: ["Guía bilingüe", "Desayuno", "Almuerzo", "Transporte", "Caballo de emergencia"],
    includesEn: ["Bilingual guide", "Breakfast", "Lunch", "Transport", "Emergency horse"],
    notIncludes: ["Entrada (10 soles)", "Gastos personales"],
    notIncludesEn: ["Entry fee (10 soles)", "Personal expenses"],
    highlightsEs: ["Montaña de Colores", "Valle Sur", "Cusipata", "Nevados", "Camélidos andinos"],
    highlightsEn: ["Rainbow Mountain", "South Valley", "Cusipata", "Snow-capped peaks", "Andean camelids"],
    itinerary: [{ dayNumber: 1, title: "Montaña de Colores", titleEn: "Rainbow Mountain", description: "4:00 AM recojo → Cusipata → Desayuno → Inicio trek → Vinicunca → Retorno", descriptionEn: "4:00 AM pickup → Cusipata → Breakfast → Start trek → Vinicunca → Return" }],
    destinationSlug: "cusco", featured: true, active: true,
  },
  "lake-humantay": {
    title: "Laguna de Humantay", titleEn: "Humantay Lagoon",
    excerpt: "Una laguna turquesa escondida en los Andes, ideal para los amantes de la naturaleza.", excerptEn: "A turquoise lagoon hidden in the Andes, ideal for nature lovers.",
    duration: 1, difficulty: "moderate", priceUSD: 219,
    includes: ["Guía bilingüe", "Transporte", "Desayuno", "Almuerzo", "Bastones de trekking", "Botiquín de emergencia"],
    includesEn: ["Bilingual guide", "Transport", "Breakfast", "Lunch", "Trekking poles", "Emergency kit"],
    notIncludes: ["Entrada (20 soles)", "Caballo de alquiler", "Gastos personales"],
    notIncludesEn: ["Entry fee (20 soles)", "Horse rental", "Personal expenses"],
    highlightsEs: ["Laguna de Humantay", "Nevado Humantay", "Valle de Mollepata", "Soraypampa", "Vista panorámica", "Flora andina"],
    highlightsEn: ["Humantay Lagoon", "Humantay Glacier", "Mollepata Valley", "Soraypampa", "Panoramic view", "Andean flora"],
    itinerary: [{ dayNumber: 1, title: "Humantay", titleEn: "Humantay", description: "4:30 AM recojo → Mollepata → Desayuno → Trek a laguna → Almuerzo → Retorno", descriptionEn: "4:30 AM pickup → Mollepata → Breakfast → Trek to lagoon → Lunch → Return" }],
    destinationSlug: "cusco", featured: false, active: true,
  },
  "inka-trail-2d": {
    title: "Camino Inca 2 Días", titleEn: "Inca Trail 2 Days",
    excerpt: "La versión corta del Camino Inca: toda la magia en dos días inolvidables.", excerptEn: "The short version of the Inca Trail: all the magic in two unforgettable days.",
    duration: 2, difficulty: "advanced", priceUSD: 999,
    includes: ["Transporte", "Guía bilingüe", "Entrada al Camino Inca", "Entrada a Machu Picchu", "Alimentación", "Camping equipment", "Tren de retorno"],
    includesEn: ["Transport", "Bilingual guide", "Inca Trail permit", "Machu Picchu entry", "Meals", "Camping equipment", "Return train"],
    notIncludes: ["Sac de dormir", "Bastones", "Gastos personales"],
    notIncludesEn: ["Sleeping bag", "Trekking poles", "Personal expenses"],
    highlightsEs: ["Wiñay Wayna", "Inti Punku", "Machu Picchu", "Km 104", "Andenes incas"],
    highlightsEn: ["Wiñay Wayna", "Inti Punku", "Machu Picchu", "Km 104", "Inca terraces"],
    itinerary: [
      { dayNumber: 1, title: "Km 104 a Aguas Calientes", titleEn: "Km 104 to Aguas Calientes", description: "Inicio en Km 104 → Wiñay Wayna → Inti Punku → Aguas Calientes", descriptionEn: "Start at Km 104 → Wiñay Wayna → Inti Punku → Aguas Calientes" },
      { dayNumber: 2, title: "Machu Picchu", titleEn: "Machu Picchu", description: "Tour guiado en Machu Picchu. Retorno a Cusco por la tarde.", descriptionEn: "Guided tour of Machu Picchu. Return to Cusco in the afternoon." },
    ],
    destinationSlug: "cusco", featured: false, active: true,
  },
  "inka-trail-4d": {
    title: "Camino Inca 4 Días Clásico", titleEn: "Classic Inca Trail 4 Days",
    excerpt: "La caminata más famosa de Sudamérica: 4 días de aventura hasta Machu Picchu.", excerptEn: "The most famous trek in South America: 4 days of adventure to Machu Picchu.",
    duration: 4, difficulty: "advanced", priceUSD: 1489, highSeasonPrice: 1689,
    includes: ["Guía bilingüe", "Cocinero", "Porteadores", "Equipo de camping", "Alimentación completa", "Entradas", "Tren de retorno", "Hotel en AC", "Botiquín"],
    includesEn: ["Bilingual guide", "Cook", "Porters", "Camping equipment", "Full meals", "Entry tickets", "Return train", "Hotel in AC", "First aid kit"],
    notIncludes: ["Sac de dormir", "Bastones", "Propinas"],
    notIncludesEn: ["Sleeping bag", "Trekking poles", "Tips"],
    highlightsEs: ["Wayllabamba", "Abra Warmiwañusqa", "Phuyupatamarca", "Wiñay Wayna", "Inti Punku", "Machu Picchu"],
    highlightsEn: ["Wayllabamba", "Dead Woman's Pass", "Phuyupatamarca", "Wiñay Wayna", "Inti Punku", "Machu Picchu"],
    whatToBringEs: ["Pasaporte", "Calzado de trekking", "Ropa abrigadora", "Linterna", "Repelente", "Bloqueador solar"],
    whatToBringEn: ["Passport", "Trekking shoes", "Warm clothes", "Flashlight", "Repellent", "Sunscreen"],
    itinerary: [
      { dayNumber: 1, title: "Cusco - Wayllabamba", titleEn: "Cusco - Wayllabamba", description: "Recojo en hotel → Km 82 → Wayllabamba (12km)", descriptionEn: "Hotel pickup → Km 82 → Wayllabamba (12km)" },
      { dayNumber: 2, title: "Wayllabamba - Pacaymayo", titleEn: "Wayllabamba - Pacaymayo", description: "Ascenso al Abra Warmiwañusqa (4200m) → Pacaymayo", descriptionEn: "Ascent to Dead Woman's Pass (4200m) → Pacaymayo" },
      { dayNumber: 3, title: "Pacaymayo - Wiñay Wayna", titleEn: "Pacaymayo - Wiñay Wayna", description: "Paso por sitios arqueológicos hasta Wiñay Wayna", descriptionEn: "Pass through archaeological sites to Wiñay Wayna" },
      { dayNumber: 4, title: "Wiñay Wayna - Machu Picchu", titleEn: "Wiñay Wayna - Machu Picchu", description: "Inti Punku → Tour guiado en Machu Picchu → Retorno a Cusco", descriptionEn: "Inti Punku → Guided tour of Machu Picchu → Return to Cusco" },
    ],
    destinationSlug: "cusco", featured: true, active: true,
  },
  "inka-trail-5d": {
    title: "Camino Inca 5 Días", titleEn: "Inca Trail 5 Days",
    excerpt: "La experiencia completa del Camino Inca con un día extra de aclimatación.", excerptEn: "The complete Inca Trail experience with an extra acclimatization day.",
    duration: 5, difficulty: "advanced", priceUSD: 2529,
    includes: ["Todo lo del tour 4 días", "Hotel en Cusco día 0", "Hotel en AC", "Brunch día 4"],
    includesEn: ["Everything from 4-day tour", "Hotel in Cusco day 0", "Hotel in AC", "Brunch day 4"],
    notIncludes: ["Sac de dormir", "Bastones", "Propinas"],
    notIncludesEn: ["Sleeping bag", "Trekking poles", "Tips"],
    highlightsEs: ["Cusco colonial", "Valle Sagrado", "Camino Inca completo", "Machu Picchu", "Aguas Calientes"],
    highlightsEn: ["Colonial Cusco", "Sacred Valley", "Full Inca Trail", "Machu Picchu", "Aguas Calientes"],
    itinerary: [
      { dayNumber: 0, title: "Previa en Cusco", titleEn: "Pre-briefing in Cusco", description: "Briefing en la oficina. Noche en hotel.", descriptionEn: "Briefing at the office. Overnight at hotel." },
      { dayNumber: 1, title: "Cusco - Wayllabamba", titleEn: "Cusco - Wayllabamba", description: "Km 82 → Wayllabamba", descriptionEn: "Km 82 → Wayllabamba" },
      { dayNumber: 2, title: "Wayllabamba - Pacaymayo", titleEn: "Wayllabamba - Pacaymayo", description: "Abra Warmiwañusqa → Pacaymayo", descriptionEn: "Dead Woman's Pass → Pacaymayo" },
      { dayNumber: 3, title: "Pacaymayo - Wiñay Wayna", titleEn: "Pacaymayo - Wiñay Wayna", description: "Sitios arqueológicos → Wiñay Wayna", descriptionEn: "Archaeological sites → Wiñay Wayna" },
      { dayNumber: 4, title: "Wiñay Wayna - Machu Picchu", titleEn: "Wiñay Wayna - Machu Picchu", description: "Inti Punku → Tour MP → Retorno", descriptionEn: "Inti Punku → MP tour → Return" },
    ],
    destinationSlug: "cusco", featured: false, active: true,
  },
  "full-day-titikaka-lake": {
    title: "Full Day Lago Titicaca", titleEn: "Full Day Lake Titicaca",
    excerpt: "Navega el lago navegable más alto del mundo y visita las islas flotantes de los Uros.", excerptEn: "Sail the highest navigable lake in the world and visit the floating Uros islands.",
    duration: 1, difficulty: "easy", priceUSD: 55,
    includes: ["Guía bilingüe", "Transporte", "Boleto de lancha", "Entrada a los Uros"],
    includesEn: ["Bilingual guide", "Transport", "Boat ticket", "Uros entry"],
    itinerary: [{ dayNumber: 1, title: "Lago Titicaca", titleEn: "Lake Titicaca", description: "Islas Uros → Taquile → Retorno a Puno", descriptionEn: "Uros Islands → Taquile → Return to Puno" }],
    destinationSlug: "puno", featured: false, active: true,
  },
  "home-stay-2d-1n": {
    title: "Home Stay 2 Días / 1 Noche", titleEn: "Home Stay 2 Days / 1 Night",
    excerpt: "Vive la experiencia única de alojarte con una familia local en el Lago Titicaca.", excerptEn: "Live the unique experience of staying with a local family on Lake Titicaca.",
    duration: 2, difficulty: "easy", priceUSD: 85,
    includes: ["Guía", "Transporte", "Lancha", "Hospedaje", "Alimentación"],
    includesEn: ["Guide", "Transport", "Boat", "Accommodation", "Meals"],
    itinerary: [
      { dayNumber: 1, title: "Islas Uros + Amantaní", titleEn: "Uros + Amantaní", description: "Uros → Amantaní → Noche con familia local", descriptionEn: "Uros → Amantaní → Night with local family" },
      { dayNumber: 2, title: "Taquile - Retorno", titleEn: "Taquile - Return", description: "Isla Taquile → Retorno a Puno", descriptionEn: "Taquile Island → Return to Puno" },
    ],
    destinationSlug: "puno", featured: false, active: true,
  },
  "amazon-3d-2n": {
    title: "Amazonía 3 Días / 2 Noches", titleEn: "Amazon 3 Days / 2 Nights",
    excerpt: "Sumérgete en la selva amazónica y descubre su increíble biodiversidad.", excerptEn: "Immerse yourself in the Amazon rainforest and discover its incredible biodiversity.",
    duration: 3, difficulty: "moderate", priceUSD: 380,
    includes: ["Guía naturalista", "Transporte", "Hospedaje en lodge", "Alimentación", "Excursiones"],
    includesEn: ["Naturalist guide", "Transport", "Lodge accommodation", "Meals", "Excursions"],
    itinerary: [
      { dayNumber: 1, title: "Llegada al lodge", titleEn: "Arrival at lodge", description: "Cusco → Puerto Maldonado → Lodge → Caminata nocturna", descriptionEn: "Cusco → Puerto Maldonado → Lodge → Night hike" },
      { dayNumber: 2, title: "Exploración", titleEn: "Exploration", description: "Lago Sandoval → Fauna silvestre → Canotaje", descriptionEn: "Sandoval Lake → Wildlife → Canoeing" },
      { dayNumber: 3, title: "Retorno", titleEn: "Return", description: "Observación de aves → Retorno a Cusco", descriptionEn: "Bird watching → Return to Cusco" },
    ],
    destinationSlug: "amazon", featured: false, active: true,
  },
  "amazon-4d-3n": {
    title: "Amazonía 4 Días / 3 Noches", titleEn: "Amazon 4 Days / 3 Nights",
    excerpt: "La experiencia amazónica completa con más tiempo para explorar.", excerptEn: "The complete Amazon experience with more time to explore.",
    duration: 4, difficulty: "moderate", priceUSD: 520,
    includes: ["Guía naturalista", "Transporte", "Hospedaje", "Alimentación completa", "Todas las excursiones"],
    includesEn: ["Naturalist guide", "Transport", "Accommodation", "Full meals", "All excursions"],
    itinerary: [
      { dayNumber: 1, title: "Llegada", titleEn: "Arrival", description: "Cusco → Puerto Maldonado → Lodge", descriptionEn: "Cusco → Puerto Maldonado → Lodge" },
      { dayNumber: 2, title: "Lago Sandoval", titleEn: "Sandoval Lake", description: "Lago Sandoval → Monos → Aves exóticas", descriptionEn: "Sandoval Lake → Monkeys → Exotic birds" },
      { dayNumber: 3, title: "Aventura", titleEn: "Adventure", description: "Canotaje → Pesca de pirañas → Delfines rosados", descriptionEn: "Canoeing → Piranha fishing → Pink dolphins" },
      { dayNumber: 4, title: "Retorno", titleEn: "Return", description: "Observación de aves → Retorno a Cusco", descriptionEn: "Bird watching → Return to Cusco" },
    ],
    destinationSlug: "amazon", featured: false, active: true,
  },
  "city-tour-arequipa": {
    title: "City Tour Arequipa", titleEn: "Arequipa City Tour",
    excerpt: "Conoce la Ciudad Blanca y su increíble arquitectura colonial.", excerptEn: "Get to know the White City and its incredible colonial architecture.",
    duration: 1, difficulty: "easy", priceUSD: 35,
    includes: ["Guía", "Transporte", "Entradas"],
    includesEn: ["Guide", "Transport", "Entry tickets"],
    itinerary: [{ dayNumber: 1, title: "City Tour Arequipa", titleEn: "Arequipa City Tour", description: "Plaza de Armas → Catedral → Monasterio de Santa Catalina → Mirador Carmen Alto", descriptionEn: "Main Square → Cathedral → Santa Catalina Monastery → Carmen Alto viewpoint" }],
    destinationSlug: "arequipa", featured: false, active: true,
  },
  "colca-canyon-2d": {
    title: "Cañón del Colca 2 Días", titleEn: "Colca Canyon 2 Days",
    excerpt: "Uno de los cañones más profundos del mundo, hogar del majestuoso cóndor.", excerptEn: "One of the deepest canyons in the world, home to the majestic condor.",
    duration: 2, difficulty: "moderate", priceUSD: 95,
    includes: ["Guía", "Transporte", "Hospedaje", "Alimentación", "Entradas"],
    includesEn: ["Guide", "Transport", "Accommodation", "Meals", "Entry fees"],
    itinerary: [
      { dayNumber: 1, title: "Arequipa - Chivay", titleEn: "Arequipa - Chivay", description: "Ruta hacia el Cañón del Colca → Miradores → Baños termales", descriptionEn: "Route to Colca Canyon → Viewpoints → Hot springs" },
      { dayNumber: 2, title: "Cóndores - Retorno", titleEn: "Condors - Return", description: "Cruz del Cóndor → Retorno a Arequipa", descriptionEn: "Cruz del Cóndor → Return to Arequipa" },
    ],
    destinationSlug: "arequipa", featured: false, active: true,
  },
  "ica-2d-1n": {
    title: "Ica y Huacachina 2 Días", titleEn: "Ica and Huacachina 2 Days",
    excerpt: "Aventura en el desierto: oasis de Huacachina, bodegas y dunas.", excerptEn: "Desert adventure: Huacachina oasis, wineries and dunes.",
    duration: 2, difficulty: "easy", priceUSD: 120,
    includes: ["Guía", "Transporte", "Hospedaje", "Tour de bodegas", "Buggies y sandboarding"],
    includesEn: ["Guide", "Transport", "Accommodation", "Winery tour", "Buggies and sandboarding"],
    itinerary: [
      { dayNumber: 1, title: "Lima - Ica", titleEn: "Lima - Ica", description: "Tour de bodegas → Huacachina → Buggies y sandboarding", descriptionEn: "Winery tour → Huacachina → Buggies and sandboarding" },
      { dayNumber: 2, title: "Retorno", titleEn: "Return", description: "Tiempo libre en Huacachina → Retorno a Lima", descriptionEn: "Free time in Huacachina → Return to Lima" },
    ],
    destinationSlug: "lima-ica", featured: false, active: true,
  },
  "ica-3d-2n": {
    title: "Ica y Huacachina 3 Días", titleEn: "Ica and Huacachina 3 Days",
    excerpt: "La experiencia completa del desierto con más tiempo para explorar.", excerptEn: "The complete desert experience with more time to explore.",
    duration: 3, difficulty: "easy", priceUSD: 180,
    includes: ["Guía", "Transporte", "Hospedaje", "Tour de bodegas", "Buggies", "Reserva Nacional"],
    includesEn: ["Guide", "Transport", "Accommodation", "Winery tour", "Buggies", "National Reserve"],
    itinerary: [
      { dayNumber: 1, title: "Lima - Ica", titleEn: "Lima - Ica", description: "Bodegas → Huacachina → Buggies", descriptionEn: "Wineries → Huacachina → Buggies" },
      { dayNumber: 2, title: "Exploración", titleEn: "Exploration", description: "Reserva Nacional de Paracas → Ballestas", descriptionEn: "Paracas National Reserve → Ballestas Islands" },
      { dayNumber: 3, title: "Retorno", titleEn: "Return", description: "Tiempo libre → Retorno a Lima", descriptionEn: "Free time → Return to Lima" },
    ],
    destinationSlug: "lima-ica", featured: false, active: true,
  },
};

const customizedTours = [
  {
    id: "cusco-lima", slug: "cusco-lima", nameEs: "Cusco + Lima-Ica", nameEn: "Cusco + Lima-Ica",
    duration: 7, priceUSD: 1200, destinations: ["cusco", "lima-ica"],
    descriptionEs: "La combinación perfecta de historia andina y aventura costera.",
    descriptionEn: "The perfect combination of Andean history and coastal adventure.",
    includesEs: ["Traslados", "Guía bilingüe", "Hospedaje 6 noches", "Tours completos", "Tren a MP"],
    includesEn: ["Transfers", "Bilingual guide", "6 nights accommodation", "Full tours", "Train to MP"],
    itineraryEs: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "City Tour Cusco", titleEn: "Cusco City Tour" },
      { dayNumber: 3, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 4, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 5, titleEs: "Vuelo a Lima", titleEn: "Flight to Lima" },
      { dayNumber: 6, titleEs: "Ica y Huacachina", titleEn: "Ica and Huacachina" },
      { dayNumber: 7, titleEs: "Retorno", titleEn: "Return" },
    ],
    itineraryEn: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "City Tour Cusco", titleEn: "Cusco City Tour" },
      { dayNumber: 3, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 4, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 5, titleEs: "Vuelo a Lima", titleEn: "Flight to Lima" },
      { dayNumber: 6, titleEs: "Ica y Huacachina", titleEn: "Ica and Huacachina" },
      { dayNumber: 7, titleEs: "Retorno", titleEn: "Return" },
    ],
  },
  {
    id: "cusco-puno", slug: "cusco-puno", nameEs: "Cusco + Puno", nameEn: "Cusco + Puno",
    duration: 5, priceUSD: 650, destinations: ["cusco", "puno"],
    descriptionEs: "Explora el sur del Perú: del imperio inca al Lago Titicaca.",
    descriptionEn: "Explore southern Peru: from the Inca empire to Lake Titicaca.",
    includesEs: ["Traslados", "Guía", "Hospedaje 4 noches", "Excursiones", "Tren a MP"],
    includesEn: ["Transfers", "Guide", "4 nights accommodation", "Excursions", "Train to MP"],
    itineraryEs: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado + MP", titleEn: "Sacred Valley + MP" },
      { dayNumber: 3, titleEs: "City Tour + Maras-Moray", titleEn: "City Tour + Maras-Moray" },
      { dayNumber: 4, titleEs: "Viaje a Puno", titleEn: "Travel to Puno" },
      { dayNumber: 5, titleEs: "Lago Titicaca - Retorno", titleEn: "Lake Titicaca - Return" },
    ],
    itineraryEn: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado + MP", titleEn: "Sacred Valley + MP" },
      { dayNumber: 3, titleEs: "City Tour + Maras-Moray", titleEn: "City Tour + Maras-Moray" },
      { dayNumber: 4, titleEs: "Viaje a Puno", titleEn: "Travel to Puno" },
      { dayNumber: 5, titleEs: "Lago Titicaca - Retorno", titleEn: "Lake Titicaca - Return" },
    ],
  },
  {
    id: "cusco-arequipa", slug: "cusco-arequipa", nameEs: "Cusco + Arequipa", nameEn: "Cusco + Arequipa",
    duration: 6, priceUSD: 800, destinations: ["cusco", "arequipa"],
    descriptionEs: "Dos ciudades imperdibles: Cusco imperial y la Ciudad Blanca.",
    descriptionEn: "Two unmissable cities: imperial Cusco and the White City.",
    includesEs: ["Traslados", "Guía", "Hospedaje 5 noches", "Tours", "Tren a MP", "Vuelo Cusco-Arequipa"],
    includesEn: ["Transfers", "Guide", "5 nights accommodation", "Tours", "Train to MP", "Flight Cusco-Arequipa"],
    itineraryEs: [
      { dayNumber: 1, titleEs: "Cusco", titleEn: "Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 3, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 4, titleEs: "City Tour + Vuelo a AQP", titleEn: "City Tour + Flight to AQP" },
      { dayNumber: 5, titleEs: "Cañón del Colca", titleEn: "Colca Canyon" },
      { dayNumber: 6, titleEs: "Retorno", titleEn: "Return" },
    ],
    itineraryEn: [
      { dayNumber: 1, titleEs: "Cusco", titleEn: "Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 3, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 4, titleEs: "City Tour + Vuelo a AQP", titleEn: "City Tour + Flight to AQP" },
      { dayNumber: 5, titleEs: "Cañón del Colca", titleEn: "Colca Canyon" },
      { dayNumber: 6, titleEs: "Retorno", titleEn: "Return" },
    ],
  },
  {
    id: "cusco-amazon", slug: "cusco-amazon", nameEs: "Cusco + Amazonía", nameEn: "Cusco + Amazon",
    duration: 6, priceUSD: 900, destinations: ["cusco", "amazon"],
    descriptionEs: "De los Andes a la Amazonía: la experiencia peruana completa.",
    descriptionEn: "From the Andes to the Amazon: the complete Peruvian experience.",
    includesEs: ["Traslados", "Guía", "Hospedaje 5 noches", "Tours", "Tren a MP", "Vuelo Cusco-PEM"],
    includesEn: ["Transfers", "Guide", "5 nights accommodation", "Tours", "Train to MP", "Flight Cusco-PEM"],
    itineraryEs: [
      { dayNumber: 1, titleEs: "Cusco", titleEn: "Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado + MP", titleEn: "Sacred Valley + MP" },
      { dayNumber: 3, titleEs: "Maras-Moray", titleEn: "Maras-Moray" },
      { dayNumber: 4, titleEs: "Vuelo a Puerto Maldonado", titleEn: "Flight to Puerto Maldonado" },
      { dayNumber: 5, titleEs: "Exploración Amazonía", titleEn: "Amazon Exploration" },
      { dayNumber: 6, titleEs: "Retorno", titleEn: "Return" },
    ],
    itineraryEn: [
      { dayNumber: 1, titleEs: "Cusco", titleEn: "Cusco" },
      { dayNumber: 2, titleEs: "Valle Sagrado + MP", titleEn: "Sacred Valley + MP" },
      { dayNumber: 3, titleEs: "Maras-Moray", titleEn: "Maras-Moray" },
      { dayNumber: 4, titleEs: "Vuelo a Puerto Maldonado", titleEn: "Flight to Puerto Maldonado" },
      { dayNumber: 5, titleEs: "Exploración Amazonía", titleEn: "Amazon Exploration" },
      { dayNumber: 6, titleEs: "Retorno", titleEn: "Return" },
    ],
  },
  {
    id: "solo-cusco", slug: "solo-cusco", nameEs: "Solo Cusco", nameEn: "Solo Cusco",
    duration: 5, priceUSD: 450, destinations: ["cusco"],
    descriptionEs: "La experiencia cusqueña completa con los mejores tours.",
    descriptionEn: "The complete Cusco experience with the best tours.",
    includesEs: ["Traslados", "Guía", "Hospedaje 4 noches", "Tours", "Tren a MP"],
    includesEn: ["Transfers", "Guide", "4 nights accommodation", "Tours", "Train to MP"],
    itineraryEs: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "City Tour Cusco", titleEn: "Cusco City Tour" },
      { dayNumber: 3, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 4, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 5, titleEs: "Retorno", titleEn: "Return" },
    ],
    itineraryEn: [
      { dayNumber: 1, titleEs: "Llegada a Cusco", titleEn: "Arrival in Cusco" },
      { dayNumber: 2, titleEs: "City Tour Cusco", titleEn: "Cusco City Tour" },
      { dayNumber: 3, titleEs: "Valle Sagrado", titleEn: "Sacred Valley" },
      { dayNumber: 4, titleEs: "Machu Picchu", titleEn: "Machu Picchu" },
      { dayNumber: 5, titleEs: "Retorno", titleEn: "Return" },
    ],
  },
];

const communityTourData = [
  {
    id: "ama", slug: "ama", nameEs: "Tour Comunitario AMA", nameEn: "AMA Community Tour",
    duration: 1, priceUSD: 50,
    descriptionEs: "Conoce a los tejedores andinos de la comunidad AMA y aprende sus técnicas ancestrales.",
    descriptionEn: "Meet the Andean weavers of the AMA community and learn their ancestral techniques.",
    includesEs: ["Guía local", "Transporte", "Taller textil", "Almuerzo comunitario"],
    includesEn: ["Local guide", "Transport", "Textile workshop", "Community lunch"],
  },
  {
    id: "ocutuan-community", slug: "ocutuan-community", nameEs: "Tour Comunitario Ocutuan", nameEn: "Ocutuan Community Tour",
    duration: 1, priceUSD: 45,
    descriptionEs: "Descubre el proyecto Ocutuan de conservación ambiental y desarrollo sostenible.",
    descriptionEn: "Discover the Ocutuan environmental conservation and sustainable development project.",
    includesEs: ["Guía local", "Transporte", "Caminata guiada", "Almuerzo"],
    includesEn: ["Local guide", "Transport", "Guided hike", "Lunch"],
  },
];

const projectData = [
  {
    id: "ama", slug: "ama", nameEs: "Proyecto AMA - Tejedores Andinos", nameEn: "AMA Project - Andean Weavers",
    descriptionEs: "Apoyamos a las tejedoras de la comunidad AMA preservando técnicas ancestrales de textilería.",
    descriptionEn: "We support the weavers of the AMA community, preserving ancestral textile techniques.",
    impactLabel: "Arte y Cultura",
  },
  {
    id: "ocutuan-community", slug: "ocutuan-community", nameEs: "Proyecto Ocutuan - Guardianes de la Tierra", nameEn: "Ocutuan Project - Guardians of the Land",
    descriptionEs: "Proyecto de conservación ambiental y turismo sostenible en la comunidad de Ocutuan.",
    descriptionEn: "Environmental conservation and sustainable tourism project in the Ocutuan community.",
    impactLabel: "Medio Ambiente",
  },
];

const statsData = [
  { label: "Viajeros", labelEn: "Travelers", value: 1000, suffix: "+" },
  { label: "Tours Realizados", labelEn: "Tours Completed", value: 500, suffix: "+" },
  { label: "Años de Experiencia", labelEn: "Years Experience", value: 8, suffix: "+" },
  { label: "Satisfacción", labelEn: "Satisfaction", value: 99, suffix: "%" },
];

const faqData = [
  { q: "¿Cuál es la mejor época para visitar Cusco?", qEn: "What is the best time to visit Cusco?", a: "La temporada seca (mayo a octubre) es ideal para visitar Cusco. Los días son soleados y las noches frías. La temporada de lluvias (noviembre a marzo) tiene paisajes más verdes pero climas impredecibles.", aEn: "The dry season (May to October) is ideal for visiting Cusco. Days are sunny and nights are cold. The rainy season (November to March) has greener landscapes but unpredictable weather.", category: "travel" },
  { q: "¿Necesito un permiso especial para el Camino Inca?", qEn: "Do I need a special permit for the Inca Trail?", a: "Sí, los permisos del Camino Inca son limitados a 500 personas por día. Recomendamos reservar con 3-6 meses de anticipación, especialmente para la temporada alta.", aEn: "Yes, Inca Trail permits are limited to 500 people per day. We recommend booking 3-6 months in advance, especially for high season.", category: "booking" },
  { q: "¿Qué es el mal de altura y cómo prevenirlo?", qEn: "What is altitude sickness and how to prevent it?", a: "El mal de altura (soroche) afecta a muchas personas al llegar a Cusco (3,400m). Recomendamos descansar el primer día, hidratarse bien, evitar comidas pesadas y consumir mate de coca.", aEn: "Altitude sickness (soroche) affects many people when arriving in Cusco (3,400m). We recommend resting on the first day, staying hydrated, avoiding heavy meals and drinking coca tea.", category: "travel" },
  { q: "¿Qué debo empacar para mis tours?", qEn: "What should I pack for my tours?", a: "Ropa en capas (hace frío de noche y calor de día), zapatos cómodos para caminar, bloqueador solar, repelente, gorro, lentes de sol, y una chaqueta impermeable.", aEn: "Layered clothing (cold at night, warm during the day), comfortable walking shoes, sunscreen, repellent, hat, sunglasses, and a waterproof jacket.", category: "travel" },
  { q: "¿Es seguro viajar a Cusco?", qEn: "Is it safe to travel to Cusco?", a: "Sí, Cusco es una ciudad turística segura. Como en cualquier destino turístico, recomendamos tomar precauciones básicas como cuidar tus pertenencias y evitar zonas solitarias de noche.", aEn: "Yes, Cusco is a safe tourist city. As with any tourist destination, we recommend taking basic precautions like watching your belongings and avoiding lonely areas at night.", category: "general" },
  { q: "¿Aceptan tarjetas de crédito en los tours?", qEn: "Do you accept credit cards for tours?", a: "Aceptamos depósitos bancarios y transferencias. Para las reservas, pedimos un adelanto del 50% y el saldo restante se paga en efectivo el día del tour.", aEn: "We accept bank deposits and transfers. For reservations, we ask for a 50% advance and the remaining balance is paid in cash on tour day.", category: "payment" },
  { q: "¿Puedo hacer el tour estando embarazada?", qEn: "Can I do tours while pregnant?", a: "Depende del tour. Tours suaves como City Tour y Valle Sagrado son seguros. Caminatas exigentes como Camino Inca o Montaña de Colores requieren consulta médica previa.", aEn: "It depends on the tour. Gentle tours like City Tour and Sacred Valley are safe. Demanding treks like Inca Trail or Rainbow Mountain require prior medical consultation.", category: "general" },
  { q: "¿Qué incluye el servicio VIP?", qEn: "What does the VIP service include?", a: "Nuestro servicio VIP incluye guía privado bilingüe, transporte privado, atención personalizada 24/7, menús especiales y asistencia prioritaria en todos los tours.", aEn: "Our VIP service includes private bilingual guide, private transport, 24/7 personalized attention, special menus and priority assistance on all tours.", category: "general" },
  { q: "¿Cómo llegar a Machu Picchu?", qEn: "How do I get to Machu Picchu?", a: "Hay dos formas principales: en tren desde Cusco (3-4 horas) o por el Camino Inca (2-4 días de caminata). Ambos ofrecen experiencias únicas y diferentes.", aEn: "There are two main ways: by train from Cusco (3-4 hours) or via the Inca Trail (2-4 day hike). Both offer unique and different experiences.", category: "travel" },
  { q: "¿Ofrecen tours vegetarianos o veganos?", qEn: "Do you offer vegetarian or vegan tour options?", a: "¡Por supuesto! Avisanos al momento de la reserva y adaptaremos los menús. Todos nuestros tours incluyen opciones vegetarianas, veganas y sin gluten.", aEn: "Of course! Let us know at the time of booking and we will adapt the menus. All our tours include vegetarian, vegan and gluten-free options.", category: "booking" },
];

// ─── Migración ──────────────────────────────────────

async function seed() {
  console.log("\n🚀 Iniciando migración de datos a Sanity...\n");
  console.log(`📦 Proyecto: ${projectId}`);
  console.log(`📦 Dataset: ${dataset}\n`);

  // 1. Site Settings (singleton)
  console.log("--- Configuración del Sitio ---");
  await createIfNotExists({
    _type: "siteSettings", _id: "siteSettings",
    companyName: "Peru Travel Experts B",
    slogan: "Your Gateway to the Andes",
    tagline: "Descubre Perú con expertos locales - Discover Peru with local experts",
    phone: "+51 984 215 157",
    whatsapp: "51984215157",
    email: "info@perutravelexpertsb.com",
    address: "Cusco, Perú",
    businessHours: "Lun-Sáb: 8:00 AM - 8:00 PM",
    homeAboutTitle: "¿Por qué viajar con nosotros?",
    homeWhyChooseTitle: "¿Por qué elegirnos?",
    homeCtaTitle: "¿Listo para tu aventura peruana?",
    homeCtaSubtitle: "Déjanos ayudarte a planificar el viaje de tus sueños",
    homeCtaWhatsapp: "51984215157",
  });

  // 2. Destinations
  console.log("\n--- Destinos ---");
  const destIdMap: Record<string, string> = {};
  for (const d of destinations) {
    const id = slugId("destination", d.slug);
    destIdMap[d.slug] = id;
    const hasDesc = d.descriptionEs || d.descriptionEn;
    await createIfNotExists({
      _type: "destination", _id: id,
      name: d.nameEs, nameEn: d.nameEn,
      slug: { _type: "slug", current: d.slug },
      shortDescription: d.descriptionEs,
      shortDescriptionEn: d.descriptionEn,
      ...(hasDesc ? { description: blockText(d.descriptionEs), descriptionEn: blockText(d.descriptionEn) } : {}),
      order: destinations.indexOf(d) + 1,
    });
  }

  // 3. Tours
  console.log("\n--- Tours ---");
  for (const [slug, t] of Object.entries(tourData)) {
    const id = slugId("tour", slug);
    await createIfNotExists({
      _type: "tour", _id: id,
      title: t.titleEn || t.title, // Sanity schema has title as ES
      titleEn: t.titleEn,
      slug: { _type: "slug", current: slug },
      excerpt: t.excerpt,
      excerptEn: t.excerptEn,
      destination: { _type: "reference", _ref: destIdMap[t.destinationSlug] },
      duration: t.duration,
      difficulty: t.difficulty,
      priceUSD: t.priceUSD || 0,
      highSeasonPrice: t.highSeasonPrice || undefined,
      includes: t.includes || [],
      includesEn: t.includesEn || [],
      notIncludes: t.notIncludes || [],
      notIncludesEn: t.notIncludesEn || [],
      highlightsEs: t.highlightsEs || [],
      highlightsEn: t.highlightsEn || [],
      whatToBringEs: t.whatToBringEs || [],
      whatToBringEn: t.whatToBringEn || [],
      pricingNoteEs: t.pricingNoteEs || "",
      pricingNoteEn: t.pricingNoteEn || "",
      itinerary: (t.itinerary || []).map((day: any) => ({
        _key: `day_${day.dayNumber}`,
        dayNumber: day.dayNumber,
        title: day.title,
        titleEn: day.titleEn,
        description: day.description ? blockText(day.description) : undefined,
        descriptionEn: day.descriptionEn ? blockText(day.descriptionEn) : undefined,
      })),
      featured: t.featured || false,
      order: Object.keys(tourData).indexOf(slug) + 1,
    });
  }

  // 4. Customized Tours
  console.log("\n--- Paquetes Personalizados ---");
  for (const ct of customizedTours) {
    const id = slugId("customizedTour", ct.slug);
    await createIfNotExists({
      _type: "customizedTour", _id: id,
      nameEs: ct.nameEs, nameEn: ct.nameEn,
      slug: { _type: "slug", current: ct.slug },
      descriptionEs: blockText(ct.descriptionEs),
      descriptionEn: blockText(ct.descriptionEn),
      duration: ct.duration,
      priceUSD: ct.priceUSD,
      destinations: ct.destinations,
      includesEs: ct.includesEs,
      includesEn: ct.includesEn,
      itineraryEs: (ct.itineraryEs || []).map((day: any) => ({
        _key: `day_${day.dayNumber}`,
        dayNumber: day.dayNumber,
        titleEs: day.titleEs,
        titleEn: day.titleEn,
      })),
      itineraryEn: (ct.itineraryEn || []).map((day: any) => ({
        _key: `day_${day.dayNumber}`,
        dayNumber: day.dayNumber,
        titleEs: day.titleEs,
        titleEn: day.titleEn,
      })),
      featured: true,
      order: customizedTours.indexOf(ct) + 1,
    });
  }

  // 5. Community Tours
  console.log("\n--- Tours Comunitarios ---");
  for (const ct of communityTourData) {
    const id = slugId("communityTour", ct.slug);
    await createIfNotExists({
      _type: "communityTour", _id: id,
      nameEs: ct.nameEs, nameEn: ct.nameEn,
      slug: { _type: "slug", current: ct.slug },
      descriptionEs: blockText(ct.descriptionEs),
      descriptionEn: blockText(ct.descriptionEn),
      duration: ct.duration,
      priceUSD: ct.priceUSD,
      includesEs: ct.includesEs,
      includesEn: ct.includesEn,
      featured: true,
      order: communityTourData.indexOf(ct) + 1,
    });
  }

  // 6. Projects
  console.log("\n--- Proyectos ---");
  for (const p of projectData) {
    const id = slugId("project", p.slug);
    await createIfNotExists({
      _type: "project", _id: id,
      nameEs: p.nameEs, nameEn: p.nameEn,
      slug: { _type: "slug", current: p.slug },
      descriptionEs: blockText(p.descriptionEs),
      descriptionEn: blockText(p.descriptionEn),
      impactLabel: p.impactLabel,
      featured: true,
      order: projectData.indexOf(p) + 1,
    });
  }

  // 7. Stats
  console.log("\n--- Estadísticas ---");
  for (const [i, s] of statsData.entries()) {
    await createIfNotExists({
      _type: "stat",
      _id: `stat-${i + 1}`,
      label: s.label,
      labelEn: s.labelEn,
      value: s.value,
      suffix: s.suffix,
      order: i + 1,
    });
  }

  // 8. Testimonials (from TestimonialsClient.tsx - all 9)
  console.log("\n--- Testimonios ---");
  const allTestimonials = [
    { authorName: "María García", company: "España", flag: "🇪🇸", textEs: "Una experiencia increíble. El tour a Machu Picchu superó todas mis expectativas. El guía fue excepcional y la atención VIP fue de primera.", textEn: "An incredible experience. The Machu Picchu tour exceeded all my expectations. The guide was exceptional and the VIP attention was first-class.", rating: 5, featured: true },
    { authorName: "James Wilson", company: "USA", flag: "🇺🇸", textEs: "Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.", textEn: "Best travel experience of my life! The Sacred Valley tour was perfectly organized with amazing attention to detail.", rating: 5, featured: true },
    { authorName: "Carlos Mendoza", company: "México", flag: "🇲🇽", textEs: "Servicio de primera clase desde el momento de la reserva. El equipo de PeruTravelExpertsB hizo que cada momento fuera especial.", textEn: "First-class service from the moment of booking. The PeruTravelExpertsB team made every moment special.", rating: 5, featured: true },
    { authorName: "Sophie Laurent", company: "Francia", flag: "🇫🇷", textEs: "El City Tour de Cusco fue una maravilla. Nuestro guía tenía un conocimiento profundo de la historia inca y colonial.", textEn: "The Cusco City Tour was wonderful. Our guide had deep knowledge of Inca and colonial history.", rating: 5, featured: false },
    { authorName: "Luca Rossi", company: "Italia", flag: "🇮🇹", textEs: "La Montaña de Colores es algo que debes ver al menos una vez en la vida.", textEn: "Rainbow Mountain is something you must see at least once in your life.", rating: 5, featured: false },
    { authorName: "Anna Müller", company: "Alemania", flag: "🇩🇪", textEs: "El Home Stay en el Lago Titicaca fue una experiencia transformadora.", textEn: "The Home Stay on Lake Titicaca was a transformative experience.", rating: 5, featured: false },
    { authorName: "Takeshi Yamamoto", company: "Japón", flag: "🇯🇵", textEs: "Increíble servicio desde la reserva por WhatsApp hasta el último día del tour.", textEn: "Incredible service from the WhatsApp booking to the last day of the tour.", rating: 5, featured: false },
    { authorName: "Emma Thompson", company: "Reino Unido", flag: "🇬🇧", textEs: "La experiencia en la Amazonía fue única. Ver delfines rosados, pescar pirañas y dormir en el lodge fue inolvidable.", textEn: "The Amazon experience was unique. Seeing pink dolphins, fishing piranhas, and sleeping in the lodge was unforgettable.", rating: 5, featured: false },
    { authorName: "Pedro Silva", company: "Brasil", flag: "🇧🇷", textEs: "La Laguna de Humantay es una belleza indescriptible. El camino fue moderado y las vistas valen totalmente el esfuerzo.", textEn: "Humantay Lagoon is an indescribable beauty. The hike was moderate and the views are totally worth the effort.", rating: 5, featured: false },
  ];
  for (const [i, t] of allTestimonials.entries()) {
    await createIfNotExists({
      _type: "testimonial",
      _id: `testimonial-${i + 1}`,
      authorName: t.authorName,
      company: t.company,
      flag: t.flag,
      textEs: t.textEs,
      textEn: t.textEn,
      rating: t.rating,
      featured: t.featured,
      order: i + 1,
    });
  }

  // 9. FAQ
  console.log("\n--- Preguntas Frecuentes ---");
  for (const [i, f] of faqData.entries()) {
    await createIfNotExists({
      _type: "faq",
      _id: `faq-${i + 1}`,
      question: f.q,
      questionEn: f.qEn,
      answer: blockText(f.a),
      answerEn: blockText(f.aEn),
      category: f.category || "general",
      order: i + 1,
    });
  }

  // 10. Hero Slides (default empty - user creates via CMS)
  console.log("\n--- Hero Slides ---");
  console.log("  ⏭️  Crea los slides del hero desde el panel CMS");

  // ─── Resumen ─────────────────────────────────
  console.log("\n═══════════════════════════════════════");
  console.log(`✅ Documentos creados: ${totalCreated}`);
  console.log(`⏭️  Documentos existentes: ${totalSkipped}`);
  console.log("═══════════════════════════════════════\n");
  console.log("📌 Ahora ve a /admin y verifica que los datos estén correctos.");
  console.log("📌 Agrega imágenes desde el CMS (no se migran automáticamente).");
  console.log("📌 El overlay Visual Editing funcionará automáticamente.\n");
}

seed().catch((err) => {
  console.error("\n❌ Error durante la migración:", err);
  process.exit(1);
});
