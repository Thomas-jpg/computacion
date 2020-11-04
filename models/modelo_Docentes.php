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

        function RegistrarDocente($nombre,$apellidoP,$apellidoM){
            $dataRegistroDocente=array();
            //ingresamos los datos a la tabla
            $sql="INSERT INTO docente(Id_Docente,Nombre_Docente,Apellido_P,Apellido_M,Licenciatura) VALUES(null,'$nombre','$apellidoP','$apellidoM','COMPUTACIÓN')";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataRegistroDocente=array('tipo'=>'correcto','mensaje'=>'El docente fue agregado correctamente.');
            }else{
                $dataRegistroDocente=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataRegistroDocente;
        }

        function ActualizarDocente($id_docente,$nombre,$apellidoP,$apellidoM){
            $dataEditarDocente=array();
            //ingresamos los datos a la tabla
            $sql = "UPDATE docente SET Nombre_Docente='$nombre',Apellido_P='$apellidoP',Apellido_M='$apellidoM',Licenciatura='COMPUTACIÓN' WHERE Id_Docente = '$id_docente'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataEditarDocente=array('tipo'=>'correcto','mensaje'=>'La información del docente fue actualizada correctamente.');
            }else{
                $dataEditarDocente=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataEditarDocente;
        }

        function EliminarDocente($idDocente){
            $dataEliminadoDocente=array();
            $sql = "DELETE FROM docente WHERE Id_Docente = '$idDocente'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataEliminadoDocente=array('tipo'=>'correcto','mensaje'=>'El docente fue eliminado correctamente.');
            }else{
                $dataEliminadoDocente=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataEliminadoDocente;
        }

        function DatosDocente($id){
            $dataDocente=array();
            $sql="SELECT Nombre_Docente,Apellido_P FROM docente WHERE Id_Docente='$id' LIMIT 1";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataDocente[]=mysqli_fetch_assoc($consulta);
            }
            $this->conexion->cerrar();

            return $dataDocente;
        }

        function GruposDocente($id){
            $gruposDocente=array();
            //obtenemos la informacion de los grupos disponibles para cada docente
            $sql="SELECT g.Id_grupo,g.Capacidad, d.Nombre_Docente, d.Apellido_P, d.Apellido_M, m.Nombre ,a.Nombre_Aula FROM grupos g, docente d, materias m ,aulas a WHERE m.Matricula_Materia=g.Matricula_Materia AND g.Id_Docente=$id  AND d.Id_Docente=$id AND g.Aula = a.Id_Aula;";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $gruposDocente["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $gruposDocente;
        }

        function AlumnoGpoDocente($id){
            $dataGrupos=array();
            //obtenemos los alumnos dentro del grupo en cuestion
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
    }
?>