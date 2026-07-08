import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import { schemaTypes } from "../sanity/schema";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "e1mckeul";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "peru-travel-cms",
  title: "PeruTravelExpertsB CMS",
  projectId,
  dataset,
  basePath: "/",
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || "https://perutravelexpertsb.com",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        locations: {
          heroSlide: defineLocations({ type: "heroSlide", resolve: () => ({ locations: [{ title: "Hero / Inicio", href: "/" }] }) }),
          stat: defineLocations({ type: "stat", resolve: () => ({ locations: [{ title: "Estadísticas | Inicio", href: "/" }] }) }),
          partner: defineLocations({ type: "partner", resolve: () => ({ locations: [{ title: "Socios | Inicio", href: "/" }] }) }),
          pageSection: defineLocations({ type: "pageSection", resolve: (doc: any) => {
            const pageMap: Record<string, string> = { home: "/", "tour-packages": "/tour-packages", "customized-tours": "/customized-tours", "about-us": "/about-us", testimonials: "/testimonials", contact: "/contact", faq: "/faq" };
            return { locations: [{ title: `Sección: ${doc?.title || ""}`, href: pageMap[doc?.page] || "/" }] };
          }}),
          destination: defineLocations({ type: "destination", resolve: (doc: any) => ({
            locations: [{ title: "Todos los Destinos", href: "/our-tours" }, { title: `Destino: ${doc?.name || ""}`, href: `/our-tours/${doc?.slug?.current || ""}` }],
          })}),
          tour: defineLocations({ type: "tour", resolve: (doc: any) => ({
            locations: [{ title: "Lista de Tours", href: "/tours" }, { title: `Tour: ${doc?.title || ""}`, href: `/tours/${doc?.slug?.current || ""}` }],
          })}),
          customizedTour: defineLocations({ type: "customizedTour", resolve: (doc: any) => ({
            locations: [{ title: "Paquetes Personalizados", href: "/tour-packages" }, { title: `Paquete: ${doc?.nameEs || ""}`, href: `/tour-packages/${doc?.slug?.current || ""}` }],
          })}),
          communityTour: defineLocations({ type: "communityTour", resolve: (doc: any) => ({
            locations: [{ title: "Tours Comunitarios", href: "/tours-cities" }, { title: `Tour: ${doc?.nameEs || ""}`, href: `/tours-cities/${doc?.slug?.current || ""}` }],
          })}),
          testimonial: defineLocations({ type: "testimonial", resolve: () => ({ locations: [{ title: "Testimonios Destacados | Inicio", href: "/" }, { title: "Todos los Testimonios", href: "/testimonials" }] })}),
          teamMember: defineLocations({ type: "teamMember", resolve: () => ({ locations: [{ title: "Equipo | Sobre Nosotros", href: "/about-us" }] })}),
          project: defineLocations({ type: "project", resolve: (doc: any) => ({
            locations: [{ title: "Proyectos de Apoyo", href: "/projects-we-support" }, { title: `Proyecto: ${doc?.nameEs || ""}`, href: `/projects-we-support/${doc?.slug?.current || ""}` }],
          })}),
          faq: defineLocations({ type: "faq", resolve: () => ({ locations: [{ title: "Preguntas Frecuentes", href: "/faq" }] })}),
          siteSettings: defineLocations({ type: "siteSettings", resolve: () => ({ locations: [
            { title: "Inicio", href: "/" }, { title: "Sobre Nosotros", href: "/about-us" }, { title: "Contacto", href: "/contact" },
            { title: "Tours", href: "/tour-packages" }, { title: "Paquetes Personalizados", href: "/customized-tours" },
            { title: "Testimonios", href: "/testimonials" }, { title: "FAQ", href: "/faq" }, { title: "Proyectos", href: "/projects-we-support" },
          ] })}),
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: { unsavedChanges: { warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?" } },
});
