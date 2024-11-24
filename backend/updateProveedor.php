<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $correo_electronico = $_POST['correo_electronico'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $detalles = $_POST['detalles'] ?? '';

    try {
        $stmt = $pdo->prepare("UPDATE proveedores SET Nombre = ?, Correo_Electronico = ?, Telefono = ?, Detalles = ? WHERE N_proveedor = ?");
        $stmt->execute([$nombre, $correo_electronico, $telefono, $detalles, $id]);
        echo json_encode(['status' => 'success', 'message' => 'Proveedor actualizado correctamente']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar proveedor: ' . $e->getMessage()]);
    }
}
?>
