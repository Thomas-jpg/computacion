<?php 
    require '../../models/modelo_Usuario.php';
    $nombreImagen=$_FILES['imagen']['name'];
    $tipoImagen=$_FILES['imagen']['type'];
    $tamanioImagen=$_FILES['imagen']['size'];
    $idUsuario=$_POST['id'];
    $dataImagen=array();
    $Usuario= new Modelo_Usuario();
    // validamos que el tamaño no exceda los 250KB
    if($tamanioImagen <= 250000){
        //validamos los formatos de imagen permitidos(jpg,png,gif)
        if($tipoImagen =="image/jpg" || $tipoImagen == "image/jpeg" || $tipoImagen == "image/png" || $tipoImagen == "image/gif"){
            $carpeta=$_SERVER['DOCUMENT_ROOT'].'/computacion/perfilUsuarios/';;
            move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta.$nombreImagen);
            //guardamos la ruta en la bd
            $guardarRuta=$Usuario->GuardarRuta($nombreImagen,$idUsuario);
            if($guardarRuta){
                $dataImagen=array('tipo'=>'correcto', 'mensaje' =>'Perfil de usuario, actualizado correctamente'); 
            }else{
                $dataImagen=array('tipo'=>'error', 'mensaje' =>'No se pudo subir, la imagen, intentelo de nuevo.');
            }
        }else{
            $dataImagen=array('tipo'=>'error', 'mensaje' =>'Solo formatos de imagen permitidos (jpg, jpeg, png, gif).');
        }
    }else{
        $dataImagen=array('tipo'=>'error', 'mensaje' =>'El archivo no puede superar los 250kb, reduce el tamaño.');
    }

    echo json_encode($dataImagen);

?>