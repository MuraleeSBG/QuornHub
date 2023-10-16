import "./Header.scss";
import logo from "../../images/QHLogo.png";
import { Link } from "react-router-dom";

export const Header = ({ userName }) => {
	return (
		<div className="header">
			<div className="nav-bar">
				<div>
					<img className="QHlogo" src={logo} alt="Quornhub logo" />
				</div>

				<div className="nav-links">
					<Link className="nav" to="/">
						Home
					</Link>
					<Link className="nav" to="/food-saver">
						Food Saver
					</Link>
					<a href="Recipes" className="nav">
						Recipes
					</a>
				</div>

				<div className="dropdown">
					<button className="dropbtn"></button>
					<div class="dropdown-content">
						<p>
							<a href="login">Login / Register</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
