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
                    <img className="QHlogo" src={logo} alt="Quornhub logo"/>
                </div>

                <div className="nav-links">
                    <a href="Home" className="nav">Home</a>
                    <a href="FoodSaver" className="nav">Food Saver</a>
                    <div class="dropdown nav">
                        <button class="dropbtn2">Recipes{dropIcon}</button>
                        <div class="dropdown-content2">
                            <a href="gf">Link 1</a>
                            <a href="nut">Link 2</a>
                            <a href="lactofree">Link 3</a>
                        </div>
                    </div> 
                    
                </div>

                    <div className="dropdown">
                        <button className="dropbtn"></button>
                        <div class="dropdown-content">
                            <p><a href="login">Login</a></p>
                            <p><a href="register">Register</a></p>
                        </div>
                    </div>
            </div>
        </div>
	);
};
