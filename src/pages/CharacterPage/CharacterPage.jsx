import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { backURL } from "../../utils/settings";
import Card from "../../components/Card/Card";
import CardChar from "../../components/Card/CardChar";

const CharacterPage = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  let isLoading = Boolean(!data);

  useEffect(() => {
    const getData = async () => {
      try {
        // va chercher les data sur le back
        const { data } = await axios.get(backURL + "/proxy/character/" + id);

        // comics is a list of comics ID
        // Get details for each
        data.comicDetails = [];
        for (let comic of data.comics) {
          const response = await axios.get(backURL + "/proxy/comic/" + comic);
          console.log("comic", response.data);
          data.comicDetails.push(response.data);
        }
        setData(data);
        console.log("data", data);
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
    <section>
      <CardChar item={data}></CardChar>
      <h2>Apparait dans les Comics suivants :</h2>
      <div className="grid">
        {data.comicDetails.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CharacterPage;
