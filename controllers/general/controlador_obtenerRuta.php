<?php 
    require '../../models/modelo_Helpers.php';
    $id=$_GET['id'];
    $Helper= new Modelo_Helpers();
    $ruta= $Helper->ObtenerRutaImg($id);
    $data= json_encode($ruta);

    echo $data;
    
?>