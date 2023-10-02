import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ image, title, tags }) => {
	return (
		<div className="card">
			<img className="image" src={image} alt={title} />
			<div className="card-body">
				<h3 className="card-title">{title}</h3>
				<div className="tag-container">
					{tags.map((tag) => (
						<p className="card-text">{tag}</p>
					))}
				</div>
				<div className="button-container">
					<button className="recipe-button">Go to recipe </button>
				</div>
			</div>
		</div>
	);
};
