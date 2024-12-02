<?php
header('Content-Type: application/json');

// Incluir la conexión desde db.php
require 'db.php'; // Aquí se incluirá la conexión a la base de datos

// Leer los datos en formato JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar si los datos necesarios están presentes
if (!isset($data['Nombre'], $data['Correo_Electronico'], $data['Telefono'], $data['Direccion'], $data['Tipo_usuario'], $data['Contraseña'])) {
    echo json_encode(["status" => "error", "message" => "Faltan datos"]);
    exit;
}

// Preparar la consulta SQL
$query = "INSERT INTO usuarios (Nombre, Correo_Electronico, Telefono, Direccion, Tipo_usuario, Contraseña) 
          VALUES (?, ?, ?, ?, ?, ?)";

// Preparar la declaración
$stmt = $conexion->prepare($query);
$stmt->bind_param("ssssss", $data['Nombre'], $data['Correo_Electronico'], $data['Telefono'], $data['Direccion'], $data['Tipo_usuario'], $data['Contraseña']);

// Ejecutar la consulta y devolver el resultado
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Usuario agregado exitosamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al agregar usuario"]);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
