"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SanityLiveWithToken({ includeDrafts = false, children }: { includeDrafts?: boolean; children?: ReactNode }) {
  const [ready, setReady] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      try {
        const res = await fetch("/api/sanity-token");
        if (!res.ok || cancelled) return;
        const { token, projectId } = await res.json();
        if (!token || !projectId || cancelled) return;

        const dataset = "production";
        const perspective = includeDrafts ? "drafts" : "published";
        const url = `https://api.sanity.io/v1/data/listen/${projectId}?dataset=${dataset}&perspective=${perspective}&token=${encodeURIComponent(token)}`;

        const es = new EventSource(url, { withCredentials: false });
        eventSourceRef.current = es;

        es.onopen = () => { if (!cancelled) setReady(true); };

        es.addEventListener("message", (event: MessageEvent) => {
          if (cancelled) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === "welcome") return;
            if (data.transitions || data.type === "mutation") {
              if (typeof window !== "undefined" && (window as any).__nextRouter) {
                (window as any).__nextRouter.refresh();
              } else {
                window.location.reload();
              }
            }
          } catch { /* ignore */ }
        });

        es.onerror = () => {
          if (!cancelled) { es.close(); setTimeout(() => { if (!cancelled) connect(); }, 3000); }
        };
      } catch { /* silently fail */ }
    }

    connect();
    return () => { cancelled = true; eventSourceRef.current?.close(); };
  }, [includeDrafts]);

  return <>{children}</>;
}