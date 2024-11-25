<?php
header('Content-Type: application/json');
include 'dbConnection.php'; // Archivo que gestiona la conexión a la base de datos

try {
    $query = $conn->prepare("SELECT * FROM ventas");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener las ventas: ' . $e->getMessage()]);
}
?>
