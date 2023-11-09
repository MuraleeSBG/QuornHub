import "./PreviewCard.scss";
import { Link } from "react-router-dom";

export const PreviewCard = ({ selectedRecipe }) => {
	const url = `/go-to-recipe/${selectedRecipe.id}`;
	return (
		<div className="preview-card">
			<Link className="card-link" to={url}>
				<img
					className="preview-image"
					src={`http://localhost:3001/uploads/${selectedRecipe.recipeImg}`}
					alt={selectedRecipe.recipeName}
				/>
			</Link>
			<p className="title-container">
				<a href={url} className="preview-title">
					{selectedRecipe.recipeName}
				</a>
			</p>
		</div>
	);
};
