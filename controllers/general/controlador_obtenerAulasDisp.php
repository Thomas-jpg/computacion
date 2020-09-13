<?php 
    require '../../models/modelo_Helpers.php';

    $Helper= new Modelo_Helpers();
    $aulas= $Helper->AulasDisp();
    $dataAulas= json_encode($aulas);

    echo $dataAulas;
    
?>