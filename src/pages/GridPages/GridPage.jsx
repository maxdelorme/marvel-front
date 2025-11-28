import { useEffect, useState } from "react";
import "./GridPage.css";
import axios from "axios";
import { backURL } from "../../utils/settings";
import { IoIosSearch } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import Downshift from "downshift";

const GridPage = ({ element: ElementCard, placeholder, pathSearch }) => {
  const [data, setData] = useState(null);
  const pageSize = 100;

  // initialize state with the paramaters from url
  const [currentQueryParameters, setQueryParams] = useSearchParams();
  const querySearch = currentQueryParameters.get("search");
  const [search, setSearch] = useState(querySearch || "");
  const queryPage = currentQueryParameters.get("page");
  const [page, setPage] = useState(Number(queryPage) || 1);

  const [autocomplete, setAutocomplete] = useState("");
  const [autocompleteList, setAutocompleteList] = useState([]);

  let nbPages = 0;
  let isLoading = Boolean(!data);
  let sanitizePage;
  if (!isLoading) {
    nbPages = Math.ceil(data.count / pageSize);
    // we can now define a sanitize function
    sanitizePage = (page) => {
      return Math.min(Math.max(1, nbPages), Math.max(1, page));
    };
  }

  // The api don't like parenthesis
  const prepareSearchValue = (search) => pathSearch + "=" + encodeURIComponent(
    search.replaceAll(")", "\\)").replaceAll("(", "\\(")
  )

  useEffect(() => {
    const getData = async () => {
      try {
        const query = backURL + prepareSearchValue(autocomplete);

        // On va chercher les data sur le back
        const response = await axios.get(query);
        const responseList = response.data.results.map((item) => {
          return {
            value: item.name || item.title,
            id: item._id,
          };
        });

        setAutocompleteList(responseList);
      } catch (error) {
        console.log(
          "error",
          error.reponse ? error.response.data.message : error.message
        );
      }
    };

    getData();
  }, [autocomplete]);

  useEffect(() => {
    const getData = async () => {
      try {
        // Prepare query to backend
        const sanitizedPage = sanitizePage
          ? sanitizePage(Number(page))
          : Number(page);

        const skip = Number(pageSize * (sanitizedPage - 1));
        const query =
          backURL +
          `${prepareSearchValue(search)}&skip=${skip}&limit=${pageSize} `;

        // On va chercher les data sur le back
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

  // comme on peut changer de page via le slider, et les boutons
  const handleChangePage = (page) => {
    page = sanitizePage(Number(page));
    setPage(page);
    setQueryParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };

  const recordSearch = (search) => {
    setSearch(search);
    setPage(1);
    setQueryParams((prev) => {
      prev.set("search", search);
      prev.set("page", 1);
      return prev;
    });
  };

  return isLoading ? (
    <p className="loading">Chargement en cours...</p>
  ) : (
    <section className="cardList">
      <nav>
        {/* Affichage de l'input de recherche */}
        <label>
          <Downshift
            onChange={
              (selection) => recordSearch(selection.value)
            }
            // stateReducer={stateReducer}
            itemToString={(item) => (item ? item.value : "")}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              inputValue,
              isOpen,
              selectedItem,
              getRootProps,
              highlightedIndex,
            }) => (
              <div className="autocomplete">
                <div {...getRootProps({}, { suppressRefError: true })}>
                  <input
                    {...getInputProps({
                      placeholder: placeholder,
                      onChange: (event) => {
                        setAutocomplete(event.target.value);
                      },
                      onKeyDown: (event) => {
                        if (event.code === "Enter") {
                          // allow to submit the input type if no value are selected
                          if (highlightedIndex === null)
                            recordSearch(inputValue)
                        }
                      },
                    })}
                  />{" "}
                  <IoIosSearch />
                </div>
                <ul {...getMenuProps({ className: "menuAutocomplete" })}>
                  {isOpen
                    ? autocompleteList.map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item._id,
                          index,
                          item,
                          className: "itemAutocomplete "
                            + ((highlightedIndex === index) ? ' highlighted' : '')
                            + (selectedItem === item ? ' selected' : ''),
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
        </label>

        {/* affichage des pages */}
        <div className="pages">
          Page <span className="pageNumber">{page}</span>&nbsp;
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
        </div>
      </nav>
      {/* Affichages des réponses */}
      <div className="grid">
        {data.results.map((item) => {
          return <ElementCard key={item._id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default GridPage;
