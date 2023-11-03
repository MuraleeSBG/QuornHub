import "./PreviewCard.scss";
import {Link} from 'react-router-dom'

export const PreviewCard = ({ selectedRecipe }) => {
	const url = `/go-to-recipe/${selectedRecipe.id}`
	return (
		<div className="preview-card">
            <Link className="card-link" to={url}>
                <img className="preview-image" src={`/recipeImages/${selectedRecipe.recipeImg}`} alt={selectedRecipe.recipeName} />
            </Link>
            <p className="title-container"><a href={url} className="card-title">{selectedRecipe.recipeName}</a></p>

		</div>
	);
};