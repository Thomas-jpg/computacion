<?php 
    require '../../models/modelo_Helpers.php';

    $matricula=$_GET['id'];
    $grupo=$_GET['gpo'];
    $Helper= new Modelo_Helpers();
    $alumno= $Helper->VerificarAlumno($matricula,$grupo);
    $dataAlumno= json_encode($alumno);

    echo $dataAlumno;
    
?>