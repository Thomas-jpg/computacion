<?php
    require '../../models/modelo_Grupos.php';

    $matricula=$_GET['id'];
    $Grupos=new Modelo_Grupos();

    $dataEliminado=$Grupos->EliminarAlumnoGrupo($matricula);
     $dataGrupo = json_encode($dataEliminado);

    echo $dataGrupo;

?>