'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { TourData } from '@/lib/tours-data';

interface ModalContextType {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  favoritesOpen: boolean;
  setFavoritesOpen: (open: boolean) => void;
  detailOpen: boolean;
  setDetailOpen: (open: boolean) => void;
  detailTour: TourData | null;
  setDetailTour: (tour: TourData | null) => void;
  bookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
  anyModalOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openFavorites: () => void;
  closeFavorites: () => void;
  openDetail: (tour: TourData) => void;
  closeDetail: () => void;
  openBooking: () => void;
  closeBooking: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTour, setDetailTour] = useState<TourData | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const anyModalOpen = searchOpen || favoritesOpen || detailOpen || bookingOpen;

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openFavorites = useCallback(() => setFavoritesOpen(true), []);
  const closeFavorites = useCallback(() => setFavoritesOpen(false), []);
  const openDetail = useCallback((tour: TourData) => {
    setDetailTour(tour);
    setDetailOpen(true);
  }, []);
  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    setTimeout(() => setDetailTour(null), 200);
  }, []);
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <ModalContext.Provider
      value={{
        searchOpen, setSearchOpen,
        favoritesOpen, setFavoritesOpen,
        detailOpen, setDetailOpen,
        detailTour, setDetailTour,
        bookingOpen, setBookingOpen,
        anyModalOpen,
        openSearch, closeSearch,
        openFavorites, closeFavorites,
        openDetail, closeDetail,
        openBooking, closeBooking,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
