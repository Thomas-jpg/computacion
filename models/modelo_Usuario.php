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
}
?>