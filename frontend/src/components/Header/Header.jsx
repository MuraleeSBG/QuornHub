import "./Header.scss";
import logo from "../../images/QHLogo.png";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ userName }) => {
	const dropIcon = <FontAwesomeIcon icon={faCaretDown} />;

	return (
		<div className="header">
			<div className="nav-bar">
				<div>
					<Link className="nav" to="/">
						<img className="QHlogo" src={logo} alt="Quornhub logo" />
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
						<button className="dropbtn2">Recipes{dropIcon}</button>
						<div className="dropdown-content2">
                            <Link to="/gluten-free">Gluten Free</Link>
                            <Link to="/vegan">Vegan</Link>
                            <Link to="/fifteen-minute">15 Minute</Link>
                            <Link to="/lactose-free">Lactose Free</Link>
							<Link to="/nut-free">Nut Free</Link>
							<Link to="/add-recipes">Add a Recipe</Link>
							<Link to="/recipes">All Recipes</Link>
						</div>
					</div>
				</div>

				<div className="dropdown">
					<button className="dropbtn"></button>
					<div className="dropdown-content">
						<Link to="/login">Login / Register</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
