<?php
    require '../../models/modelo_Docentes.php';

    $idDocente=$_GET['id'];

    $Docentes= new Modelo_Docentes();
    $eliminarDocente= $Docentes->EliminarDocente($idDocente);
    $dataDocentes=json_encode($eliminarDocente);

    echo $dataDocentes;
?>