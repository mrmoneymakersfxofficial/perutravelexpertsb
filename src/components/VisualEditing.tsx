"use client";

import { useEffect, useState } from "react";
import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

/**
 * VisualEditing overlay — ONLY renders inside an iframe (Sanity Presentation Tool).
 * Public site never shows editing UI.
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
  return <SanityVisualEditing />;
}