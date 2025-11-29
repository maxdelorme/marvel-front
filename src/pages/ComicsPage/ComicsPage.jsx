import GridPage from "../GridPages/GridPage";
import Card from "../../components/Card/Card";

const ComicsPage = (props) => {
  return (
    <GridPage
      element={Card}
      placeholder="Chercher votre comic favoris"
      pathSearch="/proxy/comics?title"
      {...props}
    />
  );
};

export default ComicsPage;
