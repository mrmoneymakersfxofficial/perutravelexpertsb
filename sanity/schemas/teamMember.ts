// @ts-nocheck
import { defineType, defineField } from "sanity";
const orderField = () => defineField({ name: "order", title: "Orden", type: "number", description: "Orden de aparicion (menor = primero).", initialValue: 100, validation: (Rule) => Rule.integer().min(0) });

export default defineType({
  name: "teamMember", title: "Miembro del Equipo", type: "document", icon: () => "👤",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "roleEn", title: "Cargo (Inglés)", type: "string" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Biografía", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "bioEn", title: "Biografía (Inglés)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "languages", title: "Idiomas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "specialty", title: "Especialidad", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Teléfono", type: "string" }),
    orderField(),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});