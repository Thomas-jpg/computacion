<?php 
     require '../../models/modelo_Grupos.php';
     $idGrupo = $_GET['id'];   
     $Grupos=new Modelo_Grupos();

     $dataEliminado = $Grupos->EliminarGrupo($idGrupo);
     $dataGrupo = json_encode($dataEliminado);

    echo $dataGrupo;
?>