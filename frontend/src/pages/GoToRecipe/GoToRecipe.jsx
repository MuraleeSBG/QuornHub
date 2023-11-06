import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer"
import React, { useState, useEffect } from 'react';
import './GoToRecipe.scss';

const GoToRecipe = () => {
    const [data, setData] = useState([]);

    const url = window.location.href
    const idArray = url.split("/")
    const id = idArray[4]

    useEffect(() => {
        // CHANGE LOCAL HOST PORT TO WAHTEVER BACKEND IS USING
        const apiUrl = `http://localhost:3001/api/id/${id}`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with response")
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(data[0])   

        })
        .catch(error => {
            console.log("Error fetching data:", error);
        })

    }, [id])

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
		return tags;
	};


    
	return (
		<div className="recipe-main">
            <Header />
            
            <div className="recipe-top">
                    {data.length !== 0 ? (
						<div>
                            <div className="overview">
                                <div className="overview-col1">
                                    <img className="rec-image" src={`/recipeImages/${data[0].recipeImg}`} alt={data[0].recipeName}/>
                                </div>
                                <div className="overview-col2">
                                    <div className="recipe-title">{data[0].recipeName}</div>
                                    <div className="description">{data[0].recipeDesc}</div>
                                    <div className="goto-tag-container">{(getTags(data[0])).map((tag, index) => {return (<p key={index} className="goto-tag-text">{tag}</p>)})}</div>
                                </div> 

                            </div>
                            <div className="main">
                                <div className="main-column1">
                                    <h4 className="sub-heading">Ingredients</h4>
                                    <div className="ingredients-list">{(data[0].ingredients).map((ingredient) => {return (<p key={ingredient} className="ingredient-list">{ingredient}</p>)})}</div>
                                </div>
                                <div className="main-column2">
                                    <h4 className="sub-heading">Method</h4>
                                    <ul className="recipe-method"> {(((data[0].method).split(".")).filter(Boolean)).map((methodLine) => {return (<li className="method-line" key={methodLine}>{methodLine}</li>)})}</ul>
                                </div> 
                                 
                            </div>

                            

                        </div>
					) : (
						<div>
							<h1 className="results-placeholder">
								error 404 - page not found
							</h1>
						</div>
					)}
                

            </div>
            <Footer/>
		</div>
	);
};

export default GoToRecipe;