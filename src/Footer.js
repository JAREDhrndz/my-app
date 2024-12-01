import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="https://canesa.shop/about">Sobre Nosotros</a>
                    <a href="https://canesa.shop/services">Servicios</a>
                    <a href="https://canesa.shop/contact">Contacto</a>
                </div>
                <div className="footer-address">
                    Dirección: Castañeda Nte 524, Durango, Durango, 34000, México
                </div>
                <div className="footer-map" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.927824668131!2d-104.66312459999999!3d24.0336102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bc8265edc4ce3%3A0xf765c72931f251b0!2sCasta%C3%B1eda%20524%2C%20Zona%20Centro%2C%2034000%20Durango%2C%20Dgo.!5e0!3m2!1ses!2smx!4v1733071871451!5m2!1ses!2smx" 
                        style={{ width: '100%', height: '450px', border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} Inmobiliaria y Constructora CANESA. S.A.
                    de C.V. Todos los derechos reservados.
                </div>
            </div>
        </section>
    );
};

export default Footer;