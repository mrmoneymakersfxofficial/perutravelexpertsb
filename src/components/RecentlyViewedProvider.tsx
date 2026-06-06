'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface RecentlyViewedEntry {
  id: string;
  timestamp: number;
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedEntry[];
  addViewed: (id: string) => void;
  getRecentIds: () => string[];
}

const RECENT_KEY = 'pte-recently-viewed';
const MAX_RECENT = 5;

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

function loadRecent(): RecentlyViewedEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch { /* ignore */ }
  return [];
}

function saveRecent(entries: RecentlyViewedEntry[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(entries)); } catch { /* ignore */ }
}

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadRecent();
  });

  const addViewed = useCallback((id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(entry => entry.id !== id);
      const updated = [{ id, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      saveRecent(updated);
      return updated;
    });
  }, []);

  const getRecentIds = useCallback(() => recentlyViewed.map(entry => entry.id), [recentlyViewed]);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addViewed, getRecentIds }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  return context;
}
