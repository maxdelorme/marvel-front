// Affichage du formulaire
// tous les champs sont contrôlés
// Ce formulaire est affichée dans une modale
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
// utilisation de handleChange pour gérer de manière générique les changement
import handleChange from "../../utils/handleChange";
import { backURL } from "../../utils/settings";

const SignupForm = ({ setIsAuthenticated, setModal, setShowSignupOrLogin }) => {
  const [hasError, setHasError] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(backURL + "/user", formData);
      Cookies.set("token", response.data.token, { expires: 1 });
      setIsAuthenticated(true);
      setModal({ isVisible: false });
    } catch (error) {
      error.response
        ? setHasError(error.response.data.message)
        : console.log(error.message);
    }
  };

  return (
    <form id="SignupForm" onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
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
      <label>
        <span>Avatar</span>
        <input
          type="text"
          name="avatar"
          placeholder="Mot de passe"
          value={formData.avatar}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>

      {hasError && (
        <p className="error">
          Erreur d'enregistrement, le server indique : "{hasError}"
        </p>
      )}
      <button type="submit" className="fill-primary">
        S'inscrire
      </button>
      <Link
        onClick={(event) => {
          event.preventDefault();
          setShowSignupOrLogin("login");
        }}
      >
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </form>
  );
};

export default SignupForm;
