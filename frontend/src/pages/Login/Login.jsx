import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../utils/authUtils";

const Login = () => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const userApiUrl = `http://localhost:3001/login`;
		fetch(userApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ emailAddress, password }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Incorrect email or password");
				}
				return response.json();
			})
			.then((data) => {
				login(data);
				navigate("/");
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	return (
		<div className="page">
			<div className="container">
				<Link className="login-logo-container" to="/">
					<img className="QHlogo" src={logo} alt="Quornhub logo" />
				</Link>

				<h2 className="Title">Login to your account</h2>
				<h5 className="details">Enter your details to get started</h5>
				<form className="form" onSubmit={handleSubmit}>
					<label htmlFor="emailAddress">Email</label>
					<input
						type="text"
						className="input"
						id="emailAddress"
						value={emailAddress}
						onChange={(e) => setEmailAddress(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="input"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{errorMessage && <p className="error">{errorMessage}</p>}
					<button type="submit" className="loginButton">
						Login
					</button>
				</form>

				<h5 className="notReg">
					Not registered yet?{" "}
					<Link to="/create-account" className="create">
						Create an account
					</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
