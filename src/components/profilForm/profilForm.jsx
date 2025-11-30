// Affichage du formulaire
// tous les champs sont contrôlés
// Ce formulaire est affichée dans une modale
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// utilisation de handleChange pour gérer de manière générique les changement
import handleChange from "../../utils/handleChange";
import Downshift from "downshift";
import { IoIosSearch } from "react-icons/io";
import { getPictUrl } from "../../components/Card/Card";
import { backURL } from "../../utils/settings";

const ProfilForm = ({ token, setToken, setModal }) => {
  const [hasError, setHasError] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    avatar: { value: "", src: null },
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.put(backURL + "/user", formData, {
        headers: { authorization: `Bearer ${token}` },
      });
      const newtoken = response.data.token;
      setToken(newtoken);
      setModal(null);
    } catch (error) {
      error.response
        ? setHasError(error.response.data.message)
        : console.log(error.message);
    }
  };

  // The api don't like parenthesis
  const prepareSearchValue = (search) =>
    "/proxy/characters?name=" +
    encodeURIComponent(search.replaceAll(")", "\\)").replaceAll("(", "\\("));

  const [autocomplete, setAutocomplete] = useState("");
  const [autocompleteList, setAutocompleteList] = useState([]);

  //for loading autocomplet
  useEffect(() => {
    const getData = async () => {
      try {
        const query = backURL + prepareSearchValue(autocomplete) + "&limit=10";
        // On va chercher les data sur le back
        const response = await axios.get(query);
        const responseList = response.data.results.map((item) => {
          return {
            value: item.name,
            id: item._id,
            src: getPictUrl(item, "standard_medium"),
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

  // get user data
  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const query = backURL + "/user";
          // On va chercher les info de l'utilisateur
          const response = await axios.get(query, {
            headers: { authorization: `Bearer ${token}` },
          });
          const { firstname, lastname, avatar, email } = response.data.data;

          setFormData({
            firstname,
            lastname,
            avatar,
            email,
          });
        } catch (error) {
          console.log(
            "error",
            error.reponse ? error.response.data.message : error.message
          );
        }
      };

      getData();
    }
  }, [token]);

  return (
    <form id="profilForm" onSubmit={handleSubmit}>
      <h2>Modifier votre profil</h2>
      <label>
        <span>Nom</span>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formData.lastname}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <label>
        <span>Prénom</span>
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formData.firstname}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <label>
        <span>Mot de passe</span>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>

      <label className="avatar">
        <span>Avatar</span>
        {formData.avatar && (
          <img
            src={formData.avatar.src}
            alt={`image de  ${formData.avatar.value}`}
          />
        )}
        <Downshift
          itemToString={(item) => (item ? item.value : "")}
          onChange={(selection) => {
            setFormData({
              ...formData,
              avatar: {
                value: selection.value,
                src: selection.src,
              },
            });
          }}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            selectedItem,
            getRootProps,
            highlightedIndex,
          }) => (
            <div className="autocomplete">
              <div {...getRootProps({}, { suppressRefError: true })}>
                <input
                  {...getInputProps({
                    name: "avatar",
                    value: formData.avatar.value,
                    placeholder: "Choisi ton avatar",
                    onChange: (event) => {
                      setAutocomplete(event.target.value);
                      setFormData({
                        ...formData,
                        avatar: {
                          value: event.target.value,
                        },
                      });
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
                          className:
                            "itemAutocomplete " +
                            (highlightedIndex === index ? " highlighted" : "") +
                            (selectedItem === item ? " selected" : ""),
                        })}
                      >
                        <img src={item.src} />
                        {item.value}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
      </label>

      {hasError && (
        <p className="error">
          Erreur d'enregistrement, le server indique : "{hasError}"
        </p>
      )}
      <button type="submit" className="fill-primary">
        Mettre à jour son profil
      </button>
    </form>
  );
};

export default ProfilForm;
