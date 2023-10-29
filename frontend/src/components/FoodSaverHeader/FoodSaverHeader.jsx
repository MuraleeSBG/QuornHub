import "./FoodSaverHeader.scss";
import { Header } from '../Header/Header';



export const FoodSaverHeader = () => {

    

	return (
		<div className="food-saver-header">
            <Header/>
            <div className="header-main">
                <div className="page-desc">
                    <h1 className="fs-header-title">A curated recipe list to help you reduce food waste</h1>
                    <p className="header-sub-heading">Simply submit each ingredient you have left over and our smart saver will find suitable recipes so you never have to throw away soggy vegetables again!</p>
                </div>
            </div>
		</div>
	);
};
