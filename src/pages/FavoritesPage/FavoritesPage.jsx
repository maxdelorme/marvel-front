import "./FavoritesPage.css";
import { useFavorisContext } from "../../components/FavoritesContext";
import getFavoritesFromStorage from "../../utils/getFavoritesFromStorage";
import { backURL } from "../../utils/settings";
import axios from "axios";
import CardChar from "../../components/Card/CardChar";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";

const FavoritesPages = () => {
  const getCard = (type) => {
    return type === "characters" ? CardChar : Card;
  };

  const InitialFavorisState = {
    characters: {
      title: "Personnages",
      path: "character",
      listDetail: [],
    },
    comics: {
      title: "Comics",
      path: "comic",
      listDetail: [],
    },
  };
  // Note cards are not in InitialFavorisState because its prevent deep copy
  const cards = {
    characters: CardChar,
    comics: Card,
  };
  const [favoris, setFavoris] = useState(InitialFavorisState);
  const { favorisIDs } = useFavorisContext();

  const getData = async () => {
    try {
      const copy = structuredClone(favoris);
      for (const type in copy) {
        const partie = copy[type];
        partie.listDetail = [];
        for (let i = 0; i < favorisIDs[type].length; i++) {
          const favoriteID = favorisIDs[type][i];
          const response = await axios.get(
            backURL + "/proxy/" + partie.path + "/" + favoriteID
          );
          partie.listDetail.push(response.data);
        }
      }
      setFavoris(copy);
    } catch (error) {
      console.log(
        "error",
        error.reponse ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    getData();
  }, [favorisIDs]);

  // favorisIDs && console.log("IDs", favorisIDs);
  // favoris && console.log("favoris", favoris);

  return (
    <section>
      {
        /* use this array to ensure order of display */
        ["characters", "comics"].map((type) => {
          const partie = favoris[type];
          const Card = cards[type];
          return (
            <div key={type}>
              <h2>{partie.title}</h2>
              <div className="grid">
                {partie.listDetail.map((item) => {
                  return <Card key={item._id} item={item}></Card>;
                })}
              </div>
            </div>
          );
        })
      }
    </section>
  );
};

export default FavoritesPages;
