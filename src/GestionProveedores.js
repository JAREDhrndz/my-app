import React, { useState, useEffect } from 'react';
import './formularios.css';
import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png';

const GestionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [filteredProveedores, setFilteredProveedores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('Nombre');
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        correo_electronico: '',
        telefono: '',
        detalles: '',
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        document.body.classList.add('gestion-proveedores');
        return () => {
            document.body.classList.remove('gestion-proveedores');
        };
    }, []);
    
    const fetchProveedores = async () => {
        try {
            const response = await fetch('http://canesa.shop/backend/getProveedores.php');
            if (!response.ok) throw new Error('Error al obtener los proveedores');
            const data = await response.json();
            setProveedores(data);
            setFilteredProveedores(data); // Al principio mostramos todos los proveedores
        } catch (error) {
            console.error('Error fetching proveedores:', error);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = proveedores.filter(proveedor =>
            proveedor[selectedField].toString().toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProveedores(filtered);
    };

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, nombre, correo_electronico, telefono, detalles } = formData;

        try {
            const url = id
                ? 'http://canesa.shop/backend/updateProveedor.php'
                : 'http://canesa.shop/backend/addProveedor.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id, nombre, correo_electronico, telefono, detalles }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchProveedores();
                setShowForm(false);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ id: '', nombre: '', correo_electronico: '', telefono: '', detalles: '' });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://canesa.shop/backend/deleteProveedor.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id }),
            });

            const result = await response.json();
            if (result.status === "success") fetchProveedores();
            else console.error('Error eliminando proveedor:', result.message);
        } catch (error) {
            console.error('Error eliminando proveedor:', error);
        }
    };

    return (
        <>
            <div className="background-container1"></div>
            <h1 id="titulo-proveedores" className="title">PROVEEDORES</h1>

            <div className="search-container">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
                            </div>
                            <div className="search-options">
                                <span className="search-label">Buscar por:</span>
                                <select
                                    value={selectedField}
                                    onChange={handleFieldChange}
                                    className="search-select"
                                >
                                    <option value="Nombre">Nombre</option>
                                    <option value="Correo_Electronico">Correo Electrónico</option>
                                    <option value="Telefono">Teléfono</option>
                                    <option value="Detalles">Detalles</option>
                                    <option value="N_proveedor">ID</option>
                                </select>
                            </div>
                        </div>


            <div id="gestion-proveedores" className="container">
                {!showForm ? (
                    <>
                        <div className="btn-container"> 
                        <button className="btn-add" onClick={() => setShowForm(true)}>
                            <span className="icon icon-1"></span>
                            <span className="gradient-insert"></span>
                            <span className="gradient-insert2"></span>
                            <span className="insert-background"></span>
                            <span className="button-insert">Insertar Trabajador</span>
                        </button>
                        </div>

                        <table className="table-general">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo Electrónico</th>
                                    <th>Teléfono</th>
                                    <th>Detalles</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(filteredProveedores) && filteredProveedores.length > 0 ? (
                                    filteredProveedores.map((proveedor) => (
                                        <tr key={proveedor.N_proveedor}>
                                            <td>{proveedor.N_proveedor}</td>
                                            <td>{proveedor.Nombre}</td>
                                            <td>{proveedor.Correo_Electronico}</td>
                                            <td>{proveedor.Telefono}</td>
                                            <td>{proveedor.Detalles}</td>
                                            <td>
                                                <div className="btn-actions">
                                                    <button
                                                        className="btn-icon"
                                                        onClick={() => {
                                                            setFormData({
                                                                id: proveedor.N_proveedor,
                                                                nombre: proveedor.Nombre,
                                                                correo_electronico: proveedor.Correo_Electronico,
                                                                telefono: proveedor.Telefono,
                                                                detalles: proveedor.Detalles,
                                                            });
                                                            setShowForm(true);
                                                        }}
                                                    >
                                        <img src={editIcon} alt="Editar" />
                                        </button><button
                                        className="btn-icon"
                                        onClick={() => {
                                            if (window.confirm("¿Estás seguro que quieres eliminar este registro?")) {
                                                handleDelete(proveedor.N_proveedor);
                                            }
                                        }}
                                    >
                                        <img src={deleteIcon} alt="Eliminar" />
                                    </button>



                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No se encontraron proveedores</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="form-add-update">
                        <h2 className="titulo-form">{formData.id ? 'Actualizar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="nombre">Nombre del proveedor:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                            <label htmlFor="correo_electronico">Correo Electrónico:</label>
                            <input
                                type="email"
                                name="correo_electronico"
                                value={formData.correo_electronico}
                                onChange={handleChange}
                                placeholder="Correo Electrónico"
                                required
                            />
                            <label htmlFor="telefono">Teléfono:</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                required
                            />
                            <label htmlFor="detalles">Detalles:</label>
                            <input
                                type="text"
                                name="detalles"
                                value={formData.detalles}
                                onChange={handleChange}
                                placeholder="Detalles"
                                required
                            />
                            <div className="btn-container-form">
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn-update">
                                        <span className="icon icon-1"></span>
                                        <span className="gradient-update"></span>
                                        <span className="gradient-update2"></span>
                                        <span className="insert-background"></span>
                                        <span className="button-update">{formData.id ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</span>
                                </button>
                            </form>


                                <button type="button" className="btn-add" onClick={() => setShowForm(false)}>
                                    <span className="icon icon-1"></span>
                                    <span className="gradient-back"></span>
                                    <span className="gradient-back2"></span>
                                    <span className="insert-background"></span>
                                    <span className="button-back">Regresar a la lista</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default GestionProveedores;
