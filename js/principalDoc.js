const Modales= new Modal();
const modalRespuesta=document.querySelector('#modalRespuesta');

 // eventos y funciones para los modales
 modalRespuesta.addEventListener('click',(event)=>{
    if(event.target.classList.contains('close')){
        Modales.ocultarModal('#modalRespuesta');
    }
});
//eventlisteners
// cargaEventListener();
// function cargaEventListener(){
//     
// }
iniciar();
//funciones para mostrar datos de inicio y animaciones
function iniciar(){
     //obtenemos los datos de sesion
     fetch('../../controllers/general/controlador_datosUsuario.php')
     .then(res => res.json())
     .then(data => {
        cargarNombre(data.user);
     })
     .catch(error => console.log(error));   
}
//cargamos el nombre del alumno
function cargarNombre(id){
    const nombreDocente= document.getElementById('nombreDocente');
    //obtenemos los datos del alumno en cuestion
    fetch(`../../controllers/docentes/controlador_datosDocente.php?id=${id}`)
    .then(res => res.json())
    .then(data =>{
        let html=`Bienvenido de nuevo Docente: ${data[0].Nombre_Docente} ${data[0].Apellido_P}`;
        // nombreDocente.style.animationDuration='4s';
        // nombreDocente.style.animationName='mostrarNombre';
        nombreDocente.innerHTML=html;
        //nombreDocente.classList.add('mostrarNombre');
        
    })
    .catch(error => console.log(error));
}
//bloquea el boton de retroceso del boton del navegador
window.location.hash="no-back-button";
window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
window.onhashchange=function(){window.location.hash="no-back-button";}