<?php
    class Modelo_Docentes{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        }

        function InfoDocentes(){
            $dataDocentes=array();
            // obtenemos la informacion de los docentes
            $sql="SELECT Id_Docente,Nombre_Docente, Apellido_P, Apellido_M FROM docente";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataDocentes["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataDocentes;
        }
    }
?>