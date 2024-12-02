<?php
// Incluir la conexión a la base de datos desde db.php
require 'db.php';

try {
    // Crear una nueva instancia de PDO para la conexión a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Establecer el modo de error de PDO a excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Establecer el juego de caracteres en UTF-8 para manejar correctamente los caracteres especiales
    $pdo->exec("set names utf8");
    
    // Si la conexión es exitosa, se puede usar la variable $pdo para interactuar con la base de datos
} catch (PDOException $e) {
    // Si ocurre un error de conexión, mostrar el mensaje de error
    echo 'Error de conexión: ' . $e->getMessage();
    exit;
}
?>
