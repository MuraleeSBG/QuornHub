import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer"
import React, { useState, useEffect } from 'react';

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
            console.log(data[0].recipeName)
            

        })
        .catch(error => {
            console.log("Error fetching data:", error);
        })

    }, [id])


	return (
		<div className="recipe-main">
            <Header />
            
            <div className="recipe-top">
                    {data.length !== 0 ? (
						<div>
                            <div>{data[0].recipeName}</div>
                            
                            

                        </div>
					) : (
						<div>
							<h1 className="results-placeholder">
								error 404
							</h1>
						</div>
					)}
                

            </div>
            <Footer/>
		</div>
	);
};

export default GoToRecipe;