//import {Grupos} from "./grupos.js";
//importando los archivos de vistas
//  seccion de variables
 //seleccionamos todos los elementos dropdown que tengan como primer hijo un a
 const dropdown= document.querySelectorAll('.dropdown > a');
 const spanMenu=document.querySelector('#spanMenu');
 const sidebar=document.querySelector('.sidebar');
 const selectores=document.querySelectorAll('.mostrarContenedor');
 const inicio=document.querySelector('#inicio');
 const btnCerrar=document.querySelector('#cerrarMenu');
 const seccionPerfil=document.querySelectorAll('.seccionPerfil');
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
    if(window.innerWidth > 1340){
        //validamos que el menu este desplegado o no
        sidebar.style.transform="translateX(0px)";
    }
})
//obtenemos los datos del usuario al cargar la pagina
window.addEventListener('DOMContentLoaded',CargarUsuario);
//  evento para recargar la pagina
inicio.addEventListener('click',()=>{
   window.location.reload();
});
// evento para desplegar menu
spanMenu.addEventListener('click',function(){
     console.log('click');
         sidebar.style.transform="translateX(0px)";
 });
// evento para ocultar el menu 
 btnCerrar.addEventListener('click',()=>{
     sidebar.style.transform="translateX(-260px)";
 });
//eventos para mostrar los contenedores  
 for(let i = 0; i < selectores.length; i++){
     selectores[i].addEventListener('click',function(event){
         const ruta=event.target.getAttribute('data-id');
         console.log(ruta);
         switch (ruta) {
             case '1':
                //  let grup= new Grupos();
                //  console.log(grup.Cargar_Grupos());
                mostrarVistas('container','vista_verGrupos.php');
                 break;
            case '2':
                mostrarVistas('container','vista_registroAlumno.php');
                break;
            case '3':
                mostrarVistas('container','vista_verDocentes.php');
                break; 
            case '4':
                mostrarVistas('container','vista_verUsuarios.php');
                break;       
             default:
                 break;
         }
     });
 }
 //eventos para desplegar la vista del perfil de usuario
 for (let i = 0; i < seccionPerfil.length; i++) {
     seccionPerfil[i].addEventListener('click',(e)=>{
         e.preventDefault();
         mostrarVistas('container','../vista_verPerfil.php');
     }); 
 }
 function mostrarVistas(contenedor,contenido){
     $('#'+contenedor).load(contenido);
}

    function CargarUsuario(){
        fetch('../../controllers/general/controlador_datosUsuario.php')
            .then(res => res.json())
            .then(data =>{
               
                document.querySelector("#nombreUsuario").innerHTML=`${data.user}`;
                let nivelUsuario='';
                switch (data.tipo) {
                    case '1':
                        nivelUsuario='Administrador';
                        break;
                    case '2':
                        nivelUsuario='Estudiante';
                        break;
                    case '3':
                        nivelUsuario='Secretario(a)';
                        break;
                    case '4':
                        nivelUsuario='Docente';
                        break;        
                    default:
                        break;
                }
                document.querySelector("#rolUsuario").innerHTML=nivelUsuario;
                if (data.tipo !== '1') {
                    document.querySelector("#usuariosAdmin").style.display='none';
                }
            })
            .catch(error => console.log(error));
    }