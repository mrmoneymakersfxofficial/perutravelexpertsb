// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq", title: "Preguntas Frecuentes", type: "document", icon: () => "❓",
  groups: [
    { name: "es", title: "Español" },
    { name: "en", title: "Inglés" },
  ],
  fields: [
    defineField({
      name: "question", title: "Pregunta (Español)", type: "string", group: "es",
      validation: (R: any) => R.required().max(200),
    }),
    defineField({
      name: "questionEn", title: "Pregunta (Inglés)", type: "string", group: "en",
    }),
    defineField({
      name: "answer", title: "Respuesta (Español)", type: "array", of: [{ type: "block" }], group: "es",
      validation: (R: any) => R.required(),
    }),
    defineField({
      name: "answerEn", title: "Respuesta (Inglés)", type: "array", of: [{ type: "block" }], group: "en",
    }),
    defineField({ name: "category", title: "Categoría", type: "string", options: {
      list: [
        { title: "General", value: "general" },
        { title: "Reservas", value: "booking" },
        { title: "Viaje", value: "travel" },
        { title: "Pagos", value: "payment" },
      ], layout: "dropdown",
    }, initialValue: "general" }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "question", subtitle: "category" }, prepare({ title, subtitle }: any) { return { title: title || "Sin pregunta", subtitle: subtitle || "" }; } },
  orderings: [
    { title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
});
