import "./FoodSaverHeader.scss";
import { Header } from '../Header/Header';
import { useState } from 'react';
import {FoodSaverCard} from '../FoodSaverCard/FoodSaverCard'

export const FoodSaverHeader = () => {

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
		<div className="food-saver-header">
            <Header/>
            <div className="main">
                <div className="page-desc">
                    <h1 className="fs-header-title">A curated recipe list to help you reduce food waste</h1>
                    <p className="header-sub-heading">Simply submit each ingredient you have left over and our smart saver will find suitable recipes so you never have to throw away soggy vegetables again!</p>
                </div>
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Type in an ingredient..." />
                    <button className="submit-button" onClick={addIngredient}>Submit ingredient</button>
                </div>
                <div id="tags" className="tags-container">
                    {tags}
                </div>

            </div>

            {
                listOfInput.length !== 0
                ? <FoodSaverCard image='https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1-550x550.jpg' title='Vegan Chocolate Chip Cookies' tags={['vegan', 'vegetarian', 'gluten-free']}/>
                : <h1>Enter ingredients to start saving food and be inspired!</h1>
            }
        
		</div>
	);
};
