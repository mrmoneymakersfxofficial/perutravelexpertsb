'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';

interface FavoritesContextType {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  favoritesCount: number;
}

const FAVORITES_KEY = 'pte-favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function loadFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Set(Array.isArray(parsed) ? parsed : []);
    }
  } catch { /* ignore */ }
  return new Set();
}

function saveFavorites(favs: Set<string>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs]));
  } catch { /* ignore */ }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    return loadFavorites();
  });

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const wasAdded = !next.has(id);
      if (wasAdded) next.add(id);
      else next.delete(id);
      saveFavorites(next);
      requestAnimationFrame(() => {
        const lang = typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'es';
        if (wasAdded) {
          toast.success(lang === 'es' ? 'Agregado a favoritos' : 'Added to favorites', { duration: 2500, icon: '❤️' });
        } else {
          toast.info(lang === 'es' ? 'Eliminado de favoritos' : 'Removed from favorites', { duration: 2500, icon: '💔' });
        }
      });
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount: favorites.size }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
}
