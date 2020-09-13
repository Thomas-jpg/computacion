<?php 
    class Modelo_Helpers{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        }
        //funcion para obtener materias en general
        function Materias(){
            $arreglo=array();
            $sql="SELECT Matricula_Materia, Nombre FROM materias";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($materias = mysqli_fetch_assoc($consulta)){
                    $arreglo[]=$materias;
                }
                $this->conexion->cerrar();
            }
            return $arreglo;
        }
        //funcion para obtener solo las aulas disponibles
        function AulasDisp(){
            $aulas= array();
            $sql="SELECT Id_Aula, Nombre_Aula FROM aulas WHERE Disponible = 1";
            $consulta= $this->conexion->conexion->query($sql);
            if($consulta){
                while($aula = mysqli_fetch_assoc($consulta)){
                    $aulas[]=$aula;
                }
                $this->conexion->cerrar();
            }
            return $aulas;
        }
        //funcion para verificar si el alumno existe o ya esta en el grupo
        function VerificarAlumno($matricula, $grupo){
            $alumno=false;
            $dentro=false;
            $dataAlumno= array();
            $sql="SELECT Matricula_Alumno FROM alumno WHERE Matricula_Alumno = '$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta->num_rows > 0) {
                $alumno = true;
                $sql2="SELECT Matricula_Alumno FROM grupo_alumno WHERE Matricula_Alumno='$matricula' AND Id_grupo = '$grupo'";
                $consulta2=$this->conexion->conexion->query($sql2);

                if($consulta2->num_rows > 0 ){
                    $dentro=true;
                }
            }
            $this->conexion->cerrar();
            $dataAlumno=array('alumno' =>$alumno, 'dentro'=>$dentro);

            return $dataAlumno;
        }
    }

?>