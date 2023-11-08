import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import FoodSaver from "./pages/FoodSaver/FoodSaver";
import AddRecipes from "./pages/AddRecipes/AddRecipes";
import Login from "./pages/Login/Login";
import AllRecipes from "./pages/Recipes/AllRecipes";
import CreateAccount from "./pages/CreateAccount";
import GlutenFree from "./pages/Recipes/GlutenFree";
import Vegan from "./pages/Recipes/Vegan";
import FifteenMinute from "./pages/Recipes/FifteenMinute";
import LactoseFree from "./pages/Recipes/LactoseFree";
import NutFree from "./pages/Recipes/NutFree";
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
			element: <AllRecipes />,
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
			path: "/nut-free",
			element: <NutFree />,
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
