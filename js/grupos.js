$(document).ready(function(){
    listarGrupos();
});

//eventos  
document.querySelector('#cerrarAlumno').addEventListener('click',ocultarSeccionAlumno);
document.querySelector('#addGrupo').addEventListener('click',obtenerMaterias);
//tablas 
    function listarGrupos(){
        const tablaGrupos=$('#tablaGrupos').DataTable({
            "destroy":true,
            "ajax":{
                "method":"POST",
                "url":"../../controllers/grupos/controlador_cargarGrupos.php"
            },
            "columns":[
                {"data":"Id_grupo"},
                {"data":"Nombre"},
                {"render":function(data,type,row){
                    return row.Nombre_Docente+' '+row.Apellido_P+' '+row.Apellido_M;
                }},
                {"data":"Nombre_Aula"},
                {"data":"Capacidad"},
                {"defaultContent":"<button class='botonAccion eliminar' id='grupo_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button><button class='botonAccion Kardex' id='grupo_btnVer' title='Ver Alumnos'><span><i class='fas fa-list'></i></span></button>"}
            ],
            "order":[[2,"asc"]],
            "language":idioma
        });

        btn_EliminarGrupo("#tablaGrupos tbody",tablaGrupos);
        btn_verAlumnos("#tablaGrupos tbody",tablaGrupos);
        // btn_agregarAlunmos("#tablaGrupos tbody",tablaGrupos);
    }
    function listarAlumnosGrupo(idGrupo){
        console.log(idGrupo);
        fetch(`../../controllers/grupos/controlador_cargarAlumnosGrupo.php?id=${idGrupo}`)
        .then(res => res.json())
        .then(data => {
            let html='';
            if(data.length === 0){
                html=`<p>Grupo vacío, agrega un alumno.</p>`;
            }else{
                data.data.forEach(info =>{
                    html+=`<tr>
                            <td>${info.Matricula_Alumno}</td>
                            <td>${info.Nombre} ${info.Apellido_P} ${info.Apellido_M}</td>
                            <td><button class="eliminar cerrarAlumno" data-id="${info.Matricula_Alumno}">&Chi;</button></td>`;
                });
            }
            
            document.querySelector('#tablaAlumnoGrupo tbody').innerHTML= html;

        })
        .catch(error => console.log(error));

        //pasamos los parametros en caso de que haya alguna eliminacion
        btn_EliminarAlumnoGrupo(idGrupo);
        //de igual forma en caso de que haya un ingreso
        btn_AgregarAlumnoGrupo(idGrupo);
    }  
    //funcion para eliminar el grupo
    function btn_EliminarGrupo(tbody,table){
        $(tbody).on("click","button#grupo_btnEliminar",function(){
            let data= table.row($(this).parents("tr")).data();
            Modales.mostrarModal("eliminar",`¿Estas seguro(a) de eliminar el grupo  <b>${data.Nombre}</b> ?`,"25", "info","#modalEliminar");
            //funcion a la escucha
            Eliminar_Grupo(data.Id_grupo,"#modalEliminar");
        });
    }
    //funcion para mostrar los alumnos dentro del grupo seleccionado
    function btn_verAlumnos(tbody, table){
        $(tbody).on("click","button#grupo_btnVer", function(){
            let data= table.row($(this).parents("tr")).data();

            const alumnos = document.querySelector('#Alumnos'); 
            //agregamos el titulo de la tabla
            document.querySelector('#Alumnos h3').innerHTML=data.Nombre;
            listarAlumnosGrupo(data.Id_grupo);
            if(alumnos.classList.contains('ocultar')){
                alumnos.classList.remove('ocultar');
            }
            alumnos.classList.add('mostrar');
        })
    }
    //funcion para mostrar el modal para agregar alumno al grupo seleccionado
    function btn_AgregarAlumnoGrupo(id){
        document.querySelector('#addAlumno').addEventListener('click',()=>{
            let html=`
            <div class="form_editar">
                <div>
                    <label class="form_Label">Alumno</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-user"></i></span>
                        <input type="text" name="alumno" id="alumnoGrupo" value="" placeholder="Matricula del Alumno">
                    </div>
                </div>
            </div>
        `;
        Modales.mostrarModal('Agregar Alumno',html,'25','info','#modalEditar');
        });
        Agregar_AlumnoGrupo(id, '#modalEditar');
    }
    //Eliminando el grupo
    function Eliminar_Grupo(id, objetivo){
        let elemento = document.querySelector(`${objetivo}`);

        elemento.addEventListener('click', (e) => {
            if(e.target.classList.contains('aceptar')){
                fetch(`../../controllers/grupos/controlador_eliminarGrupo.php?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');

                    if(data.tipo === "correcto"){
                        $('#tablaGrupos').DataTable().ajax.reload();
                    }
                })
                .catch(error => console.log(error));
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }

    //eliminando alumno del grupo seleccionado
    function btn_EliminarAlumnoGrupo (idGrupo) {
        document.querySelector('#tablaAlumnoGrupo').addEventListener('click',(e)=>{
            if(e.target.classList.contains('eliminar')){
                const matricula= e.target.getAttribute("data-id");
                console.log(matricula);
                Modales.mostrarModal("eliminar",`¿Estas seguro(a) de eliminar al alumno?`,"25", "info","#modalEliminar");
                //funcion a la escucha
                Eliminar_AlumnoGrupo(idGrupo,matricula,"#modalEliminar");
            }
        })
    }

     //Eliminando alumno del grupo
     function Eliminar_AlumnoGrupo (id,matricula, objetivo) {
        let elemento = document.querySelector(`${objetivo}`);

        elemento.addEventListener('click', (e) => {
            if(e.target.classList.contains('aceptar')){
                fetch(`../../controllers/grupos/controlador_eliminarAlumnoGrupo.php?id=${matricula}`)
                .then(res => res.json())
                .then(data => {
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');

                    if(data.tipo === "correcto"){
                        listarAlumnosGrupo(id);
                    }
                })
                .catch(error => console.log(error));
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }
   
    function ocultarSeccionAlumno() {
        const alumnos = document.querySelector('#Alumnos'); 
        alumnos.classList.remove('mostrar');
    }
    //funciones para el boton de agregar grupos
    function agregarGrupos(resultado){
        console.log(resultado);
        
        let html=`
            <div class="form_editar">
                <div>
                    <label class="form_Label">Materia</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-file-signature"></i></span>
                        <select name="materia" id="materiaGrupo">`;
                        resultado.materias.forEach(element => {
                                html+=`<option value="${element.Matricula_Materia}">${element.Nombre}</option>`;
                            });
                            
                        html+=`</select>
                    </div>
                </div>
                <div>
                    <label class="form_Label">Docente</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-chalkboard-teacher"></i></span>
                        <select name="docente" id="docenteGrupo">`;
                        resultado.docentes.data.forEach(element =>{
                            html+=`<option value="${element.Id_Docente}">${element.Nombre_Docente} ${element.Apellido_P} ${element.Apellido_M}</option>`
                        });
                            
                        html+=`</select>
                    </div>
                </div>
                <div>
                    <label class="form_Label">Aula</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-store-alt"></i></span>
                        <select name="aula" id="aulaGrupo">`;
                        resultado.aulas.forEach(element => {
                            html+=`<option value="${element.Id_Aula}">${element.Nombre_Aula}</option>`;
                        });

                       html+=`</select>
                    </div>
                </div>
                <div>
                    <label class="form_Label">Capacidad</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-cloud"></i></span>
                        <input type="number" name="capacidad" id="capacidadGrupo" value="" placeholder="Capacidad">
                    </div>
                </div>
            </div>
        `;
    
        Modales.mostrarModal('Agregar Grupos',html,'50','info','#modalEditar');
        Agregar_Grupo('#modalEditar');
    }
    //funcion a la espera del submit del usuario
    function Agregar_Grupo(objetivo){
        let elemento= document.querySelector(`${objetivo}`);

        elemento.addEventListener('click', e =>{
            if(e.target.classList.contains('aceptar')){
                //obtenemos el valor de las variables
                let formAgregarGpo,clave;
                const today= new Date();
                const materia=document.querySelector('#materiaGrupo').value;
                //generamos una clave unica con la matricula de la materia y la hora local
                clave=materia.slice(0,3)+today.toLocaleString();
                clave= clave.replace(" ","/");
                console.log(clave);
                const docente=document.querySelector('#docenteGrupo').value;
                const aula=document.querySelector('#aulaGrupo').value;
                const capacidad=document.querySelector('#capacidadGrupo').value;
                if(capacidad ===''){
                    let alerta= document.createElement('p');
                    alerta.className="alerta-danger";
                    alerta.textContent='Todos los campos son obligatorios';
                    document.querySelector(`${objetivo} .modal-body`).appendChild(alerta);

                    return;
                }
                formAgregarGpo = new FormData();
                formAgregarGpo.append('clave',clave);
                formAgregarGpo.append('materia',materia);
                formAgregarGpo.append('docente',docente);
                formAgregarGpo.append('aula', aula);
                formAgregarGpo.append('capacidad',capacidad);
                
                //generamos la peticion al servidor
               fetch('../../controllers/grupos/controlador_agregarGrupo.php',{
                    method:'POST',
                    body:formAgregarGpo
                })
                .then(res => res.json())
                .then(data =>{
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                    //recargamos solo la tabla para visualizar los cambios
                    if(data.tipo === "correcto"){
                        $('#tablaGrupos').DataTable().ajax.reload();
                    }
                })
                .catch(error => console.log(error));
               
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }
    //funcion para agregar al alumno al grupo correscondiente
    function Agregar_AlumnoGrupo(id, objetivo){
        elemento = document.querySelector(`${objetivo}`);
        let alerta= document.createElement('p');
                    alerta.className="alerta-danger";
                    
        elemento.addEventListener('click', e =>{
            if(e.target.classList.contains('aceptar')){
                const matriculaAlumno= document.querySelector('#alumnoGrupo').value;
                //validamos que el campo no este vacio
                if(matriculaAlumno === ''){
                    alerta.textContent='Todos los campos son obligatorios';
                    document.querySelector(`${objetivo} .modal-body`).appendChild(alerta);
                    return
                }
                //verificamos que el alumno exista
                fetch(`../../controllers/general/controlador_verificarAlumno.php?id=${matriculaAlumno}&gpo=${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(!data.alumno){
                        alerta.textContent=`El alumno con la matricula ${matriculaAlumno} no existe.`;
                        document.querySelector(`${objetivo} .modal-body`).appendChild(alerta);

                        return;
                    }
                    if(data.dentro){
                        alerta.textContent=`El alumno con la matricula ${matriculaAlumno} ya está agregado a este grupo.`;
                        document.querySelector(`${objetivo} .modal-body`).appendChild(alerta);

                        return;
                    }
                    //agregamos el alumno al grupo
                    guardarAlumno_Grupo(matriculaAlumno, id,objetivo);
                })
                .catch(error => console.log(error));
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }
    //funciones para obtener materias, docentes y aulas disponibles 
    async function obtenerMaterias(){
        let materias=await fetch('../../controllers/general/controlador_obtenerMaterias.php');
        let docentes= await fetch('../../controllers/docentes/controlador_cargarDocentes.php');
        let aulas= await fetch('../../controllers/general/controlador_obtenerAulasDisp.php');

        let dataMaterias = await materias.json();
        let dataDocentes= await docentes.json();
        let dataAulas= await aulas.json();
        const resultado={
            materias: dataMaterias,
            docentes: dataDocentes,
            aulas: dataAulas
        }

        agregarGrupos(resultado);
    }
    //procedemos a guardar al alumno a su grupo
    function guardarAlumno_Grupo(matricula, grupo,objetivo){
        fetch(`../../controllers/grupos/controlador_agregarAlumnoGrupo.php?id=${grupo}&matricula=${matricula}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                    //recargamos solo la tabla para visualizar los cambios
                    if(data.tipo === "correcto"){
                        listarAlumnosGrupo(grupo);
                    }
                })
                .catch(error => console.log(error));
    }