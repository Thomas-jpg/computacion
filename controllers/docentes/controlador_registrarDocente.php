<?php
    require '../../models/modelo_Docentes.php';

    $nombre=$_POST['nombre'];
    $apellidoP=$_POST['apellidoP'];
    $apellidoM=$_POST['apellidoM'];

    $Docentes= new Modelo_Docentes();
    $registroDocentes=$Docentes->RegistrarDocente($nombre,$apellidoP,$apellidoM);
    $dataDocentes=json_encode($registroDocentes);

    echo $dataDocentes;
?>