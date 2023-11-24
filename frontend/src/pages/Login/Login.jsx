import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../utils/authUtils";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

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
			<div className="login-container">
				<Link className="login-logo-container" to="/">
					<img className="QHlogo" src={logo} alt="Quornhub logo" />
				</Link>

				<h1 className="Title">Login to your account</h1>
				<h2 className="details">Enter your details to get started</h2>
				<form className="form" onSubmit={handleSubmit}>
					<label className="loginLabel" htmlFor="emailAddress">Email</label>
					<input
						type="text"
						className="login-input"
						id="emailAddress"
						value={emailAddress}
						onChange={(e) => setEmailAddress(e.target.value)}
					/>
					<label className="loginLabel" htmlFor="password">Password</label>
					<PasswordInput password={password} setPassword={setPassword} />

					{errorMessage && <p className="error">{errorMessage}</p>}
					<button type="submit" className="loginButton">
						Login
					</button>
				</form>

				<p className="notReg">
					Not registered yet?{" "}
					<Link to="/create-account" className="create">
						Create an account
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
