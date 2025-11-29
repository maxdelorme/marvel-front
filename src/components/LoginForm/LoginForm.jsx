// Display the login form in a modal
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { backURL } from "../../utils/settings";
// Get the generic handler
import handleChange from "../../utils/handleChange";

const SignupForm = ({ setToken, setModal }) => {
  const [hasError, setHasError] = useState("");
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(backURL + "/user/login", formData);
      const token = response.data.user.token;
      setToken(token);
      setModal(null);
    } catch (error) {
      error.response
        ? setHasError(
            error.response.data.error
              ? error.response.data.error
              : error.response.data.message
          )
        : console.log(error.message);
    }
  };

  return (
    <form id="LoginForm" onSubmit={handleSubmit}>
      <h2>Pour utiliser les favoris vous devez vous connecter</h2>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(event) => handleChange(event, formData, setformData)}
          placeholder="Email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(event) => handleChange(event, formData, setformData)}
          placeholder="Mot de passe"
        />
      </label>
      {hasError && (
        <p className="error">
          Erreur de connexion, le serveur indique : <br />"{hasError}"
        </p>
      )}
      <button type="submit" className="fill-primary">
        Se connecter
      </button>
      <Link
        onClick={(event) => {
          event.preventDefault();
          setModal("signup");
        }}
      >
        <p>Pas encore de compte ? inscris-toi </p>
      </Link>
    </form>
  );
};

export default SignupForm;
