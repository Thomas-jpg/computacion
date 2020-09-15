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
    }
?>