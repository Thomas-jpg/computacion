  <?php 
    require '../../models/modelo_Helpers.php';

    $usuario=$_GET['id'];
    $Helper= new Modelo_Helpers();
    $materias= $Helper->DatosMaterias($usuario);
    $dataMaterias= json_encode($materias);

    echo $dataMaterias;
    
?>