<?php
    require '../../models/modelo_Alumno.php';

    $matricula_alumno=$_GET['matricula'];

    $alumno= new Modelo_Alumno();
    $respuesta=$alumno->EliminarAlumno($matricula_alumno);
    $resultado=json_encode($respuesta);

    echo $resultado;
?>