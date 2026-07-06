// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField, featuredField } from "../lib/schema-master";

export default defineType({
  name: "testimonial", title: "Testimonio", type: "document", icon: () => "💬",
  fields: [
    defineField({ name: "authorName", title: "Nombre del Autor", type: "string", validation: (R: any) => R.required().max(100) }),
    defineField({ name: "authorRole", title: "Cargo / Origen", type: "string" }),
    defineField({ name: "company", title: "País", type: "string", description: "País de origen del viajero" }),
    defineField({ name: "quote", title: "Testimonio", type: "array", of: [{ type: "block" }], validation: (R: any) => R.required() }),
    defineField({ name: "quoteEn", title: "Testimonio (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photo", title: "Foto del Autor", type: "image", options: { hotspot: true } }),
    defineField({ name: "rating", title: "Calificación", type: "number", validation: (R: any) => R.min(1).max(5), initialValue: 5 }),
    defineField({ name: "tour", title: "Tour Relacionado", type: "reference", to: [{ type: "tour" }] }),
    defineField({ name: "tripDate", title: "Fecha del Viaje", type: "string" }),
    featuredField("Testimonio Destacado", "Mostrar en secciones principales"),
    orderField(),
  ],
  preview: { select: { title: "authorName", subtitle: "company", media: "photo" } },
});