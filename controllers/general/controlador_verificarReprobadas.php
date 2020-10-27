<?php 
    require '../../models/modelo_Helpers.php';
    $materia=$_POST['materia'];
    $usuario=$_POST['id'];
    $carga=json_decode($_POST['carga'],true); 
    $Helper= new Modelo_Helpers();
    $reprobada= $Helper->ValidarReprobadas($materia,$usuario,$carga);

    $dataRepro= json_encode($reprobada);

    echo $dataRepro;
    
?>