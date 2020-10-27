<?php
    require '../../models/modelo_Alumno.php';
    $grupos=json_decode($_POST['grupos'],true);
    $matricula_alumno=$_POST['alumno'];

    $alumno= new Modelo_Alumno();
    $respuesta=$alumno->GuardarCargaCurricular($matricula_alumno,$grupos);
    $resultado=json_encode($respuesta);

    echo $resultado;
?>