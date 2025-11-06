<?php
// Requerimos el archivo modelos.php
require_once 'modelos.php';

// Si hay parámetro tabla
if (isset($_GET['tabla'])) {
    $tabla = new Modelo($_GET['tabla']); // Creamos el objeto tabla

    // Si hay parámetro id
    if (isset($_GET['id'])) {
        $tabla->setCriterio("id=" . $_GET['id']);
    }

    // Si hay parámetro acción
    if (isset($_GET['accion']))
        $accion = $_GET['accion'];

        if ($accion === 'insertar' || $accion === 'actualizar' || $accion === 'registrar') {
            $valores = $_POST; // Guardamos los valores que vienen desde el formulario
        }

        // --- Subida de imágenes (no se toca) ---
        if (
            isset($_FILES) &&
            isset($_FILES['imagen']) &&
            !empty($_FILES['imagen']['name']) &&
            !empty($_FILES['imagen']['tmp_name'])
        ) {
            if (is_uploaded_file($_FILES['imagen']['tmp_name'])) {
                $nombre_temporal = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagenes/productos/' . $nombre;

                if (move_uploaded_file($nombre_temporal, $destino)) {
                    $mensaje = 'Archivo subido correctamente a ' . $destino;
                    $valores['imagen'] = $nombre;
                } else {
                    $mensaje = 'No se ha podido subir el archivo';
                    unlink(ini_get('upload_tmp_dir') . $nombre_temporal);
                }
            } else {
                $mensaje = 'Error: El archivo no fue procesado correctamente';
            }
        }

    // --- Acciones ---
    switch ($accion) {
        case 'seleccionar':
            $datos = $tabla->seleccionar();
            echo json_encode($datos) ;
            break;

        case 'insertar':
            $pedido_id = $tabla->insertar($valores);
            if ($pedido_id > 0) {
                $response = [
                    'success' => true,
                    'message' => 'Pedido insertado correctamente.',
                    'pedido_id' => $pedido_id
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Error al insertar el pedido.'
                ];
            }
            echo json_encode($response);
            break;

        case 'actualizar':
            $tabla->actualizar($valores);
            $mensaje = "Datos actualizados";
            echo json_encode($mensaje);
            break;

        case 'eliminar':
            $tabla->eliminar();
            $mensaje = "Dato eliminado";
            echo json_encode($mensaje);
            break;

        // 🔹 NUEVA ACCIÓN: REGISTRAR CLIENTE (sin hash)
        case 'registrar':
            // Validar que los campos necesarios existan
            if (
                isset($valores['usuario']) && !empty($valores['usuario']) &&
                isset($valores['password']) && !empty($valores['password'])
            ) {
                // Insertamos el cliente directamente
                $insertado = $tabla->insertar($valores);

                if ($insertado > 0) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'Cliente registrado correctamente.'
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Error al registrar el cliente.'
                    ]);
                }
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Faltan datos obligatorios.'
                ]);
            }
            break;
    }
}
?>