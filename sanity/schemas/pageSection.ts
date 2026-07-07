// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "pageSection", title: "Sección de Página", type: "document", icon: () => "📝",
  fields: [
    defineField({ name: "page", title: "Página", type: "string", options: { list: [
      { title: "Inicio (/)", value: "home" },
      { title: "Tour Packages", value: "tour-packages" },
      { title: "Customized Tours", value: "customized-tours" },
      { title: "About Us", value: "about-us" },
      { title: "Testimonials", value: "testimonials" },
      { title: "Contact", value: "contact" },
      { title: "FAQ", value: "faq" },
    ], layout: "radio" }, validation: (R: any) => R.required() }),
    defineField({ name: "sectionId", title: "ID de Sección", type: "string", description: "Identificador único de la sección (ej: about, why-choose-us, destinations)" }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "titleEn", title: "Título (Inglés)", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "subtitleEn", title: "Subtítulo (Inglés)", type: "string" }),
    defineField({ name: "content", title: "Contenido", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentEn", title: "Contenido (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaLabel", title: "Texto del CTA", type: "string" }),
    defineField({ name: "ctaLabelEn", title: "Texto del CTA (Inglés)", type: "string" }),
    defineField({ name: "ctaLink", title: "Enlace del CTA", type: "string" }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 100 }),
    defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "page" }, prepare({ title, subtitle }: any) { return { title: title || "Sin título", subtitle: subtitle || "" }; } },
});