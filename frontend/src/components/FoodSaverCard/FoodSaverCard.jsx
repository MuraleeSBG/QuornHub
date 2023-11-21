import { useNavigate } from "react-router-dom";
import "./FoodSaverCard.scss";

export const FoodSaverCard = ({ selectedRecipe, tags, onRecipeSelect }) => {
  const url = `/go-to-recipe/${selectedRecipe.id}`;
  const navigate = useNavigate();
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
          <button className="recipe-button" onClick={() => navigate(url)}>
            Go to recipe
          </button>
        </div>
      </div>
    </div>
  );
};
