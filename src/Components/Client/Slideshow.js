import React, { useState, useEffect } from 'react';
import '../../Styles/ClientStyles/Slideshowstyle.css';
import cecimage1 from '../../Resousers/cecimage1.jpg';
import cecimage2 from     '../../Resousers/cecimage2.jpg';
import cecimage3 from     '../../Resousers/cecimage3.jpg';




function Slideshow() {
  const images = [
        cecimage1,
        cecimage2,
        cecimage3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to next image
  function goToNext() {
    setCurrentIndex(function(prevIndex) {
      return (prevIndex + 1) % images.length;
    });
  }

  // Function to go to previous image
  function goToPrev() {
    setCurrentIndex(function(prevIndex) {
      return (prevIndex - 1 + images.length) % images.length;
    });
  }

  // Auto-slide effect
  useEffect(function() {
    const interval = setInterval(function() {
      goToNext();
    }, 10000);

    return function() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={images[currentIndex]}
        alt="slide"
        className="slideshow-image"
      />
      <div className="slideshow-buttons">
        <button onClick={goToPrev} className="arrow-button">
  <svg
    width="80"
    height="80"
    viewBox="-307.2 -307.2 1638.4 1638.4"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    stroke="#ffffff"
    strokeWidth="42"
  >
    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000" />
  </svg>
      </button>
      <button onClick={goToNext} className="arrow-button">
        <svg
          width="80"
          height="80"
          viewBox="-307.2 -307.2 1638.4 1638.4"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="42"
          style={{ transform: 'rotate(180deg)' }}
          >
          <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000" />
        </svg>
      </button>  
      </div>
    </div>
  );
}

export default Slideshow;
