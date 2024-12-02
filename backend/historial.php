<?php
header('Content-Type: application/json');

// Incluir la configuración de la conexión a la base de datos
require 'db.php';  // Este archivo ahora maneja la conexión a la base de datos

// Obtener la tabla de la URL
$table = isset($_GET['table']) ? $_GET['table'] : '';
$allowedTables = ['proveedores', 'trabajadores', 'ventas', 'servicios', 'clientes'];

if (!in_array($table, $allowedTables)) {
    echo json_encode(['error' => 'Tabla no permitida']);
    exit;
}

// Consulta a la base de datos
try {
    $stmt = $pdo->prepare("SELECT fecha, accion, detalles FROM $table");
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($records);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
}
?>
