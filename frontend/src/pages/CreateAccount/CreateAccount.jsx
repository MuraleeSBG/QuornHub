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
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const validatePasswords = (password, confirmPassword) =>
    !password || password === confirmPassword;

  useEffect(() => {
    setPasswordMatch(validatePasswords(password, confirmPassword));
    if (emailAddress && password && displayName && passwordMatch) {
      setErrorMessages([]);
    }
  }, [password, confirmPassword, emailAddress, displayName, passwordMatch]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswords(password, confirmPassword)) return;
    if (!emailAddress || !password || !displayName) {
      setErrorMessages(["Please fill in an email, password and display name"]);
      return;
    }
    if (!validateEmail(emailAddress)) {
      setErrorMessages(["Please enter a valid email address"]);
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
        setErrorMessages(data.messages);
      })
      .catch((error) => {
        setErrorMessages([error.message]);
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
          <label className="loginLabel" htmlFor="emailAddress">
            Email
          </label>
          <input
            type="text"
            className="login-input"
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label className="loginLabel" htmlFor="displayName">
            Display Name
          </label>
          <input
            type="text"
            className="login-input"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label className="loginLabel" htmlFor="password">
            Password
          </label>
          <PasswordInput password={password} setPassword={setPassword} />
          <label className="loginLabel" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
          {!passwordMatch && <p className="error">Passwords do not match</p>}
          {errorMessages && (
            <ul className="errorMessages">
              {errorMessages.map((error) => (
                <li className="error">{error}</li>
              ))}
            </ul>
          )}
          <button type="submit" className="loginButton">
            Create an Account
          </button>
        </form>

        <h2 className="notReg">
          Already have an account?{" "}
          <Link to="/login" className="loginLink">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default CreateAccount;
