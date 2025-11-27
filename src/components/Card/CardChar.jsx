import Card from "./Card";
import "./Card.css";
import { Link } from "react-router-dom";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};
const CardChar = ({ item, type }) => {
  item.title = item.name;

  return (
    <Link className={`card ${type}`} to={"character/" + item._id}>
      <Card item={item} />
    </Link>
  );
};

export default CardChar;
