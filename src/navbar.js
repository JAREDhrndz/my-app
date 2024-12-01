import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import menuIcon from './assets/menu.png';
import logoIcon from './assets/favicon.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [sessionData, setSessionData] = useState(null);
    const navigate = useNavigate();  // Hook de navegación para redirigir

    useEffect(() => {
        const storedSession = sessionStorage.getItem("sessionData");
        const storedUserName = sessionStorage.getItem('userName');
        
        if (storedSession) {
            const sessionParsed = JSON.parse(storedSession);
            setSessionData(sessionParsed); // Guarda los datos de la sesión en el estado
        }

    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleLogout = () => {
        // Eliminar los datos de sesión
        sessionStorage.removeItem('sessionData');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('tipo_usuario');
        sessionStorage.removeItem('userID');

        // Redirigir al usuario al inicio o página de login
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo-icon">
                <Link to="/"><img src={logoIcon} alt="Logo"/></Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <img src={menuIcon} alt="Menú" />
            </div>
            {isOpen && (
                <div className="dropdown" onMouseMove={handleMouseMove} onMouseLeave={closeMenu}>
                    <span
                        className="glow-effect"
                        style={{
                            top: `${glowPosition.y}px`,
                            left: `${glowPosition.x}px`,
                        }}
                    />
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Nosotros</Link>
                    <Link to="/services">Proyectos</Link>
                    <Link to="/citas">Citas</Link>

                    {sessionData && sessionData.tipo_usuario === 'SuperAdministrador' && (
                        <Link to="/menu">Menu Superadmin</Link>
                    )}

                    {sessionData && sessionData.tipo_usuario === 'Administrador' && (
                        <Link to="/menuNuevo">Menu Admin</Link>
                    )}

                    <div style={{ marginTop: '10px' }}>
                        {sessionStorage.getItem('userName') ? (
                            <span className="welcome-text">{`Hola, ${sessionStorage.getItem('userName')}`}</span>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </div>

                    {/* Solo mostrar el botón de cerrar sesión si hay datos en sessionStorage */}
                    {sessionStorage.getItem('userName') && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    )}

                </div>
            )}
        </nav>
    );
};

export default Navbar;
