import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer"
import React, { useState, useEffect } from 'react';

const GoToRecipe = ({selectedRecipeId}) => {
    // const [data, setData] = useState([]);


    // useEffect(() => {
    //     // CHANGE LOCAL HOST PORT TO WAHTEVER BACKEND IS USING
    //     const apiUrl = `http://localhost:3000/api/id/:${selectedRecipeId}`;

    //     fetch(apiUrl)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error("Error with response")
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         setData(data);

    //     })
    //     .catch(error => {
    //         console.log("Error fetching data:", error);
    //     })

    // }, [selectedRecipeId])


	return (
		<div className="recipe-main">
            <Header />
            <div className="recipe-top">

            </div>
            <div>

            </div>
            <Footer/>
		</div>
	);
};

export default GoToRecipe;