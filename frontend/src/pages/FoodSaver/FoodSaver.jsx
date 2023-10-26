
import { Footer } from "../../components/Footer/Footer";
import { FoodSaverHeader } from "../../components/FoodSaverHeader/FoodSaverHeader";
import { useState, useEffect } from 'react';
import {FoodSaverCard} from '../../components/FoodSaverCard/FoodSaverCard'
import './FoodSaver.scss'

const FoodSaver = () => {

	const[listOfInput, setListOfInput] = useState([]);
    let data = require('../../testData.json')
    const [filteredData, setFilteredData] = useState([]);

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

    let removeIngredient = (e) => {

        let ingredientToRemove = e.target.parentElement.id

        const deleteByvalue = ingredientToRemove => {
            setListOfInput(oldList => {
                return oldList.filter(item => item !== ingredientToRemove)
            })
        }

        deleteByvalue(ingredientToRemove)

    }


    const tags = listOfInput.map(item => {
        return <div className="tag" id={item}>
                    {item}
                    <button id={`${item}btn`} onClick={removeIngredient} className="remove-button">x</button>
                </div>
    })

    const fakeTags=['vegan', 'vegetarian', 'gluten-free']

    const showResults = filteredData.map(recipe => {
        return <FoodSaverCard title={recipe.recipeName} image={recipe.recipeImg} tags={fakeTags}/>
    })


    // Trying to get duplicate remove working  - it works but stuck in infinite loop
    useEffect(() => {
        function removeDups() {
            const ids = filteredData.map(({id}) => id);
            const filtered = filteredData.filter(({id}, index) =>

            !ids.includes(id, index + 1));
            console.log("With duplicates removed")
            console.log(filtered);
    
            setFilteredData(filtered)
        }

        removeDups()

    }, [listOfInput])


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
