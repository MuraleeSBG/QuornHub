import { useState, useRef, useEffect } from "react";
import "./Carousel.scss";
import arrowRight from "../../images/arrowRight.svg";

// This resources was used as a template for a carousel with bootstrap and applied to our project: https://tinloof.com/blog/how-to-build-an-auto-play-slideshow-with-react
// comments to demonstrate understanding of the code

// an array of the slide images
const images = ["40.png", "41.jpg", "42.jpg"];
const recipeNames = [
	"Easy Vegetarian Ramen",
	"Spicy Pesto Bolognese",
	"Quorn Tika Masala",
];
const recipeDescriptions = [
	"Look no further than this classic ramen with a vegetarian twist.",
	"Blow away the cobwebs with this spicy pesto bolognese.",
	"Bask in the take-away taste of this Quorn Tika Masala.",
];
// delay between automatic slides
const delay = 10000;

export const Carousel = () => {
	const [activeSlideIndex, setActivSlideIndex] = useState(0);
	const timeoutRef = useRef(null);

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setActivSlideIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);

		return () => {
			resetTimeout();
		};
	}, [activeSlideIndex]);

	return (
		<div className="slideshow">
			<div
				className="slideshowSlider"
				style={{ transform: `translate3d(${-activeSlideIndex * 100}%, 0, 0)` }}
			>
				{images.map((backgroundColor, index) => (
					<div key={index} className="slide">
						<div className="slideContainer">
							<img
								className="slideImage"
								src={`http://localhost:3001/uploads/${backgroundColor}`}
								alt={backgroundColor}
							/>
							<div className="slideDescription">
								<h1 className="recipeNames">{recipeNames[index]}</h1>
								<div className="recipeDescriptionContainer">
									<p className="recipeDescriptions">
										{recipeDescriptions[index]}
									</p>
									<button className="goToRecipeButton" aria-label="go to recipe">
										<img className="goToRecipeIcon" src={arrowRight} alt="go to recipe"></img>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="slideshowDotContainer">
				{images.map((_, index) => (
					<div
						key={index}
						className={`slideshowDot${
							index === activeSlideIndex ? " active" : ""
						}`}
						onClick={() => {
							setActivSlideIndex(index);
						}}
					></div>
				))}
			</div>
		</div>
	);
};
