import "./CategoryCard.scss";
import { Link } from "react-router-dom";

export const CategoryCard = ({ category }) => {
	const url = `/${category.link}`;
	return (
		<div className="category-card">
			<Link className="category-link" to={url}>
				<img
					className="category-image"
					src={`http://localhost:3001/uploads/${category.recipeImg}`}
					alt={category.recipeName}
				/>
			</Link>
			<p className="category-container">
				<a href={url} className="category-subtitle">
					{category.recipeName}
				</a>
			</p>
		</div>
	);
};
