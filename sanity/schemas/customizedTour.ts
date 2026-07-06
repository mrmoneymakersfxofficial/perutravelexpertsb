// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField, featuredField } from "../lib/schema-master";

export default defineType({
  name: "customizedTour", title: "Paquete Personalizado", type: "document", icon: () => "✨",
  fields: [
    defineField({ name: "nameEs", title: "Nombre (Español)", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "nameEn", title: "Nombre (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nameEs", maxLength: 80 }, validation: (R: any) => R.required() }),
    defineField({ name: "image", title: "Imagen Principal", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galería", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "descriptionEs", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "duration", title: "Duración Base (días)", type: "number", validation: (R: any) => R.required().min(1) }),
    defineField({ name: "priceUSD", title: "Precio Desde (USD)", type: "number" }),
    defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includesEs", title: "Incluye (Español)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includesEn", title: "Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "itineraryEs", title: "Itinerario (Español)", type: "array", of: [
      defineField({ name: "day", title: "Día", type: "object", fields: [
        defineField({ name: "dayNumber", title: "Número", type: "number" }),
        defineField({ name: "titleEs", title: "Título (Español)", type: "string" }),
        defineField({ name: "titleEn", title: "Título (Inglés)", type: "string" }),
        defineField({ name: "descriptionEs", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
      ] }),
    ] }),
    defineField({ name: "durationRange", title: "Rango de Duración", type: "string", description: "Ej: 5-9 días" }),
    featuredField("Paquete Destacado", "Mostrar en secciones principales"),
    orderField(),
  ],
  preview: { select: { title: "nameEs", subtitle: "durationRange", media: "image" }, prepare({ title, subtitle, media }: any) { return { title: title || "Sin nombre", subtitle, media }; } },
});