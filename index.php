<?php
    session_start();
    if(isset($_SESSION['S_IDUSUARIO_C'])){
        header('Location: views/');
    }else{
        header('Location: login/');
    }
?>