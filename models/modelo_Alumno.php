<?php
    class Modelo_Alumno{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        }
        function InfoAlumnos(){
            $dataAlumnos=array();
            // realizamos la peticion de todos los alumnos disponibles
            $sql="SELECT Matricula_Alumno, Nombre, Apellido_P,Apellido_M, Anio_Ingreso,Semestre_Actual FROM alumno";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataAlumnos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataAlumnos;
        }
    }


?>