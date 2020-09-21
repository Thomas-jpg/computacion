<?php 
    require '../../models/modelo_Helpers.php';

    $usuario=$_GET['user'];
    $Helper= new Modelo_Helpers();
    $alumno= $Helper->VerificarUsuario($usuario);
    $dataAlumno= json_encode($alumno);

    echo $dataAlumno;
    
?>