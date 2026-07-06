"use client";
import dynamic from "next/dynamic";

const Studio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0F0F0F" }}>
      <p style={{ color: "#C5A55A", fontSize: 18, fontFamily: "sans-serif" }}>Cargando Studio...</p>
    </div>
  ),
});

function StudioGuard({ children }: { children: React.ReactNode }) {
  const hasProjectId = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  if (!hasProjectId) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0F0F0F", padding: 32, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(197,165,90,0.3)", borderRadius: 16, padding: "48px 40px", maxWidth: 560, width: "100%" }}>
          <h2 style={{ color: "#C5A55A", fontSize: 22, marginBottom: 16, fontWeight: 600 }}>CMS — No Configurado</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>Para acceder al panel de administracion, configura estas variables de entorno en Vercel:</p>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "16px 20px", textAlign: "left", marginBottom: 24, fontSize: 13 }}>
            <code style={{ color: "#C5A55A", display: "block", marginBottom: 6 }}>NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id</code>
            <code style={{ color: "#C5A55A", display: "block", marginBottom: 6 }}>NEXT_PUBLIC_SANITY_DATASET=production</code>
            <code style={{ color: "#C5A55A", display: "block", marginBottom: 6 }}>SANITY_API_READ_TOKEN=tu_read_token</code>
            <code style={{ color: "#C5A55A", display: "block", marginBottom: 6 }}>NEXT_PUBLIC_SANITY_API_READ_TOKEN=tu_read_token</code>
            <code style={{ color: "#C5A55A", display: "block" }}>NEXT_PUBLIC_SITE_URL=https://perutravelexpertsb.com</code>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function StudioWithConfig() {
  const config = require("../../../../sanity.config");
  return <Studio config={config.default || config} />;
}

export default function AdminPage() {
  return <StudioGuard><StudioWithConfig /></StudioGuard>;
}