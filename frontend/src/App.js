import "./App.css";
import { Header } from "./components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FoodSaver from "./pages/FoodSaver";
import AddRecipes from "./pages/AddRecipes";
import Recipes from "./pages/Recipes";

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
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};


export default App;
