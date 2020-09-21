<?php
    require '../../models/modelo_Usuario.php';
    require '../../models/modelo_Helpers.php';
    $usuario = $_POST['usuario'];
    $pass=$_POST['pass'];
    $tipo=$_POST['tipo'];
    
    $Usuario= new Modelo_Usuario();
    $Helpers= new Modelo_Helpers();
    //encriptamos la contraseña 
    $pass_hash= $Helpers->HashPassword($pass);
    //pasamos los datos al usuario
    $infoUsuario=$Usuario->RegistrarUsuario($usuario,$pass_hash,$tipo);
    $dataUsuario=json_encode($infoUsuario);

    echo $dataUsuario;
?>