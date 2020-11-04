<?php
    require '../../models/modelo_Docentes.php';
    $id=$_GET['id'];
    $Docentes= new Modelo_Docentes();
    $infoDocente=$Docentes->DatosDocente($id);
    $dataDocente=json_encode($infoDocente);

    echo $dataDocente;
?>