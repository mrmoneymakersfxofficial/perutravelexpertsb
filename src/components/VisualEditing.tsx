"use client";

import { useEffect, useState } from "react";
import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

const STUDIO_URL = "https://perutravelexpertsb-cms.sanity.studio";

/**
 * VisualEditing overlay — SOLO se renderiza dentro de un iframe
 * (cuando la Sanity Presentation Tool abre el sitio para edición visual).
 * 
 * Al hacer clic en contenido editable, redirige al Studio externo.
 */
export function VisualEditing() {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    try {
      setIsIframe(window.self !== window.top);
    } catch {
      setIsIframe(true);
    }
  }, []);

  if (!isIframe) return null;

  return (
    <>
      <SanityVisualEditing studioUrl={STUDIO_URL} />
      <div
        style={{
          position: "fixed",
          bottom: 16, left: 16, zIndex: 9999,
          background: "#D4A843", color: "#000",
          fontSize: 10, padding: "4px 10px", borderRadius: 20,
          fontWeight: 600, opacity: 0.7, pointerEvents: "none",
        }}
      >
        ✎ Edit Mode
      </div>
    </>
  );
}
