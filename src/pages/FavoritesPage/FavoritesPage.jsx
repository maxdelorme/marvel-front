import "./FavoritesPage.css";
import { useFavorisContext } from "../../components/FavoritesContext";
import { backURL } from "../../utils/settings";
import axios from "axios";
import CardChar from "../../components/Card/CardChar";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

const FavoritesPages = ({ modal, setModal, token, setToken }) => {
  // On initialise le state et on bouclera dessus ensuite
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
  // update on Favoris change
  const [favoris, setFavoris] = useState(InitialFavorisState);
  // let we know that we have already show the modale
  const [hasDisplayedModal, setHasDisplayedModal] = useState(false);

  useEffect(() => {
    // display modal if unauthenticated
    if (!token) {
      setHasDisplayedModal(true);
      setModal("login");
    }
  }, [token]);

  // Note cards are not in InitialFavorisState because its prevent deep copy
  const cards = {
    characters: CardChar,
    comics: Card,
  };

  //récupération des IDs en favoris
  const { favorisIDs } = useFavorisContext();

  const getData = async () => {
    try {
      const copyOfFavoris = structuredClone(favoris);

      // loop on each kind of IDs to get details on it
      for (const type in copyOfFavoris) {
        const favorisType = copyOfFavoris[type];
        favorisType.listDetail = [];

        // get detail for each ID with a for loop to wait on the await
        for (let i = 0; i < favorisIDs[type].length; i++) {
          const favoriteID = favorisIDs[type][i];
          const response = await axios.get(
            backURL + "/proxy/" + favorisType.path + "/" + favoriteID
          );
          favorisType.listDetail.push(response.data);
        }
      }

      // Set the data
      setFavoris(copyOfFavoris);
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

  return hasDisplayedModal && !token && !modal ? (
    <Navigate to="/" />
  ) : (
    <section>
      {
        /* use this array to ensure order of display */
        ["characters", "comics"].map((type) => {
          const partie = favoris[type];
          const Card = cards[type];

          return (
            // Put each partie in a div to put the key attribute
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
