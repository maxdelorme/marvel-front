import GridPage from "../GridPages/GridPage";
import CardChar from "../../components/Card/CardChar";

const CharactersPage = (props) => {
  return (
    <GridPage
      element={CardChar}
      placeholder="Chercher votre personnage favoris"
      pathSearch="/proxy/characters?name"
      {...props}
    />
  );
};

export default CharactersPage;
