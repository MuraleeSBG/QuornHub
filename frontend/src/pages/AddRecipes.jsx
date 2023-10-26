import "./AddRecipes.scss";
import { Header } from "../components/Header/Header";

const AddRecipes = () => {
	return (
		<div className="AddRecipesPage">
			<Header/>
			<div className="createContainer">
				<h1>Create a recipe</h1>
				<h5>Thank you for making our website better, we can’t wait to try your delicious recipe!</h5>
			</div>;
		</div>
	);
};

export default AddRecipes;