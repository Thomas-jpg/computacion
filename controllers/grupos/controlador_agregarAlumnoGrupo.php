<?php 
    require '../../models/modelo_Grupos.php';

    $idGrupo=$_GET['id'];
    $matricula=$_GET['matricula'];

    $grupo= new Modelo_Grupos();
    $nuevoAlumnoGpo= $grupo->AgregarAlumnoGrupo($idGrupo,$matricula);
    $dataGrupo= json_encode($nuevoAlumnoGpo);

    echo $dataGrupo;

?>