import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "kava-wiki-favorites";

export interface FavoriteStrain {
  id: string;
  name: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteStrain[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((id: string, name: string) => {
    setFavorites((prev) => {
      // Check if already exists
      if (prev.some((f) => f.id === id)) {
        return prev;
      }
      return [...prev, { id, name, addedAt: Date.now() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string, name: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id);
      if (exists) {
        return prev.filter((f) => f.id !== id);
      }
      return [...prev, { id, name, addedAt: Date.now() }];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((f) => f.id === id);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
