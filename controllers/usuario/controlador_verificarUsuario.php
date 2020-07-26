<?php 
    require '../../models/modelo_Usuario.php';
    //llamamos al objeto y hacemos un filtrado para los caracteres especiales
    $modeloUsuario= new Modelo_Usuario();
    $usuario=htmlspecialchars($_POST['user'],ENT_QUOTES,'UTF-8');
    $contra=htmlspecialchars($_POST['pass'],ENT_QUOTES,'UTF-8');
    $consulta = $modeloUsuario->VerificarUsuario($usuario,$contra);
    $data=json_encode($consulta);
    
    echo $data;

?>