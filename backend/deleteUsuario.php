<?php
header('Access-Control-Allow-Origin: *'); // Permitir solicitudes de cualquier origen
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Permitir los métodos GET, POST, PUT y DELETE
header('Access-Control-Allow-Headers: Content-Type'); // Permitir cabeceras como Content-Type

// Incluir la conexión a la base de datos
require 'db.php'; // Esto reemplaza la conexión directa con los datos

if (isset($_GET['Num_usuario'])) {
    $numUsuario = $_GET['Num_usuario'];

    // Realiza la consulta de eliminación usando 'Num_Usuario' como columna
    $query = "DELETE FROM usuarios WHERE Num_Usuario = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $numUsuario);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Usuario eliminado correctamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al eliminar el usuario"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Falta el parámetro Num_usuario"]);
}

$conexion->close();
?>
