<?php 
    require '../../models/modelo_Helpers.php';
    $materia=$_GET['materia'];
    $Helper= new Modelo_Helpers();
    $gpoDisponibles= $Helper->GpoDisponiblesMapa($materia);

    $dataGrupos= json_encode($gpoDisponibles);

    echo $dataGrupos;
    
?>