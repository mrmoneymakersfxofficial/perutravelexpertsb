"use client";

import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

const STUDIO_URL = "https://www.sanity.io";

/**
 * VisualEditing overlay — Siempre renderizado en Draft Mode.
 * 
 * @sanity/visual-editing maneja internamente:
 * - Detectar si estamos dentro de un iframe (Presentation Tool)
 * - Establecer el contexto stega ANTES de que React procese datos
 * - Renderizar overlays en cada campo editable
 * - Click → postMessage al studio para abrir el editor
 * 
 * NO USAR isIframe check porque el contexto stega debe establecerse
 * antes de que React encuentre objetos {_type: 'stega'} en el contenido.
 * Sin el contexto, React lanza error #418.
 */
export function VisualEditing() {
  return (
    <>
      <SanityVisualEditing studioUrl={STUDIO_URL} />
      {/* Indicador visible solo dentro del iframe */}
      <div
        className="ve-badge"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 99999,
          background: "#D4A843",
          color: "#000",
          fontSize: 10,
          padding: "4px 10px",
          borderRadius: 20,
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        ✎ Edit Mode
      </div>
    </>
  );
}
