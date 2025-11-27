import "./Card.css";

const getPictUrl = (item, variant = "portrait_small") => {
  return item.thumbnail.path + "/" + variant + "." + item.thumbnail.extension;
};
const Card = ({ item }) => {
  return (
    <div className="card">
      <div className="wrapper">
        <img src={getPictUrl(item, "portrait_incredible")} />
        <div className="details">
          <h3>{item.title}</h3>
          <span className="desc">{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
