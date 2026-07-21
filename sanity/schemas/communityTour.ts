// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });
const featuredField = (label, desc) => defineField({ name: "featured", title: label, type: "boolean", description: desc, initialValue: false });

export default defineType({
  name: "communityTour", title: "Tour Comunitario", type: "document", icon: () => "🏘️",
  fields: [
    defineField({ name: "nameEs", title: "Nombre (Español)", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "nameEn", title: "Nombre (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nameEs", maxLength: 80 }, validation: (R: any) => R.required() }),
    defineField({ name: "image", title: "Imagen Principal", type: "image", options: { hotspot: true } }),
    defineField({ name: "descriptionEs", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "duration", title: "Duración (días)", type: "number", validation: (R: any) => R.required().min(1) }),
    defineField({ name: "priceUSD", title: "Precio USD", type: "number" }),
    defineField({ name: "includesEs", title: "Incluye (Español)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includesEn", title: "Incluye (Inglés)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "location", title: "Ubicación", type: "string" }),
    featuredField("Destacado", "Mostrar en secciones principales"),
    orderField(),
  ],
  preview: { select: { title: "nameEs", subtitle: "duration", media: "image" }, prepare({ title, subtitle, media }: any) { return { title: title || "Sin nombre", subtitle: subtitle ? `${subtitle} días` : undefined, media }; } },
});
