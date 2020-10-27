<?php
    session_start();
    if(!isset($_SESSION['S_IDUSUARIO_C'])){
        header('Location: ../../login/index.php');
    }else{
        header('Location ../index.php');
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../../img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/normalize.css">
    <link rel="stylesheet" href="../../css/estilos.css">
    <link rel="stylesheet" href="../../css/fontawesome/css/all.css">
    <link rel="stylesheet" href="../../css/modal.css">
    <title>Escuela de Ciencias</title>
</head>

<body>
    <div class="grid-container">
        <div class="gridHeader">
            <header class="header">
                <div id="spanMenu" class="spanMenu">
                    <i class="fas fa-bars"></i>
                </div>
                <div class="ciencias">
                    <img src="../../img/logo_ciencias.png" alt="Escuela de Ciencias">
                    <h1>Escuela de Ciencias</h1>
                </div>
                <div class="tituloComputacion">
                    <h1 class="title colorBlanco">Computación</h1>
                </div>
                <div class="btnPerfil">
                    <i class="fas fa-user-circle"></i>
                    <div class="perfilBox">
                        <p class="title">Usuario</p>
                        <hr>
                        <a href="" class="seccionPerfil">Perfil</a>
                        <hr>
                        <a href="../../controllers/usuario/controlador_cerrarSesion.php">Cerrar Sesión</a>
                    </div>
                </div>
            </header>
        </div>
        <div class="gridMenu">
            <nav class="sidebar">
                <div class="sidebar-content">
                    <div class="inicio">
                        <a href="#" id="inicio"><i class="fas fa-home"></i> INICIO</a>
                        <span id="cerrarMenu" class="btnCerrar colorBlanco"><i class="fas fa-times"></i></span>
                    </div>
                    <div class="sidebar-header">
                        <div class="img-user">
                            <img src="../../img/original.jpg" alt="user" class="seccionPerfil">
                        </div>
                        <div class="info-user">
                            <span class="userName">
                                <strong id="nombreUsuario">Tommy</strong>
                            </span>
                            <span class="rolUser" id="rolUsuario">
                                Administrador
                            </span>
                            <span class="perfilUser">
                                <a href="" class="seccionPerfil"><i class="fas fa-user-edit"></i>
                                    Perfil</a>
                            </span>
                        </div>
                    </div>
                    <div class="sidebar-menu" id="sidebar-menu">
                        <ul>
                            <li class="menu-header">
                                <span>General</span>
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                    <span><i class="fas fa-users"></i>
                                        Materias</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="submenu">
                                    <ul>
                                        <li>
                                            <a href="#" class="mostrarContenedor" data-id="a1">
                                                <i class="fas fa-person-booth"></i> Mis Materias
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                    <span><i class="fas fa-user-graduate"></i>
                                        Mapa Curricular</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="submenu">
                                    <ul>
                                        <li><a href="#" class="mostrarContenedor" data-id="a2">
                                                <i class="fas fa-address-card"></i>Generar Carga</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                           
                            <br>
                            <li class="menu-header">
                                <span>Extras</span>
                            </li>
                            <li class="extras">
                                <a href="#">Horario</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sidebar-footer">
                    <a href="../../controllers/usuario/controlador_cerrarSesion.php">
                        <i class="fas fa-power-off"></i>Cerrar Sesión
                    </a>
                </div>
            </nav>
        </div>
        <div class="container" id="container">
            <div class="contenedor">
                <h1 class="title" id="nombreAlumno">Bienvenido de nuevo: </h1>
                <div class="mision-vision" id="misionVision">
                    <div class="mision">
                        <h1 class="title">MISIÓN</h1>
                        <p>La Escuela de Ciencias es una unidad académica que tiene como misión formar profesionales en las áreas de Biología, Computación, Física o Matemáticas, con alto nivel de competencia, espíritu de investigación científica, críticos y éticos, mediante planes de estudio actualizados, pertinentes y de vanguardia; participar en el desarrollo científico y tecnológico a través de la investigación básica y aplicada; integrar redes científicas a nivel local, regional y nacional, divulgar la ciencia y tecnología, implementar programas y proyectos de intervención en los sectores público, privado y social, asesorar y/o capacitar a la población universitaria y externa en el campo de las ciencias; acciones que inciden favorablemente en educación, ambiente, economía y sociedad.</p>
                    </div>
                    <div class="vision">
                        <h1 class="title">VISIÓN</h1>
                        <p>Somos una Escuela con programas educativos pertinentes, acreditados, con una planta académica fortalecida y organizada en cuerpos académicos e infraestructura acorde a las necesidades de los programas, que goza de un reconocimiento a nivel nacional por la calidad profesional de sus egresados, las investigaciones científicas y/o tecnológicas, los programas y proyectos de intervención que contribuyen en el desarrollo estatal, aunado a la amplia labor de divulgación y capacitación, que se distingue por la estrecha vinculación con los sectores público, privado y social; con redes científicas que se han extendido al ámbito internacional, condiciones que permiten ofertar posgrados de calidad.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- seccion modales -->
    <div id="modalEditar" class="modal"></div>
    <div id="modalEliminar" class="modal"></div>
    <div id="modalRespuesta" class="modal"></div>
    <!-- seccion modales -->
    <script src="../../js/nav.js"></script>
    <script src="../../js/librerias/jquery-3.5.1.js"></script>
    <script src="../../js/modal.js"></script>
    <script src="../../js/principalAlu.js"></script>
</body>

</html>