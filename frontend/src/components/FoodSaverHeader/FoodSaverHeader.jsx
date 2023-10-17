import "./FoodSaverHeader.scss";
import { Header } from '../Header/Header';

export const FoodSaverHeader = () => {
	return (
		<div className="food-saver-header">
            <Header/>
            <h1 className="fs-header-title">A curated recipe list to help you reduce food waste</h1>
            <p className="header-sub-heading">Simply submit each ingredient you have left over and our smart saver will find suitable recipes so you never have to throw away soggy vegetables again!</p>
            <div className="search-bar">
				<input className="search-input" type="text" placeholder="Enter food item..." />
				<button className="submit-button">Submit</button>
			</div>

		</div>
	);
};