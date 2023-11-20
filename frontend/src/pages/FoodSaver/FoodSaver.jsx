import { Footer } from "../../components/Footer/Footer";
import { FoodSaverHeader } from "../../components/FoodSaverHeader/FoodSaverHeader";
import { useState, useEffect } from "react";
import { FoodSaverCard } from "../../components/FoodSaverCard/FoodSaverCard";
import "./FoodSaver.scss";
import close from "../../images/close.svg";

const FoodSaver = () => {
  const [ingredientSearchTerms, setIngredientSearchTerms] = useState([]);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const [inputText, setInputText] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3001/recipes`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error with response");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  // sets input into state, clears input box and calls filterData to implement search
  const addIngredient = () => {
    if (
      ingredientSearchTerms.some(
        (item) => item.toLowerCase() === inputText.toLowerCase()
      ) ||
      inputText === ""
    ) {
      return;
    }
    setIngredientSearchTerms((currentList) => [...currentList, inputText]);
    setInputText("");
  };

  // searches for recipes based on new input
  useEffect(() => {
    const filteredRecipes = data.filter((recipe) => {
      return recipe.ingredients.some((ingredient) => {
        const ingredientStr =
          typeof ingredient === "string" ? ingredient : ingredient.ingredient;

        return ingredientSearchTerms.some(
          (ingredientSearchTerm) =>
            ingredientSearchTerm.toLowerCase() === ingredientStr.toLowerCase()
        );
      });
    });
    setRecipesToDisplay(filteredRecipes);
  }, [ingredientSearchTerms, data]);

  const removeIngredient = (e) => {
    const ingredientToRemove = e.target.parentElement.id;
    const newIngredientSearchTerms = ingredientSearchTerms.filter(
      (item) => item !== ingredientToRemove
    );
    setIngredientSearchTerms(newIngredientSearchTerms);
  };

  // input tags NOT dietaries
  const tags = ingredientSearchTerms.map((item, index) => {
    return (
      <div className="tag" id={item} key={index}>
        {item}
        <button
          id={`${item}`}
          onClick={removeIngredient}
          className="remove-button"
        >
          <img className="remove-button-icon" src={close} alt="remove" />
        </button>
      </div>
    );
  });

  // dietary tags
  const getTags = (recipe) => {
    const tags = [];
    if (recipe.isLactoseFree) {
      tags.push("Lactose Free");
    }
    if (recipe.isVegan) {
      tags.push("Vegan");
    }
    if (recipe.isGlutenFree) {
      tags.push("Gluten Free");
    }
    if (recipe.isDairyFree) {
      tags.push("Dairy Free");
    }
    if (recipe.isNutFree) {
      tags.push("Nut Free");
    }
    return tags;
  };

  const showResults = recipesToDisplay.map((recipe, index) => {
    const tags = getTags(recipe);
    return <FoodSaverCard key={index} selectedRecipe={recipe} tags={tags} />;
  });

  return (
    <div className="food-saver-page">
      <FoodSaverHeader />
      <div className="food-saver-main">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Type in an ingredient..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="submit-button" onClick={addIngredient}>
            Search
          </button>
        </div>
        <div id="tags" className="search-tags-container">
          {tags}
        </div>

        {ingredientSearchTerms.length !== 0 ? (
          <div className="results-container">{showResults}</div>
        ) : (
          <div>
            <h1 className="results-placeholder">
              Enter ingredients to start saving food and be inspired!
            </h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FoodSaver;
