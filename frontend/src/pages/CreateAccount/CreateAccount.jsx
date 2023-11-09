import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import { useEffect, useState } from "react";
import "./CreateAccount.scss";

const CreateAccount = () => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const validatePasswords = (password, confirmPassword) =>
		!password || password === confirmPassword;

	useEffect(() => {
		setPasswordMatch(validatePasswords(password, confirmPassword));
		if (emailAddress && password && displayName && passwordMatch) {
			setErrorMessage("");
		}
	}, [password, confirmPassword, emailAddress, displayName]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(validatePasswords(password, confirmPassword));
		if (!validatePasswords(password, confirmPassword)) return;
		if (!emailAddress || !password || !displayName) {
			setErrorMessage("Please fill in an email, password and display name");
			return;
		}
		const userApiUrl = `http://localhost:3001/user`;
		fetch(userApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ emailAddress, password, displayName }),
		})
			.then((response) => {
				if (!response.ok) {
					return response.json();
				}
				navigate("/login");
			})
			.then((data) => {
				throw new Error(data.message);
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
						type="password"
						className="input"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						className="input"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{!passwordMatch && <p className="error">Passwords do not match</p>}
					{errorMessage && <p className="error">{errorMessage}</p>}
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
