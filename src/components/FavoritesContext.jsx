// Create a context to be used everywhere
// This context give access to favoris , and a bunch of logic function
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { backURL } from "../utils/settings";
const FavorisContext = createContext();

export const FavorisProvider = ({ children, token }) => {
  const [favorisIDs, setFavorisIDs] = useState({
    characters: [],
    comics: [],
  });

  useEffect(() => {
    getFavoris();
  }, [token]);

  const getFavoris = async () => {
    try {
      const response = await axios.get(backURL + "/favoris/characters", {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = { characters: response.data.data };
      const response2 = await axios.get(backURL + "/favoris/comics", {
        headers: { authorization: `Bearer ${token}` },
      });
      data.comics = response2.data.data;
      setFavorisIDs(data);
      // console.log(data);
    } catch (error) {
      console.log(
        "error",
        error.reponse ? error.response.data.message : error.message
      );
    }
  };

  // The context Object with the IDs and function to operate on it
  const value = {
    // the objects of 2 keys , each is a array of IDs
    favorisIDs: favorisIDs,

    // add the item to the favorites of type favoritesKey
    addToFavoris: async (favoritesKey, id) => {
      try {
        const { data } = await axios.put(
          backURL + "/favoris/" + favoritesKey + "/" + id,
          "",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setFavorisIDs({ ...favorisIDs, [favoritesKey]: data.data });
      } catch (error) {
        console.log(
          "error",
          error.reponse ? error.response.data.message : error.message
        );
      }
    },

    // remove the item of the favorites of type favoritesKey
    removeFromFavoris: async (favoritesKey, id) => {
      try {
        const { data } = await axios.delete(
          backURL + "/favoris/" + favoritesKey + "/" + id,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setFavorisIDs({ ...favorisIDs, [favoritesKey]: data.data });
      } catch (error) {
        console.log(
          "error",
          error.reponse ? error.response.data.message : error.message
        );
      }
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
