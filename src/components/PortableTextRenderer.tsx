"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@sanity/client";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-semibold mb-2">{children}</h4>,
    normal: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#D4A843] pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-sm">{children}</li>,
    number: ({ children }) => <li className="text-sm">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      return (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[#D4A843] underline hover:brightness-110">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-4">
        <img src={value?.asset?.url || ""} alt={value?.alt || ""} className="rounded-lg w-full object-cover" />
        {value?.caption && <figcaption className="text-xs text-center mt-1 opacity-60">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

interface Props {
  value: PortableTextBlock[] | undefined | null;
  className?: string;
}

export function PortableTextRenderer({ value, className = "" }: Props) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
