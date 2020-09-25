<?php 
    require '../../models/modelo_Helpers.php';

    $id=$_POST['id'];
    $pass=$_POST['pass'];
    $respuesta=array();
    $Helper= new Modelo_Helpers();
    $usuario= $Helper->VerificarContra($id,$pass);
    if($usuario){
         $respuesta=array('valido'=>true);
    }else{
        $respuesta=array('valido'=>false);
    }
    $dataUsuario= json_encode($respuesta);

    echo $dataUsuario;
    
?>