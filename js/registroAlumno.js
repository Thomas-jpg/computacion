//variables
const formAlumRegistro =document.querySelector('#formRegistroAlumno');
//evento para el submit del formulario
formAlumRegistro.addEventListener('submit',validarFormRegistro);

//obtener los datos del formulario de registro
function validarFormRegistro(event){
    event.preventDefault();
    let alerta= document.createElement('p');
    alerta.className="alerta-danger";
    alerta.textContent='Todos los campos son obligatorios';
    let formRegistro = new FormData(formAlumRegistro);
    //validamos que ningun campo vaya vacio
    for (let value of formRegistro.values()) {
        if(value === ''){
            formAlumRegistro.appendChild(alerta);
            return;
        }
        
    }
    //validamos que el alumno no este previamente registrado
    const matricula=formRegistro.get('matricula');

    fetch(`../../controllers/general/controlador_verificarAlumno.php?id=${matricula}&gpo=0`)
    .then(res => res.json())
    .then(data =>{
        if(data.alumno){
            Modales.mostrarModal('Información',`El alumno con la matricula ${matricula} ya existe, intente con una diferente.`, '25','respuesta','#modalRespuesta');
        }else{
            //hacemos la carga de los datos al servidor
            ingresarAlumno(formRegistro);
        }
    })
    
}
//registramos al alumno nuevo
function ingresarAlumno(objForm){
    fetch('../../controllers/alumnos/controlador_registrarAlumno.php',{
        method:'POST',
        body:objForm
    })
    .then(res => res.json())
    .then(data => {
        Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');
        if(data.tipo === 'correcto'){
            formAlumRegistro.reset();
        }
    })
    .catch(error => console.log(error));
}