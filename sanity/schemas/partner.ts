// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });

export default defineType({
  name: "partner", title: "Socio / Afiliación", type: "document", icon: () => "🤝",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", title: "Enlace", type: "url" }),
    orderField(),
  ],
  preview: { select: { title: "name", media: "logo" } },
});