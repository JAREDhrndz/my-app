import React, { useState, useEffect } from 'react';
import './citas.css';

const Citas = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [servicios, setServicios] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [cargando, setCargando] = useState(true); // Estado para indicar si estamos verificando la sesión

  // Llamar a la API para obtener los servicios desde el backend
  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const response = await fetch('http://canesa.shop/backend/getServicios.php');
        if (!response.ok) {
          throw new Error('Error al obtener los servicios');
        }

        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error('Error cargando los servicios:', error);
      }
    };

    cargarServicios();

    // Verificar si el usuario está logeado con los datos de sessionStorage
    const obtenerUsuario = () => {
      const user = sessionStorage.getItem('userID');
      if (user) {
        setUsuarioId(user); // Usuario logeado, establecer ID
        setCargando(false);
      } else {
        setCargando(false);  // Si no está logeado, detener carga
      }
    };

    obtenerUsuario();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert('Debes iniciar sesión para registrar una cita.');
      return;
    }

    const nuevaCita = {
      nombre,
      telefono,
      descripcion,
      servicio,
      fecha,
      estado: 'Pendiente',  // Estado por defecto
      num_usuario: usuarioId,
    };

    console.log('Datos que se enviarán al backend:', nuevaCita);

    // Enviar los datos al backend (PHP)
    const response = await fetch('http://canesa.shop/backend/addCitas.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(nuevaCita).toString(),
    });

    const data = await response.text();
    console.log('Respuesta del servidor:', data);

    // Limpiar los campos después de registrar la cita
    if (data === 'Cita registrada exitosamente') {
      setNombre('');
      setTelefono('');
      setDescripcion('');
      setServicio('');
      setFecha('');
      alert('¡Cita registrada exitosamente!');
    } else {
      alert('Hubo un error al registrar la cita.');
    }
  };

  if (cargando) {
    return <div>Loading...</div>;  // Mostrar "Loading..." mientras se verifica la sesión
  }

  return (
    <div id="citas-container">
      <h2 id="citas-titulo">Registrar Cita</h2>
      <form id="citas-formulario" onSubmit={manejarEnvio}>
        <div id="citas-nombre-container">
          <label id="citas-nombre-label" htmlFor="citas-nombre-input">Nombre:</label>
          <input
            id="citas-nombre-input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div id="citas-telefono-container">
          <label id="citas-telefono-label" htmlFor="citas-telefono-input">Teléfono:</label>
          <input
            id="citas-telefono-input"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div id="citas-descripcion-container">
          <label id="citas-descripcion-label" htmlFor="citas-descripcion-input">Descripción:</label>
          <textarea
            id="citas-descripcion-input"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div id="citas-fecha-container">
          <label id="citas-fecha-label" htmlFor="citas-fecha-input">Fecha y Hora:</label>
          <input
            id="citas-fecha-input"
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div id="citas-servicio-container">
          <label id="citas-servicio-label" htmlFor="citas-servicio-select">Servicio:</label>
          <select
            id="citas-servicio-select"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((serv) => (
              <option key={serv.Id} value={serv.Id}>
                {serv.Nombre}
              </option>
            ))}
          </select>
        </div>
        <button id="citas-boton-registrar" type="submit">Registrar Cita</button>
      </form>
    </div>
  );
};

export default Citas;
