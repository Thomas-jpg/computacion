<?php
    require '../../models/modelo_Alumno.php';

    $modeloAlumno= new Modelo_Alumno();

    $infoAlumnos=$modeloAlumno->InfoAlumnos();

    $dataAlumnos=json_encode($infoAlumnos);

    echo $dataAlumnos;

?>