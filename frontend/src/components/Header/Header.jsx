import "./Header.scss";
import logo from "../../../public/Images/QuornHubLogo.png";
import userImg from "../../../public/Images/user.svg";

export const Header = ({ userName }) => {

	return (
        <div className="header">
            <div className="nav-bar">

                <div>
                    <img className="QHlogo" src={logo} alt="Quornhub logo"/>
                </div>

                <div className="nav-links">
                    <a className="nav">Home</a>
                    <a className="nav">Food Saver</a>
                    <a className="nav">Recipes</a>
                </div>

                    <div className="nav-right">
                        <img className="profile-pic" id={userName} src={userImg} alt="login icon"/>
                    </div>
            </div>
        </div>
	);
};
