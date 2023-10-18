import "./FoodSaverHeader.scss";
import { Header } from '../Header/Header';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const FoodSaverHeader = () => {

    const[listOfInput, setListOfInput] = useState([]);

    const removeIcon = <FontAwesomeIcon icon={faXmark} />;

    let addIngredient = (e) => {

        let ingredientToAdd = e.target.previousSibling.value
        setListOfInput((currentList) => [
            ...currentList,
            ingredientToAdd,
        ]);
        e.target.previousSibling.value = ''
    }

    // let removeIngredient = (e) => {

    //     let ingredientToRemove = e.target.parentElement.id
    //     console.log(ingredientToRemove)



    //     let stateList = listOfInput
    //     console.log(stateList)

    //     let newList = stateList.filter(checkItems);
    //     console.log(newList)

    //     function checkItems(x) {
    //         return x !== ingredientToRemove
    //     }


    //     setListOfInput(() => [
    //         newList,
    //     ]);

    //     console.log(listOfInput)
        
        



    // }


    // onClick={removeIngredient}

    const tags = listOfInput.map(item => {
        return <div className="tag" id={item}>
                    {item}
                    <button id={`${item}btn`}  className="remove-button">x</button>
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
        
		</div>
	);
};
