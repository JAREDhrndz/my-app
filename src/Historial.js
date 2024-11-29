import React, { useState, useEffect } from 'react';
import './Historial.css';

const HistoricoMenu = () => {
  const [data, setData] = useState({
    usuarios: [],
    proveedores: [],
    proveedorServicio: [],
    servicios: [],
    trabajadores: [],
    ventas: [],
    citas: [],
  });
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.all([
        fetch('http://localhost/backend/historial/getUsuarios_Copy.php'),
        fetch('http://localhost/backend/historial/getProveedorServicio_Copy.php'),
        fetch('http://localhost/backend/historial/getProveedores_Copy.php'),
        fetch('http://localhost/backend/historial/getVentas_Copy.php'),
        fetch('http://localhost/backend/historial/getCitas_Copy.php'),
        fetch('http://localhost/backend/historial/getServicios_Copy.php'),
        fetch('http://localhost/backend/historial/getTrabajadores_Copy.php'),
      ]);
      const data = await Promise.all(responses.map(res => res.json()));
      setData({
        usuarios: data[0],
        proveedorServicio: data[1],
        proveedores: data[2],
        ventas: data[3],
        citas: data[4],
        servicios: data[5],
        trabajadores: data[6],
      });
    };
    fetchData();
  }, []);

  const handleAccordionClick = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const renderTable = (tableData) => (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(tableData[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="menu">
      {Object.keys(data).map((key, index) => (
        <div className={`accordion ${activeAccordion === index ? 'active' : ''}`} key={index}>
          <button className="accordion-header" onClick={() => handleAccordionClick(index)}>
            {key.replace(/_/g, ' ')}
          </button>
          <div className="accordion-content">
            {renderTable(data[key])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricoMenu;
