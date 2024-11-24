<?php
// Incluir la conexión a la base de datos
include('db.php');

// Configuración del tipo de contenido
header('Content-Type: application/json');

// Obtener los datos del proveedor desde POST
$nombre = $_POST['nombre'];
$correo_electronico = $_POST['correo_electronico'];
$telefono = $_POST['telefono'];
$detalles = $_POST['detalles'];

// Comprobación de que todos los campos están presentes
if (empty($nombre) || empty($correo_electronico) || empty($telefono) || empty($detalles)) {
    echo json_encode(["status" => "error", "message" => "Faltan campos requeridos"]);
    exit;
}

try {
    // Consulta para insertar un nuevo proveedor
    $query = "INSERT INTO proveedores (Nombre, Correo_Electronico, Telefono, Detalles) VALUES (:nombre, :correo_electronico, :telefono, :detalles)";
    $stmt = $pdo->prepare($query);

    // Vincular los parámetros
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':correo_electronico', $correo_electronico, PDO::PARAM_STR);
    $stmt->bindParam(':telefono', $telefono, PDO::PARAM_STR);
    $stmt->bindParam(':detalles', $detalles, PDO::PARAM_STR);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Proveedor agregado exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al agregar proveedor"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
