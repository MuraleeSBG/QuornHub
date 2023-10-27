import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ image, title, tags }) => {
	return (
		<div className="card">
			<img className="recipe-image" src={image} alt={title} />
			<div className="card-body">
				<h3 className="card-title">{title}</h3>
				<div className="tag-container">
					{tags.map((tag, index) => (
						<p key={index} className="tag-text">{tag}</p>
					))}
				</div>
				<div className="button-container">
					<button className="recipe-button"><a href="/go-to-recipe">Go to recipe </a></button>
				</div>
			</div>
		</div>
	);
};
