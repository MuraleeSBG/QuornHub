import { useState, useRef, useEffect } from "react";
import './Carousel.scss'

// This resources was used as a template for a carousel with bootstrap and applied to our project: https://tinloof.com/blog/how-to-build-an-auto-play-slideshow-with-react
// comments to demonstrate understanding of the code

// an array of the slide images
const colors = ["1.webp", "2.webp", "3.webp"];
// delay between automatic slides
const delay = 3000;



export const Carousel = () => {

  const [index, setIndex] = useState(0);
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
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);


  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {colors.map((backgroundColor, index) => (
          <img
            className="slide"
            key={index}
            src={`http://localhost:3001/uploads/${backgroundColor}`}
            alt={backgroundColor}
          />
        ))}
      </div>
 
      <div>
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {setIndex(idx);}}
          ></div>
        ))}
      </div>
    </div>
  );
}

