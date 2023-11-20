import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ selectedRecipe, tags, onRecipeSelect }) => {
	const url = `/go-to-recipe/${selectedRecipe.id}`;
	return (
		<div className="food-saver-card">
			<img
				className="recipe-image"
				src={`http://localhost:3001/uploads/${selectedRecipe.recipeImg}`}
				alt={selectedRecipe.recipeName}
			/>
			<div className="fs-card-body">
				<h3 className="fs-card-title">{selectedRecipe.recipeName}</h3>
				<div className="fs-tag-container">
					{tags.map((tag, index) => (
						<p key={index} className="fs-tag-text">
							{tag}
						</p>
					))}
				</div>
				<div className="recipe-button-container">
					<button className="recipe-button">
						<a href={url}>Go to recipe </a>
					</button>
				</div>
			</div>
		</div>
	);
};
