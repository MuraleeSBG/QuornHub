import { useState } from "react";
import hidePassword from "../../images/hidePassword.svg";
import "./PasswordInput.scss"

const PasswordInput = ({password, setPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="passwordContainer">
      <input
        type={showPassword ? "text" : "password"}
        className="login-input"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="hidePasswordButton"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <img src={hidePassword} alt="hide password" />
      </button>
    </div>
  );
};

export default PasswordInput
