import "./Header.scss";
import logo from "../../images/QHLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Header = ({ userName }) => {

    const dropIcon = <FontAwesomeIcon icon={faCaretDown} />

	return (
        <div className="header">
            <div className="nav-bar">

                <div>
                    <img href="Home" className="QHlogo" src={logo} alt="Quornhub logo"/>
                </div>

                <div className="nav-links">
                    <a href="Home" className="nav">Home</a>
                    <a href="FoodSaver" className="nav">Food Saver</a>
                    <div class="dropdown nav">
                        <button class="dropbtn2">Recipes{dropIcon}</button>
                        <div class="dropdown-content2">
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
                        <div class="dropdown-content">
                            <a href="login">Login</a>
                            <a href="register">Register</a>
                        </div>
                    </div>
            </div>
        </div>
	);
};
