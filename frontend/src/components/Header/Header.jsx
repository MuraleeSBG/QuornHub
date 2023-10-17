import "./Header.scss";
import logo from "../../images/QHLogo.png";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


export const Header = ({ userName }) => {

    const dropIcon = <FontAwesomeIcon icon={faCaretDown} />

	return (
        <div className="header">
            <div className="nav-bar">

                <div>
                    <img className="QHlogo" src={logo} alt="Quornhub logo"/>
                </div>

                <div className="nav-links">
                    <Link className="nav" to="/">
						Home
				    </Link>
                    <Link className="nav" to="/food-saver">
						Food Saver
					</Link>
                    <div className="dropdown nav">
                        <button className="dropbtn2">Recipes{dropIcon}</button>
                        <div className="dropdown-content2">
                            <a href="gf">Gluten Free</a>
                            <a href="nut">Vegan</a>
                            <a href="lactofree">15 Minute</a>
                            <a href="lactofree">Lactose Free</a>
                            <a href="lactofree">Add Recipe</a>
                            <a href="lactofree">All Recipes</a>

                        </div>
                    </div> 
                    
                </div>

                    <div className="dropdown">
                        <button className="dropbtn"></button>
                        <div className="dropdown-content">
                            <a href="login">Login</a>
                            <a href="register">Register</a>
                        </div>
                    </div>
            </div>
        </div>
	);
};
