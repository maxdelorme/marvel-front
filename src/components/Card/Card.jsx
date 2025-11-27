import "./Card.css";
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};
const Card = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const Heart = isFavorite ? IoHeart : IoHeartOutline;

  return (
    <div className="card">
      <div className="wrapper">
        <img src={getPictUrl(item, "portrait_incredible")} />
        <div className="details">
          <h3>
            <Heart onClick={() => setIsFavorite(!isFavorite)} />
            {item.title}
          </h3>
          <span className="desc">{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
