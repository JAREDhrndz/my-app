<?php
header('Content-Type: application/json');

require 'db.php'; // Se incluye la conexión desde db.php

$query = "SELECT * FROM proveedores";
$result = $conexion->query($query);

$proveedores = [];
while ($row = $result->fetch_assoc()) {
    $proveedores[] = $row;
}

echo json_encode($proveedores);

$conexion->close();
?>
