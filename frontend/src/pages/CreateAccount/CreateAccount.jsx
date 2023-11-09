import { Link } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import { useState } from "react";
import "./CreateAccount.scss";

const CreateAccount = () => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const userApiUrl = `http://localhost:3001/api/user`;
		fetch(userApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ emailAddress, password, displayName }),
		})
			.then((response) => {
				console.log({ response });
				if (!response.ok) {
					throw new Error("Error with response");
				}
				return response.json();
			})
			.then((data) => {
				console.log({ data });
			})
			.catch((error) => {
				console.log("Error fetching data:", error);
			});
	};

	return (
		<div className="page">
			<div className="container">
				<Link className="login-logo-container" to="/">
					<img className="QHlogo" src={logo} alt="Quornhub logo" />
				</Link>

				<h2 className="Title">Create your account</h2>
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
					<label htmlFor="emailAddress">Display Name</label>
					<input
						type="text"
						className="input"
						id="emailAddress"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="text"
						className="input"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Confirm Password</label>
					<input
						type="text"
						className="input"
						id="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type="submit" className="loginButton">
						Create an Account
					</button>
				</form>

				<h5 className="notReg">
					Already have an account?{" "}
					<Link to="/login" className="create">
						Login
					</Link>
				</h5>
			</div>
		</div>
	);
};

export default CreateAccount;
