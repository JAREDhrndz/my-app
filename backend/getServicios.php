<?php
require 'db.php';

try {
    $pdo = require 'db.php';
    $query = $pdo->query("SELECT * FROM usuarios");
    $usuarios = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
