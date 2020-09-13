<?php

    require '../../models/modelo_Grupos.php';
    $idGrupo= $_GET['id'];
    $Grupos=new Modelo_Grupos();
    $infoGruposAlumnos=$Grupos->InfoGruposAlumnos($idGrupo);
    $dataGruposAlumno=json_encode($infoGruposAlumnos);

    echo $dataGruposAlumno;
?>