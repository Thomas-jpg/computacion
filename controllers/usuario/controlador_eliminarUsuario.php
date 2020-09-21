<?php
    require '../../models/modelo_Usuario.php';
    
    $id=$_GET['id'];

    $Usuario= new Modelo_Usuario();

    $infoUsuario=$Usuario->EliminarUsuario($id);
    $dataUsuario=json_encode($infoUsuario);

    echo $dataUsuario;

?>