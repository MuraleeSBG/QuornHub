import { Link } from "react-router-dom";
import logo from "../images/QHLogo.png";


const Login = () => {
	return (
		<>
			<div>Hello world! This is the login page</div>;
			<Link className="nav" to="/">
				<img className="QHlogo" src={logo} alt="Quornhub logo" />
            </Link>
            <h5>Not registered yet? 
                <Link to="/create-account"> Create an account</Link>
            </h5>
		</>
	);
};

export default Login;
