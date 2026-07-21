// @ts-nocheck
import { defineType, defineField } from "sanity";
const featuredField = (label, desc) => defineField({ name: "featured", title: label, type: "boolean", description: desc, initialValue: false });
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });

export default defineType({
  name: "project", title: "Proyecto de Apoyo", type: "document", icon: () => "🤝",
  fields: [
    defineField({ name: "nameEs", title: "Nombre (Español)", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "nameEn", title: "Nombre (Inglés)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nameEs", maxLength: 80 }, validation: (R: any) => R.required() }),
    defineField({ name: "image", title: "Imagen Principal", type: "image", options: { hotspot: true } }),
    defineField({ name: "descriptionEs", title: "Descripción (Español)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "descriptionEn", title: "Descripción (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "impactLabel", title: "Etiqueta de Impacto", type: "string", description: "Ej: 'Educación', 'Salud', 'Medio Ambiente'" }),
    defineField({ name: "websiteUrl", title: "Sitio Web del Proyecto", type: "url" }),
    featuredField("Destacado", "Mostrar en la página principal"),
    orderField(),
  ],
  preview: { select: { title: "nameEs", subtitle: "impactLabel", media: "image" }, prepare({ title, subtitle, media }: any) { return { title: title || "Sin nombre", subtitle: subtitle || "", media }; } },
});
