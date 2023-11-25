import "./RecipeForm.scss";
import { Header } from "../../components/Header/Header";
import ImageDragUpload from "../../components/ImageDragUpload/ImageDragUpload";
import { useState, useCallback } from "react";
import plusIcon from "../../images/plus.svg";
import { useNavigate } from "react-router";
import { tags } from "../../utils/tagUtils";
import close from "../../images/close.svg";

const RecipeForm = ({
  pageTitle,
  initialIngredients = [],
  initialMethod = "",
  initialTitle = "",
  initialServingSize = 1,
  initialTags = [],
  initialImage,
  uploadRecipe,
}) => {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [method, setMethod] = useState(initialMethod);
  const [recipeTitle, setRecipeTitle] = useState(initialTitle);
  const [servingSize, setServingSize] = useState(initialServingSize);
  const [recipeTags, setRecipeTags] = useState(initialTags);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();

  const updateIngredient = (e, index) => {
    const newIngredients = Array.from(ingredients);
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
    console.log({ ingredients });
  };

  const removeIngredient = (indexToRemove) => {
    const newIngredients = ingredients.filter(
      (_, index) => index !== indexToRemove
    );
    console.log(newIngredients);
    setIngredients(newIngredients);
  };

  const updateTags = (tag) => {
    setRecipeTags((current) => {
      if (current.includes(tag)) {
        return current.filter((current) => current !== tag);
      } else {
        return [...current, tag];
      }
    });
  };

  const uploadImage = useCallback(async () => {
    const imageApiUrl = `http://localhost:3001/image`;
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch(imageApiUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
    });
    if (!response.ok) {
      throw new Error("Error uploading image");
    }
    const data = await response.json();
    console.log({data})
    return data.imageName;
  }, [selectedImage]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        console.log({ selectedImage });
        const imageName = !selectedImage ? initialImage : await uploadImage();
        console.log({imageName})
        const recipe = {
          recipeName: recipeTitle,
          recipeImg: imageName,
          recipeDesc: recipeTitle,
          ingredients,
          serves: servingSize,
          tags: recipeTags,
          method: method,
        };
        const response = await uploadRecipe(recipe);
        if (!response.ok) {
          throw new Error("Error saving recipe");
        }
        const newRecipe = await response.json();
        navigate("/go-to-recipe/" + newRecipe.recipeId);
      } catch (error) {
        console.error(error);
      }
    },
    [
      ingredients,
      initialImage,
      method,
      navigate,
      recipeTags,
      recipeTitle,
      selectedImage,
      servingSize,
      uploadImage,
      uploadRecipe,
    ]
  );

  return (
    <div className="add-recipes-page">
      <Header />
      <div className="createContainer">
        <h1>{pageTitle}</h1>
        <h2>
          Thank you for making our website better, we can't wait to try your
          delicious recipe!
        </h2>
        <form className="addRecipe" onSubmit={handleSubmit}>
          <div className="leftColumn">
            <ImageDragUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              initialImage={initialImage}
            />
            <label className="recipeFormLabel" htmlFor="recipeTitle">
              Recipe Title
            </label>
            <input
              type="text"
              className="recipeInput"
              id="recipeTitle"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
            <label className="recipeFormLabel" htmlFor="servingSize">
              Serving Size
            </label>
            <select
              className="servingSizeSelect"
              id="servingSize"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            >
              {Array.from(Array(10).keys()).map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <label className="recipeFormLabel" htmlFor="recipeTags">
              The Recipe Is:
            </label>
            <div className="tagCheckboxes">
              {tags.map((tag) => (
                <div key={tag} className="checkboxContainer">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id={tag}
                    value={tag}
                    checked={recipeTags.includes(tag)}
                    onChange={() => updateTags(tag)}
                  />
                  <label className="checkboxLabel" htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="rightColumn">
            <label className="recipeFormLabel" htmlFor="addIngredient">
              Ingredients
            </label>
            <button
              type="button"
              className="addIngredient"
              id="addIngredient"
              onClick={() => setIngredients([...ingredients, ""])}
            >
              <img src={plusIcon} alt="Plus icon" className="plusIcon" />
              Add Ingredient
            </button>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">
                <input
                  value={ingredient}
                  type="text"
                  className="recipeInput"
                  placeholder="Ingredient"
                  onChange={(e) => updateIngredient(e, index)}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="remove-button"
                  id="removeIngredient"
                >
                  <img
                    className="remove-button-icon"
                    src={close}
                    alt="remove ingredient"
                  />
                </button>
              </div>
            ))}

            <label className="recipeFormLabel" htmlFor="method">
              Method
            </label>
            <textarea
              id="method"
              className="method"
              rows="10"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />

            <button className="done" type="submit">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
