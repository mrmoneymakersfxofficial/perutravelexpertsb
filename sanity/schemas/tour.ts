// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });
const featuredField = (label, desc) => defineField({ name: "featured", title: label, type: "boolean", description: desc, initialValue: false });

export default defineType({
  name: "tour", title: "Tour", type: "document", icon: () => "🧳",
  fields: [
    defineField({ name: "title", title: "Título (Español)", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "titleEn", title: "Título (Inglés)", type: "string" }),
    defineField({ name: "subtitleEs", title: "Subtítulo (Español)", type: "string", description: "Frase corta debajo del título" }),
    defineField({ name: "subtitleEn", title: "Subtítulo (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (R: any) => R.required() }),
    defineField({ name: "coverImage", title: "Imagen de Portada", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galería de Imágenes", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "description", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "excerpt", title: "Resumen Corto (Español)", type: "text", rows: 2, description: "Texto breve para tarjetas (máx 200 caracteres)" }),
    defineField({ name: "excerptEn", title: "Resumen Corto (Inglés)", type: "text", rows: 2 }),
    defineField({ name: "highlightsEs", title: "Puntos Destacados (Español)", type: "array", of: [{ type: "string" }], description: "Lista de aspectos destacados del tour" }),
    defineField({ name: "highlightsEn", title: "Puntos Destacados (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "destination", title: "Destino", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "duration", title: "Duración (días)", type: "number", validation: (R: any) => R.required().min(1) }),
    defineField({ name: "priceUSD", title: "Precio USD (desde)", type: "number" }),
    defineField({ name: "highSeasonPrice", title: "Precio Temporada Alta (USD)", type: "number", description: "Precio opcional para temporada alta" }),
    defineField({ name: "difficulty", title: "Dificultad", type: "string", options: { list: [
      { title: "Fácil", value: "easy" }, { title: "Moderado", value: "moderate" }, { title: "Difícil", value: "difficult" },
    ], layout: "radio" } }),
    defineField({ name: "groupSize", title: "Tamaño de Grupo (máx)", type: "number" }),
    defineField({ name: "includes", title: "Qué Incluye (Español)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includesEn", title: "Qué Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notIncludes", title: "No Incluye (Español)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notIncludesEn", title: "No Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "whatToBringEs", title: "Qué Llevar (Español)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "whatToBringEn", title: "Qué Llevar (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "pricingNoteEs", title: "Nota de Precios (Español)", type: "text", rows: 2 }),
    defineField({ name: "pricingNoteEn", title: "Nota de Precios (Inglés)", type: "text", rows: 2 }),
    defineField({ name: "itinerary", title: "Itinerario", type: "array", of: [
      defineField({ name: "day", title: "Día", type: "object", fields: [
        defineField({ name: "dayNumber", title: "Número de Día", type: "number" }),
        defineField({ name: "title", title: "Título del Día (Español)", type: "string" }),
        defineField({ name: "titleEn", title: "Título del Día (Inglés)", type: "string" }),
        defineField({ name: "description", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "meals", title: "Comidas", type: "string", description: "Ej: Desayuno, Almuerzo" }),
        defineField({ name: "accommodation", title: "Alojamiento", type: "string" }),
      ] }),
    ] }),
    defineField({ name: "startingPoint", title: "Punto de Partida", type: "string" }),
    defineField({ name: "endingPoint", title: "Punto de Llegada", type: "string" }),
    featuredField("Tour Destacado", "Mostrar en la página principal"),
    orderField(),
  ],
  preview: { select: { title: "title", subtitle: "duration", media: "coverImage" }, prepare({ title, subtitle, media }: any) { return { title: title || "Sin título", subtitle: subtitle ? `${subtitle} días` : undefined, media }; } },
});
