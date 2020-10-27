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
document.addEventListener('DOMContentLoaded',iniciar);
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
function cargarNombre(matricula){
    const nombreAlumno= document.getElementById('nombreAlumno');
    //obtenemos los datos del alumno en cuestion
    fetch(`../../controllers/alumnos/controlador_datosAlumno.php?id=${matricula}`)
    .then(res => res.json())
    .then(data =>{
        let html=`Bienvenido de nuevo: ${data[0].Nombre}`;
        nombreAlumno.innerHTML=html;
        //nombreAlumno.classList.add('mostrarNombre');
        nombreAlumno.style.animationDuration='4s';
        nombreAlumno.style.animationName='mostrarNombre';
    })
    .catch(error => console.log(error));
}