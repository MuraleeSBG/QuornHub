import { Header } from '../components/Header/Header'
import { CategoryCard } from "../components/CategoryCard/CategoryCard";
import './Categories/Categories.scss'
import {Footer} from '../components/Footer/Footer'

const Recipes = () => {

	// random static picture for category card image
	const categories = [
		{recipeName: "Gluten Free", recipeImg: "1.jpeg", link: "gluten-free"},
		{recipeName: "Lactose Free", recipeImg: "2.jpeg", link: "lactose-free"}, 
		{recipeName: "Vegan", recipeImg: "3.jpeg", link:"vegan"},
		{recipeName: "Nut Free", recipeImg: "4.jpeg", link: "nut-free"},
		{recipeName: "Fifteen Minutes", recipeImg: "5.jpeg", link: "fifteen-minute"},
	]


	const showResults = categories.map((category, index) => {
		return (
			<CategoryCard
				key={index}
				category={category}
			/>
		);
	});

	return (
		<div className="category-page">
            <Header />
            <h1 className="category-title">All Recipes</h1>
			<div className="category-results">
				{showResults}
			</div>
			<Footer/>
		</div>
	);
};

export default Recipes;