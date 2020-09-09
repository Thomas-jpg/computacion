<?php
    class Modelo_Grupos{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion= new Conexion();
            $this->conexion->conectar();
        }
        function InfoGrupos(){
            $dataGrupos=array();
            //obtenemos la informacion de los grupos disponibles
            $sql="SELECT g.Id_grupo, g.Aula, g.Capacidad, d.Nombre_Docente, d.Apellido_P, d.Apellido_M, m.Nombre FROM grupos g, docente d, materias m WHERE m.Matricula_Materia=g.Matricula_Materia AND g.Id_Docente=d.Id_Docente";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataGrupos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataGrupos;
        }
    }
?>