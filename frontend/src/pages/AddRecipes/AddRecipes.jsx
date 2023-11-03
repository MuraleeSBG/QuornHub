import "./AddRecipes.scss";
import { Header } from "../../components/Header/Header";
import ImageDragUpload from "../../components/ImageDragUpload/ImageDragUpload";
import { useState } from "react";

const tags = [
	"Gluten Free",
	"Vegan",
	"Nut Free",
	"Lactose Free",
	"< 15 Minutes",
];

const AddRecipes = () => {
	const [ingredients, setIngredients] = useState([]);
	const [method, setMethod] = useState("");
	const [recipeTitle, setRecipeTitle] = useState("");
	const [servingSize, setServingSize] = useState(1);
	const [recipeTags, setRecipeTags] = useState([]);
	const [selectedImage, setSelectedImage] = useState();


	const updateAmount = (e, index) => {
		const oldIngredients = Array.from(ingredients);
		oldIngredients[index].amount = e.target.value;
		setIngredients(oldIngredients);
	};
	const updateIngredient = (e, index) => {
		const oldIngredients = Array.from(ingredients);
		oldIngredients[index].ingredient = e.target.value;
		setIngredients(oldIngredients);
	};

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
						<ImageDragUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
						<label htmlFor="recipeTitle">Recipe Title</label>
						<input
							type="text"
							id="recipeTitle"
							value={recipeTitle}
							onChange={(e) => setRecipeTitle(e.target.value)}
						/>
						<label htmlFor="servingSize">Serving Size</label>
						<select
							id="servingSize"
							value={servingSize}
							onChange={(e) => setServingSize(e.target.value)}
						>
							{Array.from(Array(10).keys()).map((num) => (
								<option key={num} value={num + 1}>
									{num + 1}
								</option>
							))}
						</select>
						<label htmlFor="recipeTags">The Recipe Is:</label>
						<div className="tagCheckboxes">
							{tags.map((tag) => (
								<div key={tag}>
									<input
										type="checkbox"
										id={tag}
										value={recipeTags}
										onChange={(e) => setRecipeTags(e.target.value)}
									/>
									<label htmlFor={tag}>{tag}</label>
								</div>
							))}
						</div>
					</div>
					<div className="rightColumn">
						<label htmlFor="addIngredient">Ingredients</label>
						<button
							type="button"
							id="addIngredient"
							onClick={() =>
								setIngredients([
									...ingredients,
									{
										amount: "",
										ingredient: "",
									},
								])
							}
						>
							Add Ingredient
						</button>
						{ingredients.map((ingredient, index) => (
							<div key={index} className="ingredient" >
								<input
									value={ingredient.amount}
									type="text"
									placeholder="Amount"
									onChange={(e) => updateAmount(e, index)}
								/>
								<input
									value={ingredient.ingredient}
									type="text"
									placeholder="Ingredient"
									onChange={(e) => updateIngredient(e, index)}
								/>
							</div>
						))}

						<label htmlFor="method">Method</label>
						<textarea
							id="method"
							rows="10"
							value={method}
							onChange={(e) => setMethod(e.target.value)}
						></textarea>

						<button type="submit">Done</button>
					</div>
				</form>
			</div>
			;
		</div>
	);
};

export default AddRecipes;