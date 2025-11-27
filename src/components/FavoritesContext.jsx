// Create a context to be used everywhere
// This context give access to favoris , and a bunch of logic function

import { createContext, useContext, useState } from "react";
import getFavoritesFromStorage from "../utils/getFavoritesFromStorage";

const FavorisContext = createContext();

export const FavorisProvider = ({ children }) => {
  const [favorisIDs, setFavorisIDs] = useState({
    characters: getFavoritesFromStorage("characters"),
    comics: getFavoritesFromStorage("comics"),
  });

  // The context Object with the IDs and function to operate on it
  const value = {
    // the objects of 2 keys , each is a array of IDs
    favorisIDs: favorisIDs,

    // add the item to the favorites of type favoritesKey
    addToFavoris: (favoritesKey, id) => {
      const favorites = getFavoritesFromStorage(favoritesKey);
      favorites.push(id);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setFavorisIDs({ ...favorisIDs, [favoritesKey]: favorites });
    },

    // remove the item of the favorites of type favoritesKey
    removeFromFavoris: (favoritesKey, id) => {
      const favorites = getFavoritesFromStorage(favoritesKey);
      const newfavorites = favorites.filter((_id) => _id !== id);
      localStorage.setItem(favoritesKey, JSON.stringify(newfavorites));
      setFavorisIDs({ ...favorisIDs, [favoritesKey]: newfavorites });
    },

    // Check if the id is a favorite value
    isFavorite: (favoritesKey, id) => {
      return favorisIDs[favoritesKey].includes(id);
    },
  };
  return (
    <FavorisContext.Provider value={value}>{children}</FavorisContext.Provider>
  );
};

// Helper function to return the Context object
export const useFavorisContext = () => {
  const context = useContext(FavorisContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a BacketContentProvider");

  return context;
};
