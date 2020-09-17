<?php
    require '../../models/modelo_Usuario.php';

    $Usuario= new Modelo_Usuario();
    $infoUsuario=$Usuario->InfoUsuarios();
    $dataUsuario=json_encode($infoUsuario);

    echo $dataUsuario;
?>