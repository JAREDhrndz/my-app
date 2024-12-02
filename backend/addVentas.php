<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    try {
        $query = $conn->prepare("INSERT INTO ventas (Descripcion, Tipo_de_Pago, Total_pagado, Fecha, Num_usuario, Id_proveedor_servicio, Num_empleado) 
                                VALUES (:Descripcion, :Tipo_de_Pago, :Total_pagado, :Fecha, :Num_usuario, :Id_proveedor_servicio, :Num_empleado)");
        $query->bindParam(':Descripcion', $data['Descripcion']);
        $query->bindParam(':Tipo_de_Pago', $data['Tipo_de_Pago']);
        $query->bindParam(':Total_pagado', $data['Total_pagado']);
        $query->bindParam(':Fecha', $data['Fecha']);
        $query->bindParam(':Num_usuario', $data['Num_usuario']);
        $query->bindParam(':Id_proveedor_servicio', $data['Id_proveedor_servicio']);
        $query->bindParam(':Num_empleado', $data['Num_empleado']);
        $query->execute();

        $data['Id'] = $conn->lastInsertId(); // Agrega el ID generado
        echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al insertar la venta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Datos no válidos']);
}
?>
