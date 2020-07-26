<?php
    class Conexion{
        private $servidor;
        private $usuario;
        private $contrasena;
        private $bd;
        public $conexion;

    public function __construct(){
        $this->servidor="localhost";
        $this->usuario="root";
        $this->contrasena="scrollk25";
        $this->bd="escuela_de_ciencias";
    }

    function conectar(){
        $this->conexion= new mysqli(
            $this->servidor,
            $this->usuario,
            $this->contrasena,
            $this->bd);
        $this->conexion->set_charset("utf8");    
    }

    function cerrar(){
        $this->conexion->close();
    }
}

?>