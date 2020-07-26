<?php
    session_start();
    
    $idUsuario= $_POST['idUsuario'];
    $nombreUsuario=$_POST['nombreUsuario'];
    $tipoUsuario=$_POST['tipoUsuario'];

    $_SESSION['S_IDUSUARIO_C']=$idUsuario;
    $_SESSION['S_USER']=$nombreUsuario;
    $_SESSION['S_ROL']=$tipoUsuario;


?>