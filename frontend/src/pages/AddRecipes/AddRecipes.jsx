import RecipeForm from "../../components/RecipeForm/RecipeForm";


const AddRecipes = () => {
  const postRecipe = (recipe) => {
    const recipeApiUrl = `http://localhost:3001/recipe`;
    return fetch(recipeApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  };
  return <RecipeForm pageTitle={"Create a Recipe"} uploadRecipe={postRecipe} />;
};

export default AddRecipes;
