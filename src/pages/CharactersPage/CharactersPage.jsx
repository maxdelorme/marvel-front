import GridPage from "../GridPages/GridPage";
import CardChar from "../../components/Card/CardChar";

const CharactersPage = () => {
  return (
    <GridPage
      element={CardChar}
      placeholder="Chercher votre personnage favoris"
      pathSearch="/proxy/characters?name"
    />
  );
};

export default CharactersPage;
