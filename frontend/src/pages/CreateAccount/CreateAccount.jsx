import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/QHLogo.png";
import { useEffect, useState } from "react";
import "./CreateAccount.scss";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import "../Login/Login.scss";

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
  }, [password, confirmPassword, emailAddress, displayName, passwordMatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <h1 className="Title">Create your account</h1>
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
          <label className="loginLabel" htmlFor="displayName">Display Name</label>
          <input
            type="text"
            className="login-input"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label className="loginLabel" htmlFor="password">Password</label>
          <PasswordInput password={password} setPassword={setPassword} />
          <label className="loginLabel" htmlFor="confirmPassword">Confirm Password</label>
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
          {!passwordMatch && <p className="error">Passwords do not match</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="loginButton">
            Create an Account
          </button>
        </form>

        <h2 className="notReg">
          Already have an account?{" "}
          <Link to="/login" className="create">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default CreateAccount;
