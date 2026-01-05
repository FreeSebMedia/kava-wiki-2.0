import { describe, it, expect } from 'vitest';

/**
 * Tests for the favorites system data structures and logic
 * The actual React hook is tested via browser interaction
 */

interface FavoriteStrain {
  id: string;
  name: string;
  addedAt: number;
}

const FAVORITES_KEY = "kava-wiki-favorites";

// Helper functions that mirror the hook logic
function addFavorite(favorites: FavoriteStrain[], id: string, name: string): FavoriteStrain[] {
  if (favorites.some((f) => f.id === id)) {
    return favorites;
  }
  return [...favorites, { id, name, addedAt: Date.now() }];
}

function removeFavorite(favorites: FavoriteStrain[], id: string): FavoriteStrain[] {
  return favorites.filter((f) => f.id !== id);
}

function toggleFavorite(favorites: FavoriteStrain[], id: string, name: string): FavoriteStrain[] {
  const exists = favorites.some((f) => f.id === id);
  if (exists) {
    return favorites.filter((f) => f.id !== id);
  }
  return [...favorites, { id, name, addedAt: Date.now() }];
}

function isFavorite(favorites: FavoriteStrain[], id: string): boolean {
  return favorites.some((f) => f.id === id);
}

describe('Favorites System', () => {
  describe('FAVORITES_KEY constant', () => {
    it('should use correct localStorage key', () => {
      expect(FAVORITES_KEY).toBe("kava-wiki-favorites");
    });
  });

  describe('FavoriteStrain interface', () => {
    it('should have correct structure', () => {
      const favorite: FavoriteStrain = {
        id: "kelai",
        name: "Kelai",
        addedAt: Date.now()
      };
      
      expect(favorite).toHaveProperty('id');
      expect(favorite).toHaveProperty('name');
      expect(favorite).toHaveProperty('addedAt');
      expect(typeof favorite.id).toBe('string');
      expect(typeof favorite.name).toBe('string');
      expect(typeof favorite.addedAt).toBe('number');
    });
  });

  describe('addFavorite', () => {
    it('should add a new favorite', () => {
      const favorites: FavoriteStrain[] = [];
      const result = addFavorite(favorites, "kelai", "Kelai");
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("kelai");
      expect(result[0].name).toBe("Kelai");
    });

    it('should not add duplicate favorites', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() }
      ];
      const result = addFavorite(favorites, "kelai", "Kelai");
      
      expect(result.length).toBe(1);
    });

    it('should add multiple different favorites', () => {
      let favorites: FavoriteStrain[] = [];
      favorites = addFavorite(favorites, "kelai", "Kelai");
      favorites = addFavorite(favorites, "borogu", "Borogu");
      favorites = addFavorite(favorites, "palasa", "Palasa");
      
      expect(favorites.length).toBe(3);
    });
  });

  describe('removeFavorite', () => {
    it('should remove an existing favorite', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() },
        { id: "borogu", name: "Borogu", addedAt: Date.now() }
      ];
      const result = removeFavorite(favorites, "kelai");
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("borogu");
    });

    it('should handle removing non-existent favorite', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() }
      ];
      const result = removeFavorite(favorites, "nonexistent");
      
      expect(result.length).toBe(1);
    });
  });

  describe('toggleFavorite', () => {
    it('should add favorite if not exists', () => {
      const favorites: FavoriteStrain[] = [];
      const result = toggleFavorite(favorites, "kelai", "Kelai");
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("kelai");
    });

    it('should remove favorite if exists', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() }
      ];
      const result = toggleFavorite(favorites, "kelai", "Kelai");
      
      expect(result.length).toBe(0);
    });
  });

  describe('isFavorite', () => {
    it('should return true for existing favorite', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() }
      ];
      
      expect(isFavorite(favorites, "kelai")).toBe(true);
    });

    it('should return false for non-existing favorite', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: Date.now() }
      ];
      
      expect(isFavorite(favorites, "borogu")).toBe(false);
    });

    it('should return false for empty favorites', () => {
      const favorites: FavoriteStrain[] = [];
      
      expect(isFavorite(favorites, "kelai")).toBe(false);
    });
  });

  describe('JSON serialization', () => {
    it('should serialize and deserialize favorites correctly', () => {
      const favorites: FavoriteStrain[] = [
        { id: "kelai", name: "Kelai", addedAt: 1703412000000 },
        { id: "borogu", name: "Borogu", addedAt: 1703412100000 }
      ];
      
      const serialized = JSON.stringify(favorites);
      const deserialized = JSON.parse(serialized) as FavoriteStrain[];
      
      expect(deserialized.length).toBe(2);
      expect(deserialized[0].id).toBe("kelai");
      expect(deserialized[1].id).toBe("borogu");
    });
  });
});
