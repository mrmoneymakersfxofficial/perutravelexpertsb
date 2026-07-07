// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "destination", title: "Destino", type: "document", icon: () => "📍",
  fields: [
    defineField({ name: "name", title: "Nombre (Español)", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "nameEn", title: "Nombre (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 60 }, validation: (R: any) => R.required() }),
    defineField({ name: "heroImage", title: "Imagen Hero", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "shortDescription", title: "Descripción Corta (Español)", type: "text", rows: 2 }),
    defineField({ name: "shortDescriptionEn", title: "Descripción Corta (Inglés)", type: "text", rows: 2 }),
    defineField({ name: "gallery", title: "Galería", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "mapLatitude", title: "Latitud", type: "number" }),
    defineField({ name: "mapLongitude", title: "Longitud", type: "number" }),
    defineField({ name: "climate", title: "Clima", type: "string" }),
    defineField({ name: "bestTimeToVisit", title: "Mejor Época para Visitar", type: "string" }),
    defineField({ name: "highlights", title: "Puntos Destacados", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", title: "Destacado", type: "boolean", initialValue: false }),
    orderField(),
  ],
  preview: { select: { title: "name", media: "heroImage" }, prepare({ title, media }) { return { title: title || "Sin nombre", media }; } },
});
