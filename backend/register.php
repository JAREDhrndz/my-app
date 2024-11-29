<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "canesa";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'];
$correo = $data['correo'];
$contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT); // Encriptación de la contraseña
$telefono = $data['telefono'];
$direccion = $data['direccion'];

// Validar los datos, y realizar el registro en la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "INSERT INTO usuarios (nombre, correo_electronico, contraseña, telefono, direccion) VALUES ('$nombre', '$correo', '$contraseña', '$telefono', '$direccion')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "mensaje" => "Usuario registrado correctamente"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al registrar el usuario: " . $conn->error]);
}

$conn->close();
?>
