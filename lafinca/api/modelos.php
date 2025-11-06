<?php 
require_once 'config.php';

class Conexion {
    protected $db;

    public function __construct() {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($this->db->connect_errno) {
            die(json_encode([
                "success" => false,
                "message" => "Error de conexión a la base de datos: " . $this->db->connect_error
            ]));
        }
        $this->db->set_charset(DB_CHARSET);
        $this->db->query("SET NAMES 'utf8'");
    }
}

class Modelo extends Conexion {
    private $tabla;
    private $id = 0;
    private $criterio = '';
    private $campos = '*';
    private $orden = 'id';
    private $limite = 0;
    
    public function __construct($tabla) {
        parent::__construct();
        $this->tabla = $tabla;
    }

    public function setId($id) { $this->id = $id; }
    public function setCriterio($criterio) { $this->criterio = $criterio; }
    public function setCampos($campos) { $this->campos = $campos; }
    public function setOrden($orden) { $this->orden = $orden; }
    public function setLimite($limite) { $this->limite = $limite; }

    /** 🔍 Seleccionar registros */
    public function seleccionar() {
        $sql = "SELECT $this->campos FROM $this->tabla";
        if ($this->criterio != '') $sql .= " WHERE $this->criterio";
        $sql .= " ORDER BY $this->orden";
        if ($this->limite > 0) $sql .= " LIMIT $this->limite";

        $resultado = $this->db->query($sql);

        if (!$resultado) {
            return [
                "success" => false,
                "message" => "Error en la consulta: " . $this->db->error
            ];
        }

        // ✅ Ahora devuelve un array asociativo, NO JSON
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function insertar($datos) {
        unset($datos->id);
        $campos = implode(",", array_keys($datos));
        $valores = implode("','", array_values($datos));
        $sql = "INSERT INTO $this->tabla($campos) VALUES('$valores')";
        return $this->db->query($sql) ? $this->db->insert_id : 0;
    }

    public function actualizar($datos) {
        $actualizaciones = [];
        foreach ($datos as $key => $value) {
            $actualizaciones[] = "$key = '$value'";
        }
        $sql = "UPDATE $this->tabla SET " . implode(",", $actualizaciones) . " WHERE $this->criterio";
        $this->db->query($sql);
    }

    public function eliminar() {
        $sql = "DELETE FROM $this->tabla WHERE $this->criterio";
        $this->db->query($sql);
    }
}
?>