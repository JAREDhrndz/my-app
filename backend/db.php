<?php
// Configuración del tipo de contenido
header('Content-Type: application/json');

// Configuración de la conexión
$host = "auth-db1682.hstgr.io";
$username = "u965417688_SuperAdmi";
$password = "p4rf%ES8C9%U@DD";
$dbname = "u965417688_CANESA";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo; // Asegúrate de retornar el objeto PDO
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos: " . $e->getMessage()]);
    exit;
}
?>
