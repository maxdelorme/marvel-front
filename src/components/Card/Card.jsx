import "./Card.css";
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};

const getFavorites = (favoritesKey) => {
  const stringFavorites = localStorage.getItem(favoritesKey);
  let Favorites = JSON.parse(stringFavorites);
  // ensure we have a table even if its the first time
  if (!Favorites) Favorites = [];
  return Favorites;
};

const Card = ({ item, favoritesKey = "comics" }) => {
  const Favorites = getFavorites(favoritesKey);
  const [isFavorite, setIsFavorite] = useState(Favorites.includes(item._id));
  const Heart = isFavorite ? IoHeart : IoHeartOutline;

  const handleFavorite = (event) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
    // get Favorites from the store
    // because it could have been change between the render and the click
    let Favorites = getFavorites(favoritesKey);
    // must add to favorites
    // Remember that isFavorite is in the state before the click
    if (isFavorite) {
      console.log("remove");
      Favorites = Favorites.filter((favoriteID) => favoriteID !== item._id);
    } else {
      console.log("add");
      Favorites.push(item._id);
    }
    localStorage.setItem(favoritesKey, JSON.stringify(Favorites));
  };

  return (
    <div className="card">
      <div className="wrapper">
        <img src={getPictUrl(item, "portrait_incredible")} />
        <div className="details">
          <h3 onClick={handleFavorite}>
            <Heart /> {item.title}
          </h3>
          <span className="desc">{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
