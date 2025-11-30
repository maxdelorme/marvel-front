import logo from "@/assets/img/logo.png";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { backURL } from "../../utils/settings";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/useWindowSize";

const Header = ({ token, setToken, setModal }) => {
  const navigate = useNavigate();
  const [pictAvatar, setPictAvatar] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // on big device all the menu should be visible
  const { height, width } = useWindowDimensions();
  const disconnect = async () => {
    try {
      await axios.get(backURL + "/user/disconnect", {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(
        "error",
        error.reponse ? error.response.data.message : error.message
      );
    }
    // even if not authenticated, we clean all on browser
    navigate("/");
    setToken(null);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const getUser = async () => {
    if (token) {
      try {
        const response = await axios.get(backURL + "/user", {
          headers: { authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setPictAvatar(response.data.data.avatar.src);
      } catch (error) {
        console.log(
          "error",
          error.reponse ? error.response.data.message : error.message
        );
      }
    } else {
      setPictAvatar(null);
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
          {(width > 400 || !token) && (
            <NavLink to="/favorites">
              <IoHeart /> Favorites
            </NavLink>
          )}
          {token && (
            <div className="menu">
              <img
                src={pictAvatar}
                alt="image avatar"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              />
              <ul
                className={isMenuOpen ? "open" : "close"}
                onMouseLeave={() => {
                  setIsMenuOpen(false);
                }}
              >
                {width <= 400 && (
                  <li>
                    <NavLink to="/favorites">
                      <IoHeart /> Favorites
                    </NavLink>
                  </li>
                )}
                <li
                  onClick={() => {
                    setModal("profil");
                  }}
                >
                  <IoPerson /> Profil
                </li>
                <li>
                  {" "}
                  <button onClick={disconnect} className="fill-primary">
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
