import "./AddRecipes.scss";
import { Header } from "../../components/Header/Header";
import ImageDragUpload from "../../components/ImageDragUpload/ImageDragUpload";

const tags = [
	"Gluten Free",
	"Vegan",
	"Nut Free",
	"15 Minutes or Less",
	"Lactose Free",
];

const AddRecipes = () => {
	return (
		<div className="AddRecipesPage">
			<Header />
			<div className="createContainer">
				<h1>Create a recipe</h1>
				<h5>
					Thank you for making our website better, we can't wait to try your
					delicious recipe!
				</h5>
				<form className="addRecipe">
					<div className="leftColumn">
						<ImageDragUpload />
						<label htmlFor="recipeTitle">Recipe Title</label>
						<input type="text" id="recipeTitle" />
						<label htmlFor="servingSize">Serving Size</label>
						<select id="servingSize" />
						<label htmlFor="recipeTags">The Recipe Is:</label>
						<div className="tagCheckboxes">
							{tags.map((tag) => (
								<div>
									<input type="checkbox" id={tag} />
									<label htmlFor={tag}>{tag}</label>
								</div>
							))}
						</div>
					</div>
					<div className="rightColumn">
						<button type="submit">Done</button>
					</div>
				</form>
			</div>
			;
		</div>
	);
};

export default AddRecipes;
