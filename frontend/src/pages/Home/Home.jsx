import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import '../Categories/Categories.scss';
import './Home.scss';
import { useState, useEffect } from "react";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard"
import { Carousel } from "../../components/Carousel/Carousel";

const Home = () => {

	const [data, setData] = useState([]);
	const [recipesOfWeek, setRecipesOfWeek] = useState([]);
	const [editorsRecs, setEditorsRecs] = useState([]);
	const [festiveFaves, setFestiveFaves] = useState([]);

	// fetch all recipes

	useEffect(() => {
        const apiUrl = `http://localhost:3001/recipes`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with response")
            }
            return response.json();
        })
			.then(data => {
            setData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })

    },[])

	// find recipes with static ids for recipes of week
	useEffect(() => {
		const recipesOfWeekIds = ['2', '5', '16', '27']
		const filteredRecipes = data.filter((recipe) => {
			return recipesOfWeekIds.some(
				(id) => id === recipe.id
			);

		});
		setRecipesOfWeek(filteredRecipes);
	}, [data]);

	
	const showRecipesOfWeek = recipesOfWeek.map((recipe, index) => {
		return (
			<PreviewCard
				key={index}
				selectedRecipe={recipe}
			/>
		);
	});

	// find recipes with static ids for editors choice
	useEffect(() => {
		const editorsChoiceIds = ['5', '35', '38', '21']
		const filteredRecipes = data.filter((recipe) => {
			return editorsChoiceIds.some(
				(id) => id === recipe.id
			);

		});
		setEditorsRecs(filteredRecipes);
	}, [data]);

	const showEditorsChoice = editorsRecs.map((recipe, index) => {
		return (
			<PreviewCard
				key={index}
				selectedRecipe={recipe}
			/>
		);
	});

	// find recipes with static ids for festivefaves
	useEffect(() => {
		const festiveIds = ['20', '9', '18', '33']
		const filteredRecipes = data.filter((recipe) => {
			return festiveIds.some(
				(id) => id === recipe.id
			);

		});
		setFestiveFaves(filteredRecipes);
	}, [data]);

	const showFestives = festiveFaves.map((recipe, index) => {
		return (
			<PreviewCard
				key={index}
				selectedRecipe={recipe}
			/>
		);
	});

	// category cards
	const categories = [
		{recipeName: "Gluten Free", recipeImg: "1.webp", link: "gluten-free"},
		{recipeName: "Lactose Free", recipeImg: "2.webp", link: "lactose-free"}, 
		{recipeName: "Vegan", recipeImg: "3.webp", link:"vegan"},
		{recipeName: "Nut Free", recipeImg: "4.webp", link: "nut-free"},
		{recipeName: "Fifteen Minutes", recipeImg: "5.webp", link: "fifteen-minute"},
	]


	const showCategories = categories.map((category, index) => {
		return (
			<CategoryCard
				key={index}
				category={category}
			/>
		);
	});

	

	return (
		<div className="home-page">
			<Header />
			<div className="home-main">
				<div className="carousel">
					<Carousel/>
				</div>
				<div className="feature">
					<h5 className="feature-title">Recipes of the Week</h5>
					<div className="feature-container">{showRecipesOfWeek}</div>
					
				</div>
				<div className="feature">
					<h5 className="feature-title">Festive Favourites</h5>
					<div className="feature-container">{showFestives}</div>
					
				</div>
				<div className="feature">
					<h5 className="feature-title">Editor's Autumn Favourites</h5>
					<div className="feature-container">{showEditorsChoice}</div>
					
				</div>
				<div className="feature">
					<h5 className="feature-title">Popular Categories</h5>
					<div className="feature-container">{showCategories}</div>
					
				</div>
			</div>

			<Footer/>
		</div>
	);
};

export default Home;
