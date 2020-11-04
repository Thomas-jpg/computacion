<?php
    require '../../models/modelo_Docentes.php';
    $id=$_GET['id'];
    $Docentes= new Modelo_Docentes();
    $gruposDocente=$Docentes->GruposDocente($id);
    $dataDocente=json_encode($gruposDocente);

    echo $dataDocente;
?>