// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });

export default defineType({
  name: "heroSlide", title: "Slide del Hero", type: "document", icon: () => "🖼️",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (R: any) => R.required().max(100) }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "backgroundImage", title: "Imagen de Fondo", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaLabel", title: "Etiqueta del CTA", type: "string" }),
    defineField({ name: "ctaLink", title: "Enlace del CTA", type: "string" }),
    defineField({ name: "ctaType", title: "Tipo de CTA", type: "string", options: { list: [
      { title: "Primario", value: "primary" },
      { title: "WhatsApp", value: "whatsapp" },
      { title: "Email", value: "mail" },
    ], layout: "radio" }, initialValue: "primary" }),
    orderField(),
  ],
  preview: { select: { title: "title", media: "backgroundImage" }, prepare({ title, media }) { return { title: title || "Sin título", media }; } },
});