// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });

export default defineType({
  name: "stat", title: "Estadística", type: "document", icon: () => "📊",
  fields: [
    defineField({ name: "label", title: "Etiqueta", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "labelEn", title: "Etiqueta (Inglés)", type: "string" }),
    defineField({ name: "value", title: "Valor", type: "number", validation: (R: any) => R.required() }),
    defineField({ name: "suffix", title: "Sufijo", type: "string", description: "Ej: +, %, K" }),
    defineField({ name: "prefix", title: "Prefijo", type: "string", description: "Ej: $" }),
    orderField(),
  ],
  preview: { select: { title: "label", subtitle: "value" }, prepare({ title, subtitle }: any) { return { title: title || "Sin etiqueta", subtitle: subtitle ? `${subtitle}` : undefined }; } },
});