<?php 
    require '../../models/modelo_Helpers.php';

    $id=$_POST['id'];
    $pass=$_POST['pass'];
    $nuevaPass=$_POST['nuevaPass'];

    $respuesta=array();
    $Helper= new Modelo_Helpers();
    //encriptamos la contraseña nueva
    $hash= $Helper->HashPassword($nuevaPass);
    
    $usuario= $Helper->ActualizarPass($id,$hash);
    
    $dataUsuario= json_encode($usuario);

    echo $dataUsuario;
    
?>