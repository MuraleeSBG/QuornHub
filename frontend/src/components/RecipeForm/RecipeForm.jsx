import "./RecipeForm.scss";
import { Header } from "../../components/Header/Header";
import ImageDragUpload from "../../components/ImageDragUpload/ImageDragUpload";
import { useState } from "react";
import plusIcon from "../../images/plus.svg";
import { useNavigate } from "react-router";
import { tags } from "../../utils/tagUtils";

const RecipeForm = ({
	pageTitle,
	initialIngredients = [],
	initialMethod = "",
	initialTitle = "",
	initialServingSize = 1,
	initialTags = [],
	initialImage,
	uploadRecipe,
}) => {
	const [ingredients, setIngredients] = useState(initialIngredients);
	const [method, setMethod] = useState(initialMethod);
	const [recipeTitle, setRecipeTitle] = useState(initialTitle);
	const [servingSize, setServingSize] = useState(initialServingSize);
	const [recipeTags, setRecipeTags] = useState(initialTags);
	const [selectedImage, setSelectedImage] = useState();
	const navigate = useNavigate();

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

	const updateTags = (tag) => {
		setRecipeTags((current) => {
			if (current.includes(tag)) {
				return current.filter((current) => current !== tag);
			} else {
				return [...current, tag];
			}
		});
	};

	const uploadImage = async () => {
		const imageApiUrl = `http://localhost:3001/image`;
		const formData = new FormData();
		formData.append("image", selectedImage);

		const response = await fetch(imageApiUrl, {
			method: "POST",
			body: formData,
			headers: {
				Accept: "multipart/form-data",
			},
		});
		if (!response.ok) {
			throw new Error("Error uploading image");
		}
		const data = await response.json();
		return data.imageName;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const imageName = !selectedImage ? initialImage : await uploadImage();
			const recipe = {
				recipeName: recipeTitle,
				recipeImg: imageName,
				recipeDesc: recipeTitle,
				ingredients,
				serves: servingSize,
				tags: recipeTags,
				method: method,
			};
			const response = await uploadRecipe(recipe);
			if (!response.ok) {
				throw new Error("Error saving recipe");
			}
			const newRecipe = await response.json();
			navigate("/go-to-recipe/" + newRecipe.recipeId);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="add-recipes-page">
			<Header />
			<div className="createContainer">
				<h1>{pageTitle}</h1>
				<h2>
					Thank you for making our website better, we can't wait to try your
					delicious recipe!
				</h2>
				<form className="addRecipe" onSubmit={handleSubmit}>
					<div className="leftColumn">
						<ImageDragUpload
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
						/>
						<label className="recipeFormLabel" htmlFor="recipeTitle">
							Recipe Title
						</label>
						<input
							type="text"
							className="recipeInput"
							id="recipeTitle"
							src={
								initialImage
									? `http://localhost:3001/uploads/${initialImage}`
									: ""
							}
							value={recipeTitle}
							onChange={(e) => setRecipeTitle(e.target.value)}
						/>
						<label className="recipeFormLabel" htmlFor="servingSize">
							Serving Size
						</label>
						<select
							className="servingSizeSelect"
							id="servingSize"
							value={servingSize}
							onChange={(e) => setServingSize(e.target.value)}
						>
							{/* <img className="servingUser" src={servingUser} alt="Serving size" /> */}
							{Array.from(Array(10).keys()).map((num) => (
								<option key={num} value={num + 1} data-icon="glyphicon-music">
									{num + 1}
								</option>
							))}
						</select>
						<label className="recipeFormLabel" htmlFor="recipeTags">
							The Recipe Is:
						</label>
						<div className="tagCheckboxes">
							{tags.map((tag) => (
								<div key={tag} className="checkboxContainer">
									<input
										className="tagCheckbox"
										type="checkbox"
										id={tag}
										value={recipeTags.includes(tag)}
										onChange={() => updateTags(tag)}
									/>
									<label className="checkboxLabel" htmlFor={tag}>
										{tag}
									</label>
								</div>
							))}
						</div>
					</div>
					<div className="rightColumn">
						<label className="recipeFormLabel" htmlFor="addIngredient">
							Ingredients
						</label>
						<button
							type="button"
							className="addIngredient"
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
							<img src={plusIcon} alt="Plus icon" className="plusIcon" />
							Add Ingredient
						</button>
						{ingredients.map((ingredient, index) => (
							<div key={index} className="ingredient">
								<input
									value={ingredient.amount}
									type="text"
									className="input"
									placeholder="Amount"
									onChange={(e) => updateAmount(e, index)}
								/>
								<input
									value={ingredient.ingredient}
									type="text"
									className="input"
									placeholder="Ingredient"
									onChange={(e) => updateIngredient(e, index)}
								/>
							</div>
						))}

						<label className="recipeFormLabel" htmlFor="method">
							Method
						</label>
						<textarea
							id="method"
							className="method"
							rows="10"
							value={method}
							onChange={(e) => setMethod(e.target.value)}
						/>

						<button className="done" type="submit">
							Done
						</button>
					</div>
				</form>
			</div>
			;
		</div>
	);
};

export default RecipeForm;
