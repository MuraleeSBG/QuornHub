import "./Header.scss";
import logo from "../../images/QHLogo.png";
import user from "../../images/user.svg";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn, logout } from "../../utils/authUtils";

export const Header = ({ userName }) => {
  const dropIcon = <FontAwesomeIcon icon={faCaretDown} />;
  const navigate = useNavigate();

  const onLogout = () => {
    const userApiUrl = `http://localhost:3001/logout`;
    fetch(userApiUrl, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to logout");
        }
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="header">
      <div className="nav-bar">
        <div>
          <Link className="nav" to="/">
            <img className="QHlogo-header" src={logo} alt="Quornhub logo" />
          </Link>
        </div>

        <div className="nav-links">
          <Link className="nav" to="/">
            Home
          </Link>
          <Link className="nav" to="/food-saver">
            Food Saver
          </Link>
          <div className="dropdown nav">
            Recipes {dropIcon}
            <div className="dropdown-content2">
              <Link to="/gluten-free">Gluten Free</Link>
              <Link to="/vegan">Vegan</Link>
              <Link to="/fifteen-minute">15 Minute</Link>
              <Link to="/lactose-free">Lactose Free</Link>
              <Link to="/nut-free">Nut Free</Link>
              {isLoggedIn() && <Link to="/add-recipes">Add a Recipe</Link>}
              <Link to="/recipes">All Recipes</Link>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <img className="user-icon" src={user} alt="login" />
          <div className="dropdown-content">
            {isLoggedIn() ? (
              <Link onClick={onLogout}>Logout</Link>
            ) : (
              <Link to="/login">Login / Register</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
