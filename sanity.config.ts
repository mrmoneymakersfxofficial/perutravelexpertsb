// @ts-nocheck
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import PackageIcon from "@sanity/icons/Package";
import HomeIcon from "@sanity/icons/Home";
import CogIcon from "@sanity/icons/Cog";
import BookIcon from "@sanity/icons/Book";
import StackIcon from "@sanity/icons/Stack";
import UsersIcon from "@sanity/icons/Users";
import CommentIcon from "@sanity/icons/Comment";
import BarChartIcon from "@sanity/icons/BarChart";
import DashboardIcon from "@sanity/icons/Dashboard";
import GlobeIcon from "@sanity/icons/EarthGlobe";
import StarIcon from "@sanity/icons/Star";
import HeartIcon from "@sanity/icons/Heart";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE, SITE_URL, BRAND_COLORS } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "peru-travel-cms",
  title: STUDIO_TITLE,
  projectId,
  dataset,
  basePath: "/admin",
  releases: { enabled: false },
  plugins: [
    structureTool({
      structure: (S) => {
        return S.list().title("Panel de Control").items([
          S.listItem().title("Inicio").icon(DashboardIcon).id("home-group").child(
            S.list().title("Inicio").items([
              S.listItem().title("Hero (Slides)").icon(StackIcon).id("hero-slides").child(
                S.documentTypeList("heroSlide").title("Slides del Hero").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Estadísticas").icon(BarChartIcon).id("stats-list").child(
                S.documentTypeList("stat").title("Estadísticas").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Secciones de Página").icon(HomeIcon).id("page-sections-list").child(
                S.documentTypeList("pageSection").title("Secciones").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Socios / Afiliaciones").icon(UsersIcon).id("partners-list").child(
                S.documentTypeList("partner").title("Socios").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            ]),
          ),
          S.listItem().title("Destinos").icon(GlobeIcon).id("destinations-group").child(
            S.documentTypeList("destination").title("Destinos").defaultOrdering([{ field: "order", direction: "asc" }]),
          ),
          S.listItem().title("Tours").icon(PackageIcon).id("tours-group").child(
            S.list().title("Tours").items([
              S.listItem().title("Todos los Tours").icon(StackIcon).id("all-tours").child(
                S.documentTypeList("tour").title("Tours").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Paquetes Personalizados").icon(StarIcon).id("customized-tours").child(
                S.documentTypeList("customizedTour").title("Paquetes Personalizados").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            ]),
          ),
          ...S.documentTypeListItems().filter((item) => item.getId() === "teamMember"),
          ...S.documentTypeListItems().filter((item) => item.getId() === "testimonial"),
          S.listItem().title("Configuración del Sitio").icon(CogIcon).id("settings-group").child(
            S.list().title("Configuración").items([
              S.listItem().title("Datos del Sitio").icon(HomeIcon).id("site-settings-editor").child(
                S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración"),
              ),
            ]),
          ),
          S.listItem().title("Guía de Uso").icon(BookIcon).id("guide-group").child(
            S.document().schemaType("studioGuide").documentId("studio-guide").title("Guía Paso a Paso"),
          ),
        ]);
      },
    }),
    presentationTool({
      document: { actions: [] },
      previewUrl: {
        initial: process.env.NODE_ENV === "development" ? "http://localhost:3000" : SITE_URL,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          heroSlide: defineLocations({ type: "heroSlide", resolve: () => ({ locations: [{ title: "Hero / Inicio", href: "/" }] }) }),
          stat: defineLocations({ type: "stat", resolve: () => ({ locations: [{ title: "Inicio", href: "/" }] }) }),
          partner: defineLocations({ type: "partner", resolve: () => ({ locations: [{ title: "Inicio", href: "/" }] }) }),
          pageSection: defineLocations({ type: "pageSection", resolve: (doc) => {
            const pageMap: Record<string, string> = { home: "/", "tour-packages": "/tour-packages", "customized-tours": "/customized-tours", "about-us": "/about-us", testimonials: "/testimonials", contact: "/contact", faq: "/faq" };
            const href = pageMap[doc.page] || "/";
            return { locations: [{ title: `Sección: ${doc.title || ""}`, href }] };
          }}),
          destination: defineLocations({ type: "destination", resolve: (doc) => ({ locations: [{ title: `Destino: ${doc.name || ""}`, href: `/our-tours/${doc.slug?.current || ""}` }] }) }),
          tour: defineLocations({ type: "tour", resolve: (doc) => ({ locations: [{ title: "Tours", href: "/tour-packages" }, { title: `Tour: ${doc.title || ""}`, href: `/tours/${doc.slug?.current || ""}` }] }) }),
          customizedTour: defineLocations({ type: "customizedTour", resolve: (doc) => ({ locations: [{ title: "Customized Tours", href: "/customized-tours" }, { title: `Paquete: ${doc.nameEs || ""}`, href: `/tour-packages/${doc.slug?.current || ""}` }] }) }),
          teamMember: defineLocations({ type: "teamMember", resolve: () => ({ locations: [{ title: "About Us", href: "/about-us" }] }) }),
          testimonial: defineLocations({ type: "testimonial", resolve: () => ({ locations: [{ title: "Testimonios", href: "/testimonials" }, { title: "Inicio", href: "/" }] }) }),
          siteSettings: defineLocations({ type: "siteSettings", resolve: () => ({ locations: [
            { title: "Inicio", href: "/" },
            { title: "About Us", href: "/about-us" },
            { title: "Contact", href: "/contact" },
            { title: "Tours", href: "/tour-packages" },
            { title: "Customized Tours", href: "/customized-tours" },
            { title: "Testimonios", href: "/testimonials" },
          ] }) }),
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: { unsavedChanges: { warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?" } },
  form: { image: { directUploads: true } },
  theme: { "--brand-primary": BRAND_COLORS.primary, "--brand-accent": BRAND_COLORS.accent, "--brand-dark": BRAND_COLORS.dark } as React.CSSProperties,
});