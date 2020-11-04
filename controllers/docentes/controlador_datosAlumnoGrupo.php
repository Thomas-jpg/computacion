<?php
    require '../../models/modelo_Docentes.php';
    $id=$_GET['id'];
    $Docentes= new Modelo_Docentes();
    $AlumnoGrupo=$Docentes->AlumnoGpoDocente($id);
    $dataDocente=json_encode($AlumnoGrupo);

    echo $dataDocente;
?>