import { useEffect, useState } from "react";
import "./CharactersPage.css";
import axios from "axios";
import { backURL } from "../../utils/settings";
import Card from "../../components/Card/Card";

const CharactersPage = () => {
  const [data, setData] = useState(null);
  let isLoading = Boolean(!data);

  useEffect(() => {
    const getData = async () => {
      try {
        // va chercher les data sur le back
        const { data } = await axios.get(backURL + "/proxy/characters");
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(
          error.reponse ? error.response.data.message : error.message
        );
      }
    };

    getData();
  }, []);

  return isLoading ? (
    <p className="loading">Chargement en cours...</p>
  ) : (
    <section className="grid">
      {data.results.map((item, index) => {
        return <Card key={index} item={item} type="character"></Card>;
      })}
    </section>
  );
};

export default CharactersPage;
