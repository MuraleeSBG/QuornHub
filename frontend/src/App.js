import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FoodSaver from "./pages/FoodSaver/FoodSaver";
import AddRecipes from "./pages/AddRecipes/AddRecipes";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import CreateAccount from "./pages/CreateAccount";
import GlutenFree from "./pages/DietaryPages/GlutenFree";
import Vegan from "./pages/Vegan";
import FifteenMinute from "./pages/FifteenMinute";
import LactoseFree from "./pages/LactoseFree";
import GoToRecipe from "./pages/GoToRecipe/GoToRecipe";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/food-saver",
			element: <FoodSaver />,
		},
		{
			path: "/recipes",
			element: <Recipes />,
		},
		{
			path: "/add-recipes",
			element: <AddRecipes />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/create-account",
			element: <CreateAccount />,
		},
		{
			path: "/gluten-free",
			element: <GlutenFree />,
		},
		{
			path: "/vegan",
			element: <Vegan />,
		},
		{
			path: "/fifteen-minute",
			element: <FifteenMinute />,
		},
		{
			path: "/lactose-free",
			element: <LactoseFree />,
		},
		{
			path: "/go-to-recipe/:id",
			element: <GoToRecipe/>

		},
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
