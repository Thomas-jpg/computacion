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
    <link rel="stylesheet" href="../../js/librerias/DataTables/datatables.min.css">
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
                        <p class="title">admin</p>
                        <hr>
                        <a href="">Perfil</a>
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
                            <img src="../../img/original.jpg" alt="user">
                        </div>
                        <div class="info-user">
                            <span class="userName">
                                <strong id="nombreUsuario">Tommy</strong>
                            </span>
                            <span class="rolUser" id="rolUsuario">
                                Administrador
                            </span>
                            <span class="perfilUser">
                                <a href=""><i class="fas fa-user-edit"></i>
                                Perfil</a>
                            </span>
                        </div>
                    </div>
                    <div class="sidebar-menu">
                        <ul>
                            <li class="menu-header">
                                <span>General</span>
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                <span><i class="fas fa-user-alt"></i>
                                    Grupos</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="submenu">
                                    <ul>
                                        <li>
                                            <a href="#" class="mostrarContenedor" data-id="1">
                                                <i class="fas fa-user"></i> Ver Grupos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="mostrarContenedor" data-id="2">
                                                <i class="fas fa-user"></i>
                                                Generar Grupos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="mostrarContenedor" data-id="3">
                                                <i class="fas fa-user"></i>
                                                Editar Grupos
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                <span><i class="fas fa-user-alt"></i>
                                    Alumnos</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="submenu">
                                    <ul>
                                        <li><a href="#" class="mostrarContenedor">
                                            <i class="fas fa-user"></i>Registrar</a>
                                        </li>
                                        <li>
                                            <a href="#" class="mostrarContenedor">
                                                <i class="fas fa-user"></i>
                                                Consultar
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                <span><i class="fas fa-user-alt"></i>
                                    Docentes</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="submenu">
                                    <ul>
                                        <li><a href="#" class="mostrarContenedor">
                                            <i class="fas fa-user"></i>Registrar</a>
                                        </li>
                                        <li>
                                            <a href="#" class="mostrarContenedor">
                                                <i class="fas fa-user"></i>
                                                Consultar
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <br>
                            <li class="menu-header">
                                <span>Extras</span>
                            </li>
                            <li class="extras">
                                <a href="#">Calendario</a>
                            </li>
                            <li class="extras">
                                <a href="#">Formatos</a>
                            </li>
                            <li class="extras">
                                <a href="#">Materias</a>
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
        <div class="container">
            <div class="contenedor">
                <h1 class="title">Consulta general de alumnos</h1>
                <div class="tabla tablaPrincipal">
                    <table id="tablaPrincipal">
                        <thead>
                            <tr>
                                <th>Matricula</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Año Ingreso</th>
                                <th>Semestre Actual</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>    
        </div>
    </div>
    <script src="../../js/nav.js"></script>
    <script src="../../js/librerias/jquery-3.5.1.js"></script>
    <script src="../../js/librerias/DataTables/datatables.min.js"></script>
    <script>
        $(document).ready(function(){
            listarAlumnos();
        });
            const idioma={
                        "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_  registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registro del 0 al 0 de un total de 0 registros",
                    "sInfoFIltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Ultimo",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                "oAria":{
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            };
            
            function listarAlumnos(){
                const tablaPrincipal=$('#tablaPrincipal').DataTable({
                    "destroy":true,
                    "ajax":{
                        "method":"POST",
                        "url":"../../controllers/alumnos/controlador_infoAlumnos.php"
                    },
                    "columns":[
                        {"data":"Matricula_Alumno"},
                        {"data":"Nombre"},
                        {"data":"Apellido_P"},
                        {"data":"Apellido_M"},
                        {"data":"Anio_Ingreso"},
                        {"data":"Semestre_Actual"},
                        {"defaultContent":"<button class='botonAccion' id='alumno_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='alumno_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button><button class='botonAccion kardex' id='alumno_btnKardex' title='Ver Kardex'><span><i class='fas fa-list'></i></span></button><button class='botonAccion estatus' id='alumno_btnEstatus' title='Estatus General'><span><i class='fas fa-folder-open'></i></span></button>"}
                    ],
                    "order":[[2,"asc"]],
                    "language":idioma
                });
                tablaPrincipal
                btn_EditarAlumno("#tablaPrincipal tbody",tablaPrincipal);
                btn_EliminarAlumno("#tablaPrincipal tbody",tablaPrincipal);
                btn_KardexAlumno("#tablaPrincipal tbody",tablaPrincipal);
                btn_EstatusAlumno("#tablaPrincipal tbody",tablaPrincipal);
            }

            // accion para botones
            function btn_EditarAlumno(tbody,table){

            }
            function btn_EliminarAlumno(tbody,table){
                
            }
            function btn_KardexAlumno(tbody,table){
                
            }
            function btn_EstatusAlumno(tbody,table){
                
            }
    </script>
</body>

</html>