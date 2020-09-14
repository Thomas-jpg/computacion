<?php
    require '../../models/modelo_Alumno.php';

    $matricula=$_POST['matricula'];
    $nombre=$_POST['nombre'];
    $apellidoP=$_POST['apellido_p'];
    $apellidoM=$_POST['apellido_m'];
    $curp=strtoupper($_POST['curp']);
    $anio_ingreso=$_POST['anio_ingreso'];
    $semestreR=$_POST['semestre_real'];
    $semestreA=$_POST['semestre_actual'];
    $ciclo_escolar=$_POST['ciclo_escolar1']."-".$_POST['ciclo_escolar2'];
    $modeloAlumno= new Modelo_Alumno();

    $registrarAlumno=$modeloAlumno->RegistrarAlumno($matricula,$nombre,$apellidoP,$apellidoM,$curp,$anio_ingreso,$semestreR,$semestreA,$ciclo_escolar);

    $respuesta=json_encode($registrarAlumno);

    echo $respuesta;


?>