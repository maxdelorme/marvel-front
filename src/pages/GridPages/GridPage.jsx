import { useEffect, useState } from "react";
import "./GridPage.css";
import axios from "axios";
import { backURL } from "../../utils/settings";
import { IoIosSearch } from "react-icons/io";

const GridPage = ({ element: ElementCard, placeholder, pathSearch }) => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const pageSize = 100;
  const [page, setPage] = useState(1);
  let nbPages = 0;

  let isLoading = Boolean(!data);

  useEffect(() => {
    // when search change we reset the page to 1
    setPage(1);
  }, [search]);

  useEffect(() => {
    const getData = async () => {
      try {
        const skip = pageSize * (page - 1);
        // va chercher les data sur le back
        const { data } = await axios.get(
          backURL + `${pathSearch}=${search}&skip=${skip}&limit=${pageSize}`
        );
        setData(data);
      } catch (error) {
        console.log(
          "error",
          error.reponse ? error.response.data.message : error.message
        );
      }
    };

    getData();
  }, [search, page]);

  if (!isLoading) {
    nbPages = Math.ceil(data.count / pageSize);
  }

  return isLoading ? (
    <p className="loading">Chargement en cours...</p>
  ) : (
    <section className="cardList">
      <nav>
        <label>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder={placeholder}
          ></input>
          <IoIosSearch />
        </label>
        <div className="pages">
          Page <span className="page">{page}</span> : 1
          <input
            type="range"
            min="1"
            max={nbPages}
            value={page}
            onChange={(event) => setPage(Number(event.target.value))}
          />
          {nbPages}
        </div>
      </nav>
      <div className="grid">
        {data.results.map((item, index) => {
          return <ElementCard key={index} item={item} />;
        })}
      </div>
    </section>
  );
};

export default GridPage;
