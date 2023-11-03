import { Header } from "../../components/Header/Header";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { useState, useEffect } from "react";
import './Categories.scss';
import {Footer} from '../../components/Footer/Footer'


const FifteenMinute = () => {

	const [data, setData] = useState([]);

	useEffect(() => {
        const apiUrl = `http://localhost:3001/api/u15`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with response")
            }
            return response.json();
        })
			.then(data => {
				console.log({ data })
            setData(data);
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        })

    },[])

	const showResults = data.map((recipe, index) => {
	
		return (
			<PreviewCard
				key={index}
				selectedRecipe={recipe}
			/>
		);
	});

	return (
		<div className="category-page">
            <Header />
            <h1 className="category-title">15 Minute Recipes</h1>
			<div className="category-results">
				{showResults}
			</div>
			<Footer/>
		</div>
	);
};

export default FifteenMinute;