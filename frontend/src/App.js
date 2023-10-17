import "./App.css";
import { Header } from "./components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FoodSaver from "./pages/FoodSaver";

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
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};


export default App;
