import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir
import './servicios.css'; // Asegúrate de tener un archivo de estilos CSS si lo necesitas

const Servicios = () => {
  const servicios = [
    { titulo: "PRELIMINARES", subtitulo: "Subtítulo 1", descripcion: "Descripción breve de los preliminares" },
    { titulo: "CIMENTACIÓN", subtitulo: "Subtítulo 2", descripcion: "Descripción breve de la cimentación" },
    { titulo: "MUROS", subtitulo: "Subtítulo 3", descripcion: "Descripción breve de los muros" },
    { titulo: "CADENAS Y CASTILOS", subtitulo: "Subtítulo 4", descripcion: "Descripción breve de cadenas y castillos" },
    { titulo: "ESTRUCTURA EN LOSAS", subtitulo: "Subtítulo 5", descripcion: "Descripción breve de estructura en losas" },
    { titulo: "RECUBRIMIENTOS", subtitulo: "Subtítulo 6", descripcion: "Descripción breve de recubrimientos" },
    { titulo: "INSTALACIONES", subtitulo: "Subtítulo 7", descripcion: "Descripción breve de instalaciones" },
    { titulo: "ACABADOS", subtitulo: "Subtítulo 8", descripcion: "Descripción breve de acabados" },
  ];

  return (
    <section className="servicios-section">
      <div className="servicios-container">
        {servicios.map((servicio, index) => (
          <div key={index} className="servicio-cuadro">
            <div className="servicio-header">
              <h3>{servicio.titulo}</h3>
              <p className="subtitulo">{servicio.subtitulo}</p>
            </div>
            <p className="descripcion">{servicio.descripcion}</p>
            <Link to="/citas" className="btn-contratar">Contratar ➜</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
