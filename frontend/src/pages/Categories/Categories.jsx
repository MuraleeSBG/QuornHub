import { Header } from "../../components/Header/Header";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { useState, useEffect } from "react";
import "./Categories.scss";
import { Footer } from "../../components/Footer/Footer";

const Categories = ({ title, tag }) => {
	const [data, setData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const apiUrl = `http://localhost:3001/recipes${tag ? `?tag=${tag}` : ""}`;

		fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error with response");
				}
				return response.json();
			})
			.then((data) => {
				console.log({ data });
				setData(data);
				setErrorMessage("");
			})
			.catch((error) => {
				setErrorMessage("There was an error getting your recipes.");
				console.log("Error fetching data:", error);
			});
	}, [tag]);

	const results = data.map((recipe, index) => {
		return <PreviewCard key={index} selectedRecipe={recipe} />;
	});

	return (
		<div className="category-page">
			<Header />
			<h1 className="category-title">{title}</h1>
			<div className="category-results">{results}</div>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<Footer />
		</div>
	);
};

export default Categories;
