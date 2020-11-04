$(document).ready(function(){
    DatosDocente();
});
document.getElementById('GruposDocente').addEventListener('click',btn_verAlumnosGrupo);

function btn_verAlumnosGrupo(event){
    if(event.target.parentElement.classList.contains("ver-gpo")){
        const gpoId=event.target.parentElement.getAttribute('data-id');
        ObtenerAlumnos(gpoId);
    }
}
function DatosDocente(){
    fetch('../../controllers/general/controlador_datosUsuario.php')
    .then(res => res.json())
    .then(data =>{
        listarGrupos(data.user);
    }).catch(error => console.log(error));
}

function listarGrupos(id){
    let html='';
    let tabla=document.querySelector('#GruposDocente tbody');
    fetch(`../../controllers/docentes/controlador_gruposDocente.php?id=${id}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data.length !== ""){
            data.data.forEach(grupo => {
                html+=`<tr>
                <td>${grupo.Id_grupo}</td>
                <td>${grupo.Nombre}</td>
                <td>${grupo.Nombre_Aula}</td>
                <td><span class="ver-gpo" data-id="${grupo.Id_grupo}"><i class="fas fa-book-reader"></i></span></td>
                `;
            }); 
            tabla.innerHTML=html;         
        }else{
            document.querySelector('#GruposDocente tbody').innerHTML=`<td colspan="4"><p class="title"> · Por el momento no cuenta con grupos asignados · </p></td>`
        }
    }).catch(error => console.log(error));
}

function ObtenerAlumnos(grupoId){
    let html='';
    let contador=1;
    fetch(`../../controllers/docentes/controlador_datosAlumnoGrupo.php?id=${grupoId}`)
    .then(res => res.json())
    .then(data => {
        if(data.data === undefined){
            Modales.mostrarModal('Información',`<p>Aun no hay alumnos asignados a este grupo.</p>`, '25','respuesta','#modalRespuesta');
            return;
        }
        if(data.length !== ""){
            data.data.forEach(alumno =>{
                html+=`<div>${contador}</div>
                <div>${alumno.Apellido_P} ${alumno.Apellido_M} ${alumno.Nombre}</div>
                <div>${alumno.Matricula_Alumno}</div>
                <div><select name="calificaciones">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="NP">NP</option>
                    <option value="NC">NC</option>
                </select></div>
                <div><input type="text" name="observaciones"></div>`;
                contador++;
            });
            //obtenemos los datos del grupo
            fetch(`../../controllers/general/controlador_infoGrupo.php?id=${grupoId}`)
            .then(res => res.json())
            .then(data =>{
                GenerarActaCalificaciones(html,data,contador);
            }).catch(error => console.log(error));        
        }
    }).catch(error => console.log(error));
}

function GenerarActaCalificaciones(alumnos,data,numAlumnos){
    const today= new Date();
    let html=`
    <button>Generar PDF</button>
    <div class="actaExamen">
    <table>
    <!-- seccion de informacion general -->
        <tr>
            <td class="actaExamen-img" rowspan="5">
                <figure >
                    <img src="../../img/logo_uabjo.png" alt="Ciencias" width="100px" height="110px">
                    <figcaption>
                        <small>
                            <p>SERVICIOS ESCOLARES</p>
                        </small>
                    </figcaption>
                </figure>
            </td>
            <td rowspan="2" colspan="3" class="sinborde">
                <p><strong><u>UNIVERSIDAD AUTÓNOMA "BENITO JUÁREZ" DE OAXACA</u></strong></p>
            </td>
            <td class="borde">
                PERIODO ESCOLAR
            </td>
            <td class="borde">ACTA DE EXAMEN</td>
        </tr>
        <tr>
            <td class="borde">2019-2019</td>
            <td class="borde actaExamen-codigo" >No. 2973-0077 ORD C</td>
        </tr>
        <tr>
            <td colspan="5" class="sinborde">CIUDAD UNIVERSITARIA EXHACIENDA
                "CINCO SEÑORES" OAXACA,OAX</td>
        </tr>
        <tr>
            <td rowspan="2" colspan="2" class="borde"><strong>ESCUELA DE CIENCIAS</strong></td>
            <td  class="borde">CLAVE</td>
            <td  class="borde">ACTA DE EXAMEN DE LA MATERIA</td>
            <td  class="borde">CLAVE</td>
        </tr>
        <tr>
            <td  class="borde">73</td>
            <td  class="borde">${data[0].Nombre}</td>
            <td  class="borde">${data[0].Matricula_Materia}</td>
        </tr>
        <tr>
            <td colspan="6" class="sinborde">
                <p class="justificar">En la ciuda de Oaxaca de Juárez, Oax., siendo las <u>12:00</u> horas del dia <u>20 de
                        junio de 2019</u> reunidos en una de las aulas de la <u>Escuela de Ciencias,</u> los
                    señores Catedráticos:</p>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <div class="actaExamen-directivos">
                    <div class="item-1">Presidente</div>
                    <div class="item-2">Secretario</div>
                    <div class="item-3">Sinodal</div>
                    <div class="item-4"><p>Ing. Altagracia Casas Amador</p></div>
                    <div class="item-5"><p>M.C. Jorge Cruz  Pérez</p></div>
                    <div class="item-6"><p>M.C Ishtar Gemma Hernández Calvo</p></div>                   
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="6" class="sinborde">
                <p class="justificar">Integrantes del jurado nombrados por la Dirección para oir y calificar el examen
                    <u>Ordinario</u> de esta materia correspondiente al <u>Segundo Semestre</u>
                    <strong>REC.</strong> de la <u>Licenciatura en Computación</u> se procedió al acto
                    obteniendo el siguiente resultado.</p>
            </td>
        </tr>
        <!-- seccion de calificaciones -->
            <tr>
                <td colspan="6">
                    <div class="actaExamen-alumnos">
                        <div>#</div>
                        <div>NOMBRE</div>
                        <div>MATRICULA</div>
                        <div>CALIFICACIÓN</div>
                        <div>OBSERVACIONES</div>`;
                        html+=alumnos;
                    html+=`</div>
                </td>
            </tr>
            <tr><td class="sinborde" colspan="6"><button>Guardar Calificaciones</button></td></tr>
            <tr><td class="sinborde" colspan="6"><p class="justificar">Con la presente anterior se concluye el examen ordinario<br> La presente acta amapara ${numAlumnos - 1 } alumnos</p></td></tr>   
    </table>
    <p class="actaExamen-fechaGeneracion">Fecha de generacion del acta: ${today.toLocaleDateString()}</p>
    <div class="actaExamen-directivos footer">
         <div class="item-1">Presidente</div>
         <div class="item-2">Secretario</div>
         <div class="item-3">Sinodal</div>
         <div class="item-4"><p>Ing. Altagracia Casas Amador</p></div>
         <div class="item-5"><p>M.C. Jorge Cruz  Pérez</p></div>
         <div class="item-6"><p>M.C Ishtar Gemma Hernández Calvo</p></div>                   
    </div>
    
    </div>
    `;
    document.getElementById('listAlumnos').innerHTML=html;
}