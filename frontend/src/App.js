import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import FoodSaver from "./pages/FoodSaver/FoodSaver";
import AddRecipes from "./pages/AddRecipes/AddRecipes";
import Login from "./pages/Login/Login";
import Recipes from "./pages/Recipes";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import GoToRecipe from "./pages/GoToRecipe/GoToRecipe";
import Categories from "./pages/Categories/Categories";
import EditRecipe from "./pages/EditRecipe/EditRecipe";

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
			path: "/edit-recipe/:id",
			element: <EditRecipe />,
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
			element: <Categories key={"gluten-free"} tag={"gluten-free"} title={"Gluten Free Recipes"} />,
		},
		{
			path: "/vegan",
			element: <Categories key={"vegan"} tag={"vegan"} title={"Vegan Recipes"} />,
		},
		{
			path: "/fifteen-minute",
			element: <Categories key={"under-15"} tag={"under-15"} title={"15 Minute Recipes"} />,
		},
		{
			path: "/lactose-free",
			element: (
				<Categories key={"lactose-free"} tag={"lactose-free"} title={"Lactose Free Recipes"} />
			),
		},
		{
			path: "/nut-free",
			element: <Categories key={"nut-free"} tag={"nut-free"} title={"Nut Free Recipes"} />,
		},
		{
			path: "/go-to-recipe/:id",
			element: <GoToRecipe />,
		},
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
