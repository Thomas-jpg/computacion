<?php
    session_start();
    if(isset($_SESSION['S_IDUSUARIO_C'])){
        $idUsuario=$_SESSION['S_IDUSUARIO_C'];
        $usuario=$_SESSION['S_USER'];
        $rol=$_SESSION['S_ROL'];

        $dataUser = array('id' =>$idUsuario ,'user'=>$usuario,'tipo'=>$rol );

        echo json_encode($dataUser);
    }
    
?>