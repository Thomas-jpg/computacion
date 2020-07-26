<?php 
    session_start();
    if(!isset($_SESSION['S_IDUSUARIO_C'])){
        header('Location: ../login.index.php');
    }
    $tipoUsuario=$_SESSION['S_ROL'];
    switch ($tipoUsuario) {
        case '1':
            header('Location: administrativo/');
            break;
        case '2':
            header('Location: alumno/');
            break;
        case '3':
            header('Location: administrativo/');
        break;
        case '4':
            header('Location: profesor/');
        break;    
        default:
            header('Location: ../controllers/usuario/controlador_cerrarSesion.php');
            break;
    }
?>