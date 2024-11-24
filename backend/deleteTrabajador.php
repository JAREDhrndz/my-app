<?php
// Incluir la conexión a la base de datos
include('db.php');

// Configuración del tipo de contenido
header('Content-Type: application/json');

// Obtener el ID del trabajador desde POST
$id = $_POST['id'];

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "No se proporcionó un ID válido"]);
    exit;
}

try {
    // Consulta para eliminar el trabajador
    $query = "DELETE FROM trabajadores WHERE Numero_empleado = :id";
    $stmt = $pdo->prepare($query);
    
    // Vincular el parámetro :id con el valor de $id
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Trabajador eliminado correctamente"]);
        } else {
            echo json_encode(["status" => "error", "message" => "No se encontró el trabajador"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error al eliminar trabajador"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
