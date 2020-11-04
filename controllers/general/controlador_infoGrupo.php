<?php 
    require '../../models/modelo_Helpers.php';

    $idgrupo=$_GET['id'];
    $Helper= new Modelo_Helpers();
    $grupo=$Helper->InfoGrupo($idgrupo);
    $dataGrupo=json_encode($grupo);

    echo $dataGrupo;
    
?>