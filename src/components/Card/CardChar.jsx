import Card from "./Card";
import "./Card.css";
import { Link } from "react-router-dom";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};
const CardChar = ({ item, nolink }) => {
  item.title = item.name;

  const card = <Card item={item} favoritesKey="characters" />;

  return nolink ? (
    card
  ) : (
    <Link className="card" to={"/character/" + item._id}>
      {card}
    </Link>
  );
};

export default CardChar;
