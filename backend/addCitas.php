<?php
require 'db.php'; 

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$descripcion = $_POST['descripcion'];
$servicio = $_POST['servicio'];
$fecha = $_POST['fecha'];
$estado = $_POST['estado'];
$num_usuario = $_POST['num_usuario'];

// Preparar la consulta SQL
$sql = "INSERT INTO citas (Estado, Fecha, Num_usuario, servicios_id, descripcion) 
        VALUES ('$estado', '$fecha', '$num_usuario', '$servicio', '$descripcion')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Nueva cita registrada con éxito";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
