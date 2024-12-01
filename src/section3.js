import React, { useState } from 'react';
import './section3.css';

import carrusel1 from './assets/carrusel/carrusel-1.jpg';
import carrusel2 from './assets/carrusel/carrusel-2.jpg';
import carrusel3 from './assets/carrusel/carrusel-3.jpg';
import carrusel4 from './assets/carrusel/carrusel-4.jpg';
import carrusel5 from './assets/carrusel/carrusel-5.jpg';

const Section3 = () => {
  const images = [carrusel1, carrusel2, carrusel3, carrusel4, carrusel5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (


    <div className="section3-container">
            <h1 className='Trabajos'>Nuestros Trabajos</h1>
            <p className='parrafo'>Testimonios tangibles de nuestra calidad y compromiso con brindar servicios que cumplan con las expectativas de nuestros clientes. </p>
      <div className="carousel">
        {images.map((image, index) => {
          const offset = index - currentIndex;

          if (offset < -1 || offset > 1) {
            // Ocultar las imágenes que no estén cercanas a la central
            return null;
          }

          return (
            <div
              key={index}
              className={`carousel-item ${
                offset === 0 ? 'active' : offset === -1 ? 'left' : 'right'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          );
        })}
        <button className="carousel-btn prev" onClick={handlePrev}>
          ◄
        </button>
        <button className="carousel-btn next" onClick={handleNext}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default Section3;
