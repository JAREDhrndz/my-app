<?php
header('Content-Type: application/json');
include 'dbConnection.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents("php://input"), true);

if ($data && $id) {
    try {
        $query = $conn->prepare("UPDATE ventas SET 
                                    Descripcion = :Descripcion,
                                    Tipo_de_Pago = :Tipo_de_Pago,
                                    Total_pagado = :Total_pagado,
                                    Fecha = :Fecha,
                                    Num_usuario = :Num_usuario,
                                    Id_proveedor_servicio = :Id_proveedor_servicio,
                                    Num_empleado = :Num_empleado
                                WHERE Id = :Id");
        $query->bindParam(':Descripcion', $data['Descripcion']);
        $query->bindParam(':Tipo_de_Pago', $data['Tipo_de_Pago']);
        $query->bindParam(':Total_pagado', $data['Total_pagado']);
        $query->bindParam(':Fecha', $data['Fecha']);
        $query->bindParam(':Num_usuario', $data['Num_usuario']);
        $query->bindParam(':Id_proveedor_servicio', $data['Id_proveedor_servicio']);
        $query->bindParam(':Num_empleado', $data['Num_empleado']);
        $query->bindParam(':Id', $id);
        $query->execute();

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al actualizar la venta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Datos no válidos o ID faltante']);
}
?>
