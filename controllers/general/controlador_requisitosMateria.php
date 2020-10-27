<?php 
    require '../../models/modelo_Helpers.php';
    $materia=$_POST['materia'];
    $usuario=$_POST['id'];
    $Helper= new Modelo_Helpers();
    $seriada= $Helper->MateriaRequisitos($materia,$usuario);
    $dataSeriadas= json_encode($seriada);

    echo $dataSeriadas;
    
?>