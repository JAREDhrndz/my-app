<?php
// Obtener el cuerpo de la solicitud (JSON)
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si los datos están siendo recibidos correctamente
if (isset($data['correo_electronico']) && isset($data['contraseña'])) {
    $correo = $data['correo_electronico'];
    $contraseña = $data['contraseña'];

    $host = 'localhost'; 
    $user = 'root'; 
    $password = ''; 
    $dbname = 'canesa'; 

    // Crear conexión
    $conn = new mysqli($host, $user, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Consulta SQL para obtener el tipo de usuario
    $sql = "SELECT Tipo_usuario FROM usuarios WHERE Correo_Electronico = ? AND Contraseña = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $correo, $contraseña);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica si se encontró el usuario
    if ($result->num_rows > 0) {
        // Obtener el tipo de usuario
        $row = $result->fetch_assoc();
        $tipo_usuario = $row['Tipo_usuario'];

        // Respuesta de éxito con tipo de usuario
        echo json_encode([
            "status" => "success",
            "mensaje" => "Login exitoso",
            "tipo_usuario" => $tipo_usuario  // Incluir el tipo de usuario
        ]);
    } else {
        // Si no se encuentra el usuario, devolver un error
        echo json_encode([
            "status" => "error",
            "mensaje" => "Correo o contraseña incorrectos"
        ]);
    }

    // Cerrar conexión
    $conn->close();
} else {
    // Si faltan los parámetros, devuelves un mensaje de error
    echo json_encode([
        "status" => "error",
        "mensaje" => "Faltan parámetros de correo o contraseña"
    ]);
}
?>
