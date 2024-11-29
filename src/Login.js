import React, { useState } from 'react';
import Navbar from './navbar';
import 'react-intl-tel-input/dist/main.css';
import IntlTelInput from 'react-intl-tel-input';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [nombre, setNombre] = useState('');
    const [correoRegistro, setCorreoRegistro] = useState('');
    const [contraseñaRegistro, setContraseñaRegistro] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarContraseñaRegistro, setMostrarContraseñaRegistro] = useState(false);
    const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

    const navigate = useNavigate(); // Instancia para redirección con useNavigate

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const data = { correo_electronico: correo, contraseña };
        console.log('Datos enviados al backend:', data);

        try {
            const response = await fetch('http://localhost/backend/submit.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const textResponse = await response.text();
            console.log('Respuesta del backend:', textResponse);

            try {
                // Intentamos parsear la respuesta como JSON
                const result = JSON.parse(textResponse);
                console.log('Resultado JSON:', result);

                setMensaje(result.mensaje); // Mostrar el mensaje recibido del backend

                if (result.status === 'success') {
                    // Verificamos si "status" es 'success' y procedemos con la validación del tipo de usuario
                    if (result.tipo_usuario) {
                        console.log('Tipo de usuario:', result.tipo_usuario);
                        if (result.tipo_usuario === 'Cliente') {
                            console.log('Redirigiendo a la página del Cliente...');
                            navigate('/Mainpage'); // Redirigir a la página del Cliente
                            alert('¡Inicio de sesión exitoso!');
                        } else if (result.tipo_usuario === 'Administrador') {
                            console.log('Redirigiendo a la página del Administrador...');
                            navigate('/menuNuevo'); // Redirigir a la página del Administrador
                            alert('¡Inicio de sesión exitoso como Administrador!');
                        } else if (result.tipo_usuario === 'SuperAdministrador') {
                            console.log('Redirigiendo a la página del SuperAdministrador...');
                            navigate('/menu'); // Redirigir a la página del SuperAdministrador
                            alert('¡Inicio de sesión exitoso como SuperAdministrador!');
                        }
                    } else {
                        console.error('El tipo de usuario no está presente en la respuesta');
                    }
                } else {
                    console.error('La respuesta no es exitosa:', result.mensaje);
                    setMensaje(result.mensaje);
                }
            } catch (error) {
                console.error('Error al parsear JSON:', error);
                setMensaje('Hubo un error al procesar la respuesta del servidor.');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setMensaje('Hubo un error en la solicitud');
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if (contraseñaRegistro !== confirmarContraseña) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }

        const data = { nombre, correo: correoRegistro, contraseña: contraseñaRegistro, telefono };
        try {
            const response = await fetch('http://localhost/backend/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const textResponse = await response.text();
            console.log(textResponse);

            try {
                const result = JSON.parse(textResponse);
                setMensaje(result.mensaje);
                if (result.status === 'success') {
                    setIsLogin(true);
                }
            } catch (error) {
                console.error('Error al parsear JSON:', error);
                setMensaje('Hubo un error al procesar la respuesta del servidor.');
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            setMensaje('Hubo un error en la solicitud');
        }
    };

    const handlePhoneChange = (isValid, value, countryData) => {
        setTelefono(`+${countryData.dialCode} ${value}`);
    };

    const togglePasswordVisibility = () => {
        setMostrarContraseña(!mostrarContraseña);
    };

    const togglePasswordVisibilityRegistro = () => {
        setMostrarContraseñaRegistro(!mostrarContraseñaRegistro);
    };

    const toggleConfirmarPasswordVisibility = () => {
        setMostrarConfirmarContraseña(!mostrarConfirmarContraseña);
    };

    return (
        <div className="login-wrapper">
            <Navbar />
            <div id="login-container">
                <h2 id="titulo-formulario">{isLogin ? 'Login Administrador' : 'Registrarse'}</h2>
                {isLogin ? (
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="correo">Correo:</label>
                            <input
                                type="email"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contraseña">Contraseña:</label>
                            <div className="password-container">
                                <input
                                    type={mostrarContraseña ? 'text' : 'password'}
                                    id="contraseña"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
                                    {mostrarContraseña ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>
                        <button type="submit">Entrar</button>
                        <p id="registro-enlace">
                            ¿No tienes cuenta?{' '}
                            <span id="registrarse" onClick={() => setIsLogin(false)}>
                                Registrarse
                            </span>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correoRegistro">Correo:</label>
                            <input
                                type="email"
                                id="correoRegistro"
                                value={correoRegistro}
                                onChange={(e) => setCorreoRegistro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <IntlTelInput
                                containerClassName="intl-tel-input"
                                inputClassName="form-control"
                                onPhoneNumberChange={handlePhoneChange}
                                defaultCountry="mx"
                                placeholder="Introduce tu número"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contraseñaRegistro">Contraseña:</label>
                            <div className="password-container">
                                <input
                                    type={mostrarContraseñaRegistro ? 'text' : 'password'}
                                    id="contraseñaRegistro"
                                    value={contraseñaRegistro}
                                    onChange={(e) => setContraseñaRegistro(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={togglePasswordVisibilityRegistro}>
                                    {mostrarContraseñaRegistro ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                            <div className="password-container">
                                <input
                                    type={mostrarConfirmarContraseña ? 'text' : 'password'}
                                    id="confirmarContraseña"
                                    value={confirmarContraseña}
                                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={toggleConfirmarPasswordVisibility}>
                                    {mostrarConfirmarContraseña ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>
                        <button type="submit">Registrar</button>
                        <p id="registro-enlace">
                            ¿Ya tienes cuenta?{' '}
                            <span id="registrarse" onClick={() => setIsLogin(true)}>
                                Iniciar sesión
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;

