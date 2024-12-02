<?php
header('Content-Type: application/json');

require 'db.php'; // Incluye la conexión a la base de datos

try {
    $stmt = $pdo->query("SELECT Numero_empleado, Nombre, Cargo, Telefono, Correo_Electronico FROM trabajadores");
    $trabajadores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($trabajadores);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

