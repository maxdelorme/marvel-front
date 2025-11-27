import GridPage from "../GridPages/GridPage";
import Card from "../../components/Card/Card";

const ComicsPage = () => {
  return (
    <GridPage
      element={Card}
      placeholder="Chercher votre comic favoris"
      pathSearch="/proxy/comics?title"
    />
  );
};

export default ComicsPage;
