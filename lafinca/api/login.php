<?php
require_once 'modelos.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if ($usuario === '' || $password === '') {
        echo json_encode(["success" => false, "message" => "Debe completar usuario y contraseña."]);
        exit;
    }

    $usuarios = new Modelo('clientes');
    $usuarios->setCriterio("usuario='$usuario' AND password='$password'");
    $datos = $usuarios->seleccionar();

    if (isset($datos['success']) && $datos['success'] === false) {
        // Error SQL
        echo json_encode($datos);
        exit;
    }

    if (!empty($datos)) {
        echo json_encode([
            "success" => true,
            "usuario" => $datos[0]['usuario'],
            "id" => $datos[0]['id']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>