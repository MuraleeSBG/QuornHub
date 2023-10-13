import "./Header.scss";
import logo from "../../images/QHLogo.png";
import userImg from "../../images/user.svg";

export const Header = ({ userName }) => {

	return (
        <div className="header">
            <div className="nav-bar">

                <div>
                    <img className="QHlogo" src={logo} alt="Quornhub logo"/>
                </div>

                <div className="nav-links">
                    <a href="Home" className="nav">Home</a>
                    <a href="FoodSaver" className="nav">Food Saver</a>
                    <a href="Recipes" className="nav">Recipes</a>
                </div>

                    <div className="dropdown">
                        <button className="dropbtn"></button>
                        <div class="dropdown-content">
                            <p><a href="login">Login / Register</a></p>
                        </div>
                    </div>
            </div>
        </div>
	);
};
