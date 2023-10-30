import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ selectedRecipe, tags, onRecipeSelect }) => {
	return (
		<div className="card">
			<img className="recipe-image" src={selectedRecipe.recipeImg} alt={selectedRecipe.recipeName} />
			<div className="card-body">
				<h3 className="card-title">{selectedRecipe.recipeName}</h3>
				<div className="tag-container">
					{tags.map((tag, index) => (
						<p key={index} className="tag-text">{tag}</p>
					))}
				</div>
				<div className="button-container">
					<button onClick={() => onRecipeSelect(selectedRecipe)} className="recipe-button"><a href="/go-to-recipe">Go to recipe </a></button>
				</div>
			</div>
		</div>
	);
};
