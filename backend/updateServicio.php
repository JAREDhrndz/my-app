<?php
header('Content-Type: application/json');
require 'db.php'; // Conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $putData);

    $id = $putData['id'];
    $nombre = $putData['nombre'];
    $descripcion = $putData['descripcion'];
    $costo = $putData['costo'];

    try {
        $query = $pdo->prepare("UPDATE servicios SET Nombre = ?, Descripcion = ?, Costo = ? WHERE Id = ?");
        $query->execute([$nombre, $descripcion, $costo, $id]);

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>
