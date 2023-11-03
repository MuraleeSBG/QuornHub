import { Footer } from "../../components/Footer/Footer";
import { FoodSaverHeader } from "../../components/FoodSaverHeader/FoodSaverHeader";
import { useState, useEffect } from "react";
import { FoodSaverCard } from "../../components/FoodSaverCard/FoodSaverCard";
import "./FoodSaver.scss";

const FoodSaver = () => {
	const [listOfInput, setListOfInput] = useState([]);
	const [recipesToDisplay, setrecipesToDisplay] = useState([]);
	const [inputText, setInputText] = useState("");
	
	// This needs replacing with code commented out below to fetch from database
	// const data = require("../../testData.json");

	const [data, setData] = useState([]);

	useEffect(() => {
        const apiUrl = `http://localhost:3001/api`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with response")
            }
            return response.json();
        })
			.then(data => {
				console.log({ data })
            setData(data);
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        })

    },[])


	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			addIngredient();
		}
	};

	// sets input into state, clears input box and calls filterData to implement search
	const addIngredient = () => {
		if (
			listOfInput.some(
				(item) => item.toLowerCase() === inputText.toLowerCase()
			) ||
			inputText === ""
		) {
			return;
		}
		setListOfInput((currentList) => [...currentList, inputText]);
		setInputText("");
	};

	// searches for recipes based on new input
	useEffect(() => {
		const filteredRecipes = data.filter((recipe) => {
			return recipe.ingredients.some((ingredient) => {
				return listOfInput.some(
					(input) => input.toLowerCase() === ingredient.toLowerCase()
				);
			});
		});
		setrecipesToDisplay(filteredRecipes);
	}, [listOfInput, data]);

	// currently only removes the input tag, does not remove recipe YET
	const removeIngredient = (e) => {
		const ingredientToRemove = e.target.parentElement.id;
		const deleteByvalue = (ingredientToRemove) => {
			setListOfInput((oldList) => {
				return oldList.filter((item) => item !== ingredientToRemove);
			});
		};
		deleteByvalue(ingredientToRemove);
	};

	// input tags NOT dietaries
	const tags = listOfInput.map((item, index) => {
		return (
			<div className="tag" id={item} key={index}>
				{item}
				<button
					id={`${item}btn`}
					onClick={removeIngredient}
					className="remove-button"
				>
					x
				</button>
			</div>
		);
	});

	// renders foodsavercard for recipes to display (filtered with dupes removed)
	const getTags = (recipe) => {
		const tags = [];
		if (recipe.isVegetarian) {
			tags.push("Vegetarian");
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
		return (
			<FoodSaverCard
				key={index}
				selectedRecipe={recipe}
				tags={tags}
			/>
		);
	});

	return (
		<div>
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
						Submit ingredient
					</button>
				</div>
				<div id="tags" className="tags-container">
					{tags}
				</div>
				
					{listOfInput.length !== 0 ? (
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
