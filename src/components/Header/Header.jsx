import logo from "@/assets/img/logo.png";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { IoHeart } from "react-icons/io5";

const Header = () => {
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
