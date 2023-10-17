import { Link } from "react-router-dom";
import logo from "../images/QHLogo.png";


const CreateAccount = () => {
	return (
		<>
			<div>Hello world! This is the create an account page</div>;
			<Link className="nav" to="/">
				<img className="QHlogo" src={logo} alt="Quornhub logo" />
			</Link>
		</>
	);
};

export default CreateAccount;
