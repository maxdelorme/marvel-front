import logo from "@/assets/img/logo.png";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import { backURL } from "../../utils/settings";

const Header = ({ token, setToken }) => {
  const disconnect = async () => {
    try {
      await axios.get(backURL + "/user/disconnect", {
        headers: { authorization: `Bearer ${token}` },
      });
      setToken(null);
    } catch (error) {
      console.log(
        "error",
        error.reponse ? error.response.data.message : error.message
      );
      // even if not authenticated, we clean all on browser
      setToken(null);
    }
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo marvel" />
        </Link>
        <nav>
          <NavLink to="/">Personnages</NavLink>
          <NavLink to="/comics">comics</NavLink>
          <NavLink to="/favorites">
            <IoHeart /> Favorites
          </NavLink>
          {token && <button onClick={disconnect}>Se déconnecter</button>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
