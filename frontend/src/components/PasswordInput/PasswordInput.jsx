import { useState } from "react";
import hidePasswordIcon from "../../images/hidePassword.svg";
import showPasswordIcon from "../../images/showPassword.svg";
import "./PasswordInput.scss";

const PasswordInput = ({ password, setPassword }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="passwordContainer">
			<input
				type={showPassword ? "text" : "password"}
				className="password-login-input"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				className="hide-password-button"
				type="button"
				onClick={() => setShowPassword(!showPassword)}
			>
				<img
					className="eye-icon"
					src={showPassword ? hidePasswordIcon : showPasswordIcon}
					alt="hide password"
				/>
			</button>
		</div>
	);
};

export default PasswordInput;
