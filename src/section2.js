import React, { useState } from 'react';
import './section2.css';
import misionImage from './assets/mision.jpg'; 
import visionImage from './assets/vision.jpg'; 

const Section2 = () => {
    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated(!isRotated);
    };

    return (
        <div className="section2">
            <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleClick}>
                <div className="image-front">
                    <img src={misionImage} alt="Misión" />
                    <div className="text-overlay">
                        <h2>Misión</h2>
                        <p>"Hacer el compromiso de
                        construir obras con la ética de una
                        empresa confiable y responsable para
                        la completa satisfacción de su cliente,
                        teniendo la honestidad, calidad y
                        lealtad como principales valores."</p>
                    </div>
                </div>
                <div className="image-back">
                    <img src={visionImage} alt="Visión" />
                    <div className="text-overlay">
                        <h2>Visión</h2>
                        <p>Fomentar la integracion y superacion
                        continua de la empresa.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
