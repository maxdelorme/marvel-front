import { createContext, useContext, useState, useEffect } from "react";
import getFavoritesFromStorage from "../utils/getFavoritesFromStorage";

const FavorisContext = createContext();

export const FavorisProvider = ({ children }) => {
  const [favorisIDs, setFavorisIDs] = useState({
    characters: getFavoritesFromStorage("characters"),
    comics: getFavoritesFromStorage("comics"),
  });

  const value = {
    favorisIDs: favorisIDs,
    addToFavoris: (favoritesKey, id) => {
      const favorites = getFavoritesFromStorage(favoritesKey);
      favorites.push(id);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setFavorisIDs({ ...favorisIDs, [favoritesKey]: favorites });
    },
    removeFromFavoris: (favoritesKey, id) => {
      const favorites = getFavoritesFromStorage(favoritesKey);
      const newfavorites = favorites.filter((_id) => _id !== id);
      localStorage.setItem(favoritesKey, JSON.stringify(newfavorites));
      setFavorisIDs({ ...favorisIDs, [favoritesKey]: newfavorites });
    },
    isFavorite: (favoritesKey, id) => {
      return favorisIDs[favoritesKey].includes(id);
    },
  };
  return (
    <FavorisContext.Provider value={value}>{children}</FavorisContext.Provider>
  );
};

export const useFavorisContext = () => {
  const context = useContext(FavorisContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a BacketContentProvider");

  return context;
};
