import "./CategoryCard.scss";
import {Link} from 'react-router-dom'

// Could not just use preview card as it forms the url differently

export const CategoryCard = ({ category }) => {
	const url = `/${category.link}`
	return (
		<div className="category-card">
            <Link className="card-link" to={url}>
                <img className="category-image" src={`/recipeImages/${category.recipeImg}`} alt={category.recipeName} />
            </Link>
            <p className="category-container"><a href={url} className="category-subtitle">{category.recipeName}</a></p>

		</div>
	);
};
