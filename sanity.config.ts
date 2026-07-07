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
import QuestionMarkIcon from "@sanity/icons/HelpCircle";
import ProjectIcon from "@sanity/icons/Clipboard";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE, BRAND_COLORS } from "./sanity/lib/constants";

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
          // ── Inicio ──
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
          // ── Destinos ──
          S.listItem().title("Destinos").icon(GlobeIcon).id("destinations-group").child(
            S.documentTypeList("destination").title("Destinos").defaultOrdering([{ field: "order", direction: "asc" }]),
          ),
          // ── Tours ──
          S.listItem().title("Tours").icon(PackageIcon).id("tours-group").child(
            S.list().title("Tours").items([
              S.listItem().title("Todos los Tours").icon(StackIcon).id("all-tours").child(
                S.documentTypeList("tour").title("Tours").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Paquetes Personalizados").icon(StarIcon).id("customized-tours").child(
                S.documentTypeList("customizedTour").title("Paquetes Personalizados").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Tours Comunitarios").icon(HeartIcon).id("community-tours").child(
                S.documentTypeList("communityTour").title("Tours Comunitarios").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            ]),
          ),
          // ── Testimonios y Equipo ──
          ...S.documentTypeListItems().filter((item) => item.getId() === "testimonial"),
          ...S.documentTypeListItems().filter((item) => item.getId() === "teamMember"),
          // ── Proyectos y FAQ ──
          S.listItem().title("Proyectos").icon(ProjectIcon).id("projects-group").child(
            S.documentTypeList("project").title("Proyectos de Apoyo").defaultOrdering([{ field: "order", direction: "asc" }]),
          ),
          S.listItem().title("FAQ").icon(QuestionMarkIcon).id("faq-group").child(
            S.documentTypeList("faq").title("Preguntas Frecuentes").defaultOrdering([{ field: "order", direction: "asc" }]),
          ),
          // ── ConfiguraciOn ──
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
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        locations: {
          // ── Hero Slides → Home ──
          heroSlide: defineLocations({
            type: "heroSlide",
            resolve: () => ({ locations: [{ title: "Hero | Inicio", href: "/" }] }),
          }),
          // ── Stats → Home ──
          stat: defineLocations({
            type: "stat",
            resolve: () => ({ locations: [{ title: "Estadísticas | Inicio", href: "/" }] }),
          }),
          // ── Partners → Home ──
          partner: defineLocations({
            type: "partner",
            resolve: () => ({ locations: [{ title: "Socios | Inicio", href: "/" }] }),
          }),
          // ── Page Sections → Múltiples páginas ──
          pageSection: defineLocations({
            type: "pageSection",
            resolve: (doc) => {
              const pageMap = {
                home: "/",
                "tour-packages": "/tour-packages",
                "customized-tours": "/customized-tours",
                "about-us": "/about-us",
                testimonials: "/testimonials",
                contact: "/contact",
                faq: "/faq",
              };
              const href = pageMap[doc?.page] || "/";
              return { locations: [{ title: `Sección: ${doc?.title || ""}`, href }] };
            },
          }),
          // ── Destinations → Páginas de destino ──
          destination: defineLocations({
            type: "destination",
            resolve: (doc) => ({
              locations: [
                { title: "Todos los Destinos", href: "/our-tours" },
                { title: `Destino: ${doc?.name || ""}`, href: `/our-tours/${doc?.slug?.current || ""}` },
              ],
            }),
          }),
          // ── Tours → Listing + Detail páginas ──
          tour: defineLocations({
            type: "tour",
            resolve: (doc) => ({
              locations: [
                { title: "Lista de Tours", href: "/tours" },
                { title: "Tours por Destino", href: "/our-tours" },
                { title: `Tour: ${doc?.title || doc?.titleEn || ""}`, href: `/tours/${doc?.slug?.current || ""}` },
              ],
            }),
          }),
          // ── Customized Tours → Listing + Detail ──
          customizedTour: defineLocations({
            type: "customizedTour",
            resolve: (doc) => ({
              locations: [
                { title: "Paquetes Personalizados", href: "/tour-packages" },
                { title: `Paquete: ${doc?.nameEs || doc?.nameEn || ""}`, href: `/tour-packages/${doc?.slug?.current || ""}` },
              ],
            }),
          }),
          // ── Community Tours → Listing + Detail ──
          communityTour: defineLocations({
            type: "communityTour",
            resolve: (doc) => ({
              locations: [
                { title: "Tours Comunitarios", href: "/tours-cities" },
                { title: `Tour: ${doc?.nameEs || doc?.nameEn || ""}`, href: `/tours-cities/${doc?.slug?.current || ""}` },
              ],
            }),
          }),
          // ── Testimonials → Home + Testimonials page ──
          testimonial: defineLocations({
            type: "testimonial",
            resolve: () => ({
              locations: [
                { title: "Testimonios Destacados | Inicio", href: "/" },
                { title: "Todos los Testimonios", href: "/testimonials" },
              ],
            }),
          }),
          // ── Team Members → About Us ──
          teamMember: defineLocations({
            type: "teamMember",
            resolve: () => ({ locations: [{ title: "Equipo | Sobre Nosotros", href: "/about-us" }] }),
          }),
          // ── Projects → Listing + Detail ──
          project: defineLocations({
            type: "project",
            resolve: (doc) => ({
              locations: [
                { title: "Proyectos de Apoyo", href: "/projects-we-support" },
                { title: `Proyecto: ${doc?.nameEs || doc?.nameEn || ""}`, href: `/projects-we-support/${doc?.slug?.current || ""}` },
              ],
            }),
          }),
          // ── FAQ → FAQ page ──
          faq: defineLocations({
            type: "faq",
            resolve: () => ({ locations: [{ title: "Preguntas Frecuentes", href: "/faq" }] }),
          }),
          // ── Site Settings → Múltiples páginas ──
          siteSettings: defineLocations({
            type: "siteSettings",
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Sobre Nosotros", href: "/about-us" },
                { title: "Contacto", href: "/contact" },
                { title: "Tours", href: "/tour-packages" },
                { title: "Paquetes Personalizados", href: "/customized-tours" },
                { title: "Testimonios", href: "/testimonials" },
                { title: "FAQ", href: "/faq" },
                { title: "Proyectos", href: "/projects-we-support" },
              ],
            }),
          }),
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (prev) => prev,
    actions: (prev) => prev,
    // Auto-save: los cambios se guardan automáticamente como borrador
    // después de 3 segundos de inactividad (comportamiento nativo de Sanity Studio)
    unsavedChanges: { warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?" },
  },
  form: {
    image: {
      directUploads: true,
    },
  },
  theme: { "--brand-primary": BRAND_COLORS.primary, "--brand-accent": BRAND_COLORS.accent, "--brand-dark": BRAND_COLORS.dark } as React.CSSProperties,
});
