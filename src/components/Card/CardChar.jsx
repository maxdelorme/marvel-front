import Card from "./Card";
import "./Card.css";
import { Link } from "react-router-dom";

const CardChar = ({ item, nolink, setModal, token }) => {
  item.title = item.name;

  const card = (
    <Card
      item={item}
      favoritesKey="characters"
      setModal={setModal}
      token={token}
    />
  );

  return nolink ? (
    card
  ) : (
    <Link className="card" to={"/character/" + item._id}>
      {card}
    </Link>
  );
};

export default CardChar;
