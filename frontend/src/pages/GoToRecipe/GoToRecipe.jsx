import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import "./GoToRecipe.scss";
import { useParams } from "react-router";
import { getTags } from "../../utils/tagUtils";
import { Link, useNavigate } from "react-router-dom";
import { isAdminUser } from "../../utils/authUtils";

const GoToRecipe = () => {
	const [data, setData] = useState(undefined);
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		// CHANGE LOCAL HOST PORT TO WHATEVER BACKEND IS USING
		const apiUrl = `http://localhost:3001/recipe/${id}`;

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
	}, [id]);

	const deleteRecipe = async () => {
		const recipeApiUrl = `http://localhost:3001/recipe/${id}`;
		const response = await fetch(recipeApiUrl, {
			method: "DELETE",
			// we are checking on the backend that you are an admin or not to stop you going into local storage on the front end and changing admin to true and hacking into the website
			credentials: "include",
		});
		if (response.ok) {
			navigate("/");
		}
	};

	return (
		<div className="recipe-main">
			<Header />
			<div className="recipe-top">
				{data ? (
					<div>
						<div className="overview">
							<div className="overview-col1">
								<img
									className="rec-image"
									src={`http://localhost:3001/uploads/${data.recipeImg}`}
									alt={data.recipeName}
								/>
							</div>
							<div className="overview-col2">
								<div className="recipe-title">{data.recipeName}</div>
								<div className="description">{data.recipeDesc}</div>
								<div className="tag-container">
									{getTags(data).map((tag, index) => {
										return (
											<p key={index} className="tag">
												{tag}
											</p>
										);
									})}
								</div>
							</div>
						</div>
						<div className="main">
							<div className="main-column1">
								<h4 className="sub-heading">Ingredients</h4>
								<div className="ingredients-list">
									{data.ingredients.map((ingredient, index) => {
										return (
											<p key={index} className="ingredient-list">
												{/* Currently, test ingredients are strings, but ingredients added through the app are objects. 
                                                So if the ingredient is of type string, it must be test ingredient and we display the string.
                                                If not it must be a new ingredient which is an object with amount and ingredient fields */}
												{typeof ingredient === "string"
													? ingredient
													: `${ingredient.amount} ${ingredient.ingredient}`}
											</p>
										);
									})}
								</div>
							</div>
							<div className="main-column2">
								<h4 className="sub-heading">Method</h4>
								<ol className="recipe-method">
									{data.method
										.split(".")
										.filter(Boolean)
										.map((methodLine, index) => {
											return (
												<li className="method-steps" key={index}>
													{methodLine}.
												</li>
											);
										})}
								</ol>
							</div>
						</div>
					</div>
				) : (
					<div>
						<h1 className="results-placeholder">error 404 - page not found</h1>
					</div>
				)}
			</div>
			{isAdminUser() && (
				<div>
					<Link to={`/edit-recipe/${id}`}>Edit Recipe</Link>
					<button onClick={deleteRecipe}>Delete Recipe</button>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default GoToRecipe;
