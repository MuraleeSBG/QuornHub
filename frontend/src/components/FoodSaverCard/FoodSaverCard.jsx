import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ selectedRecipe, tags, onRecipeSelect }) => {
	const url = `/go-to-recipe/${selectedRecipe.id}`;
	return (
		<div className="card">
			<img
				className="recipe-image"
				src={`http://localhost:3001/uploads/${selectedRecipe.recipeImg}`}
				alt={selectedRecipe.recipeName}
			/>
			<div className="card-body">
				<h3 className="card-title">{selectedRecipe.recipeName}</h3>
				<div className="tag-container">
					{tags.map((tag, index) => (
						<p key={index} className="tag-text">
							{tag}
						</p>
					))}
				</div>
				<div className="button-container">
					<button className="recipe-button">
						<a href={url}>Go to recipe </a>
					</button>
				</div>
			</div>
		</div>
	);
};
