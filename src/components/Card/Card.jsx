import "./Card.css";
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useFavorisContext } from "../FavoritesContext";

export const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};

const Card = ({ item, favoritesKey = "comics", token, setModal }) => {
  const { isFavorite, addToFavoris, removeFromFavoris } = useFavorisContext();

  const Heart = isFavorite(favoritesKey, item._id) ? IoHeart : IoHeartOutline;

  const handleFavorite = (event) => {
    event.preventDefault();
    if (!token) {
      setModal("login");
    } else {
      if (isFavorite(favoritesKey, item._id)) {
        removeFromFavoris(favoritesKey, item._id);
      } else {
        addToFavoris(favoritesKey, item._id);
      }
    }
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
