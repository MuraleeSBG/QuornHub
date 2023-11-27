import "./Header.scss";
import logo from "../../images/QHLogo.png";
import user from "../../images/user.svg";
import menu from "../../images/menu.svg";
import close from "../../images/close.svg";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getUsersName, isLoggedIn, logout } from "../../utils/authUtils";
import { useMemo, useState } from "react";

export const Header = ({ userName }) => {
	const dropIcon = <FontAwesomeIcon icon={faCaretDown} />;
	const navigate = useNavigate();
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showRecipesSubMenu, setShowRecipesSubMenu] = useState(false);

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

	const isUserLoggedIn = isLoggedIn();

	const userInitials = useMemo(() => {
		const userName = getUsersName();
		if (!userName || typeof userName !== "string") {
			return "XX";
		}
		const namesArray = userName.split(" ");

		if (namesArray.length === 1) {
			return `${namesArray[0][0]}`;
		}
		return `${namesArray[0][0]}${namesArray[1][0]}`;
	}, []);

	return (
		<>
			<div className="nav-bar">
				<button
					className="nav-mobile-menu header-button"
					onClick={() => setShowMobileMenu(!showMobileMenu)}
				>
					<img className="header-icon" src={menu} alt="menu"></img>
				</button>
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
					<div className="dropdown">
						<div className="nav">Recipes {dropIcon}</div>
						<div className="dropdown-content2">
							<Link to="/gluten-free">Gluten Free</Link>
							<Link to="/vegan">Vegan</Link>
							<Link to="/fifteen-minute">15 Minute</Link>
							<Link to="/lactose-free">Lactose Free</Link>
							<Link to="/nut-free">Nut Free</Link>
							{isUserLoggedIn && <Link to="/add-recipes">Add a Recipe</Link>}
							<Link to="/recipes">All Recipes</Link>
						</div>
					</div>
				</div>

				<div className="dropdown">
					{isUserLoggedIn ? (
						<p className="header-icon user-initials">{userInitials}</p>
					) : (
						<img className="user-icon header-icon" src={user} alt="login" />
					)}

					<div className="dropdown-content">
						{isUserLoggedIn ? (
							<Link onClick={onLogout}>Logout</Link>
						) : (
							<Link to="/login">Login / Register</Link>
						)}
					</div>
				</div>
			</div>
			{showMobileMenu && (
				<div className="mobile-menu">
					<div className="mobile-menu-items">
						<Link to="/">
							<img
								className="mobile-menu-items__logo"
								src={logo}
								alt="Quornhub logo"
							/>
						</Link>
						<Link className="mobile-menu-items__link" to="/">
							Home
						</Link>
						<Link className="mobile-menu-items__link" to="/food-saver">
							Food Saver
						</Link>
						<div
							className="mobile-sub-menu__link"
							onClick={() => setShowRecipesSubMenu(!showRecipesSubMenu)}
						>
							<Link className="mobile-menu-items__link">
								Recipes {dropIcon}
							</Link>
							{showRecipesSubMenu && (
								<div className="mobile-sub-menu">
									<Link
										className="mobile-menu-items__sub-link"
										to="/gluten-free"
									>
										Gluten Free
									</Link>
									<Link className="mobile-menu-items__sub-link" to="/vegan">
										Vegan
									</Link>
									<Link
										className="mobile-menu-items__sub-link"
										to="/fifteen-minute"
									>
										15 Minute
									</Link>
									<Link
										className="mobile-menu-items__sub-link"
										to="/lactose-free"
									>
										Lactose Free
									</Link>
									<Link className="mobile-menu-items__sub-link" to="/nut-free">
										Nut Free
									</Link>
									{isUserLoggedIn && (
										<Link
											className="mobile-menu-items__sub-link"
											to="/add-recipes"
										>
											Add a Recipe
										</Link>
									)}
									<Link className="mobile-menu-items__sub-link" to="/recipes">
										All Recipes
									</Link>
								</div>
							)}
						</div>
					</div>
					<button
						className="close-button"
						onClick={() => setShowMobileMenu(!showMobileMenu)}
					>
						<img
							className="header-icon close-icon"
							src={close}
							alt="close menu"
						></img>
					</button>
				</div>
			)}
		</>
	);
};
