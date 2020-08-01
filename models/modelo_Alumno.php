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
            $sql="SELECT Matricula_Alumno, Nombre, Apellido_P,Apellido_M, Anio_Ingreso,Semestre_Actual,Curp FROM alumno";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataAlumnos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataAlumnos;
        }
        function EliminarAlumno($matricula){
            $dataEliminado=array();
            //eliminamos al alumno mediante su matricula o clave unica
            $sql="DELETE FROM alumno WHERE Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataEliminado=array('tipo'=>'correcto','mensaje'=>'Alumno Eliminado Correctamente.');
            }else{
                $dataEliminado=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            return $dataEliminado;
        }
        function ActualizarAlumno($matricula,$nombre,$apellidoP,$apellidoM,$curp,$semestreA){
            $dataActualizado=array();
            $sql="UPDATE alumno SET Matricula_Alumno='$matricula', Nombre='$nombre', Apellido_P='$apellidoP', Apellido_M='$apellidoM',Curp='$curp',Semestre_Actual='$semestreA' WHERE Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataActualizado=array('tipo'=>'correcto','mensaje'=>'El alumno '.$nombre.' se actualizó correctamente.');
            }else{
                $dataActualizado=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            return $dataActualizado;
        }
    }


?>