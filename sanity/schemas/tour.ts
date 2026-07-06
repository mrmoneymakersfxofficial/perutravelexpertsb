// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField, featuredField } from "../lib/schema-master";

export default defineType({
  name: "tour", title: "Tour", type: "document", icon: () => "🧳",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "titleEn", title: "Título (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (R: any) => R.required() }),
    defineField({ name: "coverImage", title: "Imagen de Portada", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galería de Imágenes", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "description", title: "Descripción", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "excerpt", title: "Resumen", type: "text", rows: 2, description: "Breve descripción para tarjetas" }),
    defineField({ name: "excerptEn", title: "Resumen (Inglés)", type: "text", rows: 2 }),
    defineField({ name: "destination", title: "Destino", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "duration", title: "Duración (días)", type: "number", validation: (R: any) => R.required().min(1) }),
    defineField({ name: "priceUSD", title: "Precio USD (desde)", type: "number" }),
    defineField({ name: "difficulty", title: "Dificultad", type: "string", options: { list: [
      { title: "Fácil", value: "easy" }, { title: "Moderado", value: "moderate" }, { title: "Difícil", value: "difficult" },
    ], layout: "radio" } }),
    defineField({ name: "groupSize", title: "Tamaño de Grupo (máx)", type: "number" }),
    defineField({ name: "includes", title: "Qué Incluye", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includesEn", title: "Qué Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notIncludes", title: "No Incluye", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notIncludesEn", title: "No Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "itinerary", title: "Itinerario", type: "array", of: [
      defineField({ name: "day", title: "Día", type: "object", fields: [
        defineField({ name: "dayNumber", title: "Número de Día", type: "number" }),
        defineField({ name: "title", title: "Título del Día", type: "string" }),
        defineField({ name: "titleEn", title: "Título del Día (Inglés)", type: "string" }),
        defineField({ name: "description", title: "Descripción", type: "array", of: [{ type: "block" }] }),
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