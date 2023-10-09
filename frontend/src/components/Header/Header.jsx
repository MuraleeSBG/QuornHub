import "./Header.scss";
import logo from "../../../public/Images/QuornHubLogo.png";
import searchIcon from "../../../public/Images/search-icon.png";
import user from "../../../public/Images/user.svg";

export const Header = ({ userName }) => {

	return (
        <div className="header">
            <div className="nav-bar">
                    <div>
                        <img src={logo} alt="Quornhub logo"/>
                    </div>

                    <div className="nav-links">
                        <a className="nav">Home</a>
                        <a className="nav">Food Saver</a>
                        <a className="nav">Recipes</a>
                    </div>

                    <div className="nav-right">
                        <img className="search-icon" src={searchIcon} alt="search icon"/>
                        <img className="profile-pic" id={userName} src={user} alt="login icon"/>
                    </div>
            </div>
        </div>
	);
};
