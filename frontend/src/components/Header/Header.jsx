import "./Header.scss";
import logo from "../../../public/Images/QuornHubLogo.png";
import searchIcon from "../../../public/Images/search-icon.png";
import user from "../../../public/Images/user.svg";

export const Header = ({ userName }) => {

	return (
        <div className="header">
            <div className="nav-bar">
                    <div>
                        <img src={logo}/>
                    </div>

                    <div className="nav-links">
                        <a href="#" className="nav">Home</a>
                        <a href="#" className="nav">Food Saver</a>
                        <a href="#" className="nav">Recipes</a>
                    </div>

                    <div className="nav-right">
                        <img className="search-icon" src={searchIcon}/>
                        <img className="profile-pic" id={userName} src={user}/>
                    </div>
            </div>
        </div>
	);
};
