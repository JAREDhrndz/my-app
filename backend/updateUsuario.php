<?php
include 'conexionBD.php';

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $inputData = json_decode(file_get_contents('php://input'), true); // Obtener datos JSON enviados
    $numUsuario = $_GET['numUsuario'];

    if ($numUsuario && $inputData) {
        try {
            $stmt = $pdo->prepare("UPDATE usuarios SET Nombre = :nombre, Correo_Electronico = :correo, Telefono = :telefono, Direccion = :direccion, Tipo_usuario = :tipoUsuario, Contraseña = :contraseña WHERE Num_Usuario = :numUsuario");
            $stmt->bindParam(':nombre', $inputData['Nombre']);
            $stmt->bindParam(':correo', $inputData['Correo_Electronico']);
            $stmt->bindParam(':telefono', $inputData['Telefono']);
            $stmt->bindParam(':direccion', $inputData['Direccion']);
            $stmt->bindParam(':tipoUsuario', $inputData['Tipo_usuario']);
            $stmt->bindParam(':contraseña', $inputData['Contraseña']); // Asegúrate de encriptar la contraseña antes de guardarla
            $stmt->bindParam(':numUsuario', $numUsuario);

            $stmt->execute();
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
?>
