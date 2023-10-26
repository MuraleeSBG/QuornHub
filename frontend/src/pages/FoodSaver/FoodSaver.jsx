
import { Footer } from "../../components/Footer/Footer";
import { FoodSaverHeader } from "../../components/FoodSaverHeader/FoodSaverHeader";
import { useState, useEffect } from 'react';
import {FoodSaverCard} from '../../components/FoodSaverCard/FoodSaverCard'
import './FoodSaver.scss'

const FoodSaver = () => {

	const[listOfInput, setListOfInput] = useState([]);
    let data = require('../../testData.json')
    const [filteredData, setFilteredData] = useState([]);
    const [recipesToDisplay, setrecipesToDisplay] = useState([]);

    // sets input into state, clears input box and calls filterData to implement search
    let addIngredient = (e) => {

        let ingredientToAdd = e.target.previousSibling.value

        setListOfInput((currentList) => [
            ...currentList,
            ingredientToAdd,
        ]);

        console.log(`Ingredient to add is ${ingredientToAdd}` )
        
        e.target.previousSibling.value = ''
        filterData(ingredientToAdd)

    }

    // searches for recipes based on new input
    const filterData = (ingredientToAdd) => {
        const filteredData = data.filter((item) =>
            item.ingredients.toLowerCase().includes(ingredientToAdd.toLowerCase())
        )
        console.log("The filteredData is")
        console.log(filteredData)
        
        for (let i=0; i < filteredData.length; i++) {
            setFilteredData((currentList) => [
                ...currentList,
                filteredData[i],

            ])
        }
    }

    

    // input tags NOT dietaries
    const tags = listOfInput.map(item => {
        return <div className="tag" id={item}>
                    {item}
                    <button id={`${item}btn`} onClick={removeIngredient} className="remove-button">x</button>
                </div>
    })

    

    // currently only removes the input tag, does not remove recipe YET
    let removeIngredient = (e) => {

        let ingredientToRemove = e.target.parentElement.id

        const deleteByvalue = ingredientToRemove => {
            setListOfInput(oldList => {
                return oldList.filter(item => item !== ingredientToRemove)
            })
        }

        deleteByvalue(ingredientToRemove)

    }

    // placeholder dietary tags whilst the FoodSaver card needs editing (change in the way the data is strutured)
    const fakeTags=['vegan', 'vegetarian', 'gluten-free']


    // Removes duplicates with same ids whenever filteredData state changes (i.e. whenever there's a new input)
    useEffect(() => {
            // gets all the unique ids from the filtered data
            const ids = filteredData.map(({id}) => id);

            // filters the recipes using unique ids
            const filtered = filteredData.filter(({id}, index) =>
                !ids.includes(id, index + 1));
            
            // Set filtered recipes into new state for rendering
            setrecipesToDisplay(filtered)
            
    }, [filteredData])


    // renders foodsavercard for recipes to display (filtered with dupes removed)
    const showResults = recipesToDisplay.map(recipe => {
        return <FoodSaverCard title={recipe.recipeName} image={recipe.recipeImg} tags={fakeTags}/>
    })


	return (
		<div>
			<FoodSaverHeader/>
            <div className="food-saver-main">
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Type in an ingredient..." />
                    <button className="submit-button" onClick={addIngredient}>Submit ingredient</button>
                </div>
                <div id="tags" className="tags-container">
                    {tags}
                </div>
                <div className="results-container">
                {listOfInput.length !== 0
                ? <div>{showResults}</div>
                : <h1 className="results-placeholder">Enter ingredients to start saving food and be inspired!</h1>
                }
                </div>
                
            </div>
			
			

			<Footer/>
			
		</div>
	);
};

export default FoodSaver;
