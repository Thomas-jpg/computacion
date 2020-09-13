<?php 
    require '../../models/modelo_Helpers.php';

    $Helper= new Modelo_Helpers();
    $materias= $Helper->Materias();
    $dataMaterias= json_encode($materias);

    echo $dataMaterias;
    
?>