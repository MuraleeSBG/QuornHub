import { useParams } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import { useEffect, useState } from "react";
import { getTags } from "../../utils/tagUtils";

const EditRecipe = () => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState();

  useEffect(() => {
    if (!id) return;
    const apiUrl = `http://localhost:3001/recipe/${id}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error with response");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentRecipe(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const postRecipe = (recipe) => {
    const recipeApiUrl = `http://localhost:3001/recipe/${id}`;
    return fetch(recipeApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
      credentials: "include",
    });
  };
  return currentRecipe ? (
    <RecipeForm
      pageTitle={"Edit a Recipe"}
      uploadRecipe={postRecipe}
      initialImage={currentRecipe.recipeImg}
      initialIngredients={currentRecipe.ingredients}
      initialTags={getTags(currentRecipe)}
      initialMethod={currentRecipe.method}
      initialServingSize={currentRecipe.serves}
      initialTitle={currentRecipe.recipeName}
    />
  ) : (
    <>Loading recipe</>
  );
};

export default EditRecipe;
