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
                <div class="btnPerfil">
                    <i class="fas fa-user-circle"></i>
                </div>
            </header>
        </div>
        <div class="gridMenu">
            <nav class="sidebar">
                <div class="sidebar-content">
                    <div class="inicio">
                        <a href="#"><i class="fas fa-home"></i> INICIO</a>
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
            <h3 class="title">contenedor</h3>
            <a href="../../controllers/usuario/controlador_cerrarSesion.php">cerrar sesion</a>
        </div>
    </div>

    <script>
        //seleccionamos todos los elementos dropdown que tengan como primer hijo un a
        const dropdown= document.querySelectorAll('.dropdown > a');
        const spanMenu=document.querySelector('#spanMenu');
        const gridMenu=document.querySelector('.gridMenu');
        const selectores=document.querySelectorAll('.mostrarContenedor');
        //recorremos todos los elementos
        for(let i=0;i < dropdown.length; i++){
            //detectamos el click de entre los demas elementos
            dropdown[i].addEventListener('click',() => {
            /*al dar click, seleccionamos todos los submenus
            para ocultarlos, en caso de que ya este mostrado alguno */    
            const submenus=document.querySelectorAll('.submenu');
            for(let j=0; j <submenus.length; j++){
                submenus[j].style.display='none';
            }
            //seleccionamos al elemento hermano mas cercano
            const submenu=dropdown[i].nextElementSibling;
            //seleccionamos al elemento padre al cual dimos click
            const link=dropdown[i].parentElement;
            /*checamos si el elemento padre contiene la clase active, de ser asi la removemos 
            en caso contrario le agregamos la clase active al elemento padre y mostramos el 
            elemento hermano, que en este caso seria el submenu  */
            if(link.classList.contains('active')){
                document.querySelector('.dropdown').classList.remove('active');
                link.classList.remove('active')
            }else{
                document.querySelector('.dropdown').classList.remove('active'); 
                submenu.style.display='block';
                link.classList.add('active');
            }
            });
        }
        //activamos el evento cada que la pantalla cambien de tamaño
        window.addEventListener('resize',function(){
            //si el ancho interno es mayor a 768 que muestre el menu
            if(window.innerWidth > 768){
                //validamos que el menu este desplegado o no
                if(gridMenu.style.display === 'none'){
                    gridMenu.style.display = 'block';
                    gridMenu.style.width= '260px';
                }else{
                    gridMenu.style.width= '260px';
                }
            }
        })
        
        spanMenu.addEventListener('click',function(){
                if(gridMenu.style.display === 'block'){
                gridMenu.style.display='none';
                
                }else{
                gridMenu.style.top='50px';
                gridMenu.style.height='calc(100vh - 50px)';
                gridMenu.style.position='fixed';
                gridMenu.style.display='block';
                }
        });
        
        for(let i = 0; i < selectores.length; i++){
            selectores[i].addEventListener('click',function(event){
                const ruta=event.target.getAttribute('data-id');
                switch (ruta) {
                    case '1':
                        mostrarVistas('.container','vista_verGrupos.php');
                        break;
                
                    default:
                        break;
                }
            });
        }
        function mostrarVistas(contenedor,contenido){
            console.log(contenido);
            fetch(`${contenido}`)
            .then(res => res.text())
            .then(data =>{
                if(data === ''){
                    document.querySelector(`${contenedor}`).innerHTML='No se pudo obtener la informacion';
                }else{
                    document.querySelector(`${contenedor}`).innerHTML=data;
                }
            })
            .catch(error => console.log('el error es'+error));
        }
    </script>
</body>

</html>