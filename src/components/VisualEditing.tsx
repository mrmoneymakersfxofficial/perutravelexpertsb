"use client";

import { useEffect, useState } from "react";
import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

/**
 * VisualEditing overlay — SOLO se renderiza dentro de un iframe
 * (cuando la Sanity Presentation Tool abre el sitio para edición visual).
 * 
 * El sitio público NUNCA muestra la UI de edición.
 */
export function VisualEditing() {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    try {
      setIsIframe(window.self !== window.top);
    } catch {
      // Si hay error de cross-origin, estamos en iframe
      setIsIframe(true);
    }
  }, []);

  if (!isIframe) return null;

  return (
    <>
      <SanityVisualEditing />
      {/* Pequeño indicador visual de que estamos en modo edición */}
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 9999,
          background: "#D4A843",
          color: "#000",
          fontSize: 10,
          padding: "4px 10px",
          borderRadius: 20,
          fontWeight: 600,
          opacity: 0.7,
          pointerEvents: "none",
        }}
      >
        ✎ Edit Mode
      </div>
    </>
  );
}
