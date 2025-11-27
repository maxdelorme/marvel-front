import { useEffect, useState } from "react";
import "./GridPage.css";
import axios from "axios";
import { backURL } from "../../utils/settings";
import { IoIosSearch } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import handleChange from "../../../../../../S6 - React/J3 - router/Exercices/1-vinted/src/utils/handleChange";

const GridPage = ({ element: ElementCard, placeholder, pathSearch }) => {
  const [data, setData] = useState(null);
  const pageSize = 100;
  const [currentQueryParameters, setQueryParams] = useSearchParams();

  const querySearch = currentQueryParameters.get("search");
  const [search, setSearch] = useState(querySearch || "");
  const queryPage = currentQueryParameters.get("page");
  const [page, setPage] = useState(Number(queryPage) || 1);

  let nbPages = 0;

  let isLoading = Boolean(!data);

  let sanitizePage;
  if (!isLoading) {
    nbPages = Math.ceil(data.count / pageSize);

    sanitizePage = (page) => {
      return Math.min(Math.max(1, nbPages), Math.max(1, page));
    };
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const SanitizedPage = sanitizePage
          ? sanitizePage(Number(page))
          : Number(page);
        const skip = Number(pageSize * (SanitizedPage - 1));
        const query =
          backURL +
          `${pathSearch}=${encodeURIComponent(
            search
          )}&skip=${skip}&limit=${pageSize}`;
        console.log(query);
        // va chercher les data sur le back
        const { data } = await axios.get(query);
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

  const handleChangePage = (page) => {
    page = sanitizePage(Number(page));
    setPage(page);
    setQueryParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };

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
              const search = event.target.value;
              setSearch(search);
              setPage(1);
              setQueryParams((prev) => {
                prev.set("search", search);
                prev.set("page", 1);
                return prev;
              });
            }}
            placeholder={placeholder}
          ></input>
          <IoIosSearch />
        </label>
        <div className="pages">
          Page <span className="pageNumber">{page}</span>:&nbsp;1
          <IoRemoveCircleOutline
            onClick={() => page !== 1 && handleChangePage(page - 1)}
            className={page === 1 && "disabled"}
          />
          <input
            type="range"
            min="1"
            max={nbPages}
            value={page}
            onChange={(event) => {
              handleChangePage(event.target.value);
            }}
          />
          <IoAddCircleOutline
            onClick={() => page !== nbPages && handleChangePage(page + 1)}
            className={page === nbPages && "disabled"}
          />
          {nbPages}
        </div>
      </nav>
      <div className="grid">
        {data.results.map((item) => {
          return <ElementCard key={item._id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default GridPage;
