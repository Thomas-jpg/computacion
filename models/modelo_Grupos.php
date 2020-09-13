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
            $sql="SELECT g.Id_grupo,g.Capacidad, d.Nombre_Docente, d.Apellido_P, d.Apellido_M, m.Nombre ,a.Nombre_Aula FROM grupos g, docente d, materias m ,aulas a WHERE m.Matricula_Materia=g.Matricula_Materia AND g.Id_Docente=d.Id_Docente AND g.Aula = a.Id_Aula";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataGrupos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataGrupos;
        }
        function EliminarGrupo($id){
            $dataEliminado=array();
            //eliminamos todos los alumnos que permanezcan al grupo
            $sql="DELETE FROM grupo_alumno WHERE Id_grupo = '$id'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                //eliminos el grupo
                $sql2="DELETE FROM grupos WHERE Id_grupo='$id'";
                $resultado=$this->conexion->conexion->query($sql2);

                $dataEliminado=array('tipo'=>'correcto',
                'mensaje' =>'Grupo Eliminado Correctamente.');
            }else{
                $dataEliminado=array('tipo'=>'error',
                'mensaje'=>'Ocurrió un error, intentelo más tarde.');
            }
            return $dataEliminado;
        }

        function InfoGruposAlumnos($id){
            $dataGrupos=array();
            //obtenemos la informacion de los grupos disponibles
            $sql="SELECT alumno.Matricula_Alumno,alumno.Nombre,alumno.Apellido_P,alumno.Apellido_M FROM alumno,grupo_alumno WHERE alumno.Matricula_Alumno=grupo_alumno.Matricula_Alumno AND grupo_alumno.Id_grupo='$id'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataGrupos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataGrupos;
        }

        function EliminarAlumnoGrupo($matricula){
            $dataEliminado=array();
            $sql="DELETE FROM grupo_alumno WHERE Matricula_Alumno = '$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                $dataEliminado=array('tipo'=>'correcto',
                'mensaje' =>'Alumno Eliminado Correctamente.');
            }else{
                $dataEliminado=array('tipo'=>'error',
                'mensaje'=>'Ocurrió un error, intentelo más tarde.');
            }
            return $dataEliminado;
        }

        function AgregarGrupo($idGrupo,$materia,$docente,$aula,$capacidad){
            $dataAgregado=array();
            $sql="INSERT INTO grupos (Id_grupo,Matricula_Materia,Id_Docente,Aula,Capacidad) VALUES ('$idGrupo','$materia','$docente','$aula','$capacidad')";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataAgregado=array('tipo'=>'correcto', 'mensaje'=> 'Grupo Agregado Correctamente.');
            }else{
                $dataAgregado=array('tipo'=>'error', 'mensaje' =>'Ocurrió un error, intentelo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataAgregado;
        }

        function AgregarAlumnoGrupo($grupo,$matricula){
            $dataAlumno=array();
            $sql="INSERT INTO grupo_alumno(Id_grupo,Matricula_Alumno) VALUES ('$grupo','$matricula')";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                $dataAlumno=array('tipo'=>'correcto', 'mensaje'=> 'El alumno fue agregado correctamente al grupo.');
            }else{
                $dataAlumno=array('tipo'=>'error', 'mensaje'=> 'Ocurrió un error, intentelo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataAlumno;
        }
    }
?>