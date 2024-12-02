<?php
header('Content-Type: application/json');
require 'db.php'; // Incluir la conexión de base de datos

$id_servicio = $_POST['id']; // Asegúrate de que el parámetro se llame 'id' en la solicitud POST
error_log("ID recibido para eliminar: " . $id_servicio);  // Agrega esto para verificar el ID

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("DELETE FROM servicios WHERE Id = ?");
    $stmt->execute([$id_servicio]);

    error_log("Consulta ejecutada con éxito para eliminar el servicio.");  // Verifica si la consulta es exitosa

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    error_log("Error al eliminar el servicio: " . $e->getMessage());  // Agrega esto para ver si hay algún error
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
