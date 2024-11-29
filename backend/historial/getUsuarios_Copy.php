<?php
require 'db.php';

try {
    $query = $pdo->query("SELECT * FROM usuarios_copia");
    $usuarios = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
