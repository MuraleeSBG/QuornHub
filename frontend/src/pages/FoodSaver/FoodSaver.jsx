
import { Footer } from "../../components/Footer/Footer";
import { FoodSaverHeader } from "../../components/FoodSaverHeader/FoodSaverHeader";
import { useState } from 'react';
import {FoodSaverCard} from '../../components/FoodSaverCard/FoodSaverCard'
import './FoodSaver.scss'

const FoodSaver = () => {

	const[listOfInput, setListOfInput] = useState([]);

    let addIngredient = (e) => {

        let ingredientToAdd = e.target.previousSibling.value
        setListOfInput((currentList) => [
            ...currentList,
            ingredientToAdd,
        ]);
        e.target.previousSibling.value = ''

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


	return (
		<>
			<FoodSaverHeader/>
            <div className="food-saver-main">
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Type in an ingredient..." />
                    <button className="submit-button" onClick={addIngredient}>Submit ingredient</button>
                </div>
                <div id="tags" className="tags-container">
                    {tags}
                </div>
                {
                listOfInput.length !== 0
                ? <FoodSaverCard image='https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1-550x550.jpg' title='Vegan Chocolate Chip Cookies' tags={['vegan', 'vegetarian', 'gluten-free']}/>
                : <h1 className="results-placeholder">Enter ingredients to start saving food and be inspired!</h1>
                }
            </div>
			
			

			<Footer/>
			
		</>
	);
};

export default FoodSaver;
