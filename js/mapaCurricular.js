$(document).ready(function(){
    EstadoMateria();
    leerLocalStorage();
});
//imprime los grupos dentro de localStorage
function leerLocalStorage() {
    let gruposLs;

    gruposLs=obtenerGruposLocalStorage();
    
    gruposLs.forEach(grupo =>{
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${grupo.idgpo}</td>
            <td>${grupo.materia}</td>
            <td>${grupo.docente}</td>
            <td>${grupo.aula}</td>
            <td>${grupo.creditos}</td>
            <td><button class="eliminar" data-id="${grupo.idgpo}">x</button></td>
        `;
        document.querySelector("#listaGpos tbody").appendChild(row);
    });
}
//comprobamos si hay elementos en el localstorage
function obtenerGruposLocalStorage(){
    let gruposLs;
    if(localStorage.getItem('grupos') === null){
        gruposLs=[];
    }else{
        //convertimos a json la cadena que guardamos en el localstorage
        gruposLs=JSON.parse(localStorage.getItem('grupos'));
    }
    return gruposLs;
}
//variables
const matriculaAlu= document.getElementById('nombreUsuario').innerText;
const materias= document.querySelectorAll(".materia");
const cargaGpos=document.getElementById("listaGpos");
const btnCarga=document.getElementById("btn-cargaCurricular");
//eventListeners
materias.forEach(element => {
    //agregamos un evento a cada una de las materias disponibles
    element.addEventListener('click',filtrarMateria);
});
//cuando se elimina un grupo de la lista existen
cargaGpos.addEventListener('click',eliminarGrupo);
//cuando se procede a general la carga curricular
btnCarga.addEventListener('click',btn_GenerarCarga);
//filtramos las materias
function filtrarMateria(event){
    if(event.target.parentElement.classList.contains('materia')){
        //obtenemos la clave unica de la materia
        const idMateria=event.target.parentElement.getAttribute('data-id');
        validarMateria(idMateria);
    }
}
//cambiamos de color las materias de acuerdo a su estado
function EstadoMateria(){
    fetch(`../../controllers/general/controlador_materiasAlumno.php?id=${matriculaAlu}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            materias.forEach(materia =>{
                switch (element.Estado_Materia) {
                    case 'APROBADO':
                        if(materia.getAttribute('data-id') === element.Matricula_Materia){
                            materia.style.backgroundColor="blue";
                            materia.removeEventListener('click',filtrarMateria);
                        }
                        break;
                    case 'REPROBADO':
                        if(materia.getAttribute('data-id') === element.Matricula_Materia){
                            materia.style.backgroundColor="yellow"; 
                        }
                        break;
                    case 'CURSANDO':
                        if(materia.getAttribute('data-id') === element.Matricula_Materia){
                            materia.style.backgroundColor="green";
                            materia.removeEventListener('click',filtrarMateria); 
                        }
                        break;
                    case 'RECURSANDO':
                        if(materia.getAttribute('data-id') === element.Matricula_Materia){
                            materia.style.backgroundColor="red";
                            materia.removeEventListener('click',filtrarMateria); 
                        }
                        break;        
                    default:
                        break;
                }
            })
        });
    })
}
//validamos si la materia esta seriada y si debe materias o no
function validarMateria(materia){
    //validamos que la materia este seriada
    let formMateria= new FormData();
    formMateria.append('materia',materia);
    formMateria.append('id',matriculaAlu);
    fetch('../../controllers/general/controlador_requisitosMateria.php',{
        method:'POST',
        body:formMateria
    })
    .then(res => res.json())
    .then(data =>{
        if(data.seriada){
            Modales.mostrarModal('Información','¡Materia seriada, intenta con otra.!', '25','respuesta','#modalRespuesta');
            return;
        }
        //validamos si tiene materias reprobadas
        validarMateria_reprobada(materia);
    });
}
//veficamos que tenga materias reprobadas y haya grupos disponibles
function validarMateria_reprobada(materia){
    
    let cargaMaterias = obtenerGruposLocalStorage();
    console.log(cargaMaterias);
    let formRepro= new FormData();
    formRepro.append('materia',materia);
    formRepro.append('id',matriculaAlu);
    formRepro.append('carga',JSON.stringify(cargaMaterias));
    fetch('../../controllers/general/controlador_verificarReprobadas.php',{
        method:'POST',
        body:formRepro
    })
    .then(res => res.json())
    .then(data =>{
        if(data.reprobada){
            Modales.mostrarModal('Información','Necesitas agregar primero la materia que debes.', '25','respuesta','#modalRespuesta');
            return; 
        }
        mostrarGrupos(materia);
    })
    .catch(error => console.log(error));
}
//mostramos los grupos disponibles de acuerdo a la materia seleccionada
function mostrarGrupos(materia){
    fetch(`../../controllers/general/controlador_mpacurriGruposDisponibles.php?materia=${materia}`)
    .then(res => res.json())
    .then(data =>{
        if(data.length > 0){
            let html=`
            <div class="form_mpaGpos">
                <table>
                    <thead>
                        <tr>
                            <th>Gpo</th>
                            <th>Docente</th>
                            <th>Aula</th>
                            <th>Cupo</th>
                            <th><span><i class="fas fa-plus"></i></span></th>
                        </tr>
                    </thead>
                    <tbody>`;
            data.forEach(element => {
                html+=`
                    <tr>
                        <td>${element.Id_grupo}</td>
                        <td>${element.Nombre_Docente} ${element.Apellido_P} ${element.Apellido_M}</td>
                        <td>${element.Aula}</td>
                        <td>${element.Capacidad}</td>
                `;
                if(element.Capacidad > 0){
                    html+=`<td><input type="radio" name="grupo" value="${element.Id_grupo}" checked></td>`
                }else{
                    html+=`<td><i>Cupo lleno</i></td>`;
                }
            });
            html+=`</tbody>
                </table>
            </div>`;
            Modales.mostrarModal(`${data[0].Nombre}`,html,'75','info','#modalMostrarGrupos');
            agregarGrupoenLocal('#modalMostrarGrupos',data,materia);
        }else{
            Modales.mostrarModal('Información','Lo sentimos, no hay grupos disponibles para esta materia.','25','respuesta','#modalRespuesta');
            return;
        }
    })
    .catch(error => console.log(error));
}
//agregamos el grupo en el localstorage hasta que el usuario acepte la carga de materias
function agregarGrupoenLocal(objetivo,data,materia){
    let infoGpo;
    const modal= document.querySelector(`${objetivo}`);
    modal.addEventListener('click',(event)=>{
        event.stopImmediatePropagation();
        if(event.target.classList.contains('aceptar')){
            const radioGpos=document.getElementsByName('grupo');
            for (let i = 0; i < radioGpos.length; i++) {
                if(radioGpos[i].checked){
                    console.log(radioGpos[i].value);
                    data.forEach(element =>{
                        if(element.Id_grupo === radioGpos[i].value){
                            infoGpo={
                                "idgpo": element.Id_grupo,
                                "matricula":materia,
                                "materia":element.Nombre,
                                "docente":
                                    `${element.Nombre_Docente} ${element.Apellido_P} ${element.Apellido_M}`
                                ,
                                "aula":element.Aula,
                                "creditos":element.Creditos
                            }
                            
                        }
                    });
                    Modales.ocultarModal(objetivo);
                    visualizarGrupo(infoGpo);
                    guardarGrupoLocalStorage(infoGpo);
                }
            }
        }else if(event.target.classList.contains('close')){
            Modales.ocultarModal(objetivo);
        }
    })
}
//mostramos el grupo agregado en el contenedor
function visualizarGrupo(grupo){
    console.log(grupo);
    const row=document.createElement('tr');
        row.innerHTML=`
            <td>${grupo.idgpo}</td>
            <td>${grupo.materia}</td>
            <td>${grupo.docente}</td>
            <td>${grupo.aula}</td>
            <td>${grupo.creditos}</td>
            <td><button class="eliminar-mat" data-id="${grupo.idgpo}">x</button></td>
        `;
        document.querySelector("#listaGpos tbody").appendChild(row);
}
//agregamos los datos del grupo al localStorage
function guardarGrupoLocalStorage(grupo){
    let grupos;
    grupos=obtenerGruposLocalStorage();
    //agregamos el grupo al arreglo
    grupos.push(grupo);
    //guardamos el contenido del arreglo al localstorage en forma de cadena
    localStorage.setItem('grupos',JSON.stringify(grupos));
}
//funcion para eliminar grupos seleccionados
function eliminarGrupo(event){
    event.preventDefault();
    let grupo, grupoId;
    if(event.target.classList.contains('eliminar')){
        console.log(event.target);
        //obtenemos el id del grupo que vamos a eliminar
        grupoId=event.target.getAttribute("data-id");
        //eliminos el grupo de la vista del usuario
        event.target.parentElement.parentElement.remove();
        console.log(grupoId);
    }
    //eliminamos el grupo del localstorage
    eliminarGrupoLocalStorage(grupoId);
}
//eliminamos el grupo del localStorage
function eliminarGrupoLocalStorage(id){
    let gruposLs;
    //obtenemos los grupos del localStorage
    gruposLs= obtenerGruposLocalStorage();
    //iteramos comparando el id del grupo con los de cursoLs
    gruposLs.forEach((grupo,index)=>{
        if(grupo.idgpo === id){
            //eliminamos el grupo de acuerdo a su posicion en el arreglo
            gruposLs.splice(index,1);
        }
    });
    //añadimos el arreglo actual al localStorage
    localStorage.setItem('grupos',JSON.stringify(gruposLs));
}
//validamos los datos de los grupos seleccionados
function btn_GenerarCarga(){
    //obtenemos los datos almacenado del localstorage
    let gruposLs= obtenerGruposLocalStorage();
    let totalCreditos=0;
    gruposLs.forEach(grupo =>{
        //obtenemos el total de creditos
        totalCreditos+=parseInt(grupo.creditos,10);  
    });
    //validamos que los creditos sean mayor 21
    console.log(totalCreditos);
    if(totalCreditos < 21 || totalCreditos > 70){
        Modales.mostrarModal('Información','¡Verifica el número de creditos, necesitas minimo 21 y no exceder los 70 creditos.!','25','respuesta','#modalRespuesta');
            return;
    }
    GenerarCargaCurricular();
}
function GenerarCargaCurricular(){
    let gruposLocal=JSON.stringify(obtenerGruposLocalStorage);
    let formCarga=new FormData();
    formCarga.append('grupos',gruposLocal);
    formCarga.append('alumno',matriculaAlu);
    fetch('../../controllers/alumnos/controlador_guardarCargaCurricular.php',{
        method:'POST',
        body:formCarga
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data.tipo === 'correcto'){
            Modales.mostrarModal('Información',data.mensaje,'25','respuesta','#modalRespuesta');
            vaciarLocalStorage();
            setTimeout(() => {
               window.location.reload(); 
            }, 3000);

        }else{
            Modales.mostrarModal('Error',data.mensaje,'25','respuesta','#modalRespuesta');
        }
    }).catch(error => console.log(error)); 
}
function vaciarLocalStorage(){
    localStorage.clear();
}