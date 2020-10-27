<?php 
    require '../../models/modelo_Alumno.php';

    $matricula=$_GET['id'];
    $modeloAlumno= new Modelo_Alumno();
    
    $alumno=$modeloAlumno->DatosAlumno($matricula);
    $dataAlumno=json_encode($alumno);
    
    echo $dataAlumno;

?>