import { Link } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import "./Login.scss";
import { useState } from "react";

const Login = () => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			`Login attempted. Email: ${emailAddress} Password: ${password}`
		);
	};

	return (
		<div className="page">
			<div className="container">
				<Link className="nav" to="/">
					<img className="QHlogo" src={logo} alt="Quornhub logo" />
				</Link>

				<h1>Login to your account</h1>
				<h5>Enter your details to get started</h5>
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
						type="text"
						className="input"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" className="loginButton">
						Login
					</button>
				</form>

				<h5>
					Not registered yet?
					<Link to="/create-account"> Create an account</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
