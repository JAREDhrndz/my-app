<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'canesaa';
$username = 'root';
$password = '';

try {
    // Crear una conexión PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si se recibieron datos por POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtener los datos enviados desde el frontend
        $nombre = $_POST['nombre'] ?? '';
        $telefono = $_POST['telefono'] ?? '';
        $descripcion = $_POST['descripcion'] ?? '';
        $servicio = $_POST['servicio'] ?? '';

        // Validar que los datos no estén vacíos
        if (!empty($nombre) && !empty($telefono) && !empty($descripcion) && !empty($servicio)) {
            // Preparar la consulta SQL
            $sql = "INSERT INTO registro_cita (nombre, telefono, descripcion, servicio_id) 
                    VALUES (:nombre, :telefono, :descripcion, :servicio)";
            $stmt = $conn->prepare($sql);

            // Asignar los valores
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':telefono', $telefono);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':servicio', $servicio);

            // Ejecutar la consulta
            $stmt->execute();

            // Respuesta al frontend
            echo "Cita registrada exitosamente.";
        } else {
            echo "Error: Todos los campos son obligatorios.";
        }
    } else {
        echo "Error: Método no permitido.";
    }
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error en la conexión: " . $e->getMessage();
}
?>
