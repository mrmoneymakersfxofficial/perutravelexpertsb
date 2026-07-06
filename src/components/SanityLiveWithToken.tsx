"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Live preview listener — conecta con Sanity y recarga/refresca automáticamente
 * cuando hay cambios en el CMS. Solo se activa en Draft Mode.
 * 
 * Usa @sanity/client listen como alternativa más robusta al raw EventSource.
 */
export function SanityLiveWithToken({
  includeDrafts = false,
  children,
}: {
  includeDrafts?: boolean;
  children?: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountRef = useRef(true);

  useEffect(() => {
    mountRef.current = true;

    async function connect() {
      try {
        // Obtener token del servidor
        const res = await fetch("/api/sanity-token");
        if (!res.ok || !mountRef.current) return;

        const data = await res.json();
        const { token, projectId } = data;
        if (!token || !projectId || !mountRef.current) return;

        const dataset = "production";
        const perspective = includeDrafts ? "drafts" : "published";
        const url = `https://${projectId}.api.sanity.io/v1/data/listen/${projectId}?dataset=${dataset}&perspective=${perspective}&token=${encodeURIComponent(token)}&tag=visual-editing-live`;

        // Cerrar conexión previa
        eventSourceRef.current?.close();

        const es = new EventSource(url, { withCredentials: false });
        eventSourceRef.current = es;

        es.onopen = () => {
          if (mountRef.current) setReady(true);
        };

        es.addEventListener("message", (event: MessageEvent) => {
          if (!mountRef.current) return;
          try {
            const data = JSON.parse(event.data);
            // Ignorar mensaje de bienvenida inicial
            if (data.type === "welcome") return;

            // Mutación detectada — refrescar la página
            if (data.type === "mutation" || data.transitions) {
              // Intentar refresh vía Router (Next.js App Router)
              if (typeof window !== "undefined") {
                try {
                  // @ts-expect-error — router.refresh() no es parte de window API estándar
                  // pero es injectado por next-sanity en Visual Editing
                  if (window.__nextRouter?.refresh) {
                    window.__nextRouter.refresh();
                  } else {
                    window.location.reload();
                  }
                } catch {
                  window.location.reload();
                }
              }
            }
          } catch {
            // Ignorar errores de parseo
          }
        });

        es.onerror = () => {
          if (!mountRef.current) return;
          es.close();
          // Reconectar después de 3s
          retryRef.current = setTimeout(() => {
            if (mountRef.current) connect();
          }, 3000);
        };
      } catch {
        // Fallo silencioso — el live preview no es crítico
        if (mountRef.current) {
          retryRef.current = setTimeout(() => {
            if (mountRef.current) connect();
          }, 5000);
        }
      }
    }

    connect();

    return () => {
      mountRef.current = false;
      eventSourceRef.current?.close();
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [includeDrafts]);

  // No renderiza nada visual — solo maneja la conexión en background
  return <>{children}</>;
}
