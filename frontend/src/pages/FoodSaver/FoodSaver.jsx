import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { FoodSaverCard } from "../../components/FoodSaverCard/FoodSaverCard";
import "./FoodSaver.scss";
import close from "../../images/close.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const FoodSaver = () => {
	const dropIcon = <FontAwesomeIcon icon={faCaretDown} />;
	const [ingredientSearchTerms, setIngredientSearchTerms] = useState([]);
	const [recipesToDisplay, setRecipesToDisplay] = useState([]);
	const [inputText, setInputText] = useState("");
	const [categoryFilter, setCategoryFilter] = useState(new Set());
	const [finalRecs, setFinalRecs] = useState([]);

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
		const filteredRecsByIngredient = data.filter((recipe) => {
			return recipe.ingredients.some((ingredient) => {
				const ingredientStr =
					typeof ingredient === "string" ? ingredient : ingredient.ingredient;
				return ingredientSearchTerms.some(
					(ingredientSearchTerm) =>
						ingredientSearchTerm.toLowerCase() === ingredientStr.toLowerCase()
				);
			});
		});
		setRecipesToDisplay(filteredRecsByIngredient);
	}, [ingredientSearchTerms, data]);

	const removeIngredient = (e) => {
		const ingredientToRemove = e.target.parentElement.id;
		const newIngredientSearchTerms = ingredientSearchTerms.filter(
			(item) => item !== ingredientToRemove
		);
		setIngredientSearchTerms(newIngredientSearchTerms);
	};

	// input tags NOT dietaries
	const searchTags = ingredientSearchTerms.map((item, index) => {
		return (
			<div className="tag" id={item} key={index}>
				{item}
				<button id={item} onClick={removeIngredient} className="remove-button">
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
		if (recipe.isUnder15) {
			tags.push("15 mins");
		}
		return tags;
	};

	const filters = [
		"Gluten Free",
		"Vegan",
		"15 mins",
		"Lactose Free",
		"Nut Free",
		"",
	];

	const showFilters = filters.map((category, index) => {
		return (
			<div className="dropdown-option" key={index}>
				<input
					type="radio"
					name="dropdown-group"
					value={category}
					onChange={(e) => setCategoryFilter(e.target.value)}
				/>
				{category.length > 0 ? category : "No filters"}
			</div>
		);
	});

	useEffect(() => {
		const filterRecsByCategory = recipesToDisplay.filter((recipe) => {
			const tags = getTags(recipe);

			if (categoryFilter.length > 0) {
				return tags.includes(categoryFilter);
			}

			return recipesToDisplay;
		});
		setFinalRecs(filterRecsByCategory);
	}, [recipesToDisplay, categoryFilter]);

	const showResults = finalRecs.map((recipe, index) => {
		const tags = getTags(recipe);
		return <FoodSaverCard key={index} selectedRecipe={recipe} tags={tags} />;
	});

	return (
		<div className="foodsaver-page">
			<div className="food-saver-header">
				<Header />
				<div className="header-main">
					<div className="page-desc">
						<h1 className="fs-header-title">
							A curated recipe list to help you reduce food waste
						</h1>
						<p className="header-sub-heading">
							Simply submit each ingredient you have left over and our smart
							saver will find suitable recipes so you never have to throw away
							soggy vegetables again!
						</p>
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
				<div className="filter-dropdown" data-control="checkbox-dropdown">
					Filter by a category {dropIcon}
					<div className="filter-dropdown-content">{showFilters}</div>
				</div>
				<div id="tags" className="search-tags-container">
					{searchTags}
				</div>
				{ingredientSearchTerms.length !== 0 ? (
					<div className="results-container">
						{finalRecs.length === 0 ? (
							<h1 className="results-placeholder">
								There are no recipes in that category, please choose another
								category or search for more ingredients{" "}
							</h1>
						) : (
							showResults
						)}
					</div>
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
