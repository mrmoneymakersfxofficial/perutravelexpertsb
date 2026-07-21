'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#D4A843]/50 flex-shrink-0" />
              )}
              {isLast ? (
                <span className="text-[#D4A843] font-medium">{item.label}</span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-[#8B8680] hover:text-[#D4A843] transition-colors"
                >
                  {index === 0 ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span className="text-[#8B8680]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
