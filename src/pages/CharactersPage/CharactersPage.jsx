import { useEffect, useState } from "react";
import "./CharactersPage.css";
import axios from "axios";
import { backURL } from "../../utils/settings";
import Card from "../../components/Card/Card";
import { IoIosSearch } from "react-icons/io";
import CardChar from "../../components/Card/CardChar";

const CharactersPage = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  let isLoading = Boolean(!data);

  useEffect(() => {
    const getData = async () => {
      try {
        // va chercher les data sur le back
        const { data } = await axios.get(
          backURL + "/proxy/characters?" + "name=" + search
        );
        setData(data);
      } catch (error) {
        console.log(
          error.reponse ? error.response.data.message : error.message
        );
      }
    };

    getData();
  }, [search]);

  return isLoading ? (
    <p className="loading">Chargement en cours...</p>
  ) : (
    <section className="charactersList">
      <label htmlFor="">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Chercher votre personnage favoris"
        ></input>
        <IoIosSearch />
      </label>
      <div className="grid">
        {data.results.map((item, index) => {
          return <CardChar key={index} item={item} />;
        })}
      </div>
    </section>
  );
};

export default CharactersPage;
