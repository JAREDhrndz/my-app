<?php
header('Content-Type: application/json');

// Incluye db.php, que devuelve un objeto PDO
$pdo = include 'db.php';

if (!$pdo) {
    echo json_encode(['error' => 'No se pudo establecer la conexión a la base de datos.']);
    exit;
}

// Obtener el correo electrónico desde la solicitud GET
if (isset($_GET['correo'])) {
    $correo = $_GET['correo'];

    try {
        // Buscar al usuario por correo electrónico
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE Correo_Electronico = :correo");
        $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
        $stmt->execute();
        
        // Obtener los datos del usuario
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            // Incluir tanto el ID como el Nombre en la respuesta JSON
            echo json_encode([
                'Num_Usuario' => $usuario['Num_Usuario'],
                'Nombre' => $usuario['Nombre'] // Aquí se agrega el Nombre
            ]);
        } else {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Correo electrónico no proporcionado']);
}
?>
