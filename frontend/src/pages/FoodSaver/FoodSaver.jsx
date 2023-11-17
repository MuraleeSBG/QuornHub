import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
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
				const finalIngredient =
					typeof ingredient === "string" ? ingredient : ingredient.ingredient;
				return listOfInput.some(
					(input) => input.toLowerCase() === finalIngredient.toLowerCase()
				);
			});
		});
		setrecipesToDisplay(filteredRecipes);
	}, [listOfInput, data]);

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
		<div className="foodsaver-page">
			<div className="food-saver-header">
			<Header />
			<div className="header-main">
					<div className="page-desc">
						<h1 className="fs-header-title">A curated recipe list to help you reduce food waste</h1>
						<p className="header-sub-heading">Simply submit each ingredient you have left over and our smart saver will find suitable recipes so you never have to throw away soggy vegetables again!</p>
					</div>
				</div>
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
						Add
					</button>
				</div>
				

			</div>
			
			<div className="food-saver-main">
				<div id="tags" className="search-tags-container">
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
