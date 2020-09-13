<?php 
    require '../../models/modelo_Grupos.php';

    $idGrupo=$_POST['clave'];
    $idMateria=$_POST['materia'];
    $idDocente=$_POST['docente'];
    $idAula=$_POST['aula'];
    $capacidad=$_POST['capacidad'];

    $grupo= new Modelo_Grupos();
    $nuevoGpo= $grupo->AgregarGrupo($idGrupo,$idMateria,$idDocente,$idAula,$capacidad);
    $dataGrupo= json_encode($nuevoGpo);

    echo $dataGrupo;

?>