<?php
    require '../../models/modelo_Docentes.php';

    $Docentes= new Modelo_Docentes();
    $infoDocentes=$Docentes->InfoDocentes();
    $dataDocentes=json_encode($infoDocentes);

    echo $dataDocentes;
?>