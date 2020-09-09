<?php
    require '../../models/modelo_Alumno.php';
    
    $matricula=$_GET['matricula'];
    $semestre=$_GET['semestre'];
    $modeloAlumno= new Modelo_Alumno();
    $datosKardex=$modeloAlumno->KardexAlumno($matricula,$semestre);

    $respuesta=json_encode($datosKardex);

    echo $respuesta;

?>