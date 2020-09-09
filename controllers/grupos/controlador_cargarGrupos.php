<?php

    require '../../models/modelo_Grupos.php';

    $Grupos=new Modelo_Grupos();
    $infoGrupos=$Grupos->InfoGrupos();
    $dataGrupos=json_encode($infoGrupos);

    echo $dataGrupos;
?>