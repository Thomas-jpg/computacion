<?php
    require '../../models/modelo_Docentes.php';
    $idDocente=$_POST['idDocente'];
    $nombre=$_POST['nombre'];
    $apellidoP=$_POST['apellidoP'];
    $apellidoM=$_POST['apellidoM'];

    $Docentes= new Modelo_Docentes();
    $actualizarDocentes=$Docentes->ActualizarDocente($idDocente,$nombre,$apellidoP,$apellidoM);
    $dataDocentes=json_encode($actualizarDocentes);

    echo $dataDocentes;
?>