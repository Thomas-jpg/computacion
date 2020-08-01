<?php
    require '../../models/modelo_Alumno.php';
    $matricula=$_POST['matricula_Alumno'];
    $nombre=$_POST['nombre_Alumno'];
    $apellidoP=$_POST['apellidoP_Alumno'];
    $apellidoM=$_POST['apellidoM_Alumno'];
    $curp=$_POST['curp_Alumno'];
    $semestreA=$_POST['semestreAct_Alumno'];
    $modeloAlumno= new Modelo_Alumno();

    $actualizarAlumno=$modeloAlumno->ActualizarAlumno($matricula,$nombre,$apellidoP,$apellidoM,$curp,$semestreA);

    $respuesta=json_encode($actualizarAlumno);

    echo $respuesta;


?>