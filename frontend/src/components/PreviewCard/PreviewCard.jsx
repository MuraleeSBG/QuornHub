import "./PreviewCard.scss";
import {Link} from 'react-router-dom'

export const PreviewCard = ({ selectedRecipe }) => {
	const url = `/go-to-recipe/${selectedRecipe.id}`
	return (
		<div className="preview-card">
            <Link to={url}>
                <img className="recipe-image" src={`/recipeImages/${selectedRecipe.recipeImg}`} alt={selectedRecipe.recipeName} />
            </Link>
            <p><a href={url} className="card-title">{selectedRecipe.recipeName}</a></p>

		</div>
	);
};
