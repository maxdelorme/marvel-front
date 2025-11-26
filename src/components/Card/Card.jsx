import "./Card.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};
const Card = ({ item, type }) => {
  // If the item has no title take the name
  const title = type === "character" ? item.name : item.title;
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={`card ${type}`}
      onClick={() => {
        type === "character" && navigate("character/" + item._id);
      }}
    >
      <div className="wrapper">
        <img src={getPictUrl(item, "portrait_incredible")} />
        <div className="details">
          <h3>{title}</h3>
          <span className="desc">{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
