<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "canesa";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['nombre'], $data['descripcion'], $data['costo'])) {
    $id = $data['id'];
    $nombre = $conn->real_escape_string($data['nombre']);
    $descripcion = $conn->real_escape_string($data['descripcion']);
    $costo = $conn->real_escape_string($data['costo']);

    $sql = "UPDATE servicios SET Nombre = '$nombre', Descripcion = '$descripcion', Costo = '$costo' WHERE Id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Servicio actualizado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
}

$conn->close();
?>

