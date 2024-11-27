<?php
header('Content-Type: application/json');
include 'dbConnection.php';

$id = $_GET['id'];

if ($id) {
    try {
        $query = $conn->prepare("DELETE FROM ventas WHERE Id = :Id");
        $query->bindParam(':Id', $id);
        $query->execute();

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al eliminar la venta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'ID no válido']);
}
?>
