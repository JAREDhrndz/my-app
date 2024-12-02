<?php
header('Content-Type: application/json');

require 'db.php';  // Incluye la conexión a la base de datos

$id_proveedor = $_POST['id']; // Asegúrate de que el parámetro se llame 'id' en la solicitud POST

try {
    // Asegúrate de que la tabla y el campo sean correctos (aquí uso N_proveedor)
    $stmt = $pdo->prepare("DELETE FROM proveedores WHERE N_proveedor = ?");
    $stmt->execute([$id_proveedor]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>


