<?php
    class Modelo_Usuario{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        } 

    function VerificarUsuario($usuario,$contra){
        $arreglo=array();
        $sql="SELECT Id_usuario, Usuario, Password,Tipo_usuario FROM usuarios WHERE Usuario= '$usuario' LIMIT 1";
        $consulta=$this->conexion->conexion->query($sql);
        if ($consulta) {
            while($consulta_vu=mysqli_fetch_assoc($consulta)){
                if(password_verify($contra,$consulta_vu["Password"])){
                    $arreglo[]=$consulta_vu;
                }
            }
            $this->conexion->cerrar();
        }
        return $arreglo;
    }
    function InfoUsuarios(){
        $dataUsuarios=array();
        //obtenemos la informacion de los usuarios
        $sql="SELECT Id_usuario,Usuario,Tipo_usuario,Foto FROM usuarios";
        $consulta=$this->conexion->conexion->query($sql);
        if($consulta){
            while($data = mysqli_fetch_assoc($consulta)){
                $dataUsuarios["data"][]=$data;
            }
            $this->conexion->cerrar();
        }
        return $dataUsuarios;
    }
    function RegistrarUsuario($usuario,$pass_hash,$tipo_usuario){
        $dataUsuario= array();
        $sql="INSERT INTO usuarios (usuario, password, tipo_usuario) VALUES ('$usuario','$pass_hash',$tipo_usuario)";
        $consulta=$this->conexion->conexion->query($sql);
        if($consulta){
            $dataUsuario=array('tipo'=>'correcto','mensaje'=>'El usuario fue registrado correctamente.');
        }else{
            $dataUsuario=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo');
        }
        $this->conexion->cerrar();

        return $dataUsuario;
    }
    //eliminar usuario
    function EliminarUsuario($id){
        $dataEliminarUsuario= array();

        $sql="DELETE FROM usuarios WHERE Id_usuario='$id'";
        $consulta=$this->conexion->conexion->query($sql);
        if($consulta){
            $dataEliminarUsuario=array('tipo'=>'correcto','mensaje'=>'El usuario fue eliminado correctamente.');
        }else{
            $dataEliminarUsuario=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo');
        }
        $this->conexion->cerrar();

        return $dataEliminarUsuario;
    }
}
?>