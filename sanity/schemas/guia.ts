// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "studioGuide", title: "Guía de Uso", type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", initialValue: "Guía Paso a Paso" }),
    defineField({ name: "content", title: "Contenido", type: "array", of: [{ type: "block" }], initialValue: [
      { _type: "block", _key: "g1", children: [{ _type: "span", _key: "s1", text: "Bienvenido al CMS de Peru Travel Experts B." }], style: "h2" },
      { _type: "block", _key: "g2", children: [{ _type: "span", _key: "s2", text: "Usa el panel izquierdo para navegar entre secciones. Cada sección controla una parte del sitio web." }], style: "normal" },
      { _type: "block", _key: "g3", children: [{ _type: "span", _key: "s3", text: "Visual Editing: Haz clic en el icono de Presentación (ojo) para ver el sitio en vivo. Al hacer clic en cualquier texto o imagen, se abrirá el editor directo." }], style: "normal" },
      { _type: "block", _key: "g4", children: [{ _type: "span", _key: "s4", text: "Los cambios se publican cuando presionas el botón 'Publicar'. En el modo Presentación, los cambios se reflejan en tiempo real." }], style: "normal" },
      { _type: "block", _key: "g5", children: [{ _type: "span", _key: "s5", text: "Para subir imágenes, haz clic en el campo de imagen y arrastra o selecciona un archivo." }], style: "normal" },
    ] }),
  ],
  preview: { prepare() { return { title: "Guía de Uso" }; } },
});